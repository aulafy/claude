## Before you start

You will prepare a minimum record for investigating a change in an AI workflow. You do not need a monitoring platform or every message. You need to answer: what changed, when, with which settings and which result got worse.

Use fictional cases and avoid recording personal data or secrets.

## 1. Define the reference

Keep a small sample of approved cases, their expected result and the review date. This sample is a reference, not an endless collection of conversations.

Also record the minimum threshold: for example, at least 8 out of 10 correct cases and no case that exposes private data. Without a threshold, “it got worse” is only an impression.

## 2. Record small signals

For each task, keep an opaque identifier, date and time, workflow version, model or adapter, latency, estimated cost, evaluation result and review reason. Do not store the full prompt if it is unnecessary; a fingerprint or classification may be enough to investigate.

A fictional record could be:

```text
task=case-07 version=2026-09-12 model=reference
latency=4.2s cost=0.011 quality=fail review=yes
reason=answer_without_source
```

The record does not prove why the failure happened. It only preserves clues for comparison.

## 3. Compare before and after

When you change a model, prompt, tool or setting, run the same sample with the old and new versions. Compare quality, latency, cost, errors and reviews. Separate simultaneous changes: if you change five things, attribution becomes difficult.

An average improvement can hide a worse critical case. Read failures and review edge cases, not only the average.

## 4. Design a stop

Define what happens if quality drops below the threshold, errors rise or an answer has no source. You can stop the rollout, return to the previous version or send everything for human review.

The stop must be reversible and known before the incident. A dashboard full of numbers cannot replace an operational decision.

## 5. Spot the common failure

Keeping full text “just in case” can create a new privacy risk. Keeping only an average can hide who is harmed by a change. A green metric may also miss a failure that the test set never includes.

Minimize data, limit access, define retention and review the sample. If you need to open a case, use fictional or anonymized data and document why.

## Your result

You have created a small but actionable record: version, signals, reference, failed cases and the response to thresholds. It lets you investigate changes without confusing monitoring with certainty or turning every conversation into a permanent archive.
