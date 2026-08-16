# Auditoria de Aulafy: adquisicion y retencion de personas que empiezan con IA

**Fecha:** 16 de agosto de 2026
**Alcance:** estructura publica de `aulafy.net`, navegacion, propuesta educativa, catalogo, lecciones, SEO y datos exportados de Google Search Console.
**Objetivo:** detectar por que una persona que no sabe de IA puede no llegar, no saber por donde continuar o abandonar pronto, y proponer mejoras medibles.

## Resumen ejecutivo

Aulafy no tiene un problema de falta de contenido. Tiene un problema de **jerarquia, continuidad y medicion**.

La web ya contiene una base valiosa: contenido gratuito, sin registro, una portada orientada por situaciones, practicas, fuentes y una posicion editorial responsable. Sin embargo, esa ventaja queda diluida por tres factores:

1. **La oferta parece mayor que el camino.** Se anuncian 21 cursos y 310 lecciones, mientras conviven un curso continuo de 28 lecciones, un curso "IA desde cero" de 12 lecciones, rutas, cursos, blog, proyectos, recetas y laboratorios. Para una persona nueva, no queda claro cual de todas esas puertas es *la* puerta principal.
2. **Google entiende mejor a Aulafy como soporte tecnico que como escuela para principiantes.** El trafico organico observado se concentra en Ollama, GPU, errores y tutoriales tecnicos en ingles. Las consultas "empezar en IA" aparecen, pero en posiciones 48-62 y sin clics.
3. **No se puede medir la retencion real.** Search Console mide impresiones y clics, no tiempo de lectura, avance entre lecciones, retorno, finalizacion ni abandono. Aulafy declara no usar analitica y presenta mensajes contradictorios sobre si guarda o no el progreso local.

La recomendacion central es convertir Aulafy en una experiencia con una sola promesa para principiantes:

> **En 15 minutos haras tu primera tarea util con IA, la comprobaras y sabras cual es tu siguiente paso.**

El catalogo debe permanecer, pero pasar a ser una biblioteca secundaria. La portada, la navegacion y el SEO para principiantes deben conducir a un recorrido corto, persistente y reconocible.

## Metodologia y limites

Se revisaron:

- la portada publica;
- `/cursos`, `/cursos/ia-desde-cero`, una leccion inicial, `/que-aprender-ia` y `/blog`;
- la estructura del proyecto Next.js y sus componentes de navegacion, progreso, catalogo y SEO;
- los CSV adjuntos de Search Console: paginas, consultas, dispositivos, paises y evolucion diaria;
- las comprobaciones internas disponibles en el repositorio.

El export indica "ultimos 3 meses", pero el grafico contiene datos del **2 de julio al 14 de agosto de 2026**: 44 dias. Por tanto, las conclusiones describen una etapa temprana y no una tendencia anual.

Search Console no informa de sesiones, tiempo activo, profundidad de scroll, leccion siguiente ni retorno. Cualquier afirmacion sobre permanencia seria una hipotesis hasta instrumentarla. Ademas, las tablas exportadas por dimension no arrojan exactamente el mismo total; los porcentajes de concentracion se calculan dentro de cada tabla, no mezclando tablas.

## Lo que Aulafy hace bien

### Propuesta etica y accesible

- Es gratuito y no exige registro.
- Presenta fuentes, estado editorial y limites.
- Enseña a comprobar, no solo a generar.
- Orienta por situaciones humanas: oficina, estudiante, empezar desde cero.
- Incluye practicas y evidencias, una base pedagogica mejor que una coleccion de articulos SEO.
- Tiene version en espanol e ingles y una arquitectura tecnica amplia de metadatos, sitemap y datos estructurados.

### La portada habla a principiantes

El primer bloque evita comenzar con herramientas y usa una promesa comprensible: "Tu primera mision con IA empieza ahora". Tambien ofrece un selector por necesidad y una victoria rapida. La direccion es correcta.

### Hay autoridad tecnica emergente

