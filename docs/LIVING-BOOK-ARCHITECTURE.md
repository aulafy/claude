# Aulafy: arquitectura del libro vivo

Fecha de diseno: 2026-09-12. Estado: propuesta implementada parcialmente en una rama local, sin despliegue. Idioma de referencia provisional: espanol, con ingles enlazado por revision. Pendiente de la decision del editor.

## 1. Decision de producto

Aulafy sera un libro abierto para aprender a usar IA, de principiante a avanzado. La unidad de valor es una habilidad demostrada, no una noticia ni una pagina visitada. Cada capitulo debe terminar con un resultado que el lector pueda comprobar.

No existe una arquitectura inmune a todos los cambios futuros. Esta reduce el coste de cambiar herramientas, modelos, idiomas y canales de entrada mediante contratos versionados, datos exportables y componentes reemplazables.

**Contrato publico:** lectura libre, sin cuenta, sin cookies, sin publicidad ni analitica de usuarios. El progreso opcional se guarda solo en el dispositivo y puede borrarse. El codigo conserva MIT. Antes de incorporar material ajeno se revisan sus derechos: una licencia de codigo no concede derechos sobre textos, capturas o marcas externas. El alojamiento puede mantener registros tecnicos; no prometer ausencia absoluta de cualquier dato de infraestructura.

## 2. Evidencia sobre la base actual

Aulafy Evidence ha comprobado una instantanea del repositorio `claude`, commit `1e146d426c81cb2396fb9f3fc0c2a08336b2b6ad`: 621 archivos incluidos, 329 declaraciones de ruta, 942 relaciones de importacion. No son una prueba del estado de produccion ni del total de URLs dinamicas.

- `lib/content/` ya tiene identidad estable, hashes y un registro de contenido. Se conserva.
- `content/` contiene 10 documentos canonicos: 2 cursos, 7 lecciones y 1 proyecto. Todavia no equivale a la biblioteca legacy.
- La leccion canonica `ollama-context-window` tiene un cuerpo de 27 palabras. `lib/ollama-context-window-lesson.ts` conserva material anterior mas extenso. Es un candidato de migracion, no una equivalencia pedagogica demostrada.
- `lib/chatbot-course-content.json` contiene 39 marcadores de extraccion fallida. No debe ser la fuente maestra para reconstruir el libro.
- Existen `lib/editorial-intake.ts`, los scripts de radar Grok y tutorial factory, y un contrato `ModelProvider`. No se activan automaticamente ni se consideran un pipeline de publicacion completo.
- La entrada editorial actual clasifica dominios por heuristica. Un dominio conocido no demuestra que una pagina concreta sea primaria ni que respalde una afirmacion.

No se borra ni redirige contenido legacy en esta fase. La nueva rama y las rutas `/book` permanecen en vista previa local.

## 3. Tres ritmos de cambio

| Capa | Ejemplos | Revision objetivo | Regla |
| --- | --- | --- | --- |
| Fundamentos | formular tareas, evaluar resultados, descomponer problemas | trimestral y ante incidentes | No dependen de un proveedor |
| Procedimientos | instalar una herramienta, usar una API, configurar contexto | semanal o ante version nueva | Variante con version y entorno probado |
| Datos volatiles | limites, disponibilidad, precios, licencias, nombres de modelos | diaria para fuentes seleccionadas | Afirmaciones con evidencia y caducidad propias |

Las frecuencias son politicas editoriales configurables, no garantias de frescura. Distinguir `detectedAt`, `fetchedAt`, `verifiedAt`, `publishedAt` y `translatedFromHash`. Una pagina descargada hoy puede contener informacion antigua. La fecha de publicacion no cambia por pasar un chequeo sin modificaciones.

## 4. Arquitectura

```text
ENTRADAS (no confiables)
Markdown/JSON | colaboracion Git | releases/RSS | Grok/X | otras IA
                 |
         adaptador + validacion + deduplicacion
                 |
             SignalInbox
                 |
    fuentes autorizadas -> SourceSnapshot -> diferencias
                 |                              |
      Aulafy Evidence: archivos, citas e impacto |
                 +------------+-----------------+
                              |
                     ChangeProposal
                              |
         comprobacion tecnica + revision editorial humana
                              |
                  PR contra revision conocida
                              |
     validacion -> traducciones -> preview -> aprobacion
                              |
                 ReleaseManifest inmutable
                              |
          Next.js: HTML / busqueda / Markdown / feeds
```

