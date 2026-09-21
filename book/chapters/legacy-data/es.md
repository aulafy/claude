## Antes de empezar

Vas a diseñar un piloto de IA alrededor de un sistema antiguo ficticio. No vas a conectarte a una base real ni a modificar registros. La primera regla es que leer, transformar y escribir son operaciones distintas.

Usa una copia de datos ficticios y anota quién puede hacer cada acción.

## 1. Haz un inventario

Describe qué sistema existe, qué datos contiene, quién los usa y qué no se conoce. Registra formato, identificadores, campos obligatorios, duplicados y dependencias. Si un dato no tiene dueño claro, trátalo como riesgo pendiente.

No empieces por el modelo. Empieza por el flujo actual y por el resultado que una persona necesita.

## 2. Separa las zonas

Diseña tres zonas: **origen de solo lectura**, **borrador de cambios** y **destino aprobado**. La IA puede proponer una transformación en el borrador, pero no recibe permiso implícito para escribir en el origen.

Una cuenta de prueba debe tener el mínimo acceso. No uses credenciales de administración para experimentar y no pongas secretos en prompts, logs o archivos de ejemplo.

## 3. Prepara la reversibilidad

Antes de una migración, crea una copia cuya restauración hayas probado. Guarda la fecha, el esquema, el número de registros y una huella o suma de comprobación. Una copia que nunca se ha restaurado es una esperanza, no un plan de recuperación.

Define también un lote pequeño, una persona aprobadora y una condición de parada: diferencias inesperadas, pérdida de identificadores, errores de codificación o cualquier cambio fuera del alcance.

## 4. Compara el borrador

Para cada cambio propuesto, muestra valor anterior, valor nuevo, razón, confianza y fuente. No escondas las filas que la IA no sepa transformar. Una persona debe poder aceptar, rechazar o corregir cada lote.

Prueba primero con datos ficticios y después con una muestra no crítica. Compara recuentos, claves, tipos, relaciones y reglas del negocio. El éxito no es “la IA cambió muchas filas”; es que el resultado sea correcto, explicable y recuperable.

## 5. Reconoce el fallo típico

Una migración puede parecer correcta y perder ceros iniciales, fechas, acentos, identificadores o relaciones. También puede duplicar una entidad al confundir nombres parecidos.

Detén el lote, conserva los artefactos y restaura la copia si una comprobación falla. No continúes para “ver si se arregla solo”. Investiga con una muestra aislada y cambia una variable cada vez.

## Tu resultado

Has diseñado una migración por etapas: inventario, lectura, borrador, comparación, aprobación, escritura limitada y recuperación probada. Es un marco para introducir IA en sistemas legacy sin confundir automatización con permiso para alterar datos.
