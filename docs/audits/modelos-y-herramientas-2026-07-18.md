# Auditoría de nombres de modelos y herramientas

**Fecha de verificación:** 18 de julio de 2026 (`2026-07-18`).  
**Ámbito:** contenido publicado en `app/`, `lib/`, recursos educativos y scripts de soporte. No se consideran modelos los nombres internos de una aplicación, los alias de un gateway ni los ejemplos marcados como `local-*`.

Los modelos cambian de disponibilidad, nombre comercial y precio. Por eso Aulafy publica un identificador concreto únicamente si existe una fuente primaria del proveedor y la fecha de esta auditoría queda junto al catálogo. Cuando una integración permite elegir proveedor, el curso usa un alias local (`local-fast`, `local-coder`) o pide el identificador que muestre la instalación del alumno.

| Nombre publicado o identificador | Fuente primaria de verificación | Nota |
| --- | --- | --- |
| GPT-5.6 / `gpt-5.6-sol` | [OpenAI: Using GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model) | `gpt-5.6` resuelve a `gpt-5.6-sol`; el curso no trata el alias como una promesa permanente. |
| GPT-4.1 mini / `gpt-4.1-mini` | [OpenAI: GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini) | Ejemplo de gateway; revisar disponibilidad y precio antes de producción. |
| Claude Fable 5 / `claude-fable-5` | [Anthropic: Claude Fable 5](https://www.anthropic.com/claude/fable) | En herramientas con selector se enseña a comprobar el alias local, no a copiar uno de esta tabla. |
| Kimi K3 | [Kimi: Agent overview](https://www.kimi.com/help/agent/agent-overview) | El artículo editorial enlaza además a la documentación técnica del proveedor. |
| Qwen3 4B y 8B | [Qwen: anuncio y catálogo de Qwen3](https://qwenlm.github.io/blog/qwen3/) | Los ejemplos de Ollama separan el nombre del modelo de la cuantización. |
| Qwen2.5-Coder 7B y 14B | [Qwen2.5-Coder](https://qwenlm.github.io/blog/qwen2.5-coder-family/) y [registro de Ollama](https://registry.ollama.com/library/qwen2.5-coder) | Los tags de Ollama se deben comprobar con `ollama list`. |
| Gemma 3 12B IT y familia Gemma 4 | [Gemma 3 12B IT](https://huggingface.co/google/gemma-3-12b-it) y [model card de Gemma 4](https://ai.google.dev/gemma/docs/core/model_card_4) | Son referencias de familia o repositorio, no una recomendación universal. |
| `llama-3.3-70b-versatile` | [Groq: ficha del modelo](https://console.groq.com/docs/model/llama-3.3-70b-versatile) | Fallback actual del chat de Aulafy, configurable con `GROQ_MODEL`. |
| `nomic-embed-text` | [registro de Ollama](https://registry.ollama.com/library/nomic-embed-text) | Solo para embeddings. |
| FLUX.1-schnell | [repositorio del modelo](https://huggingface.co/black-forest-labs/FLUX.1-schnell) | Se mantiene la advertencia de licencia específica por variante. |

## Cambios de esta pasada

- Se elimina `translategemma-4b-it` como valor por defecto de un script: no era un identificador publicado verificable. Ahora el script exige `--model` con el ID que expone el servidor de LM Studio.
- Se sustituyen aliases que parecían identificadores de proveedor por aliases explícitamente locales (`local-fast`, `local-coder`).
- Se sustituye `Qwen/Qwen3-4B-Instruct`, que no se pudo verificar con ese nombre exacto, por `Qwen/Qwen3-4B`.
- Las tablas de comandos no prometen IDs de Claude: indican cómo comprobar los disponibles en la cuenta concreta.

## Rutina de mantenimiento

Antes de publicar una lección con un nombre nuevo, añádelo a esta tabla con su URL primaria y fecha de comprobación. Ejecuta `npm run verify:model-references` antes del build. Si un proveedor retira o renombra un modelo, cambia el ejemplo por una referencia a la familia o por una variable de entorno documentada.
