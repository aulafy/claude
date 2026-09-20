## Before you start

You will design a small project with fictional data. It does not need to be a commercial application or use a real API. It must be explainable, testable, stoppable and recoverable.

Choose a bounded task: classify messages, extract fields from invented documents or answer questions about a set of public notes.

## 1. Write the contract

Define the input, output, user, boundary and success criterion. Include acceptable examples and one case the system must reject. Specify which decisions always stay with a person.

If you cannot describe the workflow without naming a particular model, the contract still depends too much on a tool.

## 2. Prepare the test

Create 10 to 20 fictional cases: normal, ambiguous, incomplete and out-of-scope. Save an expected answer or evaluation criterion. Run a reference version and keep its settings.

Measure quality, latency and cost per task. Do not hide failures or change cases to improve a score.

## 3. Add boundaries and recovery

Separate reading, transformation and writing. Use least-privilege access. Design approval before any consequential action and a stop condition for answers without sources, errors or unexpected data.

Document how you would restore the copy or return to the previous version. If you have never tested recovery, mark it as pending.

## 4. Record what is needed

Record version, date, opaque case, evaluation result, latency, estimated cost and review reason. Avoid storing complete prompts or documents when a fingerprint, label or technical summary is enough.

Include a fictional run record:

```text
project=classifier-demo version=1.0 case=case-04
result=human_review latency=3.1s cost=0.006
stop=answer_without_source recovery=pending
```

## 5. Present and challenge it

Deliver the contract, sample, before-and-after results, cost decisions, risks, minimum record and recovery plan. Explain what you did not measure and what you would need to verify before using real data.

Ask another person to challenge the main assumption. If they find an uncovered case, add it to a new revision and run the test again.

## Your result

You have built a proposal that can be reviewed, not just a demo. The final project joins judgment, data, generation, evaluation, security, cost and operations. Its value is making decisions visible and knowing when not to continue.
