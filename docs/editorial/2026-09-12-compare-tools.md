# Lote editorial: 2026-09-12 / compare-tools

## Encargo y estado

Nueva leccion bilingue de la parte de informacion.

Estado: borrador validado localmente; pendiente de revision editorial humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo sustituye las listas de "mejores herramientas" por una prueba repetible: misma muestra, misma peticion, criterios definidos antes de observar la salida y registro de limitaciones. Los asistentes A y B son ficticios; no se hacen afirmaciones sobre productos reales.

La tabla separa fidelidad, utilidad, correccion, datos, coste y acceso. La leccion deja claro que una mejor redaccion no compensa un riesgo de datos y que una puntuacion aislada no es una decision completa.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 014d845a4d86228f180bdf08f77e9a6c6f3eaf412efd6804c62812d81c349037
EN 1c0fa434810d85a3bf273093ce03e68836fddbbbed3294a08c5a03cf0f4efad6
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision humana de la explicacion de coste, acceso y privacidad para el publico principiante.
- Decidir si una futura comparacion de herramientas reales debe vivir en un capitulo versionado separado y con fuentes actuales.
- QA de navegador despues de recompilar el libro para confirmar el nuevo enlace en indice y busqueda.
