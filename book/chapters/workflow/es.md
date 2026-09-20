## Antes de empezar

Una automatización no es solo conectar una IA con otra herramienta. Es decidir qué entra, qué se transforma, qué puede salir mal y quién puede detenerla. En esta práctica diseñarás un flujo ficticio que prepara respuestas, pero nunca las envía por sí solo.

## 1. Divide la tarea

La tarea es responder consultas sobre el horario de un taller. Escríbela como una secuencia:

```text
Entrada: pregunta recibida y ficha oficial del taller.
Preparación: extraer la pregunta y los datos relevantes.
Borrador: redactar una respuesta usando solo la ficha.
Comprobación: marcar datos ausentes o contradictorios.
Salida: guardar un borrador para que una persona lo revise.
Acción externa: ninguna durante esta práctica.
```

Separar los pasos hace visible el límite. «Responder consultas» escondía tanto la redacción como el posible envío.

## 2. Define estados y paradas

Usa estados sencillos: `received`, `drafted`, `needs-review`, `approved` y `rejected`. Una entrada no debe saltar de `received` a `approved` porque el texto parezca convincente.

La parada principal está entre `drafted` y cualquier acción externa. Si faltan datos, el flujo pasa a `needs-review`. Si hay un dato contradictorio, conserva la consulta y la ficha para que la persona responsable decida. No borres el original para que la automatización parezca limpia.

## 3. Prueba con casos pequeños

Prepara tres consultas ficticias:

| Caso | Resultado esperado |
| --- | --- |
| Pregunta por hora y sala conocidas | Borrador con esos datos |
| Pregunta por un precio ausente | Marca el dato como pendiente |
| Pregunta que contradice la ficha | Detiene el flujo y pide revisión |

Ejecuta cada caso sin conectar correo, mensajería ni cuentas reales. Comprueba que el borrador conserva la fuente, que no inventa una respuesta y que la parada se activa cuando corresponde.

## 4. Calcula el fallo antes de ampliar

Para cada paso, anota qué ocurre si falla: conservar la entrada, registrar el error y permitir reintentar sin duplicar una acción. Un reintento de redacción puede crear otro borrador; un reintento de envío podría mandar el mismo mensaje dos veces. Son riesgos distintos.

Empieza con revisión manual y una acción reversible. Solo después de medir errores y definir permisos tendría sentido estudiar una integración real. La velocidad no compensa una automatización que no puedes detener o recuperar.

## Tu resultado

Has terminado cuando tienes un diagrama o lista con entrada, pasos, estados, salida, persona responsable y parada. La automatización útil no elimina el criterio: hace que el criterio aparezca en un punto claro del flujo.

En el siguiente capítulo estudiarás conectores y datos. Allí decidirás qué permiso necesita cada paso y cuál no debe concederse.
