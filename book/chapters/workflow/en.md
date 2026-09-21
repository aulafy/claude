## Before you start

Automation is not just connecting an AI to another tool. It means deciding what comes in, what changes, what can fail and who can stop it. In this practice you will design a fictional workflow that prepares replies but never sends them by itself.

## 1. Break down the task

The task is to answer questions about a workshop schedule. Write it as a sequence:

```text
Input: received question and official workshop sheet.
Preparation: extract the question and relevant facts.
Draft: write a reply using only the sheet.
Check: flag missing or contradictory details.
Output: save a draft for a person to review.
External action: none during this practice.
```

Separating the steps makes the boundary visible. “Answer questions” had hidden both drafting and possible sending.

## 2. Define states and stops

Use simple states: `received`, `drafted`, `needs-review`, `approved` and `rejected`. An input must not jump from `received` to `approved` because the text sounds convincing.

The main stop is between `drafted` and any external action. If facts are missing, move to `needs-review`. If a detail contradicts the sheet, keep the question and sheet so the responsible person can decide. Do not delete the original to make the workflow look clean.

## 3. Test with small cases

Prepare three fictional questions:

| Case | Expected result |
| --- | --- |
| Question about known time and room | Draft with those details |
| Question about a missing price | Mark the detail as pending |
| Question that contradicts the sheet | Stop the workflow and request review |

Run each case without connecting email, messaging or real accounts. Check that the draft keeps its source, does not invent an answer and stops when required.

## 4. Calculate failure before scaling

For each step, note what happens if it fails: keep the input, record the error and allow a retry without duplicating an action. A drafting retry may create another draft; a sending retry could send the same message twice. These are different risks.

Start with manual review and a reversible action. Only after measuring errors and defining permissions should you consider a real integration. Speed does not compensate for automation you cannot stop or recover.

## Your result

You are done when you have a diagram or list with input, steps, states, output, responsible person and stop. Useful automation does not remove judgment: it puts judgment at a clear point in the workflow.

In the next chapter you will study connectors and data. You will decide what permission each step needs and what permission must not be granted.
