"""Vectores densos locales por n-gramas de caracteres (hashing). No son embeddings neuronales:
capturan parecido de forma/ortografía («descuento» ≈ «descuentos»). Para embeddings neuronales se
cambia `embed` por una llamada a Ollama (/api/embed) con un modelo de embeddings; el resto del pipeline no cambia."""
from __future__ import annotations
import hashlib, math
from .chunking import Chunk
from .text import norm

DIM = 512


def embed(text: str, n: int = 3) -> list[float]:
    t = " " + " ".join(norm(text).split()) + " "
    v = [0.0] * DIM
    for i in range(len(t) - n + 1):
        h = int.from_bytes(hashlib.blake2b(t[i:i + n].encode(), digest_size=4).digest(), "big")
        v[h % DIM] += 1.0 if (h >> 31) & 1 else -1.0
    norm_ = math.sqrt(sum(x * x for x in v)) or 1.0
    return [x / norm_ for x in v]


def cosine(a: list[float], b: list[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


class VectorIndex:
    def __init__(self, chunks: list[Chunk]):
        self.chunks = chunks
        self.vecs = [embed(c.text) for c in chunks]

    def search(self, query: str, k: int = 4) -> list[tuple[Chunk, float]]:
        q = embed(query)
        scored = sorted(((c, cosine(q, v)) for c, v in zip(self.chunks, self.vecs)), key=lambda x: -x[1])
        return scored[:k]


def ollama_embed(texts: list[str], model: str = "nomic-embed-text") -> list[list[float]]:
    """Embeddings neuronales vía Ollama /api/embed (requiere: ollama pull nomic-embed-text)."""
    import json, os, urllib.request
    url = os.environ.get("OLLAMA_URL", "http://127.0.0.1:11434") + "/api/embed"
    req = urllib.request.Request(url, json.dumps({"model": model, "input": texts}).encode(), {"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        vecs = json.loads(r.read())["embeddings"]
    return [[x / (math.sqrt(sum(y * y for y in v)) or 1.0) for x in v] for v in vecs]


class NeuralIndex(VectorIndex):
    """Misma interfaz que VectorIndex; nomic-embed-text pide prefijos distintos para documento y consulta."""
    def __init__(self, chunks: list[Chunk]):
        self.chunks = chunks
        self.vecs = ollama_embed(["search_document: " + c.text for c in chunks])

    def search(self, query: str, k: int = 4) -> list[tuple[Chunk, float]]:
        q = ollama_embed(["search_query: " + query])[0]
        return sorted(((c, cosine(q, v)) for c, v in zip(self.chunks, self.vecs)), key=lambda x: -x[1])[:k]