Las paginas de Ollama, GPU y resolucion de errores ya obtienen impresiones y clics. Aulafy puede ganar autoridad en busquedas tecnicas concretas y usarla para conducir a rutas mas amplias.

## Que esta fallando

## 1. No existe una unica respuesta a "por donde empiezo"

Una persona nueva encuentra simultaneamente:

- "Abrir el curso completo";
- "Elegir mi camino";
- un selector de cuatro situaciones;
- una ruta continua de 28 lecciones;
- tres perfiles de entrada;
- una "Mision 0";
- resultados que puede construir;
- tres niveles;
- un laboratorio interactivo;
- 21 cursos y 310 lecciones.

Cada elemento es razonable por separado. Juntos compiten por la misma decision. La portada reduce la ansiedad en el texto, pero la vuelve a introducir mediante opciones.

**Consecuencia probable:** el visitante entiende que Aulafy tiene mucho contenido, pero no adquiere un compromiso claro con una primera accion.

**Mejora:** una CTA primaria unica en el primer viewport: `Empezar una mision de 15 minutos`. El selector puede aparecer despues o dentro de esa mision. `Cursos` debe ser una salida secundaria para quien ya sabe que busca.

## 2. Hay tres productos educativos superpuestos

Actualmente conviven:

- el curso continuo de 28 lecciones en `/curso-ia`;
- "IA desde cero", con 12 lecciones;
- el catalogo de 21 cursos y 310 lecciones.

No es evidente si "IA desde cero" es un fragmento, una alternativa o el inicio obligatorio del curso continuo. La portada llama "curso completo" al de 28 lecciones, pero destaca "IA desde cero" como punto de partida en otras secciones.

**Mejora estructural:** definir publicamente solo tres capas:

1. **Empieza:** una mision de 15 minutos, sin teoria previa.
2. **Ruta basica:** un unico recorrido de 7 dias o 5 misiones para adquirir criterio.
3. **Biblioteca:** cursos especializados para resolver una necesidad concreta.

El curso de 28 lecciones puede convertirse en "Programa completo" y dejar de competir con el inicio. "IA desde cero" deberia ser la ruta basica o integrarse en ella, pero no mantener dos comienzos equivalentes.

## 3. El catalogo transmite esfuerzo antes que recompensa

En `/cursos`, la primera agrupacion ofrece cursos de 5, 18, 70 y 4 horas. Para alguien inseguro, "47 lecciones / 70 horas" cerca del inicio puede funcionar como coste psicologico. Las tarjetas muestran mucha informacion editorial antes de demostrar una recompensa inmediata: nivel, lecciones, horas, entregable, revision, terminal y estado.

**Mejora:** para principiantes, ordenar por resultado y tiempo hasta la primera victoria:

- "Escribe y revisa un email" - 10 minutos.
- "Resume un documento sin inventar" - 15 minutos.
- "Compara dos respuestas" - 12 minutos.
- "Protege datos antes de pegar" - 8 minutos.

Despues de completar una mision, mostrar el curso al que pertenece. La unidad de descubrimiento debe ser inicialmente la **tarea**, no el curso.

## 4. La navegacion global es demasiado minima para la profundidad real

La cabecera principal expone basicamente `Empezar`, `Cursos` e idioma. El blog, proyectos, laboratorios, recetas y recursos aparecen de forma desigual o solo en pies y paginas internas. Esto simplifica, pero tambien hace que Aulafy parezca una sucesion de micrositios: la portada tiene una identidad visual y una navegacion distintas de las paginas de curso; `/curso-ia` usa otra cabecera; algunas areas historicas mantienen patrones propios.

**Consecuencia probable:** baja memoria espacial. El usuario no siempre sabe donde esta, que ha completado o como volver a su ruta.

**Mejora:** una envolvente comun para todas las experiencias educativas:

- `Inicio`;
- `Mi ruta`;
- `Explorar`;
- buscador;
- indicador local de avance.

