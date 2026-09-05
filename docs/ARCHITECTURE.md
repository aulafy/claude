# Aulafy Architecture

## Purpose

Aulafy is an open, public-first learning platform for practical AI. The current website remains the public delivery layer while the product evolves toward a learning engine built around:

```text
LEARN -> BUILD -> VERIFY -> PUBLISH -> PROGRESS
```

This document describes the incremental architecture. It deliberately does not authorize a greenfield rewrite: existing course URLs, editorial content, the bilingual legacy wiki and the maintenance page are preserved.

## Current layers

```text
Next.js routes and components
        |
Course and blog content in lib/
        |
SEO, navigation, learning progress and verification scripts
        |
Optional server integrations (kept behind interfaces)
```

Canonical instructional content stays versioned in Git and rendered by the website. Derived indexes, retrieval data, progress and future AI runs must never become the only copy of a lesson.

## Target layers

```text
Public web and lesson UI
        |
Domain services: curriculum, mastery, retrieval, tutor, evals
        |
Canonical content and curriculum graph
        |
Derived database indexes, embeddings and observability
```

The UI calls domain services. AI provider details do not belong in React components.

## M0 decisions

- Keep Next.js, TypeScript and the existing public routes.
- Treat Markdown/MDX or the current typed content registry as canonical until a validated content migration exists.
- Add a provider interface before adding a tutor; support cloud, OpenAI-compatible and local endpoints behind it.
- Use PostgreSQL/Supabase only when persistence is required. Do not add Neo4j for the curriculum graph without a measured need.
- Keep public reading available without an account. Accounts, when introduced, are for progress, evidence and personalization.
- Do not train a model from user interactions. Candidate data requires provenance, review and explicit editorial approval.
- Make unsupported features visibly unavailable instead of simulating them.

## Milestones

1. **M0 Foundation:** architecture, strict types, checks, content contract and provider boundaries.
2. **M0.1 Domain model:** implemented in `supabase/migrations/20260905120000_aulafy_m01_domain_foundation.sql`; courses, lessons, concepts, skills, projects, evidence and ingestion/evaluation runs with constraints and RLS.
3. **M0.2 Content engine:** frontmatter schema, parsing, hashes, validation and change detection.
4. **M0.3 Curriculum graph:** prerequisite validation and lesson/concept/skill relations.
5. **M0.4 Brain ingestion:** canonical documents, chunks, provenance and idempotent indexing.
6. **M0.5 Retrieval:** structured results with chunks, lessons, concepts, scores and provenance.
7. **M0.6 Tutor:** retrieval-first answers with citations and abstention.
8. **M0.7 Learning loop:** one complete Local AI vertical slice with evidence and progress.
9. **M0.8 Evidence review:** role-gated moderation queue, private learner status and an RLS policy for the `submitted` to `verified` transition.

## Non-goals for M0

- No model training or fine-tuning.
- No autonomous agent with write access to user projects.
- No fake progress, embeddings, evals, users or tutor answers.
- No forced login, analytics or cookie-based tracking.
- No large database migration before the content and domain contracts are tested.

## Quality gates

Every milestone must leave the current site buildable and must pass, as applicable:

```bash
npm run lint
npm run build
npm run verify-content
npm run verify-seo
npm run verify-i18n
npm run test:legacy-wiki
```

New ingestion, curriculum and retrieval commands must be deterministic, idempotent and safe to run twice.
