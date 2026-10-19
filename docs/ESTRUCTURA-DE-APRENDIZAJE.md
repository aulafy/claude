# Estructura de aprendizaje

Cómo se organiza Aulafy para que alguien que llega sin saber nada pueda aprender IA de principio a fin, sin perderse entre 22 cursos.

## Principios

1. **Un solo camino principal.** La [columna vertebral](../lib/learning-spine.ts) son seis cursos en orden, todos con profundidad «Completo». Es lo único que se recomienda a quien no sabe por dónde empezar.
2. **Todo lo demás son especialidades.** Se cursan después, según el objetivo (agentes, RAG, MLOps, webs, videojuegos…).
3. **La profundidad es pública.** Cada curso muestra si es *Completo*, *En desarrollo* o *Esquema*, medido sobre el texto publicado (`npm run audit:depth`). Los más sólidos aparecen primero.
4. **Contar lecciones no es una métrica de calidad.** La portada dice cuántos cursos están completos.
5. **Una lección termina cuando se puede comprobar.** Ver el [estándar de lección rigurosa](ESTANDAR-LECCION-RIGUROSA.md).

## Niveles y recorrido

| Nivel | Objetivo | Curso de la ruta | Resultado |
|---|---|---|---|
| 1 · Empieza | Entender y usar IA con criterio | IA desde cero | Un proyecto breve con rúbrica de revisión |
| 2 · Aplica | Llevarla a un trabajo o negocio | IA para pymes | Un piloto reversible con métricas |
| 3 · Construye | Crear software con IA | Codex desde cero → Claude Code → IA local → Seguridad y evals | Un proyecto con pruebas, ejecución local y evaluación de riesgos |

## Estados de profundidad (medición del 19/10/2026)

Umbrales: menos de 250 palabras propias por lección (mediana) = *Esquema*; menos de 450 = *En desarrollo*; 450 o más = *Completo*. «Propias» excluye las frases que se repiten en 8 o más lecciones.

- **Completo (9):** IA desde cero, Codex desde cero, Claude Code, IA local, IA para pymes, IA generativa, Seguridad y evals, Videojuegos 3D con IA, DeepSeek Harness.
- **En desarrollo (10):** Crear webs con IA, Agentes y automatización, MLOps local, Agentes en producción, Codex para programadores, RAG seguro, AI Router, Fundamentos Aulafy, Fine-tuning local, Automatización self-hosted.
- **Esquema (2):** IA para docentes y educación, Asistentes analíticos locales con datos.

Hallazgo: 150 de 311 lecciones tienen menos de 400 palabras propias y 33 menos de 250. Las 7 lecciones del motor de contenido (`content/`) son todavía esqueletos de unas 28 palabras.

## Prioridades de contenido

1. Reescribir los dos cursos *Esquema* o retirarlos de la biblioteca hasta que lo merezcan.
2. Subir a *Completo* los cursos de la ruta de «Construye» que aún no lo son (RAG seguro, Agentes en producción).
3. Crear lecciones nuevas solo con el estándar rigurosa: ejecutadas, con prueba y con errores reales.
4. Retomar el blog con entradas verificadas (Ley de IA, IA local medida en un equipo real, precios desde fuentes oficiales).
