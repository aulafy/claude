# Revision del libro de Aulafy: instrucciones para Luna

Fecha: 2026-09-12. Revision del worktree local `codex/aulafy-living-book`.
Directorio: `/Users/mac/Documents/Codex/2026-06-27/hay/work/aulafy-living-book`.

## Veredicto

Hay 24 borradores bilingues y un lector funcional. No equivale a un curso terminado ni a un libro actualizado diariamente. Durante esta revision se corrigieron el selector estable del lector, el parser de colores, el falso verde de contraste, la paleta de tablas/codigos y dos rutas legacy rotas. El contraste ahora tiene una asercion de cobertura, una prueba negativa y una matriz visual completa; aun falta cobertura de Safari/WebKit.

Este documento conserva el informe y los pendientes; las correcciones P0/P1 visuales realizadas durante esta sesion son cambios locales sin publicar. Conservar los cambios existentes. Muchos archivos del libro siguen sin seguimiento en Git: no hacer clean, reset ni cambiar de checkout para empezar de nuevo.

## Evidencia ejecutada

- Los 15 tests de `npm run test:living-book` pasan en esta revision. Cubren contratos, rutas legacy y bloqueos simulados; no demuestran calidad pedagogica ni aprobacion editorial del corpus.
- Inspeccion estructurada con `loadBook()`: 24 capitulos. Las 24 vinculaciones ES/EN coinciden con la revision ES tras actualizar `read-documents` y `write-edit`.
- Comprobacion de rutas de procedencia con `fs.existsSync`: `legacy-data` y `final-project` apuntan ahora a `public/recursos/ia-pymes/kit-flujo-fiable-pyme.md`, que existe.
- Probe independiente en Chrome sobre `/book/es/write-edit`: `.book pre` selecciona 0 elementos; `pre` selecciona 1. La raiz usa `Book_book__Uqmwi`.
- El ejercicio y los codigos de procedencia tienen ahora una paleta clara comprobada; el test sigue pendiente de ampliar la cobertura para colores CSS modernos.
- El parser de color fue corregido para RGB, RGBA y hex; los formatos que el navegador no puede normalizar deben seguir produciendo una incidencia explicita si aparecen.
- Inspeccion visual de `club-exercise-es-375.png` y `club-exercise-en-375.png`: el texto se ve completo, los saltos de linea no cortan palabras y el recuadro mantiene sus limites. Se generaron capturas focalizadas para ambos idiomas en 375, 768, 1440 y 1920 px.
- Se relanzo el script de navegador corregido contra el preview local: termino con `passed: true` y `disabledPreviewChecked: false` despues de medir elementos reales. No se probo Safari, despliegue Vercel ni la bandera de preview desactivada.

## P0: contraste reparado; ampliar su cobertura

Archivo: `scripts/test-living-book-browser.mjs`, funcion `assertReadableText`.

Problemas independientes:

1. `.book` no existe como clase literal por CSS Modules. El bucle procesa cero elementos.
2. El patron RGB tiene barras duplicadas y no reconoce colores RGB normales.
3. Los colores CSS modernos como `color(srgb ...)` no se interpretan y se omiten silenciosamente.
4. El umbral de texto grande usa 18/14 pixeles; corresponde usar 24 px normal o aproximadamente 18.67 px negrita para el criterio AA de texto grande.
5. No se exige un numero positivo de textos medidos. La prueba puede aprobar sin medir.
6. La matriz movil visita principalmente `first-task`; ahora ejecuta contraste y overflow en 375, 768 y 1920 px, mientras la matriz de rutas cubre los capitulos en ES/EN a 1440 px. No equivale a cobertura visual exhaustiva de cada capitulo en cada ancho.

Correcciones aplicadas: se añadió `data-book-root`, se corrigió el parser RGB/hex, se exige `measured > 0`, se incorporaron colores claros para tablas, bloques de código y procedencia, y se registra cobertura por etiqueta. La matriz actual comprueba ES/EN, rutas, overflow, contraste móvil, una anchura equivalente a zoom del 200 %, no-JS y el texto del club de lectura; la última ejecución midió 9.279 elementos acumulados: 2.615 enlaces, 1.573 `span`, 1.694 elementos de lista, 964 párrafos, 1.016 `h2`, 67 `pre` y 235 `code`.

Pendientes:

