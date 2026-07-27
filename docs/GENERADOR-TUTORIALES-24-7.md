# Generador local de tutoriales 24/7

Este sistema crea borradores educativos para Aulafy usando modelos open source servidos por Ollama. Su trabajo es ahorrar tokens y convertir senales de X, GitHub, Hugging Face o documentacion oficial en propuestas revisables. No publica contenido por si solo.

## Principio

El generador produce borradores. Codex o una persona revisan, contrastan fuentes, ejecutan pruebas si aplica y deciden si algo entra en cursos, blog o taller.

Flujo recomendado:

```text
senal de X/Grok/GitHub/Hugging Face
-> inbox local
-> borrador con Ollama
-> revision de fuentes primarias
-> practica reproducible
-> tests de Aulafy
-> publicacion manual
```

## Memoria editorial

La fábrica consulta una copia local de
`aulafy/conocimiento/generated/rag-corpus.jsonl` antes de redactar. La copia se
actualiza con:

```bash
npm run memory:sync
```

La recuperación es local, determinista y no llama a una API. Cada fragmento
conserva el ID, la fecha de verificación, la próxima revisión y las fuentes de
la ficha canónica. Si no encuentra contexto relacionado, el prompt obliga a
declarar el vacío en vez de inventar.

Las ejecuciones se registran en:

```text
data/tutorial-factory/memory/events.jsonl
```

Ese diario recuerda qué se recuperó, qué modelo generó el borrador y qué
criterios fallaron. Es memoria operativa, no conocimiento publicable ni dataset
de entrenamiento. Obsidian edita las fichas Markdown de `aulafy/conocimiento`;
Mem0 podrá indexar este diario en el futuro si supera una evaluación frente a
la recuperación local.

## Modelo recomendado

Para el modo 24/7:

- `gemma3:4b` como opcion preferida para vigilancia continua: rapida, barata en energia y suficiente para propuestas breves.
- `qwen3.5:9b` para borradores intermedios si aceptas esperar mas.
- `qwen3.6:27b` para borradores de calidad cuando no importe esperar mas.
- `gpt-oss:20b` si lo instalas y la maquina lo mueve con comodidad.
- `qwen3:14b` si quieres algo mas ligero.
- `qwen3:8b` para borradores rapidos o maquinas con menos memoria.

Comandos:

```bash
ollama serve
ollama pull gemma3:4b
```

Para una pasada mas lenta y cuidada:

```bash
npm run factory:tutorial -- --profile=quality --topic="Claude + Codex juntos"
```

## Uso puntual

Crear un borrador desde un tema:

```bash
npm run factory:tutorial -- --topic="Firecrawl con MCP para agentes de IA"
```

Crear un borrador desde una nota de entrada:

```bash
npm run factory:tutorial -- --input=data/tutorial-factory/inbox/x-novedades.md
```

Usar Grok solo para investigar senales antes de generar:

```bash
npm run factory:tutorial -- --grok --topic="novedades Claude Code y Codex en X"
```

Los borradores aparecen en:

```text
drafts/tutorial-factory/
```

## Modo 24/7

Ejecucion manual continua cada cuatro horas:

```bash
npm run factory:tutorial:watch
```

macOS puede ejecutarlo con `launchd` usando la plantilla:

```text
ops/launchd/net.aulafy.tutorial-factory.plist
```

La instalación activa usa un runner fuera de `Documentos`, porque macOS puede
bloquear a los LaunchAgents que intentan leer scripts desde esa carpeta:

```text
~/AulafyAutomation/aulafy-tutorial-runner
```

El servicio se ejecuta cada cuatro horas y vuelve a cargarse después de un
reinicio cuando el usuario inicia sesión. Requiere que la aplicación de Ollama
esté configurada para arrancar y que su API responda en `127.0.0.1:11434`.

Comprobación:

```bash
launchctl print gui/$(id -u)/net.aulafy.tutorial-factory
curl -fsS http://127.0.0.1:11434/api/tags
tail -n 80 /tmp/aulafy-tutorial-factory.out.log
tail -n 80 /tmp/aulafy-tutorial-factory.err.log
```

## Control editorial

El generador debe mantener estas garantias:

- No modifica `app/`, `lib/` ni cursos publicados.
- No hace commits.
- No despliega.
- No trata X como fuente tecnica.
- No marca nada como probado si no hay evidencia ejecutada.
- Marca afirmaciones volatiles como pendientes de verificar.
- Incluye riesgos de coste, privacidad, seguridad y mantenimiento.

Además, cada salida pasa un control automático de seis criterios: fuente
primaria, afirmaciones por verificar, práctica desarrollada, objetivo
observable, checklist suficiente y cobertura de los cuatro riesgos. Si no
supera los seis, queda marcada como `requiere-ampliacion`. Este resultado no
equivale a revisión humana ni autoriza la publicación.

El sistema guarda la huella de la última señal procesada en:

```text
data/tutorial-factory/factory-state.json
```

Así no vuelve a gastar cómputo cada cuatro horas cuando el radar no ha aportado
una señal nueva. Para repetir deliberadamente una entrada:

```bash
npm run factory:tutorial -- --force
```

## Papel de Grok

Grok se usa con moderacion para ahorrar tokens de Codex:

- Bueno para detectar senales de X y lenguaje real.
- Bueno para traer IDs de posts o repos citados.
- No basta para afirmar que una herramienta funciona.
- No sustituye docs oficiales, repositorios, model cards ni pruebas locales.

Prompt sugerido:

```text
Actua como investigador tecnico para Aulafy.

Busca senales recientes en X sobre [tema].
Devuelve:
- posts verificables con enlace;
- repos o docs oficiales citados;
- nivel del usuario que pregunta;
- que tutorial deberia crear Aulafy;
- que afirmaciones NO estan verificadas.

No inventes enlaces. No redactes el tutorial. Marca claramente lo dudoso.
```

## Antes de publicar un borrador

```bash
npm run verify-quality
npm run audit-education
npm run lint
npm run build
```

Para tutoriales con codigo:

```text
clonar repo
instalar dependencias
ejecutar caso normal
ejecutar caso de fallo
documentar versiones, sistema operativo y evidencia
```
