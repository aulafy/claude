# Editorial dossier: images-audio

Status: drafted, bilingual, not approved.

Outcome: the learner records the brief, references, permissions, generation settings, review and accessibility alternative for a fictional media piece.

Safety scope: no real faces, voices, personal data or third-party assets are required. The chapter avoids provider-specific claims and treats licensing as a decision to document, not a guarantee supplied by a tool.

Checks to run after integration:

```text
npm run book:validate
npm run test:living-book
git diff --check
PLAYWRIGHT_MODULE=/ruta/node_modules/playwright/index.mjs node scripts/test-living-book-browser.mjs
```

Open review: confirm that examples remain fictional and that accessibility checks are understood as a review step, not as an automatic certification.
