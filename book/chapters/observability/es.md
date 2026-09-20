## Antes de empezar

Vas a preparar una ficha mínima para investigar un cambio en un flujo de IA. No necesitas guardar todos los mensajes ni construir una plataforma de monitorización. Necesitas poder responder: qué cambió, cuándo, con qué configuración y qué resultado empeoró.

Usa casos ficticios y evita registrar datos personales o secretos.

## 1. Define la referencia

Conserva una pequeña muestra de casos aprobados, su resultado esperado y la fecha de la revisión. Esa muestra es una referencia, no una colección infinita de conversaciones.

Anota también el criterio mínimo: por ejemplo, al menos 8 de 10 casos correctos y ningún caso que exponga datos privados. Sin un umbral, “empeoró” solo expresa una impresión.

## 2. Registra señales pequeñas

Para cada tarea, guarda un identificador opaco, fecha y hora, versión del flujo, modelo o adaptador, latencia, coste estimado, resultado de la evaluación y motivo de revisión. No guardes el prompt completo si no es necesario; una huella o una clasificación puede bastar para investigar.

Un registro ficticio podría ser:

```text
tarea=caso-07 version=2026-09-12 modelo=referencia
latencia=4.2s coste=0.011 calidad=fallo revision=si
motivo=respuesta_sin_fuente
```

El registro no demuestra por sí solo por qué ocurrió el fallo. Solo conserva pistas para comparar.

## 3. Compara antes y después

Cuando cambies un modelo, prompt, herramienta o configuración, ejecuta la misma muestra con la versión anterior y la nueva. Compara calidad, latencia, coste, errores y revisiones. Separa los cambios simultáneos: si cambias cinco cosas, será difícil atribuir una diferencia.

Una mejora media puede esconder un caso crítico peor. Lee los fallos y revisa los casos límite, no solo el promedio.

## 4. Diseña una parada

Define qué ocurre si la calidad cae por debajo del umbral, aumentan los errores o aparece una respuesta sin fuente. Puedes detener el despliegue, volver a la versión anterior o enviar todo a revisión humana.

La parada debe ser reversible y conocida antes del incidente. Un panel lleno de números no sustituye una decisión operativa.

## 5. Reconoce el fallo típico

Guardar el texto completo “por si acaso” puede crear un nuevo riesgo de privacidad. Guardar solo un promedio puede ocultar a quién perjudica un cambio. Y una métrica verde puede no detectar un fallo que el conjunto de pruebas nunca incluye.

Reduce los datos, limita el acceso, define una retención y revisa la muestra. Si necesitas abrir un caso, hazlo con datos ficticios o anonimizados y documenta la razón.

## Tu resultado

Has creado un registro pequeño pero accionable: versión, señales, referencia, casos fallidos y respuesta ante umbrales. Con él puedes investigar cambios sin confundir vigilancia con certeza ni convertir cada conversación en un archivo permanente.
