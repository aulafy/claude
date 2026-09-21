## Antes de empezar

El contexto es el texto que el modelo puede tener en cuenta en una petición. La memoria del equipo y el espacio del disco son recursos distintos. En esta práctica usarás un documento ficticio para comprobar qué información conserva una IA local.

## 1. Prepara una referencia medible

Crea una lista ficticia con cinco hechos numerados. Pon una marca distinta al principio y al final:

```text
INICIO-PRUEBA
1. La biblioteca abre a las nueve.
2. La sala azul está en la primera planta.
3. El taller dura treinta minutos.
4. Se puede llevar un libro.
5. La nota no indica un precio.
FIN-PRUEBA
```

No uses información personal. Guarda la referencia fuera de la conversación para poder comprobar después qué se perdió o se añadió.

## 2. Cambia una sola variable

Pide al modelo local que devuelva los cinco hechos y que indique cuál no aparece si le haces una pregunta relacionada. Empieza con la lista completa. Después repite usando una lista más larga, sin cambiar la instrucción ni las marcas.

Registra modelo, versión, tamaño de entrada, tiempo aproximado y configuración de contexto que realmente uses. El límite anunciado por una aplicación puede diferir del contexto efectivo de tu entorno; compruébalo en la documentación y en la prueba.

## 3. Detecta pérdida y repetición

Compara la respuesta con `INICIO-PRUEBA` y `FIN-PRUEBA`. Comprueba si desaparece el final, si se repite una sección o si aparece un hecho inventado. Si ocurre, reduce la entrada y repite. No concluyas que el modelo «recuerda» un documento porque repita una frase cercana.

Dividir un documento en partes puede ayudar, pero también puede separar una afirmación de su contexto. Conserva los identificadores de cada parte y comprueba qué información llega al paso siguiente.

## 4. Mide el intercambio

Una entrada más larga puede exigir más memoria y tardar más. Decide qué prefieres para tu tarea: respuesta completa, velocidad, menor consumo o una advertencia clara de que falta contexto. No escondas una omisión para mejorar una métrica.

Si la aplicación se queda sin recursos, conserva el registro y detén la prueba. No borres el original ni cambies varias opciones a la vez. Una prueba repetible vale más que una cifra aislada.

## Tu resultado

Has terminado cuando puedes mostrar la referencia, la configuración, el resultado, cualquier pérdida detectada y la decisión tomada. El contexto no es una promesa abstracta: es un límite que debes comprobar en el equipo y la tarea que realmente usarás.

En la siguiente parte aprenderás a construir una aplicación pequeña con contratos claros, antes de darle autonomía a un agente.
