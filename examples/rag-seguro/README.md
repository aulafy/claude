# RAG seguro: proyecto ejecutable del curso

Pipeline mínimo, **sin dependencias** (solo Python 3.10+ y, para generar respuestas, [Ollama](https://ollama.com)), pensado para aprender cada pieza ejecutándola. Todos los datos son **ficticios**.

```bash
python3 -m unittest discover -s tests -v     # 22 pruebas, sin red ni modelo
python3 run_demo.py                           # ingesta y chunking
python3 run_retrieval_eval.py                 # compara chunking y buscadores
RAG_MODEL=llama3.2:3b python3 run_answer_eval.py   # evalúa respuestas (requiere Ollama)
RAG_MODEL=llama3.2:3b python3 run_injection.py     # ataque de inyección indirecta
```

| Carpeta | Qué contiene |
|---|---|
| `corpus/` | 17 documentos ficticios de un estudio de interiorismo, separados por permiso (`public`, `internal`, `rrhh`) y un correo con una instrucción oculta (`untrusted`) |
| `src/rag/` | `ingest`, `chunking`, `bm25`, `vectors`, `hybrid`, `guard` (permisos y cuarentena), `answer` (JSON con citas validadas), `evals`, `pipeline` |
| `eval/` | 30 preguntas con respuesta esperada y los resultados medidos |
| `tests/` | Pruebas unitarias de cada pieza |

**Entorno de las mediciones (19/10/2026):** macOS, Python 3.14.7, Ollama 0.40.6, modelos `llama3.2:3b` y `qwen3.5:9b-mlx`, temperatura 0 y semilla fija.

**Límites:** el corpus es pequeño (17 documentos) y las preguntas son 30; una pregunta distinta cambia las métricas en 3–4 puntos. Los «vectores» son n-gramas de caracteres, no embeddings neuronales: la lección de embeddings explica cómo sustituirlos.
