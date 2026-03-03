"use client";

import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, FileText, HelpCircle, Link2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const USEFUL_LINKS = [
  { label: "SUNLearn (e-learning)", labelAf: "SUNLearn (e-leer)", href: "https://learn.sun.ac.za", description: "Course materials, assignments, and grades", descriptionAf: "Kursusmateriaal, opdragte en punte" },
  { label: "SU Library", labelAf: "SU Biblioteek", href: "https://library.sun.ac.za", description: "Academic databases, e-books, and journals", descriptionAf: "Akademiese databasisse, e-boeke en joernale" },
  { label: "Student Portal (SUNStudent)", labelAf: "Studenteportaal (SUNStudent)", href: "https://student.sun.ac.za", description: "Registration, fees, and academic records", descriptionAf: "Registrasie, fooie en akademiese rekords" },
  { label: "IT Helpdesk", labelAf: "IT Hulptoonbank", href: "https://it.sun.ac.za", description: "Software, VPN, email, and technical support", descriptionAf: "Sagteware, VPN, e-pos en tegniese ondersteuning" },
  { label: "Career Centre", labelAf: "Loopbaansentrum", href: "https://careers.sun.ac.za", description: "Jobs, internships, and career development", descriptionAf: "Werk, internskappe en loopbaanontwikkeling" },
  { label: "Student Wellness", labelAf: "Studentewelsyn", href: "https://www.sun.ac.za/english/student-affairs/Pages/Student-Wellness.aspx", description: "Counselling, health, and support services", descriptionAf: "Berading, gesondheid en ondersteuningsdienste" },
];

const FORMS = [
  { label: "Examination Timetable Request", labelAf: "Eksamenroosterversoek", description: "Request a special exam time due to clash or medical reasons", descriptionAf: "Versoek 'n spesiale eksamentyd weens botsing of mediese redes" },
  { label: "Module Change Form", labelAf: "Moduleveevorm", description: "Add, drop, or change module registration", descriptionAf: "Voeg by, verwyder of verander moduleregistrasie" },
  { label: "Readmission Application", labelAf: "Heraansoek", description: "Apply for readmission after academic exclusion", descriptionAf: "Doen aansoek om herinname na akademiese uitsluiting" },
  { label: "Leave of Absence", labelAf: "Verlof van Afwesigheid", description: "Apply for a semester or year of absence", descriptionAf: "Doen aansoek vir 'n semester of jaar van afwesigheid" },
  { label: "Postgraduate Progress Report", labelAf: "Nagraadse Vorderingsverslag", description: "Annual progress submission for PG students", descriptionAf: "Jaarlikse vorderingindiening vir NG-studente" },
];

const FAQS_EN = [
  { q: "How do I register for modules?", a: "Module registration is done through the SUNStudent portal during the registration window each semester. Ensure your fees are up to date before attempting to register. Contact the undergraduate administrator if you have difficulty." },
  { q: "Where do I find lecture notes and assignments?", a: "All course materials are posted on SUNLearn (learn.sun.ac.za). Log in with your SU staff/student number and password. If you cannot access a course, contact the relevant lecturer." },
  { q: "How do I apply for supplementary examinations?", a: "Supplementary examinations are automatically granted in certain circumstances as per SU policy. If you believe you qualify, contact the faculty office. Medical certificates must be submitted within 72 hours of a missed exam." },
  { q: "Can I switch from BSc to BEng (or vice versa)?", a: "Programme transfers are possible but must be approved by both departments. Contact the undergraduate coordinator with your request. There may be additional prerequisite modules required." },
  { q: "How do I find a postgraduate supervisor?", a: "Browse the staff profiles on this website to find researchers working in your area of interest. Email potential supervisors with your CV and a brief research proposal. You can also contact the postgraduate coordinator for guidance." },
  { q: "Is there a peer tutoring programme?", a: "Yes. The department runs a Peer Academic Learning (PAL) programme for first- and second-year modules. Schedules are posted on SUNLearn and the CS notice board at the start of each semester." },
  { q: "How do I access the computer labs?", a: "Computer labs in the Mathematical Sciences building are accessible to registered CS students with a valid SU student card. Outside hours access may require prior arrangement with the department." },
  { q: "What GPU or HPC resources are available for research?", a: "The department has access to the Rhasatsha HPC cluster for research computation. Postgraduate students can request access through their supervisors. NCHPC resources are also available for eligible projects." },
];

