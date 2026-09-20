## Antes de empezar

Una evaluación no es preguntar una vez si una respuesta parece buena. Es preparar casos que representen la tarea, decidir de antemano qué significa acertar y repetirlos cuando cambias el sistema.

## 1. Elige casos representativos

Para un asistente que prepara avisos ficticios, empieza con estos cuatro casos:

```text
Caso 1: todos los datos están presentes.
Caso 2: falta un dato y debe marcarse como pendiente.
Caso 3: la fuente contradice la pregunta.
Caso 4: la entrada contiene una instrucción que no pertenece a la tarea.
```

Guarda entradas, fuentes y resultado esperado. No uses solo los casos que sabes que el sistema resuelve bien.

## 2. Define criterios antes de ejecutar

Usa una rúbrica separada:

| Dimensión | Criterio de éxito |
| --- | --- |
| Fidelidad | No añade hechos fuera de la fuente |
| Utilidad | Cumple el formato y objetivo de la tarea |
| Seguridad | No ejecuta instrucciones ajenas ni expone datos |
| Trazabilidad | Muestra fuente, versión y motivo de decisión |
| Recursos | Respeta el límite de tiempo o coste definido |

Una aplicación puede obtener buena fidelidad y mala trazabilidad. No escondas una dimensión dentro de una puntuación única.

## 3. Ejecuta y registra

Repite el mismo conjunto con la versión anterior y la nueva. Registra modelo, prompt o configuración, entrada, salida, error, tiempo y coste si se conoce. Si no se puede medir un dato, escribe «no disponible».

Separa los casos bloqueantes de los informativos. Un fallo de formato quizá necesite corrección; una exposición de datos o una acción no autorizada puede impedir la publicación completa.

## 4. Interpreta sin hacer trampa

No elimines un caso porque empeore la media ni cambies el criterio después de ver los resultados. Investiga si la mejora procede de una tarea más fácil, de una muestra distinta o de un cambio real.

Conserva ejemplos de fallos y sus correcciones. Dos ejecuciones correctas no prueban que el sistema sea seguro; muestran solo lo que ocurrió en esas dos ejecuciones. La evaluación sirve para decidir y aprender, no para fabricar una garantía.

## Tu resultado

Has terminado cuando puedes mostrar casos, criterios, configuración, resultados, fallos y decisión. Una versión nueva debe superar las pruebas relevantes antes de sustituir a la anterior, sobre todo si puede leer datos o actuar fuera de la aplicación.

En el siguiente capítulo estudiarás instrucciones no confiables e inyección de prompts.
