## Before you start

You will compare two versions of the same workflow. The result will not be “the cheapest model”, but a decision you can explain: what quality you need, what each completed task costs and how long it takes.

Use fictional data. Do not paste keys, private conversations or real invoices into an exercise.

## 1. Define the unit that matters

Model pricing is usually advertised per token, audio second or image. The unit that matters to a user is the **completed task**.

A task may include several attempts, a search, a tool call, human review and a retry. If you only look at the first answer, you underestimate the cost.

Write this before testing:

- task: classify 10 fictional messages;
- minimum quality: at least 8 correct classifications;
- maximum time: 10 seconds per message;
- maximum cost: €0.02 per message;
- review: a person checks uncertain cases.

## 2. Build a small test set

Prepare ten representative cases. Include easy and ambiguous cases, plus one that should be rejected. Save an expected answer and a short reason. The set does not need to be large to start, but it must stay the same when you compare models.

Do not change cases after seeing which model wins. If you fix a case, create a new test-set revision and repeat the comparison.

## 3. Measure three dimensions

Record for each run:

| Case | Correct | Time | Cost | Needs review |
| --- | --- | ---: | ---: | --- |
| 01 | Yes | 1.8 s | €0.004 | No |
| 02 | No | 2.1 s | €0.004 | Yes |

Calculate at least:

- **quality**: correct cases / total cases;
- **latency**: time per task and, if possible, the 95th percentile;
- **real cost**: calls, tokens, tools and reviews divided by completed tasks.

For a local model, direct monetary cost may be close to zero, but record electricity, shared hardware and waiting time as operating costs. “Free” does not mean unlimited.

## 4. Decide with a visible rule

A simple rule could be: “Reject any version below 80% quality or above 10 seconds; among the rest choose the lowest-cost version”. Another task may prioritize speed or require human review for every case.

Write the rule before looking at the final result. This helps you avoid turning a preference into a supposed measurement.

## 5. Recognize a misleading result

A model may look cheap because it returns short texts, while failing more often and forcing retries or reviews. It may also look fast if you only measure the first token rather than when a usable answer is complete.

Check what each measurement includes. Separate queue time, generation time, external calls and review. If a number cannot be reproduced, mark it as incomplete.

## Your result

You have turned a model comparison into an operational decision. Keep the test set, date, configuration and results. When the model or price changes, repeat the test and compare revisions, not memories.