En movil, una barra inferior simple puede mantener `Inicio`, `Ruta`, `Buscar` y `Continuar` siempre disponibles.

## 5. La continuidad entre visitas es debil y el mensaje es contradictorio

La ficha de curso afirma que Aulafy no guarda el progreso y que al recargar la actividad vuelve a empezar. Sin embargo, la politica de privacidad dice que el progreso se guarda en el almacenamiento local del navegador. Esta contradiccion afecta a una promesa central.

Ademas, el componente `PortableProgress` declara explicitamente que no se guarda el progreso. Sin cuenta y sin persistencia, un curso de 12, 28 o 47 lecciones exige que el alumno recuerde manualmente donde estaba.

**Mejora inmediata:** decidir una politica unica y aplicarla en todos los textos. La opcion mas util y coherente con la privacidad es:

- guardar solo en `localStorage` lecciones vistas, mision activa y ultima pagina;
- mostrar `Continuar donde lo dejaste` en portada y cabecera;
- ofrecer exportar/importar progreso como JSON o codigo corto local;
- explicar que esos datos no salen del dispositivo;
- permitir borrarlos con un boton claro.

No hace falta una cuenta para ofrecer continuidad.

## 6. La experiencia de leccion antepone contrato y control a la curiosidad

La leccion de iniciacion muestra chips, guia de estudio, prerrequisito, resultados, vocabulario, criterio de superacion, practica, ficha de calidad y despues "Explicacion y ejemplos". Es rigurosa, pero puede sentirse escolar y pesada antes de que ocurra algo interesante.

Para una persona que teme "no saber de IA", el primer minuto deberia producir una accion visible.

**Mejora del orden de una leccion inicial:**

1. Situacion cotidiana de una frase.
2. Boton `Probar ahora`.
3. Ejemplo antes/despues.
4. Explicacion breve de por que funciona.
5. Comprobacion y limite.
6. Evidencia guardada.
7. Siguiente mision.

Los detalles de calidad, fuentes y vocabulario pueden permanecer en bloques desplegables. El rigor no se elimina; se coloca despues de la primera recompensa.

## 7. Aulafy carece de un bucle de retorno

La politica actual descarta newsletter, cuentas y analitica. Esto protege la privacidad, pero tambien elimina casi todos los mecanismos de retorno. La comunidad y el blog existen, pero no forman un bucle visible desde la experiencia principal.

**Alternativas compatibles con privacidad:**

- progreso local y recordatorio dentro de la propia portada;
- RSS por rutas y temas;
- calendario descargable para un reto de 7 dias;
- URL compartible con la mision elegida;
- colecciones "Guarda esta ruta" mediante marcador local;
- notificaciones web solo como opcion posterior y explicita;
- email opcional de baja frecuencia, separado del acceso al contenido, si se decide asumir esa operacion.

## 8. No hay buscador visible pese a tener 300 paginas

El proyecto genera un indice de busqueda, pero no hay una entrada de busqueda visible en la navegacion principal revisada. Con 300 paginas, los enlaces y filtros por intencion no bastan.

**Mejora:** buscador global con lenguaje natural y filtros sencillos:

- `No se que aprender`;
- `Tengo un error`;
- `Quiero hacer algo`;
- `Ya programo`.

Los resultados deben mostrar primero una respuesta o mision, despues el curso y finalmente articulos relacionados.

## 9. La estrategia SEO atrae sobre todo a usuarios tecnicos

### Datos observados

En el export por dispositivos aparecen **59 clics, 4.950 impresiones y un CTR global aproximado del 1,19 %**.

- Escritorio: 38 clics, 4.438 impresiones, CTR 0,86 %, posicion media 15,65.
- Movil: 21 clics, 503 impresiones, CTR 4,17 %, posicion media 11,99.
- Tablet: volumen irrelevante.

El movil genera muchas menos impresiones, pero un CTR claramente mayor. Esto sugiere una oportunidad: el contenido para principiantes y tareas cotidianas podria crecer mejor si se diseña y distribuye con prioridad movil.

