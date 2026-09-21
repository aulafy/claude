## Before you start

An agent combines a model, context, tools and repeated decisions. This can save work, but it can also expand a mistake. In this practice you will design a fictional agent that prepares a report and does not change data.

## 1. Separate proposal and action

The task is to find possible duplicate records in a fictional list:

```text
Input: test record list.
Proposal: group similar candidates and explain why.
Review: a person confirms each group.
Action: none; nothing is deleted or changed.
```

The agent may return candidates and reasons. It may not decide that two records represent the same person or perform a deletion.

## 2. Define permissions and limits

Set limits before connecting a tool:

| Control | Practice rule |
| --- | --- |
| Data permission | Read-only access to the fictional list |
| Tools | Search and report generation |
| Budget | Maximum number of steps set before starting |
| External action | Disabled |
| Stop | Error, ambiguous detail or limit reached |

An agent with many tools is not automatically more capable. Each permission needs a reason and a test. If you cannot observe which tool it used, reduce its scope.

## 3. Test ambiguous cases

Include three fictional cases: two clearly equal records, two similar but different records and an incomplete entry. The expected result differs: suggest a group, request review or stop because information is missing.

Record the input, tools called, steps, output and stop reason. A step limit prevents a loop from consuming resources, but it does not prove that the result is correct.

## 4. Approve one action

If the application could later merge records, start with one reversible action and one approval per group. The person must see the originals, proposal reason and exact change. Never use “the agent already checked it” as a substitute for review.

If a connection fails, keep the state pending and do not automatically repeat a write. A well-designed agent may abstain; abstention is a valid output.

## Your result

You are done when you can point to context, tools, permissions, limits, stop criteria, record and approval. Autonomy is granted per concrete action, not because a model is exciting.

In the next block you will evaluate AI applications with test cases, metrics and known failures.
