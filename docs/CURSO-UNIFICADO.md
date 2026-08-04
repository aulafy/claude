# Curso unificado de Aulafy

La portada pública ya no es un catálogo. Es un curso continuo con siete módulos y una única jerarquía de navegación.

## Fuente canónica

El temario vive en `lib/unified-course.ts`. La interfaz vive en `components/UnifiedCourse.tsx` y su presentación en `components/UnifiedCourse.module.css`.

Cada lección declara:

- un ID estable;
- título, resumen y explicación en español e inglés;
- resultados observables;
- una práctica y una evidencia;
- un proyecto integrador por módulo con entregables y autoevaluación;
- fuentes primarias por clave, sin repetir URLs;
- volatilidad editorial.

## Regla contra duplicidades

Un concepto se explica en una sola lección canónica. Otras lecciones pueden aplicarlo, pero no deben volver a definirlo. Antes de crear una lección:

1. Busca el concepto y sus sinónimos en `lib/unified-course.ts`.
2. Consulta la bóveda local `aulafy-mem`, especialmente `60-Auditorias`.
3. Si existe, enlaza o amplía la ficha canónica.
4. Si no existe, añade una lección únicamente cuando tenga resultado, práctica, evidencia y fuentes propias.

## Actualización segura

1. Cambia primero la fuente canónica.
2. Actualiza simultáneamente español e inglés.
3. Revisa enlaces primarios y volatilidad.
4. Ejecuta `npm run verify-unified-course`.
5. Ejecuta `npm run build`.
6. Comprueba `/` y `/en` en móvil y escritorio.

Los contenidos antiguos continúan en Git, pero no son la fuente editorial del nuevo curso. El respaldo completo está identificado en `backup/README.md`.
