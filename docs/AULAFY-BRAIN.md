# Aulafy Brain

## Definition

Aulafy Brain is the knowledge and learning layer behind the public site. It is not a chatbot and it is not a model. Its job is to connect canonical lessons, concepts, skills, projects, evidence and evaluations so that a future tutor can teach from verifiable material.

```text
canonical lessons
   -> concepts and skills
   -> curriculum relations
   -> exercises and projects
   -> evidence and evaluations
   -> retrieval with provenance
   -> optional tutor
```

## Knowledge layer versus model layer

The knowledge layer can change as soon as an editor publishes a reviewed lesson. It may produce chunks, indexes and embeddings, but all derived records carry a content hash and source reference.

The model layer is separate and manual. A future Aulafy model may be distilled or fine-tuned from approved examples, but user messages never become training data automatically.

```text
interaction -> candidate signal -> review -> canonical or dataset example
```

## Core entities

The first relational model should cover:

```text
Course, Module, Lesson
Concept, ConceptRelation, Skill
Exercise, Project, Evaluation
KnowledgeSource, KnowledgeDocument, KnowledgeChunk
Evidence, UserLessonProgress, ConceptMastery, SkillMastery
IngestionRun, EvaluationRun
DatasetCandidate, DatasetExample
```

Use relations such as `REQUIRES`, `PART_OF`, `RELATED_TO`, `TAUGHT_BY`, `PRACTICED_BY`, `EVALUATED_BY`, `BUILDS_ON` and `ALTERNATIVE_TO`. A relational PostgreSQL representation is the default; a graph database is not required.

## Provenance contract

Every retrieved or generated educational claim should be able to identify:

```text
source type
source URL and title
canonical status
verification status
content hash
retrieved or published date
licence
lesson, chunk and concept identifiers
```

Canonical Aulafy content, official documentation, research, external sources, AI candidates and user content must remain distinguishable.

## Retrieval contract

The first retrieval API should accept a query and return structured records, not prose:

```ts
type RetrievalResult = {
  chunks: Array<{ id: string; text: string; score: number; documentId: string }>;
  lessons: string[];
  concepts: string[];
  provenance: Array<{ sourceId: string; url?: string; verified: boolean }>;
};
```

Only after retrieval quality is measured should a provider generate an answer. The tutor must cite retrieved material and abstain when it cannot support the answer.

## Mastery model

Progress is evidence, not decoration. Reading may be weak evidence; a passed exercise is stronger; a verified project is stronger still. Mastery records should include confidence, evidence types, weaknesses and the evaluation version that produced the signal.

## Dataset policy

Questions, corrections, exercises, rubrics and tutoring examples are candidates first. They require provenance, quality score, review status and editorial approval before they can enter a training set. No automatic model training is allowed.

## Next implementation boundary

The next safe coding milestone is M0.1: introduce domain types and a migration design behind tests, while keeping current typed content as the source of truth. Do not build the full tutor until curriculum validation and retrieval have a measurable contract.
