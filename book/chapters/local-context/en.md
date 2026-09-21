## Before you start

Context is the text a model can consider in a request. Computer memory and disk storage are different resources. In this practice you will use a fictional document to check what local AI keeps.

## 1. Prepare a measurable reference

Create a fictional list with five numbered facts. Put a different marker at the beginning and end:

```text
TEST-START
1. The library opens at nine.
2. The blue room is on the first floor.
3. The workshop lasts thirty minutes.
4. People may bring one book.
5. The note does not state a price.
TEST-END
```

Do not use personal information. Keep the reference outside the conversation so you can check what was lost or added.

## 2. Change one variable

Ask the local model to return the five facts and identify which one is missing when you ask a related question. Start with the complete list. Then repeat with a longer list without changing the instruction or markers.

Record the model, version, input size, approximate time and context setting you actually use. A limit announced by an application may differ from the effective context in your environment; check the documentation and the test.

## 3. Detect loss and repetition

Compare the response with `TEST-START` and `TEST-END`. Check whether the end disappears, a section repeats or an invented fact appears. If it does, reduce the input and repeat. Do not conclude that a model “remembers” a document because it repeats a nearby sentence.

Splitting a document into parts can help, but it can also separate a claim from its context. Keep identifiers for every part and check what reaches the next step.

## 4. Measure the trade-off

A longer input may need more memory and take longer. Decide what your task needs: complete output, speed, lower use or a clear warning that context is missing. Do not hide an omission to improve a metric.

If the application runs out of resources, keep the record and stop the test. Do not delete the original or change several settings at once. A repeatable test is more useful than an isolated number.

## Your result

You are done when you can show the reference, settings, result, any detected loss and your decision. Context is not an abstract promise: it is a limit to check on the computer and task you will actually use.

In the next part you will build a small application with clear contracts before giving an agent autonomy.
