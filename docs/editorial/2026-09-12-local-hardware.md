# Lote editorial: 2026-09-12 / local-hardware

## Encargo y estado

Nueva leccion bilingue de la parte de IA local sobre medir recursos antes de elegir una configuracion.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

La leccion separa la tarea que se quiere resolver, memoria de ejecucion, almacenamiento, velocidad y margen operativo. Evita prometer compatibilidad con modelos concretos y propone una prueba pequena, repetible y desechable. Tambien recuerda que lo local no elimina todos los riesgos de seguridad.

El ejercicio rechaza la idea de que un archivo que cabe en disco pueda ejecutarse necesariamente y desaconseja borrar datos personales para forzar una instalacion.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 78be18d182f2f7e9e325e4db1f6ac92395f5ef88d61e6e085edb316fb41a5f91
EN 3b100b106282d34ba63f54428e4dfa3b226341f83a1087ecb964d09ac11b7dd9
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana de los conceptos de memoria disponible, memoria grafica y margen.
- Añadir fuentes y comandos concretos solo cuando se elija el sistema operativo y se comprueben las versiones.
- QA de navegador tras recompilar para revisar bloques de texto, contraste y lectura movil.