En la tabla de paginas:

- las dos URL inglesas principales de Ollama suman 2.506 impresiones y 21 clics;
- las URL con `/en/` representan aproximadamente el 67 % de las impresiones de esa tabla;
- las URL relacionadas con Ollama representan aproximadamente el 52 % de sus impresiones y el 44 % de sus clics;
- solo 26 de las 330 URL listadas obtuvieron algun clic;
- 51 URL acumularon al menos 10 impresiones sin ningun clic.

Las consultas confirman el patron:

- `aulafy`: buen CTR de marca, pero volumen muy pequeno;
- `error: could not connect to ollama app`: necesidad tecnica concreta y clics reales;
- `observabilidad de agentes`: visibilidad emergente, todavia en segunda/tercera pagina;
- `empezar en ia`, `empezar en inteligencia artificial`, `iniciarse en ia`: posiciones 48-62 y cero clics.

### Diagnostico SEO

Google reconoce paginas que resuelven problemas especificos, pero todavia no reconoce a Aulafy como una autoridad para aprender IA desde cero. El contenido generalista compite en consultas amplias con sitios muy consolidados y no tiene aun suficientes enlaces, demanda de marca ni señales de uso.

### Mejora SEO

No intentar posicionar primero una gran pagina para "curso de IA". Construir un **cluster de dudas de principiante**, cada una con una respuesta breve, una practica y enlace a la mision inicial:

- Que puedo hacer con IA si no se programar.
- Como empezar a usar IA por primera vez.
- Que datos no debo pegar en ChatGPT o Claude.
- Como saber si una respuesta de IA es correcta.
- ChatGPT, Claude o Gemini para empezar.
- Ejemplos de IA para oficina sin automatizar nada.
- IA para estudiar sin copiar.
- Mi primera tarea con IA paso a paso.

Cada pagina debe responder la consulta en el primer bloque, incluir un ejemplo visible y terminar en la misma CTA: `Haz la mision de 15 minutos`.

## 10. Los snippets no estan convirtiendo bien

Muchas paginas ocupan posiciones cercanas a la primera pagina, pero tienen CTR inferior al 1-2 %. El caso principal es `/en/courses/ia-local/ollama-gpu-windows`: posicion media 10,85, 1.938 impresiones y CTR 0,88 %.

Esto puede deberse a una combinacion de:

- titulo poco alineado con el problema exacto;
- descripcion demasiado curricular;
- competencia con documentacion, foros y videos;
- ausencia de un beneficio inmediato o version/plataforma en el titulo;
- posicion fluctuante en el limite de primera y segunda pagina.

**Prueba recomendada:** reescribir titulos y descripciones de las 10 paginas con mas impresiones y CTR bajo. Para errores, usar el patron `error exacto + causa + solucion + plataforma`. Para tutoriales, `resultado + herramienta + sistema operativo + año` solo si el año aporta actualidad real.

## 11. El blog mezcla principiantes con actualidad avanzada

La portada del blog abre con Kimi K3, Grok, MCP, agentes y modelos abiertos. Tambien contiene buenas guias para empezar, pero compiten visualmente con actualidad de alta complejidad.

**Mejora:** separar dos productos editoriales:

- **Aprender IA:** contenido evergreen, ordenado por problema y nivel.
- **Radar:** noticias y cambios de modelos para lectores tecnicos.

Una persona nueva no deberia interpretar que para empezar necesita entender parametros, MoE, MCP o agentes.

## Arquitectura recomendada

```text
Inicio
├── Empieza aqui
│   ├── Mision 1: una tarea util en 15 minutos
│   ├── Resultado y comprobacion
│   └── Ruta basica de 7 dias
├── Resolver algo
│   ├── Trabajo
│   ├── Estudio
│   ├── Crear una web
│   └── Programar
├── Biblioteca
│   ├── Cursos
│   ├── Guias
│   ├── Recetas
│   └── Proyectos
├── Radar tecnico
└── Mi ruta (progreso local)
```

