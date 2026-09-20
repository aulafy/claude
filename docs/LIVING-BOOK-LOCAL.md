# Libro vivo: probar en local

Rama: `codex/aulafy-living-book`. La rama anterior y la web publica no se han modificado. No hay publicacion ni tareas recurrentes activas.

## Arranque

```sh
npm run book:validate
npm run test:living-book
npm run build -- --webpack
npm run preview:book
```

Lector: [primer capitulo en espanol](http://127.0.0.1:4193/book/es/first-task) y [en ingles](http://127.0.0.1:4193/book/en/first-task).

La bandera `AULAFY_BOOK_PREVIEW=1` es obligatoria; los comandos del libro la establecen. Sin ella las rutas devuelven 404. No configurar esa bandera en Vercel todavia. La vista previa compilada no usa el runtime de desarrollo. `npm run dev:book` queda disponible para programar, pero Next HMR puede crear una cookie tecnica local: no es la vista con la que se comprueba la ausencia de cookies.

## Estado real

- Arquitectura detallada en `docs/LIVING-BOOK-ARCHITECTURE.md`.
- Indice propuesto: 8 partes y 24 capitulos; 24 estan redactados, en ES/EN, y siguen pendientes de aprobacion editorial.
- Lectura, preguntas con correccion determinista, progreso por revision guardado solo tras una accion explicita, borrado local, impresion y exportacion Markdown.
- Contratos versionados, validacion Markdown/JSON, hashes por idioma, vinculacion de traducciones, impacto Source -> Claim -> Chapter y criterios locales de publicacion.
- Intake local por JSON o Markdown. Todo candidato se marca no verificado y nunca publica.
- Sin modelo contratado, sin fetcher remoto, sin vigilancia diaria, sin aprobacion autenticada ni despliegue automatico. Esos pasos estan especificados para las siguientes fases.

## Probar las entradas

```sh
npm run book:intake -- --file docs/examples/living-book-signal.json
npm run book:intake -- --file docs/examples/living-book-signal.json
npm run book:intake -- --markdown book/chapters/first-task/es.md --target first-task
npm run book:report
```

El segundo envio JSON devuelve `duplicate: true`. Los candidatos quedan en `book-runtime/inbox/`, ignorado por Git y no servido por Next. No enviar secretos, datos personales ni texto ajeno sin permiso. La clasificacion del canal no acredita su procedencia.

## Verificacion de interfaz

```sh
PLAYWRIGHT_MODULE=/ruta/node_modules/playwright/index.mjs \
  node scripts/test-living-book-browser.mjs
```

Por defecto utiliza Chrome instalado y el lector en el puerto 4193. `BROWSER_CHANNEL` y `BOOK_BASE_URL` son configurables. Si Playwright esta instalado en este proyecto, omitir `PLAYWRIGHT_MODULE`.

Para verificar que el modo publico no expone el piloto: construir sin la bandera de preview, arrancar `next start --hostname 127.0.0.1 --port 4194` sin esa bandera y ejecutar el test con `BOOK_DISABLED_URL=http://127.0.0.1:4194`.

Las pruebas de navegador no salen del servidor local, salvo que se cambie su configuracion. Comprueban tambien overflow y contraste WCAG de los textos visibles para evitar texto oscuro sobre fondos oscuros. Las capturas quedan en `artifacts/living-book/`.

## Limites importantes

Una hash no demuestra que el contenido sea correcto. Una fecha de descarga no es una revision editorial. El objeto Approval del piloto no autentica al revisor: la autorizacion real necesita reglas de repositorio y revision humana. El progreso del lector es una autoevaluacion, no una acreditacion.

Las variantes de idioma estan vinculadas a la revision de referencia, pero aun no han recibido aprobacion humana. La cola solo calcula candidatos de impacto; no comprende automaticamente todas las dependencias pedagogicas.

En la base anterior existe una prueba desactualizada: `npm run test:content-engine` espera 6 documentos, aunque el registro contiene 10. Se ha reproducido el mismo fallo en la rama original, sin cambios del libro. No se ha rebajado esa asercion para ocultarlo; queda pendiente sustituir el recuento fijo por fixtures aisladas y contratos del registro.

No migrar ni eliminar lecciones legacy hasta revisar la correspondencia de contenido, licencias y rutas. Aulafy Evidence conserva el indice del repositorio original; el piloto no ha cambiado su fuente de datos ni lo ha convertido en un publicador.
