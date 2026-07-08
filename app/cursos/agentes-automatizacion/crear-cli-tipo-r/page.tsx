import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Crear una CLI de agentes tipo R — Agentes y automatización",
  description:
    "Tutorial paso a paso para crear una CLI local-first de agentes inspirada en R: Click, Rich, Ollama, skills, permisos, auditoría, workflows YAML, memoria SQLite y API local.",
  keywords: [
    "crear CLI IA local",
    "R CLI raym33",
    "agente IA local Python",
    "Ollama CLI agentes",
    "skills permisos workflows IA",
    "tutorial CLI inteligencia artificial",
  ],
  alternates: { canonical: "/cursos/agentes-automatizacion/crear-cli-tipo-r" },
};

export default function Page() {
  return (
    <Chapter
      crumb="CLI tipo R"
      title="Crear una CLI de agentes tipo R"
      icon="terminal"
      lead={<>En esta lección vas a construir una versión mínima de <strong>R</strong>, el proyecto open source de Ramón Guillamón: una CLI local-first para agentes privados con modelos locales, skills, permisos, workflows y memoria persistente.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Entender la arquitectura real de una CLI de agentes como R.</li>
          <li>Crear una versión mínima en Python con Click, Rich, Ollama y SQLite.</li>
          <li>Añadir skills, permisos, auditoría, workflows YAML y tareas persistentes.</li>
          <li>Evitar el error típico: una CLI que puede hacerlo todo sin límites.</li>
        </ul>
      </Objetivos>

      <Cristiano term="R CLI">
        R no es el lenguaje estadístico R. En este curso hablamos de <a href="https://github.com/raym33/r" target="_blank" rel="noopener noreferrer">raym33/r</a>: una capa local para ejecutar agentes de IA privados en tu propio ordenador.
      </Cristiano>

      <div className="prose">
        <h2>Qué vamos a copiar de R</h2>
        <p>
          No vamos a copiar el repo completo. Vamos a copiar sus decisiones buenas: local-first, permisos por capacidad, skills pequeñas,
          configuración en YAML, salida auditable, workflows reproducibles y una cola de tareas que sobrevive al cierre de la terminal.
        </p>
        <ul>
          <li><strong>CLI conversacional</strong>: `r "resume este repo"` se convierte en chat directo.</li>
          <li><strong>Backends locales</strong>: Ollama, LM Studio o cualquier API compatible con OpenAI en loopback.</li>
          <li><strong>Skills</strong>: herramientas estrechas que el agente puede invocar sin recibir acceso total al sistema.</li>
          <li><strong>Permisos</strong>: red, archivos, Docker, email o SSH no se activan por accidente.</li>
          <li><strong>Agent OS</strong>: agentes con manifiesto, cola, estados, eventos y memoria.</li>
        </ul>
      </div>

      <Terminal>{`# Probar el R real como referencia
git clone https://github.com/raym33/r.git
cd r
python -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"

# Modelo local
ollama pull qwen2.5:7b
ollama serve

# Configuracion minima
mkdir -p ~/.r-cli
cat > ~/.r-cli/config.yaml <<'YAML'
llm:
  backend: ollama
  model: qwen2.5:7b
  base_url: http://127.0.0.1:11434/v1

security:
  local_only: true
  network_access: false
  mode: ask
YAML

r doctor
r chat "Resume este repositorio en 5 puntos"`}</Terminal>

      <Cuidado>
        Antes de crear una CLI parecida, prueba el proyecto real. Si no entiendes cómo se usa, acabarás diseñando desde teoría.
      </Cuidado>

      <div className="prose">
        <h2>Arquitectura mínima</h2>
        <p>La versión educativa se llamará `aulafy-r-mini`. Tendrá menos funciones que R, pero las piezas importantes estarán ahí.</p>
      </div>

      <Terminal>{`aulafy-r-mini/
  pyproject.toml
  src/aulafy_r/
    __init__.py
    main.py
    config.py
    llm.py
    permissions.py
    agent.py
    workflows.py
    agent_os.py
    skills/
      __init__.py
      math_skill.py
      fs_skill.py
  tests/
    test_permissions.py
    test_workflows.py`}</Terminal>

      <div className="prose">
        <h2>1. Crea el paquete instalable</h2>
        <p>Una CLI seria debe instalar un comando real, no depender de ejecutar `python script.py`.</p>
      </div>

      <Terminal>{`mkdir -p aulafy-r-mini/src/aulafy_r/skills
cd aulafy-r-mini
python -m venv .venv
source .venv/bin/activate

cat > pyproject.toml <<'TOML'
[project]
name = "aulafy-r-mini"
version = "0.1.0"
description = "CLI local-first educativa para agentes de IA privados"
requires-python = ">=3.10"
dependencies = [
  "click>=8.0.0",
  "rich>=13.0.0",
  "httpx>=0.25.0",
  "pydantic>=2.0.0",
  "pyyaml>=6.0.0",
]

[project.scripts]
ar = "aulafy_r.main:cli"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
TOML

touch src/aulafy_r/__init__.py
touch src/aulafy_r/skills/__init__.py
python -m pip install -e .`}</Terminal>

      <div className="prose">
        <h2>2. Configuración local-first</h2>
        <p>
          R rechaza por defecto endpoints que no sean locales. Esa decisión es clave: si tu CLI manda documentos a cualquier URL sin avisar,
          no es local-first, solo es una terminal bonita.
        </p>
      </div>

      <Terminal>{`# src/aulafy_r/config.py
from pathlib import Path
from pydantic import BaseModel
import yaml

class LLMConfig(BaseModel):
    model: str = "qwen2.5:7b"
    base_url: str = "http://127.0.0.1:11434/v1"

class SecurityConfig(BaseModel):
    local_only: bool = True
    network_access: bool = False
    mode: str = "ask"

class Config(BaseModel):
    llm: LLMConfig = LLMConfig()
    security: SecurityConfig = SecurityConfig()
    home_dir: str = "~/.aulafy-r-mini"

    @classmethod
    def load(cls) -> "Config":
        path = Path("~/.aulafy-r-mini/config.yaml").expanduser()
        if not path.exists():
            return cls()
        return cls(**yaml.safe_load(path.read_text()) or {})

def is_loopback(url: str) -> bool:
    return url.startswith("http://127.0.0.1") or url.startswith("http://localhost")

def validate_local_llm(config: Config) -> None:
    if config.security.local_only and not is_loopback(config.llm.base_url):
        raise RuntimeError("Endpoint LLM no local. Usa 127.0.0.1 o localhost.")`}</Terminal>

      <Idea>
        El primer guardrail de una CLI de IA no es un prompt: es una comprobación de configuración antes de enviar datos.
      </Idea>

      <div className="prose">
        <h2>3. Cliente LLM compatible con Ollama</h2>
        <p>Ollama expone una API compatible con OpenAI en `/v1/chat/completions`. Eso permite cambiar de proveedor sin reescribir el agente.</p>
      </div>

      <Terminal>{`# src/aulafy_r/llm.py
import httpx
from .config import Config, validate_local_llm

def chat(config: Config, messages: list[dict[str, str]]) -> str:
    validate_local_llm(config)
    url = config.llm.base_url.rstrip("/") + "/chat/completions"
    payload = {
        "model": config.llm.model,
        "messages": messages,
        "temperature": 0.2,
    }
    response = httpx.post(url, json=payload, timeout=120)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"]`}</Terminal>

      <div className="prose">
        <h2>4. CLI con chat directo</h2>
        <p>
          R usa un grupo de Click que interpreta comandos desconocidos como mensajes. Así `r "explica esto"` funciona sin escribir `chat`.
          Esta versión mínima replica ese patrón.
        </p>
      </div>

      <Terminal>{`# src/aulafy_r/main.py
import click
from rich.console import Console
from rich.panel import Panel

from .config import Config
from .llm import chat as llm_chat

console = Console()

class DirectChatGroup(click.Group):
    def resolve_command(self, ctx, args):
        try:
            return super().resolve_command(ctx, args)
        except click.UsageError:
            if not args or args[0].startswith("-"):
                raise
            return "chat", self.get_command(ctx, "chat"), args

@click.group(cls=DirectChatGroup, invoke_without_command=True)
@click.pass_context
def cli(ctx):
    if ctx.invoked_subcommand is None:
        console.print(ctx.get_help())

@cli.command()
@click.argument("message", nargs=-1, required=True)
def chat(message):
    config = Config.load()
    text = " ".join(message)
    answer = llm_chat(config, [{"role": "user", "content": text}])
    console.print(Panel(answer, title="Aulafy R Mini"))

@cli.command()
def doctor():
    config = Config.load()
    console.print({
        "model": config.llm.model,
        "base_url": config.llm.base_url,
        "local_only": config.security.local_only,
    })

if __name__ == "__main__":
    cli()`}</Terminal>

      <Terminal>{`ar doctor
ar chat "Dime una receta de RAG local"
ar "Ahora resume este proyecto como si fuera para una pyme"`}</Terminal>

      <div className="prose">
        <h2>5. Skills pequeñas, no superpoderes</h2>
        <p>
          Una skill es una herramienta con contrato. No le des al modelo una función `run_shell(command)`. Dale `math.calculate`,
          `fs.read_text` o `git.status`, cada una con límites claros.
        </p>
      </div>

      <Terminal>{`# src/aulafy_r/skills/math_skill.py
import ast
import operator as op

OPS = {
    ast.Add: op.add,
    ast.Sub: op.sub,
    ast.Mult: op.mul,
    ast.Div: op.truediv,
    ast.Pow: op.pow,
    ast.USub: op.neg,
}

def calculate(expression: str) -> float:
    def eval_node(node):
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return node.value
        if isinstance(node, ast.BinOp) and type(node.op) in OPS:
            return OPS[type(node.op)](eval_node(node.left), eval_node(node.right))
        if isinstance(node, ast.UnaryOp) and type(node.op) in OPS:
            return OPS[type(node.op)](eval_node(node.operand))
        raise ValueError("Expresion no permitida")

    tree = ast.parse(expression, mode="eval")
    return eval_node(tree.body)`}</Terminal>

      <Terminal>{`# src/aulafy_r/skills/__init__.py
from .math_skill import calculate

TOOLS = {
    "math.calculate": calculate,
}

def run_tool(name: str, **kwargs):
    if name not in TOOLS:
        raise KeyError(f"Tool no registrada: {name}")
    return TOOLS[name](**kwargs)`}</Terminal>

      <div className="prose">
        <h2>6. Permisos y auditoría</h2>
        <p>La diferencia entre una demo y una herramienta útil está aquí. Cada llamada debe clasificarse, autorizarse y quedar registrada.</p>
      </div>

      <Terminal>{`# src/aulafy_r/permissions.py
from dataclasses import dataclass, asdict
from pathlib import Path
import json
import time
import uuid

RISK = {
    "math": "low",
    "fs": "medium",
    "git": "high",
    "docker": "critical",
    "email": "critical",
}

@dataclass
class PermissionRequest:
    tool: str
    risk: str
    arguments: dict
    trace_id: str

def classify(tool: str) -> str:
    skill = tool.split(".", 1)[0]
    return RISK.get(skill, "high")

def authorize(tool: str, arguments: dict, auto_approve: bool = False) -> PermissionRequest:
    request = PermissionRequest(
        tool=tool,
        risk=classify(tool),
        arguments=arguments,
        trace_id=str(uuid.uuid4()),
    )
    if request.risk in {"high", "critical"} and not auto_approve:
        raise PermissionError(f"Permiso requerido para {tool} ({request.risk})")
    audit(request, "allowed")
    return request

def audit(request: PermissionRequest, outcome: str) -> None:
    home = Path("~/.aulafy-r-mini").expanduser()
    home.mkdir(parents=True, exist_ok=True)
    record = {"ts": time.time(), "outcome": outcome, **asdict(request)}
    with (home / "audit.jsonl").open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\\n")`}</Terminal>

      <Cuidado>
        El modo `--yes` debe existir solo para laboratorios controlados. En proyectos reales, las acciones de alto riesgo necesitan confirmación, límites y logs.
      </Cuidado>

      <div className="prose">
        <h2>7. Workflows YAML reproducibles</h2>
        <p>
          R no depende solo de “preguntar al agente”. También permite workflows declarativos: pasos, dependencias, variables, dry-run y reintentos.
          Esto es lo que convierte una tarea en una cápsula repetible.
        </p>
      </div>

      <Terminal>{`# workflow.yaml
version: 1
name: informe-calculo
steps:
  - id: base
    uses: math.calculate
    with:
      expression: "6 * 7"
  - id: doble
    uses: math.calculate
    depends_on: [base]
    with:
      expression: "42 * 2"`}</Terminal>

      <Terminal>{`# src/aulafy_r/workflows.py
import yaml
from .permissions import authorize
from .skills import run_tool

def run_workflow(path: str, dry_run: bool = False):
    raw = yaml.safe_load(open(path, encoding="utf-8"))
    results = {}
    for step in raw["steps"]:
        for dep in step.get("depends_on", []):
            if dep not in results:
                raise RuntimeError(f"Dependencia pendiente: {dep}")
        tool = step["uses"]
        args = step.get("with", {})
        if dry_run:
            results[step["id"]] = {"dry_run": True, "tool": tool, "args": args}
            continue
        authorize(tool, args, auto_approve=True)
        results[step["id"]] = run_tool(tool, **args)
    return results`}</Terminal>

      <div className="prose">
        <h2>8. Agent OS mínimo con SQLite</h2>
        <p>La cola es lo que separa un comando puntual de una capa operativa: puedes crear, pausar, reintentar y auditar tareas.</p>
      </div>

      <Terminal>{`# src/aulafy_r/agent_os.py
from pathlib import Path
import sqlite3
import time
import uuid

DB = Path("~/.aulafy-r-mini/agent-os.db").expanduser()

def connect():
    DB.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB)
    con.execute("""
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        agent TEXT NOT NULL,
        input TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at REAL NOT NULL
      )
    """)
    return con

def submit(agent: str, text: str) -> str:
    task_id = str(uuid.uuid4())
    with connect() as con:
        con.execute(
            "INSERT INTO tasks VALUES (?, ?, ?, ?, ?)",
            (task_id, agent, text, "queued", time.time()),
        )
    return task_id

def list_tasks():
    with connect() as con:
        return con.execute(
            "SELECT id, agent, status, input FROM tasks ORDER BY created_at DESC"
        ).fetchall()`}</Terminal>

      <div className="prose">
        <h2>9. Manifiesto de agente</h2>
        <p>Un agente no debería ser “el modelo con todo abierto”. Debe tener identidad, instrucciones, skills, rutas y política de red.</p>
      </div>

      <Terminal>{`# researcher.yaml
name: private-researcher
description: Analiza documentos dentro de un proyecto concreto
system_prompt: |
  Eres un investigador local. Cita evidencia y no inventes datos.
skills: [fs, math]
network_access: false
filesystem_roots:
  - ./documents`}</Terminal>

      <Comprueba>
        Tu versión mínima debe pasar estas pruebas: rechaza endpoints no locales, registra cada tool call, falla si una workflow usa una tool desconocida y no ejecuta acciones de alto riesgo sin aprobación.
      </Comprueba>

      <div className="prose">
        <h2>Qué añadir después</h2>
        <ul>
          <li><strong>Streaming</strong>: mostrar tokens mientras llegan.</li>
          <li><strong>Tool calling real</strong>: pasar schemas al modelo y ejecutar tools validadas.</li>
          <li><strong>API local</strong>: FastAPI en `127.0.0.1` para una UI tipo Control Center.</li>
          <li><strong>Memoria</strong>: SQLite para sesión corta y Qdrant/GBrain para memoria semántica.</li>
          <li><strong>MCP</strong>: cargar servidores manualmente, con allowlist y sin auto-loading.</li>
          <li><strong>Distribución</strong>: `pyproject.toml`, tests, GitHub Actions y releases.</li>
        </ul>
      </div>

      <Guardar>
        La lección de R es esta: una CLI de agentes no se mide por cuántas cosas puede hacer, sino por cuántas puede hacer con control, trazabilidad y privacidad.
      </Guardar>

      <div className="prose">
        <h2>Fuentes y proyecto base</h2>
        <ul>
          <li><a href="https://github.com/raym33/r" target="_blank" rel="noopener noreferrer">raym33/r en GitHub</a></li>
          <li><a href="https://click.palletsprojects.com/" target="_blank" rel="noopener noreferrer">Click: documentación oficial</a></li>
          <li><a href="https://rich.readthedocs.io/" target="_blank" rel="noopener noreferrer">Rich: documentación oficial</a></li>
          <li><a href="https://github.com/ollama/ollama/blob/main/docs/api.md" target="_blank" rel="noopener noreferrer">Ollama API</a></li>
          <li><a href="https://packaging.python.org/en/latest/guides/writing-pyproject-toml/" target="_blank" rel="noopener noreferrer">Python packaging: pyproject.toml</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/subagentes", label: "Subagentes" }}
        next={{ href: "/cursos/agentes-automatizacion/hooks", label: "Hooks" }}
      />
    </Chapter>
  );
}
