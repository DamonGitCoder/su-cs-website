"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "maroon" | "gold";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  variant = "default",
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    default: "glass border border-black/7",
    maroon: "glass-maroon border border-brand-maroon/25",
    gold: "glass-gold border border-brand-gold/20",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? { y: -4, scale: 1.01, transition: { duration: 0.2 } }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        "rounded-2xl overflow-hidden transition-shadow duration-300",
        hover && "hover:shadow-xl hover:shadow-black/10 cursor-default",
        onClick && "cursor-pointer",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
