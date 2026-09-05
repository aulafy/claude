# Aulafy Content Model

## Canonical source

M0.2 introduces `content/` as the canonical source for new editorial material. Git stores the files, reviews changes and preserves history. The existing typed catalog in `lib/` remains the legacy system during the transition; it is not silently migrated.

```text
content/**/*.mdx
        |
        v
Content Engine
        |
CanonicalContentDocument
        |
future M0.4 ingestion
```

M0.2 performs no database writes, AI calls, embeddings or retrieval.

## Directory and types

```text
content/
  courses/<course-id>/course.mdx
  courses/<course-id>/<lesson-folder>/lesson.mdx
  projects/<project-id>/project.mdx
```

The implemented types are `course`, `lesson` and `project`. A course declares an explicit `lessons` list so editorial order does not depend on filesystem or alphabetical order.

## Frontmatter

Every document has validated frontmatter containing `id`, `type`, `slug`, `title`, `description`, `status`, `concepts`, `skills`, `prerequisites` and `updated`. Lessons additionally declare `course`, and may declare `module`, `level` and `estimatedMinutes`. Course, lesson and project schemas are distinguished by their type and validated through the shared Zod boundary.

`id` is stable editorial identity. `slug` is a URL/display identifier and may change. They are intentionally separate. Status is one of `draft`, `published` or `archived`; only the registry's published query is suitable for public delivery.

Concept and skill references are checked against the initial versioned registry in `lib/curriculum/graph.ts`. M0.2/M0.3 keeps this registry deliberately small: `llm`, `token`, `context-window`, `ollama`, `local-inference`, `quantization`, plus the initial local-AI skills.

## Canonical document and hashing

`CanonicalContentDocument` includes validated metadata, the original body, normalized `sourcePath` and a SHA-256 `contentHash`. The hash input is:

```text
JSON.stringify(validated frontmatter)
+ "\\n"
+ original body
```

The editorial `updated` date comes from frontmatter, never filesystem mtime. `contentHash` and the later database `content_version` remain separate concerns.

## Commands

```bash
npm run content:validate
npm run test:content-engine
```

Structural errors fail validation. Missing concepts, skills, prerequisites, IDs, course references or schema fields are errors. A course without an explicit lesson list is currently a warning. No invalid fixture lives under real `content/`; invalid cases are created in tests.

## Registry and safety

`lib/content/` owns filesystem discovery, parsing, hashing, validation and registry queries. React components do not read files or parse frontmatter. Discovery is limited to `content/**` and `.mdx` files. The current parser supports the deliberately small YAML subset used by the fixtures; this is an intentional M0.2 boundary, not a general-purpose MDX evaluator.

The body is preserved as text. It is not executed by the Content Engine. A future renderer must use an explicit component allowlist if interactive MDX is introduced.

## Legacy coexistence and future ingestion

Legacy courses and their public URLs remain untouched. New canonical fixtures can be audited independently before migration. M0.4 may transform a canonical document into a `KnowledgeDocument`, then chunks and embeddings. That later derived representation must retain this document's ID, source path, hash and editorial date.
