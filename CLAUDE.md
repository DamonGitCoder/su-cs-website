# Project Context: Stellenbosch University CS Dept (Decoupled Drupal)
**Mission:** Build a Webby-award-winning, high-performance website for the Stellenbosch University Computer Science Department for the 2026 Hackathon.
**Key Objective:** Achieve maximum bonus points by successfully demonstrating a "Fully Decoupled" architecture where Drupal 10 serves as the headless CMS backend and Next.js serves as the reactive frontend.
## 1. The Tech Stack (Strict Adherence)
- **Framework:** Next.js 14+ (App Router explicitly).
- **Language:** TypeScript (Strict mode enabled, no `any`).
- **Styling:** Tailwind CSS with uniform color variables.
- **UI Components:** Shadcn/ui (for base structure) combined with custom components.
- **Animation:** Framer Motion (for page transitions, scroll reveals, and kinetic typography).
- **Icons:** Lucide React.
- **Backend/API:** Drupal 10 core JSON:API module.
- **Data Fetching:** Native fetch with Next.js caching tags (`next: { tags: [...] }`).
## 2. Architectural Rules & Data Flow
### The "Drupal First" Rule
We do not hardcode content. All dynamic content (Staff, Courses, News, Publications) MUST originate from Drupal via the JSON:API.
### API Interaction Patterns
When asked to fetch data, follow this pattern:
1.  **Define the Interface:** Create a TypeScript interface that mirrors the expected flattened Drupal response (e.g., `StaffMember`, `CourseModule`).
2.  **Construct Efficient Queries:** Use JSON:API `include` parameters to fetch relationships (like images) in a single call. Use `fields[...]` parameters to only fetch necessary data and reduce payload size.
3.  **Typed Fetching:** Ensure fetch functions return typed data, handling potential Drupal errors gracefully.
*Example API Endpoint Structure:*
`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/staff?include=field_image&fields[node--staff]=title,field_position,field_bio,field_image`
## 3. The Design System: "Academic Futurism"
We are aiming for a high-end, futuristic aesthetic that respects the institution's gravity.
### Color Palette (Tailwind Config)
- **Primary (Maroon):** `#971B3E` (Use for CTAs, active states, subtle glows).
- **Accent (Brilliant Gold):** `#C4A006` (Use sparingly for highlights and borders).
- **Background:** Deep Charcoal `#121212` to soft Black `#0a0a0a`.
- **Text:** Off-white `#ededed` for readability, pure white for headers.
### Visual Dynamics
- **Glassmorphism:** Use highly diffuse, translucent backgrounds with subtle borders for cards and navigation panes (`backdrop-blur-md bg-white/5 border-white/10`).
- **Kinetic Typography:** Large headers should have subtle entrance animations. Important keywords should highlight on hover.
- **Micro-interactions:** Every interactive element must provide feedback. Buttons should subtly scale down on click; cards should lift on hover using Framer Motion.
## 4. Coding Standards & Accessibility
- **Server Components by Default:** Keep components as Server Components (RSC) unless they require interactivity (state, hooks, event listeners), then add `"use client"`.
- **Accessibility (a11y):** All interactive elements must have proper `aria` labels. Semantic HTML is mandatory. Color contrast must pass WCAG AA standards.
- **Performance:** Prioritize Next.js `Image` component for all media assets. Implement staggering for list animations to avoid layout thrashing.