### Nueva portada propuesta

**Primer viewport**

- H1: `Aprende IA haciendo una tarea util hoy.`
- Apoyo: `No necesitas programar ni elegir una herramienta antes de empezar.`
- CTA unica: `Empezar una mision de 15 minutos`.
- Enlace secundario: `Ya se lo que busco`.
- Prueba social verificable cuando exista: numero de misiones completadas o ejemplos enviados, no solo numero de lecciones.

**Segundo bloque**

Tres resultados concretos: escribir, estudiar y organizar trabajo. No categorias tecnicas.

**Tercer bloque**

Demostracion interactiva antes/despues con datos ficticios.

**Cuarto bloque**

Continuar ruta, para visitantes recurrentes; elegir situacion, para nuevos.

**Quinto bloque**

Confianza: gratis, privacidad local, fuentes y revision humana.

El catalogo completo no necesita aparecer en la portada. Basta con un enlace al final.

## Sistema de retencion recomendado

### Progreso local

Guardar, sin enviar al servidor:

- identificador de mision;
- estado `iniciada/completada`;
- ultima leccion visitada;
- fecha local del ultimo acceso;
- evidencias solo si el usuario decide escribirlas y entiende donde se guardan.

Mostrar siempre:

- `Continuar: comprobar una respuesta`;
- porcentaje solo dentro de una ruta corta;
- siguiente accion unica;
- opcion `Empezar de nuevo` y `Borrar mis datos locales`.

### Diseno de misiones

Cada mision inicial debe durar 8-15 minutos y tener:

1. una situacion reconocible;
2. una entrada ficticia preparada;
3. un boton o campo para actuar;
4. un resultado visible;
5. un error que detectar;
6. una comprobacion;
7. una evidencia pequena;
8. una sola recomendacion siguiente.

### Recomendacion sin caja negra

El selector actual basado en reglas es adecuado para la filosofia del sitio. Debe entregar una sola recomendacion, explicar por que y permitir cambiarla. La respuesta ha de convertirse en "Mi ruta" para no obligar a repetir el selector.

## Medicion necesaria

Sin medicion de comportamiento no se puede saber si la gente permanece mas tiempo. Es posible medir de forma respetuosa con privacidad, sin cookies publicitarias ni perfiles personales.

### Eventos minimos

- `landing_view`;
- `mission_start`;
- `mission_complete`;
- `lesson_25`, `lesson_50`, `lesson_90` por profundidad;
- `next_lesson_click`;
- `continue_return`;
- `route_selected`;
- `search_used`;
- `search_no_results`;
- `external_source_open`;
- `feedback_useful`.

No registrar prompts, respuestas, contenido escrito, IP completa ni identificadores persistentes.

### Embudo principal

```text
Visita portada
  -> inicia mision
  -> completa practica
  -> guarda avance local
  -> abre siguiente mision
  -> vuelve en 7 dias
```

### Metricas de exito

- porcentaje que inicia la primera mision;
- porcentaje que la termina;
- clic a siguiente leccion;
- retorno a 7 y 30 dias;
- misiones terminadas por visitante;
- busquedas sin resultado;
- CTR organico por cluster de intencion;
- proporcion de trafico principiante frente a trafico tecnico.

El tiempo bruto en pagina no debe ser la metrica principal: una pagina confusa tambien puede producir sesiones largas. Priorizar finalizacion, siguiente accion y retorno.

## Plan priorizado de 90 dias

### Fase 1: corregir continuidad y mensaje (semanas 1-2)

1. Elegir un unico inicio oficial entre curso continuo e IA desde cero.
2. Reducir el primer viewport a una CTA primaria.
3. Corregir la contradiccion sobre progreso local en curso, privacidad y cookies.
4. Implementar `Continuar donde lo dejaste` con almacenamiento local.
5. Anadir buscador visible en cabecera.
6. Unificar cabeceras, breadcrumbs y siguiente accion en las areas principales.

### Fase 2: construir el producto para principiantes (semanas 3-6)

