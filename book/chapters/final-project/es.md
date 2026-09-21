## Antes de empezar

Vas a diseñar un proyecto pequeño con datos ficticios. No tiene que ser una aplicación comercial ni usar una API real. Debe poder explicarse, probarse, detenerse y recuperar su estado.

Elige una tarea acotada: clasificar mensajes, extraer campos de documentos inventados o responder preguntas sobre un conjunto de notas públicas.

## 1. Escribe el contrato

Define entrada, salida, usuario, límite y criterio de éxito. Incluye ejemplos aceptables y un caso que el sistema deba rechazar. Especifica qué decisiones quedan siempre en manos de una persona.

Si no puedes describir el flujo sin mencionar un modelo concreto, el contrato todavía depende demasiado de una herramienta.

## 2. Prepara la prueba

Crea entre diez y veinte casos ficticios: normales, ambiguos, incompletos y fuera de alcance. Guarda una respuesta esperada o un criterio de evaluación. Ejecuta una versión de referencia y conserva su configuración.

Mide calidad, latencia y coste por tarea. No escondas los fallos ni cambies los casos para mejorar una puntuación.

## 3. Añade límites y recuperación

Separa lectura, transformación y escritura. Usa permisos mínimos. Diseña una aprobación antes de cualquier acción con consecuencias y una condición de parada para resultados sin fuente, errores o datos inesperados.

Documenta cómo restaurarías la copia o volverías a la versión anterior. Si nunca has probado la recuperación, declárala pendiente.

## 4. Registra lo necesario

Anota versión, fecha, caso opaco, resultado de evaluación, latencia, coste estimado y motivo de revisión. Evita guardar prompts o documentos completos cuando una huella, etiqueta o resumen técnico baste.

Incluye un registro de una ejecución ficticia:

```text
proyecto=clasificador-demo version=1.0 caso=caso-04
resultado=revision_humana latencia=3.1s coste=0.006
parada=respuesta_sin_fuente recuperacion=pendiente
```

## 5. Presenta y cuestiona

Entrega el contrato, la muestra, resultados antes y después, decisiones de coste, riesgos, registro mínimo y plan de recuperación. Explica qué no has medido y qué necesitarías verificar antes de usar datos reales.

Pide a otra persona que intente romper el supuesto principal. Si encuentra un caso que no cubres, añádelo a una nueva revisión y vuelve a ejecutar la prueba.

## Tu resultado

Has construido una propuesta que se puede revisar, no solo una demo. El proyecto final une criterio, datos, generación, evaluación, seguridad, costes y operación. Su valor está en hacer visibles las decisiones y en saber cuándo no continuar.
