## Antes de empezar

Una aplicación con recuperación de información busca fragmentos antes de pedir una respuesta. Esto puede aportar contexto, pero no convierte automáticamente el fragmento en una prueba. En esta práctica trabajarás con tres notas ficticias.

## 1. Prepara un corpus pequeño

Guarda estas notas con un identificador:

```text
nota-a: El taller empieza el jueves a las seis en la sala 1.
nota-b: La sesión dura treinta minutos y se puede llevar un libro.
nota-c: La nota no indica precio ni forma de inscripción.
```

Conserva también la pregunta original. Un sistema no puede explicar una cita si no sabes de qué documento procede.

## 2. Recupera antes de generar

Para la pregunta «¿cuándo y dónde es el taller?», la recuperación debería seleccionar `nota-a`. Para «¿hay que pagar?», debería seleccionar `nota-c`, aunque la respuesta correcta sea que el precio no consta.

Registra consulta, fragmentos seleccionados, puntuación o motivo de selección y versión del índice. No confundas una coincidencia de palabras con comprensión. Comprueba manualmente si el fragmento responde a la pregunta completa.

## 3. Genera con citas y límites

Usa una instrucción como esta:

```text
Responde solo con los fragmentos recuperados.
Incluye el identificador de cada fragmento usado.
Si no hay evidencia suficiente, responde «pendiente de confirmar».
No completes huecos con conocimiento general.
```

Una respuesta útil separa respuesta, citas y dudas. Si el fragmento habla de duración pero la pregunta pide precio, no rellenes el precio. Si dos notas discrepan, muestra la discrepancia y detén la conclusión automática.

## 4. Prueba una recuperación equivocada

Fuerza una consulta que solo devuelva `nota-b` y pregunta por el lugar. El sistema debe reconocer que el contexto no basta. No mejores artificialmente el resultado añadiendo la nota correcta después de ver la respuesta.

Si partes las notas en fragmentos, conserva el identificador del documento y una referencia de posición. El contexto sin procedencia dificulta corregir un error y demostrar qué información recibió el modelo.

## Tu resultado

Has terminado cuando puedes mostrar pregunta, fragmentos recuperados, respuesta, citas y decisión cuando falta evidencia. RAG ayuda a organizar el contexto; no sustituye fuentes, contratos, evaluación ni revisión humana.

En el siguiente capítulo estudiarás agentes y decidirás qué acciones pueden proponer y cuáles deben quedar fuera de su autonomía.