1. Crear una ruta de 5-7 misiones cortas.
2. Reordenar las lecciones iniciales para mostrar practica antes que contrato pedagogico.
3. Convertir cuatro necesidades cotidianas en paginas de entrada.
4. Separar blog evergreen de radar tecnico.
5. Crear una pagina `Mi ruta` completamente local.

### Fase 3: medir y mejorar adquisicion (semanas 7-12)

1. Instalar analitica respetuosa con privacidad o telemetria propia agregada.
2. Crear el cluster SEO de dudas de principiante.
3. Optimizar snippets de las 10 paginas con mas impresiones y CTR bajo.
4. Enlazar tutoriales tecnicos exitosos con prerrequisitos y rutas siguientes.
5. Revisar semanalmente el embudo y mensualmente Search Console.
6. Ejecutar cinco pruebas de usabilidad con personas que nunca hayan usado IA.

## Experimentos concretos

### Experimento A: una CTA frente a dos

- Variante actual: curso completo + elegir camino.
- Variante: `Empezar una mision de 15 minutos`.
- Metrica: inicio y finalizacion de mision.

### Experimento B: practica antes de teoria

- Variante actual: contrato, objetivos y vocabulario antes de explicacion.
- Variante: situacion, prueba y resultado antes de conceptos.
- Metrica: practica iniciada y clic a siguiente leccion.

### Experimento C: tarea frente a curso

- Variante actual: tarjetas de cursos con horas y lecciones.
- Variante: tarjetas de tareas de 10-15 minutos.
- Metrica: apertura, finalizacion y continuacion.

### Experimento D: progreso local

- Variante actual: sin continuidad visible.
- Variante: `Continuar donde lo dejaste`.
- Metrica: retorno y siguiente leccion.

## Mejoras tecnicas y editoriales adicionales

- Completar una auditoria automatica de enlaces internos. El script actual `verify-links` solo confirmo tres enlaces publicos de GitHub y ausencia de referencias antiguas; no valida todo el grafo interno.
- Auditar las aproximadamente 300 paginas para comprobar H1, metadata, canonical, alternates, enlaces entrantes y profundidad desde la portada. El recuento simple detecta muchas paginas con metadata, pero no demuestra calidad ni unicidad.
- Crear plantillas de titulo y descripcion por intencion: aprender, resolver error, comparar y construir.
- Evitar fechas futuras o claims demasiado volatiles sin una politica clara de actualizacion.
- Mostrar fecha de revision y fuentes sin convertirlas en el protagonista de la primera pantalla.
- Sustituir emojis decorativos por un sistema visual consistente cuando no aporten significado.
- Mantener la version inglesa, pero no dejar que su exito tecnico defina toda la identidad editorial del producto.

## Que no haria todavia

- No crearia mas cursos largos antes de resolver el inicio y la continuidad.
- No anadiria un chatbot generico en portada: suma otra decision y puede ocultar la ruta pedagogica.
- No exigiria registro para guardar progreso.
- No intentaria posicionar cientos de paginas nuevas de baja profundidad.
- No mediria exito solo por paginas publicadas, tiempo bruto o impresiones.
- No eliminaria los tutoriales tecnicos que ya funcionan; los usaria como puertas de entrada a rutas coherentes.

## Conclusion

Aulafy tiene contenido suficiente para ser util y una filosofia editorial diferenciada. Lo que falta es transformar una biblioteca extensa en una experiencia que recuerde al alumno.

La prioridad no es publicar la leccion 311. Es lograr que una persona que llega sin saber de IA:

1. entienda en cinco segundos que puede empezar;
2. obtenga una victoria en 15 minutos;
3. sepa exactamente cual es el siguiente paso;
4. pueda volver sin perder su lugar;
5. confie en que aprendera a comprobar, no a obedecer a una herramienta.

Si Aulafy resuelve ese recorrido, el catalogo deja de parecer una masa de contenido y empieza a funcionar como una ventaja competitiva.
