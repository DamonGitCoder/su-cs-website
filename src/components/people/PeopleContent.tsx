"use client";

import { PageHero } from "@/components/shared/PageHero";
import { StaffCard } from "@/components/people/StaffCard";
import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "@/components/shared/MotionWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { StaffMember } from "@/types/staff";

export function PeopleContent({ staff }: { staff: StaffMember[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].people;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <motion.div key={member.id} variants={staggerItem}>
              <StaffCard member={member} />
            </motion.div>
          ))}
        </StaggerContainer>

        {staff.length === 0 && (
          <div className="text-center py-20 text-brand-muted">{t.staffWillAppear}</div>
        )}
      </div>
    </>
  );
}
