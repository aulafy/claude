# Lote editorial: 2026-09-12 / research-sources

## Encargo y estado

Nueva leccion bilingue de la parte de informacion.

Estado: borrador validado localmente; pendiente de revision editorial humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo enseña a convertir una pregunta abierta en afirmaciones pequenas, distinguir una fuente primaria de un comentario y registrar el respaldo de cada afirmacion. Usa un escenario ficticio y no contiene precios, modelos, versiones ni capacidades que requieran una comprobacion diaria.

El ejemplo separa tres piezas: una nota oficial del organizador, un articulo secundario y una respuesta de IA. La respuesta de IA se presenta como ayuda para redactar, nunca como prueba. El ejercicio termina pidiendo una fuente original o una consulta a la persona responsable cuando hay una duda.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

La validacion se ejecuta despues de incorporar el capitulo y el test se ajusto de forma explicita de 4 a 5 capitulos bilingues. Resultado posterior: validacion correcta y 14 pruebas correctas.

Hashes de revision:

```text
ES d5e9515a737a0e86cb9514fb7d51cd28fcfcd5ad03ddc193ae4542216dc7b6f5
EN 89fca444c73b78b2d8bb34e8133cb170c474abf5f230d9cf8ac2e4994d841210
```

`translationFrom.en` queda vinculado a la hash ES de este lote. No se han inventado aprobaciones.

## Pendientes

- Revision humana de la distincion entre fuente primaria y fuente oficial.
- Confirmar si `compare-tools` usara herramientas ficticias o una comparacion real con fuentes actuales.
- QA de navegador tras recompilar la vista previa para comprobar el nuevo capitulo en indice y busqueda.
