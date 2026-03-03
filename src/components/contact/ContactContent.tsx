"use client";

import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function ContactContent() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const CONTACTS = [
    {
      label: t.generalEnquiries,
      email: "secretary@cs.sun.ac.za",
      description: t.generalDesc,
    },
    {
      label: t.ugAdmissions,
      email: "undergrad@cs.sun.ac.za",
      description: t.ugDesc,
    },
    {
      label: t.pgStudies,
      email: "postgrad@cs.sun.ac.za",
      description: t.pgDesc,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Contact cards */}
        <section>
          <SectionHeader eyebrow={t.enquiries} title={t.contactChannels} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CONTACTS.map((c, i) => (
              <MotionWrapper key={c.email} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-brand-ink text-base mb-1">{c.label}</h3>
                    <p className="text-brand-muted text-xs mb-4 leading-relaxed">{c.description}</p>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-brand-maroon hover:text-brand-maroon-light transition-colors text-sm font-medium"
                    >
                      <Mail size={14} />{c.email}
                    </a>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Physical info + Map */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <MotionWrapper>
              <GlassCard>
                <div className="p-6 space-y-5">
                  <h3 className="font-display font-semibold text-brand-ink text-xl mb-4">{t.departmentDetails}</h3>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand-maroon mt-0.5 shrink-0" />
                    <div>
                      <p className="text-brand-ink/70 text-sm font-medium">{t.physicalAddress}</p>
                      <p className="text-brand-muted text-sm leading-relaxed mt-1">
                        {lang === "en" ? (
                          <>
                            Computer Science Division<br />
                            Department of Mathematical Sciences<br />
                            Stellenbosch University<br />
                            Private Bag X1, 7602 Matieland<br />
                            South Africa
                          </>
                        ) : (
                          <>
                            Rekenaarwetenskapafdeling<br />
                            Departement Wiskundige Wetenskappe<br />
                            Universiteit Stellenbosch<br />
                            Privaatsak X1, 7602 Matieland<br />
                            Suid-Afrika
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-brand-maroon mt-0.5 shrink-0" />
                    <div>
                      <p className="text-brand-ink/70 text-sm font-medium">{t.telephone}</p>
                      <a href="tel:+27218084232" className="text-brand-muted hover:text-brand-maroon text-sm transition-colors mt-1 block">
                        +27 (0)21 808 4232
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-brand-maroon mt-0.5 shrink-0" />
                    <div>
                      <p className="text-brand-ink/70 text-sm font-medium">{t.officeHours}</p>
                      <p className="text-brand-muted text-sm leading-relaxed mt-1">
                        {t.officeHoursValue}<br />
                        {t.officeHoursNote}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </MotionWrapper>

            {/* OpenStreetMap embed — reliable, no API key, works in all browsers */}
            <MotionWrapper delay={0.2}>
              <div className="relative h-full min-h-[320px] rounded-xl overflow-hidden border border-black/8 shadow-sm">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=18.855%2C-33.935%2C18.875%2C-33.925&amp;layer=mapnik&amp;marker=-33.9307%2C18.8642"
                  className="w-full h-full min-h-[320px] border-0"
                  loading="lazy"
                  title="Mathematical Sciences Building, Stellenbosch University"
                  sandbox="allow-scripts allow-same-origin"
                />
                <a
                  href="https://maps.google.com/?q=Mathematical+Sciences+Building,+Stellenbosch+University,+Stellenbosch,+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-brand-maroon shadow-sm whitespace-nowrap hover:bg-white transition-colors"
                  aria-label="Open in Google Maps"
                >
                  {t.openMaps} ↗
                </a>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Directions */}
        <MotionWrapper>
          <GlassCard>
            <div className="p-6">
              <h3 className="font-display font-semibold text-brand-ink text-xl mb-4">{t.directions}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-brand-maroon font-medium mb-2">{t.byCar}</p>
                  <p className="text-brand-muted leading-relaxed">{t.byCarDesc}</p>
                </div>
                <div>
                  <p className="text-brand-maroon font-medium mb-2">{t.byTrain}</p>
                  <p className="text-brand-muted leading-relaxed">{t.byTrainDesc}</p>
                </div>
                <div>
                  <p className="text-brand-maroon font-medium mb-2">{t.parking}</p>
                  <p className="text-brand-muted leading-relaxed">{t.parkingDesc}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </MotionWrapper>
      </div>
    </>
  );
}
