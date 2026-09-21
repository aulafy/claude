## Before you start

You will design an AI pilot around a fictional legacy system. You will not connect to a real database or modify records. The first rule is that reading, transforming and writing are different operations.

Use a copy of fictional data and record who may perform each action.

## 1. Make an inventory

Describe the existing system, the data it contains, who uses it and what is unknown. Record formats, identifiers, required fields, duplicates and dependencies. If a data set has no clear owner, treat it as an open risk.

Do not start with the model. Start with the current workflow and the outcome a person needs.

## 2. Separate the zones

Design three zones: **read-only source**, **change draft** and **approved destination**. AI may propose a transformation in the draft, but it receives no implicit permission to write to the source.

A test account should have the minimum access. Do not use administrator credentials for experiments or put secrets in prompts, logs or example files.

## 3. Prepare reversibility

Before a migration, create a copy whose restoration you have tested. Record the date, schema, record count and a fingerprint or checksum. A copy that has never been restored is hope, not a recovery plan.

Also define a small batch, an approver and a stop condition: unexpected differences, lost identifiers, encoding errors or any change outside the scope.

## 4. Compare the draft

For every proposed change, show the old value, new value, reason, confidence and source. Do not hide rows the AI cannot transform. A person must be able to accept, reject or correct each batch.

Test first with fictional data and then with a non-critical sample. Compare counts, keys, types, relationships and business rules. Success is not “AI changed many rows”; it is a correct, explainable and recoverable result.

## 5. Spot the common failure

A migration may look correct while losing leading zeroes, dates, accents, identifiers or relationships. It may also duplicate an entity by confusing similar names.

Stop the batch, preserve the artifacts and restore the copy if a check fails. Do not continue to “see whether it fixes itself”. Investigate with an isolated sample and change one variable at a time.

## Your result

You have designed a staged migration: inventory, reading, draft, comparison, approval, limited writing and tested recovery. It is a framework for introducing AI to legacy systems without confusing automation with permission to alter data.
