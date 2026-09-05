# Aulafy Learning Loop

M0.7 certifies one complete Local AI path:

```text
LEARN
  llm-basics
  ollama-first-model
  ollama-context-window
        |
BUILD
  run-local-llm
        |
VERIFY
  submitted evidence -> verified evidence
        |
PROGRESS
  facts-derived percentage
```

`lib/brain/learning-loop.ts` derives the lesson order from the course's explicit lesson list and recursively includes prerequisites. A lesson cannot be completed until its prerequisites are complete. The project cannot receive evidence until every path lesson is complete. Submitted evidence is not verified evidence, and only verified project evidence completes the final step.

The loop service remains a deterministic in-memory domain service and does not calculate mastery. M0.7 also adds the server-side persistence boundary in `lib/brain/persistence.ts` and `app/brain/actions.ts`: authenticated users can save their own lesson progress and submit project evidence. The actions validate inputs, scope every query to the authenticated user and leave evidence as `submitted`; RLS remains the database boundary.

The current actions are intentionally not wired into the public maintenance page or a new UI. The legacy site remains unchanged while the vertical slice is audited.

Evidence review is a separate server action. It validates a UUID, requires the signed-in user to have the existing `moderator` or `admin` role, and is enforced again by the `aulafy_evidence_reviewer_update` RLS policy. Only evidence currently in `submitted` state can transition to `verified`.

```bash
npm run test:learning-loop
```