Un **monolito modular** basta al principio. Git es la fuente editorial; no se necesita una base vectorial, una base de grafos ni un modelo entrenado para publicar el libro. Los indices y embeddings son derivados reconstruibles. Si las colas superan lo manejable por archivos/Git, se cambia su repositorio por PostgreSQL sin mover el contenido canonico.

### Fronteras de responsabilidad

| Modulo | Es propietario de | No hace |
| --- | --- | --- |
| `book/` | indice y material del piloto en Markdown/JSON | no ejecuta MDX ni llama a modelos |
| `lib/living-book/` | contratos, hashes, carga, impacto y criterios de publicacion | no depende de React ni de proveedor IA |
| `scripts/living-book.mjs` | validacion, intake local y cola de revision | no hace push ni despliega |
| `components/living-book/` | lector y progreso local opcional | no guarda claves ni revisa fuentes |
| `app/book/` | rutas de preview, metadatos y exportacion | no expone inbox ni herramientas de administracion |
| Evidence | busqueda trazable en fuentes y mapa legacy | no es la autoridad editorial ni verifica Internet |
| conectores futuros | descargar fuentes o producir candidatos | no aprueban ni publican |
| publisher futuro | ensamblar una revision aprobada y activar una release | no genera texto |

`book/` es un espacio piloto, no un segundo CMS permanente. Cuando se valide el lector, su adaptador se integra en el registro canonico existente, con una migracion de esquema explicita. No se ensancha el parser MDX antiguo de forma incompatible.

## 5. Contratos de datos

Todas las entradas externas llevan `schemaVersion`. Una version mayor desconocida se rechaza; no se intenta adivinarla. Los IDs son independientes del slug y del idioma.

| Entidad | Campos esenciales | Invariantes |
| --- | --- | --- |
| Part / ChapterPlan | id, orden explicito, nivel, objetivos, estado | ninguna entrada planificada simula una leccion existente |
| Chapter | id, prerrequisitos, riesgo, claims, metadatos por idioma, Markdown | identidad estable; grafo sin ciclos; practica y resultado observable |
| LocalizedRevision | chapterId, locale, contentHash, basedOnSourceHash | traduccion invalida cuando cambia la revision de referencia |
| Source | id, URL exacta, tipo, responsable, intervalo | se autoriza la fuente concreta, no todo un dominio |
| SourceSnapshot | sourceId, fetchedAt, hash, extractorVersion, estado HTTP | error de descarga no renueva una verificacion |
| Claim | id, sourceIds, alcance, volatilidad | un cambio de fuente identifica los capitulos que dependen de ella |
| ClaimReview | claimId, sourceSnapshotHashes, veredicto, verificador, verifiedAt | una hash distinta invalida el respaldo anterior |
| Signal | canal, resumen, sourceIds, targetIds, observedAt, hash | dato no confiable; misma propuesta no crea duplicados |
| ChangeProposal | baseRevision, afectados, diff, evidencia, riesgos, coste | conflicto de revision bloquea publicacion |
| Approval | revisionHash, reviewer, reviewedAt, comprobaciones | una aprobacion no sobrevive a una edicion posterior |
| ReleaseManifest | commit, revisionHash por idioma, assets, rutas, redirectMap, gates | despliegue atomico de una revision completa |

El piloto implementa el indice, Markdown por idioma, revision localizada, fuentes/claims, normalizacion de señales, impacto y gates locales. Las firmas de revisores, snapshots remotos, PR y ReleaseManifest son contratos de la siguiente fase, no servicios ya activos.

### Arbol editorial

```text
book/
  catalog.json
  sources.json
  claims.json
  chapters/<stable-id>/
    chapter.json
    es.md
    en.md
lib/living-book/
  schema.ts
  engine.ts
scripts/living-book.mjs
book-runtime/                 # ignorado por Git; nunca servido al lector
  inbox/<signal-hash>.json
  reports/<run>.json
```

