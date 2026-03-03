"use client";

import Link from "next/link";
import { ArrowRight, Cpu, BrainCircuit, ShieldCheck, Network } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlassCard } from "@/components/shared/GlassCard";
import { StaggerContainer, staggerItem } from "@/components/shared/MotionWrapper";
import { motion } from "framer-motion";
import type { ResearchGroup } from "@/types/research";

const ICONS = [BrainCircuit, Cpu, ShieldCheck, Network];
const ICON_COLORS = [
  "text-brand-maroon",
  "text-blue-600",
  "text-emerald-600",
  "text-amber-600",
];
const ICON_BG = [
  "bg-brand-maroon/10 border-brand-maroon/20",
  "bg-blue-600/10 border-blue-600/20",
  "bg-emerald-600/10 border-emerald-600/20",
  "bg-amber-600/10 border-amber-600/20",
];

interface ResearchPreviewProps {
  groups: ResearchGroup[];
}

function GroupCard({ group, index }: { group: ResearchGroup; index: number }) {
  const Icon = ICONS[index % ICONS.length];
  return (
    <motion.div variants={staggerItem}>
      <GlassCard className="h-full group">
        <div className="relative p-6 flex flex-col h-full">
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 ${ICON_BG[index % ICON_BG.length]}`}>
            <Icon size={20} className={ICON_COLORS[index % ICON_COLORS.length]} />
          </div>
          <div className="text-brand-maroon text-[10px] font-semibold tracking-widest uppercase mb-2">
            {group.shortName}
          </div>
          <h3 className="font-display font-semibold text-brand-ink text-lg mb-3 leading-tight group-hover:text-brand-maroon transition-colors">
            {group.name}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed flex-1 line-clamp-3">
            {group.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {group.focus.slice(0, 3).map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded-full bg-brand-ink/5 border border-black/8 text-brand-muted text-[10px]"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-brand-maroon/60 text-xs font-medium group-hover:text-brand-maroon transition-colors">
            <span>{group.memberCount} members</span>
            <span className="text-brand-muted/30">·</span>
            <span>Learn more</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function ResearchPreview({ groups }: ResearchPreviewProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Research"
            title="Pushing the Boundaries"
            description="Four active research groups driving world-class innovation in AI, robotics, software, and systems."
          />
          <Link
            href="/research"
            className="flex items-center gap-2 text-brand-maroon text-sm font-semibold hover:gap-3 transition-all shrink-0"
          >
            All Research <ArrowRight size={16} />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.slice(0, 4).map((group, i) => (
            <GroupCard key={group.id} group={group} index={i} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
