# Estándar de lección rigurosa

Una lección no está terminada porque tenga texto: está terminada cuando una persona que no te conoce puede seguirla, **comprobar que funciona** y saber qué hacer si falla. Este estándar complementa el [sistema de calidad](SISTEMA-DE-CALIDAD.md) y el [estándar editorial](ESTANDAR-EDITORIAL.md).

## Las seis condiciones

1. **Objetivo observable.** Una frase que diga qué existirá al terminar («un servidor que rechaza peticiones con otro `Host`»), no qué se «entenderá».
2. **Entorno declarado.** Sistema, versiones exactas de las herramientas y qué datos se usan (ficticios o autorizados). Una lección sin versiones caduca sin avisar.
3. **Pasos que se ejecutan.** Cada comando está en un bloque de código copiable, en orden, sin pasos implícitos.
4. **Prueba con resultado esperado.** Un comando de comprobación y la salida que debe verse. Si no hay forma de comprobarlo, la lección es una opinión.
5. **Errores frecuentes.** Al menos tres fallos reales con su causa y su solución, sacados de ejecutar la lección, no de imaginarla.
6. **Fuentes y fecha de comprobación.** Fuentes primarias y la fecha y el entorno en que se ejecutó por última vez.

## Longitud y estructura

- Entre **600 y 1.500 palabras propias** (sin plantillas repetidas) y al menos **un bloque de código** si la lección es técnica.
- Secciones fijas: `Objetivo`, `Antes de empezar`, `Pasos`, `Comprueba que funciona`, `Errores frecuentes`, `Fuentes`.
- Nada de cierres genéricos reutilizados entre lecciones: si una frase vale para cualquier lección, sobra.

## Cómo se comprueba

```bash
npm run audit:depth                        # mide las palabras propias de cada lección publicada
node scripts/validate-lesson-standard.mjs  # revisa las lecciones MDX contra este estándar
```

Una lección con un curso etiquetado «Completo» debe pasar ambas. Un curso con lecciones por debajo del umbral se muestra como «En desarrollo» o «Esquema»: la etiqueta es pública a propósito.

## Probar de verdad

- Ejecuta la lección **desde cero** en un entorno limpio (carpeta nueva, sin variables heredadas) y anota sistema, versiones y fecha.
- Si el código es de terceros (una herramienta, un modelo), enlaza su documentación oficial y la versión probada.
- Si una afirmación cambia con el tiempo (precios, modelos, normativa), márcala como volátil y fija una fecha de revisión de 7 o 30 días.

## Plantilla

Usa [plantillas/leccion-rigurosa.mdx](plantillas/leccion-rigurosa.mdx).
