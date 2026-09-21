## Antes de empezar

Un agente combina un modelo, contexto, herramientas y decisiones repetidas. Esa combinación puede ahorrar trabajo, pero también ampliar un error. En esta práctica diseñarás un agente ficticio que prepara un informe y no modifica datos.

## 1. Separa propuesta y acción

La tarea es localizar posibles registros duplicados en una lista ficticia:

```text
Entrada: lista de registros de prueba.
Propuesta: agrupar candidatos parecidos y explicar el motivo.
Revisión: una persona confirma cada grupo.
Acción: ninguna; no se borra ni se modifica nada.
```

El agente puede devolver candidatos y razones. No puede decidir que dos registros representan a la misma persona ni ejecutar un borrado.

## 2. Define permisos y límites

Especifica límites antes de conectar una herramienta:

| Control | Regla de la práctica |
| --- | --- |
| Permiso de datos | Solo lectura de la lista ficticia |
| Herramientas | Búsqueda y generación de informe |
| Presupuesto | Número máximo de pasos definido antes de empezar |
| Acción externa | Desactivada |
| Parada | Error, dato ambiguo o límite alcanzado |

Un agente con muchas herramientas no es automáticamente más capaz. Cada permiso necesita una razón y una prueba. Si no puedes observar qué herramienta usó, reduce el alcance.

## 3. Prueba casos ambiguos

Incluye tres casos ficticios: dos registros claramente iguales, dos parecidos pero distintos y una entrada incompleta. El resultado esperado es diferente para cada uno: sugerir un grupo, pedir revisión o detenerse por falta de datos.

Registra la entrada, herramientas llamadas, pasos, salida y motivo de parada. Un límite de pasos evita que un bucle consuma recursos, pero no demuestra que el resultado sea correcto.

## 4. Aprueba una sola acción

Si más adelante la aplicación pudiera fusionar registros, empieza con una acción reversible y una aprobación por grupo. La persona debe ver los originales, el motivo de la propuesta y el cambio exacto. Nunca uses «el agente ya lo comprobó» como sustituto de la revisión.

Si hay un error de conexión, conserva el estado pendiente y no repitas una escritura automáticamente. Un agente bien diseñado puede abstenerse; esa abstención es una salida válida.

## Tu resultado

Has terminado cuando puedes señalar contexto, herramientas, permisos, límites, criterios de parada, registro y aprobación. La autonomía se concede por acción concreta, no por entusiasmo ante el modelo.

En el siguiente bloque aprenderás a evaluar aplicaciones de IA con casos de prueba, métricas y fallos conocidos.
