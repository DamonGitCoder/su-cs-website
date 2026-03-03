"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { Clock, Award } from "lucide-react";
import type { Course } from "@/types/course";

const SEMESTER_LABEL: Record<Course["semester"], string> = {
  first: "Semester 1",
  second: "Semester 2",
  year: "Full Year",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <GlassCard className="group">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-mono text-brand-maroon text-sm font-bold tracking-wide">
            {course.code}
          </span>
          <div className="flex items-center gap-1.5 text-brand-muted text-xs shrink-0">
            <Award size={12} />
            {course.credits} credits
          </div>
        </div>

        <h3 className="font-display font-semibold text-brand-ink text-base leading-snug mb-2 group-hover:text-brand-maroon transition-colors">
          {course.title}
        </h3>

        <p className="text-brand-muted text-sm leading-relaxed line-clamp-3 mb-4">
          {course.description.replace(/<[^>]*>/g, "")}
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-black/6">
          <div className="flex items-center gap-1.5 text-brand-muted text-xs">
            <Clock size={12} />
            {SEMESTER_LABEL[course.semester]}
          </div>
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="ml-auto text-brand-muted/60 text-xs">
              Pre-req: {course.prerequisites.join(", ")}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
