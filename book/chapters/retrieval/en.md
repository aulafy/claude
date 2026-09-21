## Before you start

An application with retrieval finds passages before requesting an answer. This can add context, but it does not automatically turn a passage into proof. In this practice you will use three fictional notes.

## 1. Prepare a small corpus

Save these notes with an identifier:

```text
note-a: The workshop starts on Thursday at six in room 1.
note-b: The session lasts thirty minutes and people may bring one book.
note-c: The note does not state a price or registration method.
```

Keep the original question too. A system cannot explain a citation if you do not know which document it came from.

## 2. Retrieve before generating

For “when and where is the workshop?”, retrieval should select `note-a`. For “is there a fee?”, it should select `note-c`, even though the correct answer is that the price is not stated.

Record the query, selected passages, score or selection reason and index version. A word match is not the same as understanding. Check manually whether the passage answers the complete question.

## 3. Generate with citations and boundaries

Use an instruction like this:

```text
Answer only with the retrieved passages.
Include the identifier of every passage used.
If evidence is insufficient, answer “pending confirmation”.
Do not fill gaps with general knowledge.
```

A useful answer separates the answer, citations and uncertainties. If a passage describes duration but the question asks about price, do not fill in the price. If two notes disagree, show the conflict and stop automatic conclusion.

## 4. Test a wrong retrieval

Force a query that returns only `note-b` and ask about the location. The system should recognize that the context is insufficient. Do not improve the result artificially by adding the correct note after seeing the answer.

When splitting notes into passages, keep the document identifier and a position reference. Context without provenance makes it harder to fix an error and show what the model received.

## Your result

You are done when you can show the question, retrieved passages, answer, citations and decision when evidence is missing. RAG helps organize context; it does not replace sources, contracts, evaluation or human review.

In the next chapter you will study agents and decide which actions they may propose and which must remain outside their autonomy.
