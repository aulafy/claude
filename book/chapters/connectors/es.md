## Antes de empezar

Un conector permite que una herramienta lea o cambie información en otra. Esa comodidad también puede ampliar el alcance de un error. En esta práctica decidirás permisos con una ficha ficticia, sin enlazar cuentas reales.

## 1. Dibuja el recorrido de los datos

Parte del flujo del capítulo anterior y añade una fuente de preguntas ficticia:

```text
Entrada: una pregunta de prueba.
Lectura: consultar una lista ficticia de horarios.
Transformación: preparar un borrador.
Escritura: guardar el borrador en una carpeta de prueba.
Envío: no permitido.
```

Para cada flecha pregunta qué dato viaja, quién lo recibe y si el paso necesita leer o escribir. «Conectar el calendario» no describe suficientemente el permiso.

## 2. Reduce el permiso

Haz una tabla antes de aceptar una conexión:

| Paso | Necesidad | Permiso mínimo |
| --- | --- | --- |
| Leer el horario | Consultar datos | Solo lectura de la lista de prueba |
| Preparar el borrador | Transformar texto | Acceso al texto seleccionado |
| Guardar el borrador | Crear un archivo temporal | Escritura en una carpeta de prueba |
| Enviar un mensaje | Acción externa | No concedido |

Un permiso amplio no se justifica porque la interfaz lo presente como opción predeterminada. Si no puedes limitarlo, detén la conexión y busca otra forma de probar la tarea.

## 3. Prueba con datos desechables

Crea una lista con tres horarios inventados. Antes de usarla, anota el resultado que esperas: el flujo puede leer esos horarios y guardar un borrador, pero no puede modificar la lista ni enviar un mensaje.

Comprueba los registros o la pantalla de permisos para ver qué se leyó y qué se escribió. Si no puedes saberlo, esa falta de visibilidad es un riesgo del conector. No uses un nombre ficticio como garantía de privacidad: un archivo real puede contener más información de la que ves.

## 4. Revoca y recupera

Cuando termines, elimina el permiso de prueba desde la herramienta que lo concedió y confirma qué queda guardado. Conserva el borrador si es necesario para revisar la actividad, pero no conserves copias de datos que ya no necesitas.

Si una conexión falla a mitad del proceso, conserva la entrada original y marca el estado como pendiente. No repitas automáticamente una escritura hasta saber si la primera llegó a completarse. La recuperación forma parte del diseño, no es un detalle para después.

## Tu resultado

Has terminado cuando puedes explicar qué datos atraviesan cada paso, qué permiso usa y dónde se detiene el flujo. El conector más útil no es el que pide más acceso: es el que hace posible la tarea con un alcance pequeño y observable.

En el siguiente capítulo practicarás aprobaciones y paradas explícitas antes de cualquier acción de riesgo.
