import { MotionWrapper } from "./MotionWrapper";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <MotionWrapper delay={0}>
          <span className="inline-flex items-center gap-2 text-brand-maroon text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span className="block w-8 h-px bg-brand-maroon/40" />
            {eyebrow}
            <span className="block w-8 h-px bg-brand-maroon/40" />
          </span>
        </MotionWrapper>
      )}
      <MotionWrapper delay={0.1}>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink leading-tight">
          {title}
        </h2>
      </MotionWrapper>
      {description && (
        <MotionWrapper delay={0.2}>
          <p className="mt-4 text-brand-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </MotionWrapper>
      )}
    </div>
  );
}
