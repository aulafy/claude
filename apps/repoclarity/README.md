# RepoClarity

RepoClarity is a local-first radar for AI builders, consultants and engineering teams who need to decide what to build, merge, archive or audit before adding more code.

It has two product angles:

- **AI prototype portfolio clarity:** index projects, map similarities, show a 3D graph and generate Decision Cards.
- **AI Transition Radar for SMEs:** evaluate data integrity, legacy databases, permissions, rollback, observability and safe AI playbooks before implementing LLM/API software in a business.

This public repository includes a sanitized demo dataset. It does not include private repo contents, local caches, indexed code databases or credentials.

## Run locally

```bash
npm install
npm start
```

Then open:

```text
http://127.0.0.1:4177/
```

## What is included

- Local Node static server.
- Dashboard with metrics, Focus Brief, Decision Cards and 3D graph.
- AI Transition Radar for SMEs/PYMEs.
- Exportable TXT/Markdown reports from the browser.
- Sanitized demo data under `public/data`.

## What is not included

- Private repositories.
- Codebase-memory cache databases.
- GitHub tokens.
- Local filesystem mirrors.
- Raw customer or business data.

The `/api/search` endpoint is designed to use a local `codebase-memory-mcp` backend when available. In this public demo it degrades gracefully if that backend is not present.

