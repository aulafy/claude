# Cola editorial verificable — agentes, skills y herramientas IA

Fecha: 2026-07-27
Estado: borrador operativo interno
Objetivo: convertir señales sociales en tutoriales Aulafy solo cuando haya fuentes primarias y práctica reproducible.

## Decisión editorial

El lote recibido es valioso como radar. No debe publicarse tal cual. La estrategia correcta es usarlo para alimentar el generador local de tutoriales y exigir después una ficha de verificación por tema.

En Aulafy, una novedad solo pasa a curso si cumple cuatro condiciones:

1. existe fuente primaria;
2. el flujo mínimo puede ejecutarse;
3. el alumno obtiene una evidencia observable;
4. se explican costes, privacidad, seguridad y límites.

## Prioridad 1: Codex dentro de Claude Code

Tema: `openai/codex-plugin-cc`
Fuente primaria: https://github.com/openai/codex-plugin-cc
Tipo: plugin oficial de OpenAI para usar Codex desde Claude Code.
Audiencia: técnica, usuarios de Claude Code y Codex.
Duración ideal: 30-45 minutos.

### Por qué merece entrar

Es una pieza muy alineada con Aulafy porque enseña interoperabilidad real entre agentes de código. Además permite explicar una idea importante: no usar un único asistente como oráculo, sino repartir papeles.

### Lección propuesta

Título provisional: “Claude Code + Codex: cómo trabajar con dos agentes sin duplicar trabajo”

Resultado observable:

- el alumno instala el plugin;
- ejecuta la comprobación inicial;
- pide a Codex una revisión de un cambio pequeño;
- conserva una evidencia de la revisión;
- decide qué sugerencias aplicar y cuáles rechazar.

### Práctica mínima

```text
1. Elegir un repositorio pequeño.
2. Instalar el plugin siguiendo el README oficial.
3. Ejecutar el comando de setup.
4. Crear un cambio intencionalmente mejorable.
5. Pedir revisión a Codex desde Claude Code.
6. Guardar la salida relevante.
7. Aplicar una mejora y documentar la decisión.
```

### Riesgos a explicar

- consumo de cuota o suscripción según la herramienta usada;
- posibles bucles o tareas largas;
- no delegar secretos ni credenciales;
- revisar siempre los cambios antes de aceptarlos;
- confirmar compatibilidad con sistema operativo y versiones instaladas.

## Prioridad 2: Firecrawl para agentes y RAG

Tema: Firecrawl, MCP y plugin para Claude Code.
Fuentes primarias iniciales:

- https://github.com/firecrawl/firecrawl
- https://github.com/firecrawl/firecrawl-mcp-server
- https://github.com/firecrawl/firecrawl-claude-plugin

Audiencia: técnica/intermedia, personas que quieren crear bases de conocimiento o agentes con documentación web.
Duración ideal: 45-60 minutos.

### Por qué merece entrar

Muchas lecciones de IA fallan porque el agente no tiene datos fiables. Firecrawl permite enseñar la diferencia entre “copiar texto de internet” y crear una entrada controlada, fechada y trazable para RAG o investigación.

### Lección propuesta

Título provisional: “Firecrawl: cómo convertir páginas web en contexto útil para un agente”

Resultado observable:

- el alumno rastrea una página permitida;
- obtiene Markdown o datos estructurados;
- guarda una muestra;
- usa esa muestra para responder una pregunta con citas;
- documenta límites de coste, privacidad y permisos.

## Prioridad 3: configuración inicial de Claude Code

Tema: `claude-code-setup` y ecosistema de plugins.
Estado: pendiente de confirmar fuente primaria y comandos exactos antes de publicar.
Audiencia: técnica principiante.

### Lección propuesta

Título provisional: “Configurar Claude Code para un proyecto real sin crear caos”

Enfoque: enseñar a no aceptar recomendaciones automáticamente. El alumno debe entender hooks, skills, MCP y subagentes como piezas con permisos y responsabilidad.

## Prioridad 4: skills de ingeniería

Tema: skills para TDD, debugging, planificación y guardrails.
Fuente primaria inicial: https://github.com/mattpocock/skills
Estado: pendiente de prueba.

### Lección propuesta

Título provisional: “Skills: cómo convertir un agente de código en un compañero de ingeniería más disciplinado”

Evidencia comparativa:

- resolver un bug sin skill;
- resolver el mismo bug con skill;
- comparar claridad, pruebas y riesgos.

## Prioridad 5: agentes creativos

Tema: OpenMontage y herramientas de vídeo/creatividad.
Fuente primaria inicial: https://github.com/calesthio/OpenMontage
Estado: interesante, pero no debe ir primero.

Motivo: tiene potencial visual alto, pero puede introducir dependencias pesadas, licencias restrictivas o costes externos. Mejor prepararlo cuando el sistema de verificación de tutoriales ya esté funcionando.

## Prompt para el generador local

```bash
npm run factory:tutorial -- --topic="Claude Code + Codex: cómo trabajar con dos agentes sin duplicar trabajo"
```

Para generar desde el lote completo:

```bash
npm run factory:tutorial -- --input=data/tutorial-factory/inbox/2026-07-27-x-senales-herramientas-agentes.md
```

## Criterio de publicación

Ninguna de estas piezas debe pasar a `app/` o a contenido visible hasta completar:

```bash
npm run verify-quality
npm run audit-education
npm run lint
npm run build
```

Y, si el tutorial incluye comandos:

```text
probar instalación → ejecutar caso mínimo → documentar versiones → probar fallo → revisar coste/seguridad
```
