# Mapa de procedencia del libro

Fecha de inspeccion: 2026-09-12.

Este mapa compara los 24 borradores con las fuentes que declaran. La existencia de una ruta valida el archivo, pero no demuestra que el capitulo reutilice fielmente su contenido. Luna debe confirmar cada fila antes de una aprobacion editorial.

Fuente principal: `public/recursos/ia-desde-cero/curso-ia-desde-cero.md`.
Fuente de flujo y pymes: `public/recursos/ia-pymes/kit-flujo-fiable-pyme.md`.

| Capitulo | Fuente declarada | Seccion legacy candidata | Estado y trabajo pendiente |
| --- | --- | --- | --- |
| `first-task` | IA desde cero | Leccion 5 o 12 | Derivacion probable; confirmar el fragmento exacto y conservar la practica de tarea pequeña. |
| `verify-output` | IA desde cero | Leccion 6, protocolo de verificacion | Derivacion clara; revisar que los ejemplos nuevos no añadan afirmaciones sin fuente. |
| `data-boundaries` | IA desde cero | Leccion 8, clasificar antes de enviar | Derivacion clara; comparar reglas de datos y excepciones. |
| `read-documents` | IA desde cero | No hay una seccion documental inequívoca | Requiere mapa editorial; no presentar el borrador como transcripcion del legacy. |
| `research-sources` | IA desde cero | Leccion 6, protocolo de verificacion | Derivacion probable; enlazar procedimiento y fuentes actuales. |
| `compare-tools` | IA desde cero | Leccion 7, prueba justa en una hora | Derivacion clara; revisar herramientas y fechas variables. |
| `write-edit` | IA desde cero | Leccion 5, de vago a comprobable | Derivacion clara; el ejercicio del club de lectura es material nuevo y ficticio. |
| `images-audio` | IA desde cero | Leccion 10, imagen, voz y video | Derivacion clara; conservar advertencias de licencia y transparencia. |
| `learning-project` | IA desde cero | Leccion 11, metodo de tutor | Derivacion clara; comprobar que la ayuda no sustituye el trabajo del estudiante. |
| `workflow` | IA desde cero | Leccion 12, primer proyecto | Derivacion probable; completar pasos y criterio de salida. |
| `connectors` | IA desde cero | No hay seccion legacy directa | Contenido nuevo; documentar por que se conserva esta fuente o cambiar la procedencia. |
| `human-approval` | IA desde cero | Leccion 8 y Leccion 12 | Derivacion parcial; ampliar con permiso, parada y decision humana. |
| `local-hardware` | IA desde cero | No hay seccion legacy directa | Contenido nuevo y variable; añadir fuentes oficiales por herramienta. |
| `local-first-run` | IA desde cero | No hay seccion legacy directa | Contenido nuevo; falta guia ejecutable por sistema y version. |
| `local-context` | IA desde cero | Leccion 4, contexto, tokens y memoria | Derivacion clara; sus claims ya necesitan fuentes vivas y revisión técnica. |
| `api-contracts` | IA desde cero | No hay seccion legacy directa | Contenido nuevo; conservar como capítulo avanzado y documentar origen conceptual. |
| `retrieval` | IA desde cero | Leccion 3, RAG | Derivacion clara; añadir una práctica con documentos ficticios y evaluación. |
| `agents` | IA desde cero | Leccion 3, agentes | Derivacion clara; completar límites de autonomía y acciones permitidas. |
| `evals` | IA desde cero | Lecciones 5, 6 y 12 | Síntesis; distinguir material reutilizado de diseño editorial nuevo. |
| `injection` | IA desde cero | Lecciones 6 y 8 | Síntesis de verificación y seguridad; revisar con una fuente técnica actual. |
| `costs` | IA desde cero | Leccion 7, prueba justa | Derivacion parcial; no atribuir cifras ficticias al recurso antiguo. |
| `observability` | IA desde cero | No hay seccion legacy directa | Contenido nuevo; enlazar documentación técnica y política de retención aplicable. |
| `legacy-data` | Kit pyme | Secciones 1-6: contrato, pruebas, operación, permisos | Derivacion clara; añadir muestra antes/después y simulacro reproducible. |
| `final-project` | Kit pyme | Secciones 1-6 y Decisión de salida | Síntesis; convertir la consigna en una rúbrica con entregables y criterios. |

## Cómo usar el mapa

Para cada capítulo, Luna debe:

1. Abrir la sección indicada y anotar qué ideas, ejemplos y límites se reutilizan.
2. Marcar cada fragmento como `reutilizado`, `adaptado` o `nuevo`.
3. Comprobar que el contenido nuevo no contradice la fuente ni presenta una inferencia como un hecho.
4. Añadir esa decisión al dossier editorial del capítulo.
5. Cambiar `legacyPaths` si la fuente real no es la declarada.
6. Recalcular el hash y revisar EN después de cualquier cambio.

Una fila “derivacion probable” no es una aprobación. Si no se puede localizar la correspondencia, mantener el estado pendiente y escribir una atribución honesta: “inspirado en el tema”, no “adaptado de la sección”.
