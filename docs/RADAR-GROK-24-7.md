# Radar Grok 24/7 para Aulafy

Este sistema usa Grok CLI como radar de señales externas y el generador local de Ollama como fábrica de borradores. Su objetivo no es publicar más, sino detectar antes qué necesita aprender la gente y convertirlo en tutoriales verificados.

## Principio

Grok puede mirar conversación social, tendencias y lenguaje real. Aulafy no debe tomar eso como verdad técnica. El flujo correcto es:

```text
Grok/X -> señal editorial -> fuente primaria -> borrador local con Ollama -> prueba -> revisión -> publicación
```

## Comandos

Ejecutar una investigación puntual:

```bash
npm run radar:grok -- --topic="IA para pymes en español"
```

Modo rápido, sin navegación, para clasificar temas o señales ya recogidas:

```bash
npm run radar:grok -- --mode=fast --topic="Claude Code, Codex, MCP y skills en español"
```

Modo profundo, con búsqueda/herramientas de Grok, para señales externas:

```bash
npm run radar:grok -- --mode=deep --topic="Claude Code, Codex, MCP y skills en español" --max-signals=3 --max-turns=12
```

Probar sin llamar a Grok:

```bash
npm run radar:grok -- --dry-run
```

Dejarlo corriendo cada 6 horas:

```bash
npm run radar:grok:watch
```

Convertir la última señal en borrador con Ollama:

```bash
npm run factory:tutorial
```

O usar una señal concreta:

```bash
npm run factory:tutorial -- --input=data/tutorial-factory/inbox/<archivo>.md
```

## Carpetas

```text
data/tutorial-factory/signals/   Informes completos de radar.
data/tutorial-factory/inbox/     Señales listas para alimentar el generador.
drafts/tutorial-factory/         Borradores locales no publicados.
docs/research/                   Cola editorial y briefs revisables.
```

## Reglas de calidad

Una señal solo puede transformarse en lección pública si:

- hay fuente primaria: documentación oficial, repo, model card, paper o página del proveedor;
- se puede crear una práctica de 15 a 60 minutos;
- el alumno obtiene una evidencia observable;
- se explican costes, privacidad, seguridad, licencia y mantenimiento;
- no duplica una lección existente salvo que sea una actualización clara.

## Calibración actual

El radar tiene dos perfiles:

| Perfil | Uso | Coste/tiempo | Riesgo |
| --- | --- | --- | --- |
| `fast` | clasificar temas, preparar cola editorial, ordenar ideas ya conocidas | menor | no verifica actualidad externa |
| `deep` | consultar señales externas y fuentes recientes con Grok | mayor | puede traer enlaces o señales que todavía deben comprobarse |

Configuración recomendada:

- `fast`: bajo demanda o cada pocas horas si hay muchos textos en `inbox`;
- `deep`: 1-4 veces al día, no cada pocos minutos;
- `factory:tutorial`: después de revisar la señal o en modo borrador local.

La prueba de calibración del 2026-07-27 confirmó:

- `grok --output-format json` devuelve un envoltorio con `structuredOutput` y `text`;
- el script ya lee `structuredOutput` primero y `text` como fallback;
- `--max-turns=3` puede ser insuficiente si Grok usa herramientas;
- `--max-turns=12` funcionó para una consulta profunda pequeña;
- las salidas deben seguir marcándose como “señal editorial; no publicar sin verificación”.

## Automatización recomendada en macOS

Usar `launchd` con la plantilla:

```text
ops/launchd/net.aulafy.grok-radar.plist
```

Si el repositorio está dentro de `Documentos`, macOS puede impedir que un
LaunchAgent lea sus scripts aunque el usuario pueda ejecutarlos desde Terminal.
La instalación activa de Aulafy evita ese problema usando un runner sin código
de producción en:

```text
~/AulafyAutomation/aulafy-tutorial-runner
```

El runner solo contiene scripts, señales y borradores. No contiene credenciales,
no publica y no modifica la web. Los `plist` instalados apuntan a ese directorio.

Instalación manual de una plantilla ya adaptada a la ruta definitiva:

```bash
cp ops/launchd/net.aulafy.grok-radar.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/net.aulafy.grok-radar.plist
```

Parar:

```bash
launchctl bootout gui/$(id -u)/net.aulafy.grok-radar
```

Comprobar estado y diagnóstico:

```bash
launchctl print gui/$(id -u)/net.aulafy.grok-radar
tail -n 80 /tmp/aulafy-grok-radar.out.log
tail -n 80 /tmp/aulafy-grok-radar.err.log
```

Tras un corte de luz, macOS vuelve a cargar el LaunchAgent al iniciar sesión. La
ejecución usa la ruta explícita de Grok:

```text
~/.grok/bin/grok
```

## Qué no debe hacer

- No publicar directamente en `app/`.
- No cambiar fechas de contenidos para aparentar actualización.
- No citar X como prueba técnica.
- No recomendar herramientas con coste sin advertencia visible.
- No ejecutar automatizaciones con permisos amplios sobre repositorios reales.
