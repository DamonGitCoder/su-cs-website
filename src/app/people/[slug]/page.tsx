import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { getStaffBySlug, getAllStaff } from "@/lib/drupal/staff";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const staff = await getAllStaff();
  return staff.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getStaffBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: `${member.position} at Stellenbosch University Department of Computer Science. ${member.researchAreas.join(", ")}.`,
  };
}

export default async function StaffProfilePage({ params }: Props) {
  const { slug } = await params;
  const member = await getStaffBySlug(slug);
  if (!member) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <MotionWrapper>
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-ink text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Staff
          </Link>
        </MotionWrapper>

        {/* Header card */}
        <MotionWrapper delay={0.1}>
          <GlassCard className="mb-8">
            <div className="p-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-maroon/40 to-brand-maroon/10 border border-brand-maroon/30 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-3xl text-white">
                  {member.name
                    .split(" ")
                    .filter((w) => /^[A-Z]/.test(w))
                    .slice(-2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="font-display font-bold text-3xl text-brand-ink mb-1">{member.name}</h1>
                <p className="text-brand-maroon-light text-lg mb-4">{member.position}</p>
                <div className="flex flex-wrap gap-4">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon transition-colors text-sm">
                      <Mail size={14} />{member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon transition-colors text-sm">
                      <Phone size={14} />{member.phone}
                    </a>
                  )}
                  {member.officeLocation && (
                    <span className="flex items-center gap-2 text-brand-muted text-sm">
                      <MapPin size={14} />{member.officeLocation}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  {member.googleScholarUrl && (
                    <a href={member.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-maroon transition-colors">
                      <BookOpen size={13} />Google Scholar
                    </a>
                  )}
                  {member.orcidUrl && (
                    <a href={member.orcidUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-maroon transition-colors">
                      <ExternalLink size={13} />ORCID
                    </a>
                  )}
                  {member.personalWebsite && (
                    <a href={member.personalWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-maroon transition-colors">
                      <ExternalLink size={13} />Personal Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MotionWrapper delay={0.2} className="lg:col-span-2">
            <GlassCard>
              <div className="p-6">
                <h2 className="font-display font-semibold text-brand-ink text-xl mb-4">Biography</h2>
                <div
                  className="text-brand-muted leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                />
              </div>
            </GlassCard>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <GlassCard>
              <div className="p-6">
                <h2 className="font-display font-semibold text-brand-ink text-xl mb-4">Research Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {member.researchAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 rounded-full glass border border-brand-maroon/20 text-brand-ink/60 text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
