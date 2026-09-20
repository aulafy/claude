## Before you start

When an application uses a model, it should not depend on an answer that “sounds right”. A contract defines what the model receives, what it must return and what happens when it cannot comply. In this practice you will use a fictional contract with no real calls.

## 1. Define the input

The application will receive a question about a fictional workshop. Specify required fields and limits:

```text
question: non-empty text, maximum 300 characters.
source: workshop facts, maximum 2,000 characters.
action: always "draft" during this test.
```

Do not include keys, real names or complete documents when you only need part of them. Validating input before calling a model reduces errors and makes the test repeatable.

## 2. Define the output

Write down what the interface should receive:

| Field | Rule |
| --- | --- |
| `draft` | Short text; may be empty when information is missing |
| `supportedFacts` | List of facts found in `source` |
| `pending` | List of details the source does not answer |
| `send` | Always `false` in this version |

A text that contains a correct answer but omits `pending` breaks the contract. The application must distinguish a complete output from a partial response.

## 3. Test valid and failed cases

Prepare a test table:

```text
Case A: valid question and source -> create draft.
Case B: missing source -> reject input.
Case C: a fact appears outside source -> mark it pending or reject.
Case D: output has no send field -> reject format.
```

For each case record input, result, error and recovery. Do not turn an error into an empty string that the interface might show as if everything worked.

## 4. Design a safe failure

If the model returns free-form text, incomplete JSON or an uncheckable answer, keep the input and mark the output `needs-review`. Do not send, delete or overwrite a previous correct version.

Contracts do not guarantee that a model is truthful. They only show whether the response has the shape needed for another check to continue. Evidence and review are still required.

## Your result

You are done when you can show the contract, test cases, expected error and safe output. Building with AI starts by deciding what must not fail silently.

In the next chapter you will use retrieval to provide context while keeping sources and permissions separate.