- Los colores CSS modernos no evaluables ya se registran como incidencia explícita en el verificador; si aparece uno en el futuro, la ejecución fallará en lugar de omitirlo.
- La cobertura por tipo ya se registra en la salida; conservarla cuando se amplíe la matriz.
- La prueba negativa ya está integrada: introduce texto oscuro sobre fondo oscuro, comprueba el fallo esperado y retira la mutación antes de continuar.
- Medir el ejercicio completo de tres lineas que dio el usuario tambien en EN, con y sin JavaScript y a 375, 768, 1440 y 1920 px. La matriz ya comprueba el texto ES/EN, el contraste de `first-task` en los anchos móviles, el contenido sin JavaScript y guarda capturas focalizadas del recuadro `club-exercise-{es,en}-{375,768,1440,1920}.png`. Queda revisar esas capturas en Safari/WebKit.
- La llamada duplicada a `assertReadableText` en el bucle de rutas ya fue eliminada.

Criterio de aceptacion: informe con numero de elementos medidos, cobertura de rutas/tamanos y prueba negativa fallida por el motivo esperado. El contador, los tipos y la prueba negativa ya están integrados; queda cubrir WebKit. No basta `passed: true`.

## P1: terminar el aislamiento visual del lector

Archivos: `components/living-book/Book.module.css`, `app/globals.css`, `components/living-book/BookViews.tsx`.

El arreglo actual alcanza bloques de ejercicio, tablas y `code` inline de procedencia. La matriz ya cubre overflow, contraste, una anchura equivalente a zoom del 200 %, conserva el ejercicio al emular impresión y detecta un indicador de foco visible al navegar con teclado. Queda revisar enlaces, estados deshabilitados, selección y la composición impresa con criterio editorial. Los controles inactivos tienen excepciones de contraste, pero deben seguir siendo identificables.

Criterio: ningun texto normal activo por debajo de 4.5:1 en fondos uniformes evaluables; revisar visualmente los restantes. No afirmar compatibilidad Safari basandose en Chromium: probar WebKit y, si se declara Safari real, probar Safari instalado.

## P1: mantener traducciones y su trazabilidad

Metadatos: `book/chapters/read-documents/chapter.json` y `book/chapters/write-edit/chapter.json`.

Las dos vinculaciones detectadas fueron actualizadas y ahora coinciden con `revisionHash`. Mantener una revision semantica cuando cambie ES; no copiar un hash como sustituto de esa revision. El motor ya detecta `translation-outdated` en sus bloqueos. Anadir un informe de salud del corpus que distinga valido estructuralmente, traducido y publicable.

Criterio: las 24 vinculaciones coinciden, existe dossier de revision bilingue y no se inventan aprobaciones humanas.

## P1: convertir los borradores en lecciones realizables

Los cuerpos ES revisados contienen aproximadamente 322-582 palabras y anuncian 12-60 minutos. La duracion puede incluir practica, pero esa practica debe estar suministrada. El recuento no es una medida de calidad: ampliar con material util, no relleno.

Ejemplos concretos:

- `local-first-run`: manda instalar un programa sin elegir herramienta, sistema, version, pasos ni comprobacion ejecutable. Incluso pide conservar tres hechos sin suministrar esos tres hechos en la entrada de su prueba minima.
- `final-project`: pide al lector crear 10-20 casos y entregar un flujo, pero no proporciona proyecto de partida, datos completos, ejecucion de referencia ni rubrica detallada. Es una consigna de proyecto, no una implementacion guiada.
- `legacy-data`: describe migrar y restaurar pero no proporciona muestra antes/despues, invariantes comprobables ni simulacion de recuperacion.
- `learning-project`: pide elegir tema y ejercicio; falta una sesion completa con intento, pista, correccion y prueba de transferencia.

Plantilla de trabajo para cada capitulo:

1. Resultado observable, requisitos y tiempo dividido entre lectura y practica.
2. Datos ficticios completos y material listo para usar.
3. Pasos numerados, con resultado esperado tras cada paso.
4. Una solucion comentada y una variante incorrecta que el lector deba diagnosticar.
5. Criterios concretos para comprobar su propio resultado.
6. Variante sin cuenta/API cuando sea posible, claramente diferenciada de ejecutar un modelo real.
7. Fuentes primarias para comandos, compatibilidad o limites variables, con fecha y version verificadas.
8. Version EN equivalente y dossier con lo que se ejecuto realmente.

Prioridad: completar una leccion piloto de IA local y una de migracion; comprobarlas de principio a fin antes de replicar el patron. No aumentar paginas para cumplir una cifra.

## P1: corregir procedencia y uso del contenido antiguo

