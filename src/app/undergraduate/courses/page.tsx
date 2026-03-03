import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CourseCard } from "@/components/courses/CourseCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { getAllCourses } from "@/lib/drupal/courses";
import type { Course } from "@/types/course";

export const metadata: Metadata = {
  title: "Course Catalogue",
  description: "Full course catalogue for undergraduate and postgraduate computer science programmes at Stellenbosch University.",
};

export default async function CourseCataloguePage() {
  const allCourses = await getAllCourses();
  const undergrad = allCourses.filter((c) => c.level === "undergraduate");
  const postgrad = allCourses.filter((c) => c.level === "postgraduate");

  const byYear = (courses: Course[]) =>
    [1, 2, 3].reduce<Record<number, Course[]>>((acc, y) => {
      acc[y] = courses.filter((c) => c.yearLevel === y);
      return acc;
    }, {});

  const undergradByYear = byYear(undergrad);

  return (
    <>
      <PageHero
        eyebrow="Academic"
        title="Course Catalogue"
        subtitle={`${allCourses.length} modules across undergraduate and postgraduate programmes. Browse by year to plan your degree.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Undergraduate */}
        <section>
          <SectionHeader eyebrow="Undergraduate" title="BSc / BEng Modules" className="mb-10" />
          {([1, 2, 3] as const).map((year) => (
            undergradByYear[year]?.length > 0 && (
              <div key={year} className="mb-12">
                <MotionWrapper>
                  <h3 className="font-display font-bold text-xl text-brand-gold mb-6 flex items-center gap-3">
                    Year {year}
                    <span className="text-sm font-normal text-brand-muted/60 font-sans">
                      ({undergradByYear[year].length} modules)
                    </span>
                  </h3>
                </MotionWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {undergradByYear[year].map((course, i) => (
                    <MotionWrapper key={course.id} delay={i * 0.06}>
                      <CourseCard course={course} />
                    </MotionWrapper>
                  ))}
                </div>
              </div>
            )
          ))}
        </section>

        {/* Postgraduate */}
        {postgrad.length > 0 && (
          <section>
            <SectionHeader eyebrow="Postgraduate" title="Honours & Masters Modules" className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {postgrad.map((course, i) => (
                <MotionWrapper key={course.id} delay={i * 0.06}>
                  <CourseCard course={course} />
                </MotionWrapper>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
