# Lote editorial: 2026-09-12 / local-context

## Encargo y estado

Nueva leccion bilingue de IA local sobre contexto, memoria y velocidad.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

La leccion diferencia contexto, memoria y almacenamiento mediante una prueba con marcas de inicio y final. Enseña a cambiar una sola variable, detectar omisiones o repeticiones y conservar un registro. El claim de contexto efectivo esta vinculado al contrato de fuente `ollama-context`, pero todavia no tiene snapshot ni revision verificada; el capitulo no se presenta como publicable.

El bloque de texto de la prueba se muestra con el color explicito de `pre` y `code`, y queda cubierto por la comprobacion automatica de contraste.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES ec5d914036639e69c3cb744a6dbdc1dba133bdc073a8d2d89b27b124736c72f4
EN b3927cf36376942f643bff429faea2ea6849d8f1822a59447874c934d233bf00
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Verificar el claim sobre contexto en la documentacion oficial y en el entorno real antes de publicarlo.
- Revision tecnica humana de medicion y perdida de contexto.
- QA de navegador despues de recompilar para revisar la nueva ruta y los recuadros en movil.
