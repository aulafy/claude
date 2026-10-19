"""Evalúa la respuesta completa con un modelo local (Ollama). Uso: RAG_MODEL=llama3.2:3b python3 run_answer_eval.py"""
import sys, time, json, os
sys.path.insert(0, "src")
from rag.pipeline import Rag
from rag.evals import load_qa, answer_ok
from rag.answer import MODEL
rag, qa = Rag(), load_qa()
tot = {"correcta": 0, "cita_valida": 0, "cita_precisa": 0, "se_abstiene": 0}
fallos = []
t0 = time.time()
for case in qa:
    res = rag.ask(case["q"], case.get("rol", "visitante"))
    s = answer_ok(res, case)
    for k in tot: tot[k] += int(s[k])
    if not s["correcta"] or not s["cita_valida"]: fallos.append((case["tipo"], case["q"], res.get("respuesta", "")[:90], res.get("citas")))
n = len(qa)
print(f"modelo={MODEL} preguntas={n} tiempo={time.time()-t0:.0f}s")
print(f"correctas: {tot['correcta']}/{n} · cita incluye la fuente correcta: {tot['cita_valida']}/{n} · cita precisa (solo la fuente correcta): {tot['cita_precisa']}/{n}")
for f in fallos: print(" ✖", *f)
