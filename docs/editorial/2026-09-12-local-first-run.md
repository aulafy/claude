# Lote editorial: 2026-09-12 / local-first-run

## Encargo y estado

Nueva leccion bilingue sobre instalacion, primera ejecucion y evaluacion de un modelo local.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo separa instalacion, arranque y capacidad. Propone una carpeta de prueba, datos ficticios, permisos revisados, una prueba minima y registro de errores. No mezcla el procedimiento con Ollama ni fija comandos de una herramienta concreta.

El ejemplo de terminal tiene fondo y color explicitos en el lector; la leccion no afirma que una instalacion local sea automaticamente segura ni que un resultado fluido sea correcto.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 16221c781b68d7b5e1a7c5e886da071b069c7945d160d54596cb9a4092535c86
EN a643b6124866c67c00e66a31f1749f5b0b407046a971e1004e3b69e14b7e7a79
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana antes de incorporar comandos o proveedores reales.
- Confirmar sistema operativo prioritario y procedimiento de recuperacion para la futura leccion especifica.
- QA de navegador tras recompilar, incluyendo contraste del bloque `pre`.
