# Cómo colaborar con Aulafy

Gracias por ayudar a mejorar Aulafy. Se aceptan contribuciones de contenido, código, documentación, accesibilidad, traducción, diseño, verificación y mantenimiento.

## Antes de empezar

- Lee [Qué es Aulafy](docs/QUE-ES-AULAFY.md) para entender el alcance y el criterio editorial.
- Consulta la [hoja de ruta](docs/HOJA-DE-RUTA.md) para evitar duplicar trabajo.
- Busca si ya existe una incidencia o propuesta relacionada.
- Para un cambio grande, abre primero una incidencia y explica el resultado esperado.

Las dudas generales y propuestas privadas pueden enviarse a [learntouseai@gmail.com](mailto:learntouseai@gmail.com).

## Formas de colaborar

- Corregir erratas, enlaces rotos o explicaciones ambiguas.
- Actualizar una función que haya cambiado en su documentación oficial.
- Añadir fuentes primarias, comprobaciones y errores frecuentes.
- Mejorar un ejemplo para que sea reproducible en más sistemas.
- Proponer ejercicios, proyectos finales o criterios de evaluación.
- Mejorar accesibilidad, rendimiento, navegación o diseño adaptable.
- Mantener la correspondencia entre español e inglés.
- Mejorar pruebas, scripts de verificación o documentación técnica.
- Informar de una vulnerabilidad o un secreto expuesto de forma privada.

## Preparar el entorno

Necesitas Node.js 20.9 o posterior y npm.

```bash
git clone https://github.com/aulafy/claude.git
cd claude
npm ci
npm run dev
```

No necesitas configurar el chat para trabajar con el catálogo y las lecciones. Si necesitas probarlo, copia `.env.example` a `.env.local` y usa credenciales propias.

## Flujo de trabajo

1. Crea una rama con un nombre breve y descriptivo.
2. Realiza un cambio con un alcance claro.
3. Modifica la fuente de verdad, no solo un archivo generado.
4. Añade o actualiza las verificaciones necesarias.
5. Ejecuta los comandos adecuados para el cambio.
6. Revisa el diff completo y elimina datos locales, secretos y artefactos accidentales.
7. Abre una propuesta explicando qué problema resuelve, qué cambia y cómo lo verificaste.

No es obligatorio seguir una convención rígida de commits. Se prefieren mensajes breves en imperativo, por ejemplo `Corrige los requisitos del curso de RAG`.

## Criterios para contenido educativo

Una contribución de contenido debería:

- estar escrita en español claro y natural;
- definir los términos técnicos la primera vez que aparecen;
- indicar público, requisitos y resultado cuando corresponda;
- incluir pasos que puedan ejecutarse o una decisión que pueda justificarse;
- explicar cómo verificar el resultado;
- incluir errores frecuentes y límites relevantes;
- enlazar documentación oficial o fuentes primarias;
- separar hechos comprobados de recomendaciones editoriales;
- señalar costes, licencias, privacidad y permisos cuando sean relevantes;
- usar dominios, correos, claves y datos de ejemplo claramente ficticios.

Evita:

- presentar una herramienta propietaria como código abierto;
- afirmar que una versión futura ya está disponible;
- copiar documentación de terceros de forma extensa;
- usar superlativos o promesas que no puedan demostrarse;
- añadir páginas creadas solo para repetir palabras clave;
- incluir claves, datos de clientes, conversaciones privadas o rutas personales.

## Dónde hacer cada cambio

| Cambio | Fuente principal |
| --- | --- |
| Catálogo, orden o título de un curso | `lib/cursos.ts` |
| Público, requisitos, duración o entregable | `lib/course-guidance.ts` |
| Ruta de aprendizaje | `lib/learning-paths.ts` |
| Programa completo | `lib/ai-program.ts` |
| Lección con página propia | `app/cursos/` |
| Fundamentos o Codex estructurados | `lib/foundation-course-content.ts`, `lib/codex-course-content.ts` |
| Traducción inglesa | `lib/english-lesson-content.json` y utilidades relacionadas |
| Metadatos e índices | `app/layout.tsx`, `lib/seo-index.ts`, `app/llms.txt/`, `app/ai.txt/` |
| Interfaz reutilizable | `components/` |
| PDF | fuente correspondiente en `pdf/` o scripts de generación |

Consulta [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) para entender las dependencias entre estas áreas.

## Verificar el cambio

Para código o cambios generales:

```bash
npm run lint
npm run build
npm run verify-content
```

Añade las verificaciones específicas que correspondan:

```bash
npm run verify-codex
npm run verify-critical
npm run verify-program
npm run verify-i18n
npm run verify-links
npm run verify-progress
npm run verify-seo
npm run audit-education
npm audit --audit-level=moderate
```

En la propuesta, indica qué comandos ejecutaste y cualquier comprobación manual realizada. Si una prueba no puede ejecutarse, explica el motivo.

## Español e inglés

La documentación del repositorio y la fuente editorial principal se mantienen en español. La web ofrece también contenido en inglés.

Un cambio que afecte seguridad, significado, requisitos, navegación o resultados debe reflejarse en ambos idiomas. Una corrección puramente estilística puede limitarse a su idioma si se explica en la propuesta.

## Seguridad y privacidad

No abras una incidencia pública si encuentras:

- una clave, contraseña o token real;
- datos personales no destinados a publicación;
- una vulnerabilidad explotable;
- una forma de eludir límites o ejecutar acciones no autorizadas.

Escribe a [learntouseai@gmail.com](mailto:learntouseai@gmail.com) con el asunto `[Seguridad]`, una descripción breve, las rutas afectadas y una forma segura de reproducir el problema. No incluyas el secreto completo si basta con identificarlo parcialmente.

## Trato y revisión

Las propuestas se revisan por precisión, utilidad educativa, seguridad, mantenibilidad y coherencia con el proyecto. La revisión puede pedir cambios o dividir una contribución grande en partes más pequeñas.

Se espera un trato respetuoso. No se aceptan ataques personales, discriminación, acoso, spam ni contenido promocional encubierto.

## Licencias de las contribuciones

Al enviar una contribución aceptas que:

- el código se publique bajo la licencia MIT del repositorio;
- el contenido educativo propio se publique bajo CC BY 4.0;
- tienes derecho a aportar el material y has identificado recursos de terceros con otra licencia.

Consulta [LICENSE.md](LICENSE.md) antes de incorporar texto, imágenes, fuentes, modelos o fragmentos externos.