const FAQS_AF = [
  { q: "Hoe registreer ek vir modules?", a: "Moduleregistrasie word gedoen via die SUNStudent-portaal tydens die registrasievenster elke semester. Sorg dat jou fooie op datum is voordat jy probeer registreer. Kontak die voorgraadse administrateur as jy probleme ondervind." },
  { q: "Waar vind ek lesingsnotas en opdragte?", a: "Alle kursusmateriaal word op SUNLearn (learn.sun.ac.za) geplaas. Meld aan met jou SU personeelnommer/studentenommer en wagwoord. As jy nie toegang tot 'n kursus kan kry nie, kontak die betrokke dosent." },
  { q: "Hoe doen ek aansoek vir aanvullende eksamens?", a: "Aanvullende eksamens word in sekere omstandighede outomaties toegestaan ooreenkomstig SU-beleid. As jy glo jy kwalifiseer, kontak die fakulteitskantoor. Mediese sertifikate moet binne 72 uur na 'n gemiste eksamen ingedien word." },
  { q: "Kan ek van BSc na BIng oorskakel (of andersom)?", a: "Programoorplasings is moontlik maar moet deur albei departemente goedgekeur word. Kontak die voorgraadse koördineerder met jou versoek. Addisionele voorvereiste modules mag nodig wees." },
  { q: "Hoe vind ek 'n nagraadse toesighouer?", a: "Blaai deur die personeelprofiele op hierdie webwerf om navorsers te vind wat in jou belangstellingsveld werk. Stuur jou CV en 'n kort navorsingvoorstel aan moontlike toesighouers. Jy kan ook die nagraadse koördineerder vir leiding kontak." },
  { q: "Is daar 'n ewekniehulpprogram?", a: "Ja. Die departement bied 'n Eweknie Akademiese Leer (PAL)-program vir eerste- en tweedejaarmodules aan. Skedules word op SUNLearn en die RW-kennisgewingbord aan die begin van elke semester geplaas." },
  { q: "Hoe kry ek toegang tot die rekenaarlaboratoriums?", a: "Rekenaarlaboratoriums in die Wiskundige Wetenskappe-gebou is toeganklik vir geregistreerde RW-studente met 'n geldige SU-studentekaart. Buitenure-toegang mag vooraf reëling met die departement vereis." },
  { q: "Watter GPU- of HPC-hulpbronne is beskikbaar vir navorsing?", a: "Die departement het toegang tot die Rhasatsha HPC-kluster vir navorsingsberekening. Nagraadse studente kan toegang versoek via hul toesighouers. NCHPC-hulpbronne is ook beskikbaar vir kwalifiserende projekte." },
];

export function StudentsContent() {
  const { lang } = useLanguage();
  const t = translations[lang].students;
  const faqs = lang === "en" ? FAQS_EN : FAQS_AF;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Quick links */}
        <section>
          <SectionHeader eyebrow={t.linksEyebrow} title={t.linksTitle} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USEFUL_LINKS.map((link, i) => (
              <MotionWrapper key={link.href} delay={i * 0.06}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                  <GlassCard className="group h-full">
                    <div className="p-5 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-maroon/20 border border-brand-maroon/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Link2 size={14} className="text-brand-maroon-light" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-ink text-sm group-hover:text-brand-maroon transition-colors flex items-center gap-1.5">
                          {lang === "en" ? link.label : link.labelAf}
                          <ExternalLink size={11} className="text-brand-muted/60" />
                        </p>
                        <p className="text-brand-muted text-xs mt-0.5 leading-relaxed">
                          {lang === "en" ? link.description : link.descriptionAf}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </a>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Forms */}
        <section>
          <SectionHeader eyebrow={t.formsEyebrow} title={t.formsTitle} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORMS.map((form, i) => (
              <MotionWrapper key={form.label} delay={i * 0.06}>
                <GlassCard className="group">
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText size={14} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-ink text-sm group-hover:text-brand-maroon transition-colors">
                        {lang === "en" ? form.label : form.labelAf}
                      </p>
                      <p className="text-brand-muted text-xs mt-0.5">
                        {lang === "en" ? form.description : form.descriptionAf}
                      </p>
                    </div>
                    <span className="ml-auto text-brand-muted/40 text-xs shrink-0">PDF</span>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
          <MotionWrapper delay={0.3}>
            <p className="text-brand-muted/60 text-sm text-center mt-4">
              {t.formsContact}{" "}
              <a href="mailto:cs@sun.ac.za" className="text-brand-gold hover:underline">
                cs@sun.ac.za
              </a>
            </p>
          </MotionWrapper>
        </section>

        {/* FAQs */}
        <section>
          <SectionHeader eyebrow={t.faqsEyebrow} title={t.faqsTitle} className="mb-10" />
          <MotionWrapper>
            <GlassCard>
              <div className="p-2">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-b border-black/6 last:border-0"
                    >
                      <AccordionTrigger className="px-4 py-4 text-left text-brand-ink/70 hover:text-brand-ink hover:no-underline font-medium text-sm">
                        <span className="flex items-start gap-3">
                          <HelpCircle size={15} className="text-brand-gold mt-0.5 shrink-0" />
                          {faq.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pl-10 text-brand-muted text-sm leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </GlassCard>
          </MotionWrapper>
        </section>
      </div>
    </>
  );
}
