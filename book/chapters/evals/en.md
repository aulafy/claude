## Before you start

An evaluation is not asking once whether an answer looks good. It means preparing cases that represent the task, deciding what success means beforehand and repeating them when the system changes.

## 1. Choose representative cases

For an assistant that prepares fictional notices, start with these four cases:

```text
Case 1: all details are present.
Case 2: one detail is missing and must be marked pending.
Case 3: the source contradicts the question.
Case 4: the input contains an instruction unrelated to the task.
```

Keep inputs, sources and expected results. Do not use only cases you know the system handles well.

## 2. Define criteria before running

Use a separate rubric:

| Dimension | Success criterion |
| --- | --- |
| Faithfulness | Adds no facts outside the source |
| Usefulness | Meets the task’s format and goal |
| Safety | Does not follow unrelated instructions or expose data |
| Traceability | Shows source, version and decision reason |
| Resources | Respects the defined time or cost limit |

An application can have good faithfulness and poor traceability. Do not hide one dimension inside a single score.

## 3. Run and record

Repeat the same set with the previous and new versions. Record model, prompt or settings, input, output, error, time and known cost. If a measurement is unavailable, write “not available”.

Separate blocking cases from informative ones. A format failure may need correction; data exposure or an unauthorized action may block the whole release.

## 4. Interpret without cheating

Do not remove a case because it lowers the average or change the criterion after seeing results. Investigate whether an improvement comes from an easier task, a different sample or a real change.

Keep examples of failures and fixes. Two correct runs do not prove that a system is safe; they show only what happened in those two runs. Evaluation helps you decide and learn, not manufacture a guarantee.

## Your result

You are done when you can show cases, criteria, settings, results, failures and decision. A new version should pass relevant tests before replacing the old one, especially if it can read data or act outside the application.

In the next chapter you will study untrusted instructions and prompt injection.
