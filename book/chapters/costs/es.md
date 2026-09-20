## Antes de empezar

Vas a comparar dos versiones del mismo flujo. El resultado no será “el modelo más barato”, sino una decisión que puedas explicar: qué calidad necesitas, cuánto cuesta cada tarea y cuánto tarda.

Usa datos ficticios. No pegues claves, conversaciones privadas ni facturas reales en un ejercicio.

## 1. Define la unidad que importa

El precio del modelo se anuncia normalmente por tokens, segundos de audio o imágenes. La unidad que importa para una persona usuaria es la **tarea terminada**.

Una tarea puede incluir varios intentos, una búsqueda, una llamada a una herramienta, una revisión humana y un reintento. Si solo miras la primera respuesta, subestimas el coste.

Escribe antes de probar:

- tarea: clasificar 10 mensajes ficticios;
- calidad mínima: al menos 8 clasificaciones correctas;
- tiempo máximo: 10 segundos por mensaje;
- coste máximo: 0,02 € por mensaje;
- revisión: una persona comprueba los casos dudosos.

## 2. Construye un conjunto pequeño

Prepara diez casos representativos. Incluye casos fáciles, ambiguos y uno que deba rechazarse. Guarda una respuesta esperada y una breve razón. El conjunto no tiene que ser grande para empezar, pero sí debe permanecer igual al comparar modelos.

No cambies los casos después de ver qué modelo gana. Si corriges un caso, crea una nueva revisión del conjunto y repite la comparación.

## 3. Mide las tres dimensiones

Registra para cada ejecución:

| Caso | Correcto | Tiempo | Coste | Revisión necesaria |
| --- | --- | ---: | ---: | --- |
| 01 | Sí | 1,8 s | 0,004 € | No |
| 02 | No | 2,1 s | 0,004 € | Sí |

Calcula al menos:

- **calidad**: casos correctos / casos totales;
- **latencia**: tiempo por tarea y, si puedes, percentil 95;
- **coste real**: llamadas, tokens, herramientas y revisiones, dividido por tareas terminadas.

Si usas un modelo local, el coste monetario directo puede ser cercano a cero, pero anota electricidad, hardware compartido y tiempo de espera como costes operativos. “Gratis” no significa ilimitado.

## 4. Decide con una regla visible

Una regla sencilla puede ser: “Descartamos cualquier versión con menos de 80 % de calidad o más de 10 segundos; entre las restantes elegimos la de menor coste”. Otra tarea puede priorizar velocidad o exigir revisión humana en todos los casos.

Escribe la regla antes de mirar el resultado final. Así evitas convertir una preferencia en una supuesta medición.

## 5. Reconoce un resultado engañoso

Un modelo puede parecer barato porque responde con textos cortos, pero fallar más y obligar a repetir o revisar. También puede parecer rápido si solo se mide el primer token y no el momento en que termina una respuesta utilizable.

Comprueba qué incluye cada medida. Separa el tiempo de cola, el tiempo de generación, las llamadas externas y la revisión. Si una cifra no se puede reproducir, márcala como incompleta.

## Tu resultado

Has convertido una comparación de modelos en una decisión operativa. Conserva el conjunto de pruebas, la fecha, la configuración y los resultados. Cuando cambie el modelo o el precio, repite la prueba y compara revisiones, no recuerdos.
