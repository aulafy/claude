# Editorial dossier: write-edit

Status: drafted, bilingual, not approved.

Outcome: the learner turns a fictional source into a draft that distinguishes facts, omissions and suggestions.

Regression case: the ES and EN exercise blocks include the supplied fictional book-club text so the reader-facing code-panel contrast is tested with realistic content.

Checks run after integration:

```text
npm run book:validate
npm run test:living-book
git diff --check
PLAYWRIGHT_MODULE=/ruta/node_modules/playwright/index.mjs node scripts/test-living-book-browser.mjs
```

Open review: verify that examples remain clearly fictional and that no missing event details are presented as facts.
