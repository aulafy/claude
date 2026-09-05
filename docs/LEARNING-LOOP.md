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

The service is intentionally in-memory in M0.7. It does not pretend to be user persistence and does not calculate mastery. The next persistence adapter must map these events to `aulafy_user_lesson_progress` and `aulafy_evidence` with server-side authorization and RLS.

```bash
npm run test:learning-loop
```
