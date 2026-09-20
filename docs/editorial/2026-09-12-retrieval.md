# Lote editorial: 2026-09-12 / retrieval

## Encargo y estado

Nueva leccion bilingue de construccion sobre recuperar contexto antes de generar una respuesta.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

La leccion separa recuperacion, generacion y comprobacion con tres notas ficticias. Incluye procedencia, citas, contexto insuficiente y una prueba de recuperacion equivocada. No presenta RAG como garantia de veracidad ni usa un proveedor concreto.

El ejemplo textual y los identificadores se muestran en bloques con color y fondo explicitos. El test de navegador incluye `pre` y `code` en la comprobacion de contraste.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 82da5951bb3dcc91af62f9fce2e197edff18c9b1f83c725c311b6839f014e806
EN 3922cf21d050287f51f8ce4def540e3c07493aa8fc69a8da0aea085403f7cb7e
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana del comportamiento ante evidencia insuficiente y fuentes contradictorias.
- Elegir una implementacion real solo despues de definir almacenamiento, permisos y evaluaciones.
- QA de navegador tras recompilar para revisar la nueva ruta y los bloques de texto.