Un capitulo define objetivo, requisitos, pasos numerados, resultado esperado, un error reconocible, rubrica de comprobacion y siguiente paso. Las recetas y fichas de referencia se enlazan desde el recorrido, sin interrumpirlo. Esta separacion se inspira en las cuatro necesidades de [Diataxis](https://diataxis.fr/): tutoriales, guias de tarea, referencia y explicacion.

## 6. Vias de actualizacion

| Via | Uso | Entrada al sistema | Activacion |
| --- | --- | --- | --- |
| Editor / Codex | correccion o nuevo capitulo | Markdown + JSON / diff Git | intake local implementado |
| Documento aportado | reutilizar texto del editor | candidato, fuente y objetivo | Markdown local implementado; DOCX/PDF pendiente de extractor |
| Grok con X | detectar dudas, incidentes y novedades | Signal con URLs y fecha | JSON importable; ejecucion Grok no activada |
| Releases GitHub | detectar cambios de herramientas | Signal + version/tag | adaptador pendiente |
| RSS / changelog | seleccionar fuentes recurrentes | SourceSnapshot + diferencias | adaptador pendiente |
| IA local o API | resumir diferencias, proponer ejercicios, traducir | ChangeProposal validada | proveedor pendiente; ninguna clave necesaria para leer |
| Comunidad | correcciones y experiencias | issue/PR moderado | reutilizar GitHub; sin registro propio en Aulafy |

Grok es un sensor de demanda, no el notario del contenido. Los resultados de busqueda, ficheros y respuestas de modelos se tratan como datos no confiables. Nunca se ejecutan sus instrucciones ni comandos. Una URL valida no prueba una afirmacion.

## 7. Operacion diaria propuesta

1. Un disparador diario, con lease y clave idempotente, carga la lista de fuentes autorizadas.
2. Cada conector aplica timeout, limite de bytes, reintentos acotados y backoff. Solo HTTPS, sin IP privadas ni credenciales en URLs; redirecciones vuelven a validarse. El fetcher aislado no tiene secretos ni acceso a la red interna.
3. Guarda metadatos y hash; el texto completo de terceros solo si esta permitido. Un extractor versionado evita comparar navegacion o publicidad. La primera lectura establece baseline, no anuncia una novedad.
4. Compara revisiones y enlaza Source -> Claim -> Chapter -> traducciones y ejercicios. Cambiar un banner no demuestra un cambio semantico.
5. Ordena la cola por seguridad, rotura reproducible, caducidad y alcance. El coste o la popularidad no decide la veracidad.
6. Crea un borrador y un diff contra un commit concreto; a lo sumo el presupuesto y el numero de propuestas configurados. Un timeout de IA deja el borrador anterior intacto.
7. Ejecuta checks. Una version nueva de herramienta no se incorpora hasta probar el procedimiento en un entorno desechable autorizado.
8. El revisor aprueba la revision concreta. Se genera la traduccion; si no esta revisada, se mantiene la anterior con aviso o se retira esa variante de la nueva release.
9. Publica una release aprobada y registra cambios pedagogicos. Si no hubo cambios relevantes, registra la comprobacion sin republicar capitulos.
10. Un watchdog externo al mismo scheduler avisa si no hay ejecucion exitosa en 36 horas. Fallos individuales marcan fuente degradada; no ocultan la ultima edicion buena.

GitHub Actions puede ser el primer ejecutor, pero su [programacion puede retrasarse o perder ejecuciones bajo carga](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule). La arquitectura no promete puntualidad por tener un cron. El scheduler es intercambiable y no se activa en este piloto.

## 8. Publicacion y recuperacion

Estados: `received -> scoped -> drafted -> checked -> reviewed -> approved -> released -> superseded`. Las ramas de rechazo son `needs-evidence`, `conflict`, `quarantined` y `failed`. Ningun estado se salta por una puntuacion de un LLM.

Gates obligatorios para cada revision: esquema, referencias, grafo, rutas, ausencia de HTML/MDX ejecutable, comprobaciones del ejercicio, fuentes relevantes revisadas, vigencia de traduccion, accesibilidad, enlaces y revision editorial. Comandos, instalacion, seguridad y datos requieren tambien revision tecnica y entorno/resultado de prueba. No ejecutar codigo de PRs externos con secretos.

La autorizacion real la impondran PR y [reglas de rama protegida](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), separando permisos de generar borradores y de publicar. El objeto Approval del piloto es un contrato comprobable, no autenticacion de personas.

Preparar build completo, tests y manifiesto antes de cambiar la release activa. Tras activacion: smoke test HTTP de rutas representativas y hashes de assets. Si falla, restaurar la ultima release buena sin editar el contenido para ocultar el incidente. Conservar Git y manifest; los indices se regeneran. Probar restauracion regularmente.

La migracion legacy conserva URLs hasta tener equivalencias verificadas. Un capitulo corto no justifica borrar la leccion extensa. Cada equivalencia necesita sourcePath/hash, decision humana, pruebas de ruta y destino; redireccion permanente solo despues de comprobar la equivalencia. Registrar paginas sin equivalente, no enviarlas todas a la portada.

## 9. Independencia de modelos

No fijar nombres de modelos en contenido, componentes o reglas del pipeline. La configuracion asigna capacidades a tareas: deteccion, extraccion, redaccion, traduccion y revision asistida. Cada adaptador declara structured-output, contexto util, tool-use, coste estimado, politica de datos y limites.

Extender el contrato de proveedor existente mediante una version nueva, sin romper el tutor. El request contiene schema, referencias permitidas, deadline, limite de tokens/coste y clave idempotente. El response registra proveedor, modelo/version, promptVersion, sourceHashes, usage, rechazo y resultado validado. Una caida permite fallback compatible o abstencion, nunca publicacion sin checks.

Antes de cambiar modelo o prompt: ejecutar un conjunto fijo de casos con cambios reales, falsos positivos, instrucciones maliciosas, fuentes contradictorias, traducciones obsoletas y errores de comandos. Comparar resultados, coste y latencia. La coincidencia entre dos modelos no sustituye evidencia primaria ni pruebas.

No se envian documentos privados, repos privados, datos del lector ni claves a proveedores sin autorizacion. No se necesita chat embebido para que el libro sea util.

## 10. Libro y frontend

Ocho partes: empezar; trabajar con informacion; crear y comunicar; automatizar; IA local; construir aplicaciones; evaluar y proteger; operar proyectos avanzados. Cada parte tiene prerrequisitos y un proyecto de salida. El piloto incluye veinticuatro capitulos iniciales bilingues; el resto es indice propuesto, no contenido fingido.

Lector editorial: masthead Aulafy, tipografia serif para lectura, indice lateral, columna de lectura limitada, sumario del capitulo, pasos y ejercicios, navegacion anterior/siguiente y un estado editorial honesto. Sin grafo 3D ni feed infinito en el recorrido principal.

Funciones: busqueda de capitulos, enlaces estables, selector ES/EN con la misma identidad, copiar ejercicios, descargar Markdown, imprimir, progreso local por revision, borrar progreso y fuentes visibles. Marcar como completado es una autoevaluacion, no una acreditacion de dominio.

La lectura no depende de APIs ni de login. La entrega objetivo es HTML prerenderizado por revision; interactividad pequena y progresiva. Vista previa con `noindex`, sin sitemap publico y deshabilitada salvo bandera local. Al publicar: canonical correcto por idioma, hreflang solo para traducciones existentes, sitemap con fechas reales, enlaces internos comprobados, feed de cambios y Markdown para herramientas IA. No prometer posicionamiento por etiquetas "AI SEO".

## 11. Plan verificable

| Hito | Entrega | Criterio de salida |
| --- | --- | --- |
| A. Piloto local | contratos, indice, 24 capitulos ES/EN, lector y cola local | tests de hashes, ciclos, intake, gates; QA escritorio/movil |
| B. Migracion | mapa completo Evidence -> capitulo, primera parte revisada | cero perdidas silenciosas, rutas auditadas y aprobacion del editor |
| C. Vigilancia | 5-10 fuentes seleccionadas, snapshots, diff y watchdog | reintentos/idempotencia, prueba de caida y cero autopublicaciones |
| D. IA editorial | adaptador elegido, presupuesto, evals y PRs | candidato trazable y mejora medida frente al trabajo manual |
| E. Publicacion | permisos, manifest, SEO y rollback | prueba de restauracion y autorizacion explicita de pasar a live |
| F. Extension | resto de partes, variantes de herramientas y traducciones | mismo contrato pedagogico y revision; sin multiplicar paginas vacias |

## 12. Decisiones que necesita el editor

1. Idioma de referencia: espanol o ingles. Ambos se mantienen, pero una revision manda sobre la traduccion.
2. Quien aprueba contenido y quien revisa cambios tecnicos de riesgo. No inventar un equipo.
3. Primer lector prioritario: persona sin base tecnica, profesional o programador. Provisionalmente: persona sin base tecnica, con ramificaciones posteriores.
4. Presupuesto mensual y proveedores autorizados para automatizar. Hasta confirmarlo: cero llamadas de pago y ninguna clave solicitada en el chat.
5. Frecuencia/disponibilidad de revision y 5-10 fuentes iniciales. Propuesta: demanda real de los capitulos activos, no vigilar todas las noticias de IA.

No se necesitan estas respuestas para construir el piloto local. Si no llegan, se conserva ES como fuente, revisiones pendientes y automatizacion desactivada. GitHub/Vercel y credenciales se revisaran solo al autorizar la fase de publicacion.
