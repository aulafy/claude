import sys
sys.path.insert(0, "src")
from rag.ingest import load_corpus
from rag.chunking import chunk_corpus
docs = load_corpus("corpus")
print(f"{len(docs)} documentos:", ", ".join(f"{d.id}({d.meta['acceso']})" for d in docs))
for s in ("fixed", "paragraph", "heading"):
    ch = chunk_corpus(docs, s)
    print(f"{s:10s} {len(ch):3d} trozos · longitud media {sum(len(c.text) for c in ch)//len(ch)} caracteres")