`legacy-data` y `final-project` ya apuntan a `public/recursos/ia-pymes/kit-flujo-fiable-pyme.md`, que existe. Falta documentar qué fragmentos se reutilizaron y qué redacción es nueva; no presentar la mera existencia del archivo como trazabilidad suficiente.

BookViews muestra el mismo texto de procedencia de fundamentos en todos los capitulos. El mapa inicial esta en `docs/editorial/legacy-map.md`; falta reflejar sus decisiones en los dossiers y hacer que la procedencia de la interfaz refleje el material real. La validacion de existencia para rutas locales ya esta cubierta por un test. No publicar rutas internas como unico enlace util para estudiantes.

## P1: falta el circuito de actualizacion diaria

El lector declara correctamente que la vigilancia y publicacion diaria no estan activas. `book/claims.json` tiene solo dos afirmaciones enlazadas (`local-context` y `local-first-run`, esta ultima por el enlace inverso chapterIds). Existe un motor de impacto y entrada de candidatos; eso no significa que los 24 capitulos esten cubiertos por fuentes verificadas.

Trabajo necesario, por etapas:

1. Inventariar afirmaciones variables por capitulo y enlazarlas a fuentes oficiales concretas. No hace falta convertir cada frase estable en una claim.
2. Guardar capturas fechadas, hashes, estado de descarga y cambios; distinguir descarga correcta de verificacion de contenido.
3. Conectar esos cambios con candidatos de revision y un diff ES/EN. Grok, modelos locales y Groq aportan propuestas, no evidencia primaria por si solos.
4. Mantener adaptadores configurables, limites de coste y secretos fuera del repo; comprobar disponibilidad real de las herramientas antes de prometer ejecuciones.
5. Integrar revisiones durante las sesiones que pide el propietario. No activar cron ni desplegar por inferencia.
6. Registrar revision, pruebas, aprobacion real cuando corresponda y rollback de cada edicion.

Criterio: demostrar con una fuente modificada una propuesta trazable que actualiza un capitulo y su traduccion, y con una fuente caida un estado pendiente sin inventar actualidad. No usar la fecha del dia como prueba de actualizacion.

## P2: estados y documentacion desfasados

- `BookViews.tsx`, Changes: el texto de cambios fue actualizado a 24 capítulos, pero sigue siendo un resumen estático. Mostrar cambios reales por revisión cuando exista el historial.
- El ultimo capitulo ofrece una siguiente parte/en preparacion aunque el indice inicial ya esta lleno. Ajustar el cierre del recorrido.
- Handoff y arquitectura conservan frases como 'el resto es un indice' tras afirmar que hay 24/24. Revisar contradicciones.
- La vista editorial presenta estados estaticos y no todos los bloqueos calculados. Mostrar traduccion, fuentes y revisiones pendientes desde el reporte real, sin confundirlos con aprobacion humana.
- Ampliar tests de navegacion sin JavaScript, descarga y progreso a casos representativos EN y movil. La prueba actual de no-JS solo confirma texto de un capitulo.
- Probar el preview desactivado en servidor separado y registrar ese resultado; el script original lo omite sin `BOOK_DISABLED_URL`.

## Orden de ejecucion para Luna

1. Leer AGENTS.md, contratos y esta auditoria. Consultar documentacion Next instalada antes de cambios de framework.
2. Reparar el verificador y reproducir el fallo visual con prueba negativa.
3. Corregir CSS y aportar evidencia visual focalizada.
4. Revisar traducciones, procedencia y estados desfasados.
5. Completar practicas piloto y despues el resto de lecciones, una entrega revisable cada vez.
6. Implementar el circuito editorial por etapas con pruebas de cambios y caidas.
7. Ejecutar tests relevantes, build y matriz de navegador sobre el artefacto nuevo. Separar pruebas nuevas de resultados previos.
8. Entregar lista de archivos, evidencia, limites pendientes y ruta del preview. Conservar el trabajo local hasta que se pida publicar.

## Comandos de partida

Desde el directorio indicado arriba:

```sh
npm run book:validate
npm run test:living-book
PLAYWRIGHT_MODULE=/Users/mac/Documents/Codex/2026-06-27/hay/outputs/aulafy-evidence/node_modules/playwright/index.mjs node scripts/test-living-book-browser.mjs
```

Tras modificar codigo y completar las pruebas pertinentes, recompilar con `npm run build -- --webpack` y arrancar `npm run preview:book`. Inspeccionar primero el proceso que ocupa 4193; no matar procesos ajenos ni reconstruir sobre un servidor que sirve el mismo directorio de build. Esta auditoria no autoriza publicar ni desplazar cambios existentes.
