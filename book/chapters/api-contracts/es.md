## Antes de empezar

Cuando una aplicación usa un modelo, no debería depender de que la respuesta «suene bien». Un contrato define qué recibe el modelo, qué debe devolver y qué ocurre cuando no puede cumplirlo. En esta práctica trabajarás con un contrato ficticio y sin llamadas reales.

## 1. Define la entrada

La aplicación recibirá una consulta sobre un taller ficticio. Especifica los campos necesarios y sus límites:

```text
question: texto no vacío, máximo 300 caracteres.
source: hechos del taller, máximo 2.000 caracteres.
action: siempre "draft" durante esta prueba.
```

No incluyas claves, nombres reales ni documentos completos si solo necesitas una parte. Validar la entrada antes de llamar al modelo reduce errores y hace más fácil repetir la prueba.

## 2. Define la salida

Escribe qué debe recibir la interfaz:

| Campo | Regla |
| --- | --- |
| `draft` | Texto breve, puede quedar vacío si falta información |
| `supportedFacts` | Lista de hechos encontrados en `source` |
| `pending` | Lista de datos que la fuente no responde |
| `send` | Siempre `false` en esta versión |

Un texto que contiene una respuesta correcta pero omite `pending` no cumple el contrato. La aplicación debe poder distinguir una salida completa de una respuesta parcial.

## 3. Prueba casos válidos y fallidos

Prepara una tabla de pruebas:

```text
Caso A: pregunta y fuente válidas -> crear borrador.
Caso B: falta source -> rechazar entrada.
Caso C: aparece un hecho fuera de source -> marcarlo como pendiente o rechazar.
Caso D: la salida no tiene send -> rechazar formato.
```

Para cada caso registra entrada, resultado, error y recuperación. No conviertas el error en una cadena vacía que la interfaz pueda mostrar como si todo hubiera ido bien.

## 4. Diseña el fallo seguro

Si el modelo devuelve texto libre, JSON incompleto o una respuesta que no puedes validar, conserva la entrada y marca la salida como `needs-review`. No envíes, borres ni sobrescribas una versión correcta anterior.

Los contratos no garantizan que el modelo sea veraz. Solo hacen visible si la respuesta tiene la forma necesaria para que otra comprobación pueda continuar. La evidencia y la revisión siguen siendo necesarias.

## Tu resultado

Has terminado cuando puedes enseñar el contrato, los casos de prueba, el error esperado y la salida segura. Construir con IA empieza por decidir qué no puede pasar silenciosamente.

En el siguiente capítulo usarás recuperación de información para aportar contexto, manteniendo fuentes y permisos separados.
