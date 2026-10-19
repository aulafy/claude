"""Registra y audita una pasada completa. Uso: RAG_MODEL=llama3.2:3b python3 run_trace.py"""
import sys, os, json
sys.path.insert(0, "src")
from rag.pipeline import Rag
from rag.evals import load_qa
from rag.answer import MODEL
from rag.trace import record, audit
LOG = "eval/trazas.jsonl"
open(LOG, "w").close()
rag, entries = Rag(), []
for case in load_qa():
    role = case.get("rol", "visitante")
    res = rag.ask(case["q"], role)
    entries.append(record(LOG, case["q"], role, res, rag.last_meta, MODEL))
print(f"modelo={MODEL}")
print(json.dumps(audit(entries), ensure_ascii=False, indent=1))
