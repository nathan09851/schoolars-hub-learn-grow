---
name: schoolars-hub-site
description: Maintain and evolve the Schoolars Hub website. Use this skill whenever the user asks to redesign, refine, expand, secure, or brand any part of the Schoolars Hub site, especially the homepage, inquiry flow, navigation, footer, tuition messaging, or Goa coaching-centre identity. Also use it when future work should stay aligned with the existing logo, parent-focused messaging, and the secure Supabase inquiry path.
---

# Schoolars Hub Site

Use this skill to keep future work on the Schoolars Hub website visually consistent, parent-friendly, and operationally realistic.

## What this site is

Schoolars Hub is a Goa tuition and coaching-centre website aimed primarily at parents making decisions and secondarily at students evaluating trust, clarity, and accessibility.

The site should feel:

- warm, credible, and educational
- polished without looking corporate
- locally grounded rather than generic startup UI
- reassuring for parents who need clarity fast

## Visual direction

The brand direction is now a blend of:

- editorial serif headlines
- warm paper-like backgrounds
- amber as the core energy color
- deep slate surfaces for contrast and seriousness
- branded use of the coaching-centre logo as a real identity anchor

Avoid:

- generic SaaS dashboards
- purple gradients
- sterile white-box layouts with no atmosphere
- overly playful student-app aesthetics that reduce parent trust

## Brand rules

- Preserve the logo as a first-class brand asset.
- Prefer the visible display name `Scholar's Hub` when presenting the logo lockup.
- Keep the repo/domain-safe config name `Schoolars Hub` where a plain system identifier is already in use unless there is a clear reason to migrate it fully.
- Pair the brand with `Coaching Centre` or a Goa-focused supporting line when helpful.

## UX rules

- Optimize for parent decision-making before aesthetic novelty.
- Make fees, timings, subjects, and inquiry next steps easy to scan.
- Keep mobile layouts especially strong. Hero CTAs must never overflow or feel cramped.
- Use trust signals early: reviews, years active, subject clarity, locations, and operational transparency.
- Prefer one clear next action per section.

## Content rules

- Use plain, credible language.
- Favor clarity over hype.
- Avoid making unverifiable claims about student counts, outcomes, or rankings.
- Keep subject descriptions concrete and readable.
- Write FAQs to reduce friction, not just fill page space.

## Security and backend rules

- Do not turn the inquiry flow back into a dummy form.
- Keep client-side validation and server-side validation aligned.
- Preserve the Supabase edge-function model for public inquiry writes unless the backend architecture is explicitly changed.
- Avoid exposing direct public inserts on inquiry tables.
- Keep RLS and basic abuse controls in mind whenever new data capture features are added.

## Repo workflow rules

- Verify with `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` after meaningful site changes.
- If branding assets change, visually verify desktop and mobile renders.
- When touching navigation, footer, or hero sections, check that the logo treatment stays consistent.

## Files to inspect first

- `src/content/site.ts`
- `src/pages/Index.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/BrandMark.tsx`
- `src/components/InquiryForm.tsx`
- `src/integrations/supabase/client.ts`
- `supabase/functions/submit-inquiry/index.ts`

## Output expectations

When using this skill:

1. Preserve the brand system and logo treatment.
2. Improve both trust and usability, not just styling.
3. Keep the secure inquiry flow intact or stronger.
4. End by verifying the site, not just editing it.
