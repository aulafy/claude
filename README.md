# Aulafy

> Educación abierta y gratuita para aprender inteligencia artificial construyendo sistemas reales.

[Abrir Aulafy](https://www.aulafy.net) · [Explorar los cursos](https://www.aulafy.net/cursos) · [Elegir una ruta](https://www.aulafy.net/rutas) · [Ver el programa completo](https://www.aulafy.net/programa)

## Qué es Aulafy

Aulafy es un proyecto educativo abierto, gratuito e independiente sobre inteligencia artificial práctica. Organiza cursos, rutas de aprendizaje, proyectos y materiales descargables para que estudiantes, profesionales, docentes, autónomos, pymes y equipos técnicos puedan aprender haciendo, comprobar lo que construyen y entender los límites de cada herramienta.

El proyecto combina tecnologías abiertas y locales —como Ollama, llama.cpp, Qdrant, ComfyUI o n8n— con herramientas comerciales —como OpenAI Codex o Claude Code— cuando son útiles para el objetivo educativo. Aulafy no afirma que todas las herramientas que enseña sean de código abierto: lo abierto es el acceso al proyecto, su código y sus materiales propios.

Aulafy prioriza:

- proyectos reproducibles frente a demostraciones aisladas;
- fuentes oficiales y comprobaciones frente a afirmaciones sin evidencia;
- privacidad, ejecución local y control de datos cuando tienen sentido;
- revisión humana, permisos y seguridad en automatizaciones y agentes;
- explicaciones claras en español, con una versión inglesa del catálogo;
- acceso sin registro, suscripción ni muro de pago.

El nombre histórico de este repositorio es `claude`, pero Aulafy ya no es una web dedicada únicamente a Claude Code. El catálogo abarca programación con agentes, IA local, RAG, automatización, seguridad, evaluación, MLOps, adaptación de modelos, IA generativa, videojuegos y aplicaciones para pymes.

La definición editorial completa está en [docs/QUE-ES-AULAFY.md](docs/QUE-ES-AULAFY.md).

## Estado actual

En la revisión del 14 de julio de 2026, el repositorio contiene:

- 15 cursos y 177 lecciones en español;
- versiones en inglés de los cursos y las lecciones;
- 5 rutas de aprendizaje por objetivo y perfil;
- un programa abierto de 28 semanas, desde fundamentos hasta un proyecto final;
- guías PDF y un índice preparado para buscadores y asistentes de IA;
- progreso local y exportable, sin necesidad de crear una cuenta;
- un asistente opcional basado en Groq, con limitación de uso opcional mediante Upstash Redis.

Las cifras del catálogo se calculan desde `lib/cursos.ts` y seguirán creciendo. Consulta la [hoja de ruta](docs/HOJA-DE-RUTA.md) para conocer las prioridades del proyecto.

## Áreas de aprendizaje

| Área | Contenido |
| --- | --- |
| Fundamentos | Terminal, Git, Python, Docker, entornos reproducibles y criterio local frente a nube |
| Programación con IA | OpenAI Codex, Claude Code, AGENTS.md, permisos, pruebas y revisión de cambios |
| IA local | Ollama, LM Studio, Open WebUI, modelos cuantizados y APIs compatibles |
| RAG | Ingesta, OCR, embeddings, Qdrant, búsqueda híbrida, citas, permisos y evaluación |
| Agentes y automatización | MCP, LangGraph, n8n, memoria, estado, idempotencia y revisión humana |
| Seguridad y evaluación | Prompt injection, privacidad, red teaming, cadena de suministro y métricas |
| Operación de modelos | llama.cpp, vLLM, LiteLLM, observabilidad, costes, colas y recuperación |
| Adaptación y creación | Fine-tuning, LoRA, IA generativa, audio, vídeo, 3D y videojuegos |
| Aplicación profesional | Flujos para pymes, documentos, atención al cliente y automatización local |

## Principios editoriales

Cada curso debe ayudar a producir un resultado observable. Las lecciones procuran incluir objetivos, requisitos, una práctica ejecutable, errores frecuentes, una forma de verificar el resultado y fuentes que permitan contrastarlo.

Aulafy distingue entre:

- hechos respaldados por documentación o pruebas;
- recomendaciones editoriales explicadas como tales;
- ejemplos educativos que necesitan adaptación antes de usarse en producción;
- herramientas de código abierto, modelos de pesos abiertos y servicios propietarios.

No se publican promesas de resultados automáticos, contenido de relleno ni ejemplos con credenciales reales.

## Tecnología

- Next.js 16 con App Router
- React 19 y TypeScript
- Tailwind CSS 4
- Three.js para elementos visuales interactivos
- Groq para el asistente opcional
- Upstash Redis para el límite de peticiones opcional
- Vercel como destino de despliegue principal

La arquitectura, las fuentes de verdad y el flujo de contenido están documentados en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## Desarrollo local

### Requisitos

- Node.js 20.9 o posterior
- npm

### Instalación

```bash
git clone https://github.com/aulafy/claude.git
cd claude
npm ci
npm run dev
```

Abre `http://localhost:3000`. El catálogo, las rutas y las lecciones funcionan sin servicios externos.

Para activar el chat:

```bash
cp .env.example .env.local
```

Después, añade tu propia `GROQ_API_KEY` en `.env.local`. Nunca publiques ese archivo ni una clave real.

## Variables de entorno

| Variable | Necesaria | Uso |
| --- | --- | --- |
| `GROQ_API_KEY` | Solo para el chat | Autoriza las peticiones del asistente a Groq |
| `GROQ_MODEL` | No | Permite elegir el modelo de Groq |
| `UPSTASH_REDIS_REST_URL` | No | Activa el límite distribuido de peticiones |
| `UPSTASH_REDIS_REST_TOKEN` | No | Autoriza el acceso a Upstash Redis |
| `NEXT_PUBLIC_SITE_URL` | Recomendada en despliegue | Define la URL canónica del sitio |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Sustituye el token de verificación de Google |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No | Añade la verificación de Bing |
| `INDEXNOW_HOST` | Solo para `npm run indexnow` | Sustituye el dominio predeterminado usado por el script; la clave se lee de `.indexnow-key` |

## Comandos útiles

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el entorno local |
| `npm run build` | Genera la aplicación de producción |
| `npm run lint` | Revisa el código con ESLint |
| `npm run verify-content` | Comprueba la estructura y el contenido educativo |
| `npm run verify-links` | Revisa los enlaces principales |
| `npm run verify-i18n` | Comprueba la cobertura bilingüe |
| `npm run verify-seo` | Valida metadatos, índices y rutas SEO |
| `npm run verify-progress` | Comprueba el sistema de progreso local |
| `npm run audit-education` | Ejecuta la auditoría editorial y educativa |
| `npm audit --audit-level=moderate` | Revisa vulnerabilidades conocidas de dependencias |

Antes de proponer un cambio amplio, ejecuta como mínimo:

```bash
npm run lint
npm run build
npm run verify-content
```

## Estructura del repositorio

```text
app/          rutas, páginas, API y metadatos de Next.js
components/   interfaz y componentes educativos reutilizables
lib/          catálogo, contenido, rutas, progreso e índices
public/       imágenes, iconos, fuentes de terceros y guías PDF
scripts/      generación, traducción, verificación y auditoría
pdf/          fuentes y herramientas de las guías PDF
docs/         documentación del proyecto y hoja de ruta
```

## Documentación

- [Índice de documentación](docs/README.md)
- [Qué es Aulafy](docs/QUE-ES-AULAFY.md)
- [Arquitectura y contenido](docs/ARQUITECTURA.md)
- [Hoja de ruta](docs/HOJA-DE-RUTA.md)
- [Cómo colaborar](CONTRIBUTING.md)
- [Licencias](LICENSE.md)

## Cómo colaborar

Se aceptan correcciones, mejoras educativas, nuevas fuentes, ejemplos reproducibles, traducciones, mejoras de accesibilidad y cambios técnicos. Lee [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir una propuesta.

Para dudas generales, propuestas privadas o avisos de seguridad, escribe a [contacto@aulafy.net](mailto:contacto@aulafy.net). No publiques claves, datos personales ni detalles de una vulnerabilidad en una incidencia pública.

## Licencias

El repositorio usa una licencia dual:

- el código de la aplicación se publica bajo MIT;
- los textos, cursos, ejemplos didácticos, PDFs y materiales propios se publican bajo Creative Commons Attribution 4.0 Internacional.

Los recursos y las marcas de terceros conservan sus propias licencias. Consulta [LICENSE.md](LICENSE.md) para conocer los términos completos.

## Autoría y contacto

Aulafy está creado y editado por Ramón Guillamón.

- Web: [aulafy.net](https://www.aulafy.net)
- GitHub: [github.com/aulafy](https://github.com/aulafy)
- Contacto principal: [contacto@aulafy.net](mailto:contacto@aulafy.net)
