"use client";

import { useEffect, useRef, useCallback } from "react";

// ── ANSI Shadow FIGlet art — same font style Claude Code uses in its terminal heading ──
const COMPUTER = [
  " ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗   ██╗████████╗███████╗██████╗ ",
  "██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗",
  "██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║   ██║   █████╗  ██████╔╝",
  "██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║   ██║   ██╔══╝  ██╔══██╗",
  "╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝   ██║   ███████╗██║  ██║",
  " ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝",
];

const SCIENCE = [
  "███████╗ ██████╗██╗███████╗███╗   ██╗ ██████╗███████╗",
  "██╔════╝██╔════╝██║██╔════╝████╗  ██║██╔════╝██╔════╝",
  "███████╗██║     ██║█████╗  ██╔██╗ ██║██║     █████╗  ",
  "╚════██║██║     ██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  ",
  "███████║╚██████╗██║███████╗██║ ╚████║╚██████╗███████╗",
  "╚══════╝ ╚═════╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝",
];

// COMPUTER row is wider — defines the grid column count
const COMP_W     = COMPUTER[0].length; // 72
const SCI_W      = SCIENCE[0].length;  // 56
const SCI_OFFSET = Math.floor((COMP_W - SCI_W) / 2); // 8 — centres SCIENCE under COMPUTER

// Pure binary rain: very CS-department
const RAIN = "01";

interface Drop { head: number; speed: number; length: number }

interface State {
  w: number; h: number;
  charW: number; lineH: number; fontSize: number;
  cols: number; rows: number;
  compRow0: number; sciRow0: number;
  letterMask: Uint8Array;
  drops: Drop[];
}

export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const stateRef  = useRef<State | null>(null);

  const build = useCallback((canvas: HTMLCanvasElement) => {
    const W = canvas.offsetWidth  || 900;
    const H = canvas.offsetHeight || 500;
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;

    // ── Derive grid from art width ─────────────────────────────────────
    const charW = W / COMP_W;

    // Measure actual Courier New character width and scale fontSize to fit charW
    let fontSize = Math.round(charW / 0.601);
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    const realW = ctx.measureText("█").width;
    fontSize = Math.round(fontSize * (charW / realW));
    fontSize = Math.max(6, fontSize);

    const lineH = fontSize * 1.22; // comfortable line height for Courier New
    const cols  = COMP_W;
    const rows  = Math.ceil(H / lineH) + 1;

    // ── Centre the two word-blocks vertically ──────────────────────────
    const artTotalRows = COMPUTER.length + 2 + SCIENCE.length; // gap of 2
    const compRow0 = Math.max(1, Math.floor((rows - artTotalRows) / 2));
    const sciRow0  = compRow0 + COMPUTER.length + 2;

    // ── Build letter mask (which cells are letter chars vs background) ──
    const letterMask = new Uint8Array(cols * rows);
    for (let ar = 0; ar < COMPUTER.length; ar++) {
      const gr = compRow0 + ar;
      if (gr < 0 || gr >= rows) continue;
      for (let ac = 0; ac < COMP_W; ac++) {
        if (COMPUTER[ar][ac] !== " ") letterMask[gr * cols + ac] = 1;
      }
    }
    for (let ar = 0; ar < SCIENCE.length; ar++) {
      const gr = sciRow0 + ar;
      if (gr < 0 || gr >= rows) continue;
      for (let ac = 0; ac < SCI_W; ac++) {
        if (SCIENCE[ar][ac] !== " ") letterMask[gr * cols + (ac + SCI_OFFSET)] = 1;
      }
    }

    // ── Rain drops — one per column ────────────────────────────────────
    const prev = stateRef.current;
    const drops: Drop[] = Array.from({ length: cols }, (_, c) => {
      // Preserve existing drop if same column count
      if (prev && prev.cols === cols && prev.drops[c]) return prev.drops[c];
      return {
        head:   Math.random() * rows * 1.8 - rows * 0.4,
        speed:  0.10 + Math.random() * 0.22,
        length: Math.floor(rows * (0.18 + Math.random() * 0.42)),
      };
    });

    stateRef.current = {
      w: W, h: H, charW, lineH, fontSize,
      cols, rows, compRow0, sciRow0, letterMask, drops,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    build(canvas);
    const ro = new ResizeObserver(() => build(canvas));
    ro.observe(canvas);

    const tick = () => {
      const s = stateRef.current;
      if (!s) { frameRef.current = requestAnimationFrame(tick); return; }

      const { w, h, charW, lineH, fontSize, cols, rows,
              compRow0, sciRow0, letterMask, drops } = s;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `bold ${fontSize}px "Courier New", monospace`;

      // ── Pass 1: Binary rain (background — skip letter cells) ──────────
      for (let c = 0; c < cols; c++) {
        const drop = drops[c];
        for (let r = 0; r < rows; r++) {
          if (letterMask[r * cols + c]) continue;

          const dist = drop.head - r;
          if (dist < 0 || dist >= drop.length) continue;

          const x = c * charW;
          const y = (r + 1) * lineH;
          // Randomise the 0/1 each frame — creates the "changing digits" shimmer
          const ch = Math.random() < 0.5 ? "0" : "1";

          if (dist < 1.5) {
            // Column head: gold flash
            const a = 0.50 + (1 - dist / 1.5) * 0.45;
            ctx.fillStyle = `rgba(196,160,6,${a.toFixed(2)})`;
          } else {
            // Trail: maroon fading exponentially to invisible
            const fade = 1 - dist / drop.length;
            const a = fade * fade * 0.62 + 0.03;
            ctx.fillStyle = `rgba(151,27,62,${a.toFixed(3)})`;
          }
          ctx.fillText(ch, x, y);
        }

        // Advance; recycle when tail clears bottom
        drops[c].head += drops[c].speed;
        if (drops[c].head - drops[c].length > rows) {
          drops[c] = {
            head:   -drops[c].length * 0.3 + Math.random() * 5,
            speed:  0.10 + Math.random() * 0.22,
            length: Math.floor(rows * (0.18 + Math.random() * 0.42)),
          };
        }
      }

      // ── Pass 2: FIGlet text (always on top, crisp maroon) ─────────────
      ctx.fillStyle = "rgba(151,27,62,0.93)";
      for (let ar = 0; ar < COMPUTER.length; ar++) {
        const gr = compRow0 + ar;
        if (gr < 0 || gr >= rows) continue;
        const y = (gr + 1) * lineH;
        for (let ac = 0; ac < COMP_W; ac++) {
          const ch = COMPUTER[ar][ac];
          if (ch !== " ") ctx.fillText(ch, ac * charW, y);
        }
      }
      for (let ar = 0; ar < SCIENCE.length; ar++) {
        const gr = sciRow0 + ar;
        if (gr < 0 || gr >= rows) continue;
        const y = (gr + 1) * lineH;
        for (let ac = 0; ac < SCI_W; ac++) {
          const ch = SCIENCE[ar][ac];
          if (ch !== " ") ctx.fillText(ch, (ac + SCI_OFFSET) * charW, y);
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [build]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Animated ASCII art spelling Computer Science in ANSI Shadow style"
    />
  );
}
