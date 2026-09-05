# Aulafy Brain Ingestion

M0.4 defines the boundary between canonical editorial content and Brain-ready derived records.

```text
CanonicalContentDocument
        |
        v
KnowledgeDocument
        |
        v
KnowledgeChunk
        |
        v
future embedding and retrieval
```

`lib/brain/ingestion.ts` is deterministic and read-only. It creates a knowledge document for every canonical document, preserving the editorial ID, source path, URI, content hash, version, status and updated date. Bodies are split at Markdown heading boundaries; no semantic or AI chunking occurs yet. Each chunk receives a stable external ID, index, hash, concepts and source path.

## Idempotency

Documents are ordered by stable ID before processing. The snapshot input hash is derived from each ID and canonical content hash, so the same content produces the same snapshot regardless of filesystem traversal order. `diffIngestionSnapshots` identifies new, changed and removed documents by stable external ID and content hash.

## Command

```bash
npm run brain:ingest
npm run test:brain-ingestion
```

The command intentionally reports `Writes: 0`. M0.4 does not write `aulafy_knowledge_documents` or `aulafy_knowledge_chunks`, does not activate pgvector and does not call an AI provider. A later persistence adapter must be idempotent and retain the same provenance fields.
