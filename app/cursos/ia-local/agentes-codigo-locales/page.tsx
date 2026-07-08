import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Agentes de código locales con Ollama",
  description:
    "Cómo montar un agente de código local con Ollama, modelos abiertos, contexto suficiente y verificación básica antes de tocar proyectos reales.",
  keywords: [
    "claude code local ollama",
    "agente de código local",
    "alternativa Claude Code open source",
    "Ollama coding agent",
    "IA local programación",
  ],
  alternates: { canonical: "/cursos/ia-local/agentes-codigo-locales" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Agentes de código locales"
      title="Agentes de código locales con Ollama"
      icon="terminal"
      lead={<>Puedes usar modelos locales para tareas de código sin enviar tu proyecto a la nube, pero hay que diseñar el flujo con contexto, permisos y verificación. La promesa no es “igual que Claude Code”; la promesa buena es privacidad, coste predecible y control.</>}
      courseHref="/cursos/ia-local"
      courseLabel="Claude Code + IA Local"
    >
      <Objetivos>
        <ul>
          <li>Entender cuándo compensa un agente de código local y cuándo no.</li>
          <li>Configurar Ollama para modelos de código con suficiente contexto.</li>
          <li>Crear un flujo de edición y verificación que no rompa tu repo.</li>
        </ul>
      </Objetivos>

      <Cristiano term="agente de código local">
        Es un asistente que lee archivos, propone cambios y puede ejecutar comandos usando un modelo en tu máquina. Ganas privacidad, pero pierdes parte de la potencia y comodidad de herramientas cloud.
      </Cristiano>

      <div className="prose">
        <h2>El mapa honesto</h2>
        <p>
          Un agente local sirve muy bien para tareas acotadas: explicar código, generar tests, crear scripts,
          refactorizar un componente pequeño o preparar un plan de cambios. Para migraciones grandes,
          repositorios enormes o razonamiento largo, lo normal es usar un enfoque híbrido: local para
          privacidad y borradores, cloud para decisiones difíciles o revisión final.
        </p>
        <p>
          La base práctica es Ollama. Su documentación oficial permite ejecutar modelos en macOS, Windows
          y Linux, y exponer una API local para integraciones. En Apple Silicon, MLX puede ser útil para
          experimentos y rendimiento con memoria unificada, pero no convierte cualquier portátil en una estación
          de trabajo ilimitada.
        </p>
      </div>

      <Terminal>{`# 1. Comprueba Ollama
ollama --version
ollama list

# 2. Descarga un modelo de código o propósito general
ollama pull qwen2.5-coder:7b

# 3. Prueba una tarea pequeña
ollama run qwen2.5-coder:7b "Explica este bug: un array vacío rompe un reduce sin valor inicial"

# 4. API local para integraciones
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5-coder:7b",
  "prompt": "Escribe una función TypeScript que valide emails sin dependencias.",
  "stream": false
}'`}</Terminal>

      <Idea>
        Para coding agents, el contexto importa más que el nombre del modelo. Si el agente solo ve un archivo suelto, actuará como si el resto del proyecto no existiera.
      </Idea>

      <div className="prose">
        <h2>Checklist antes de dejarlo tocar archivos</h2>
        <ul>
          <li><strong>Trabaja en una rama</strong>: nunca pruebes un agente local en `main`.</li>
          <li><strong>Define alcance</strong>: qué carpeta puede leer, qué archivos puede editar y qué comandos puede ejecutar.</li>
          <li><strong>Exige plan</strong>: antes de editar, que liste archivos, riesgos y criterio de éxito.</li>
          <li><strong>Verifica en frío</strong>: instala dependencias y corre tests después del cambio.</li>
          <li><strong>Registra métricas</strong>: tiempo, tokens, errores y comandos ejecutados.</li>
        </ul>
      </div>

      <Terminal>{`# Flujo mínimo para trabajar con seguridad
git checkout -b agent-local/tarea-pequena

# Pide primero un plan, no cambios
# Después de aplicar cambios:
npm install
npm run lint
npm run build
git diff --stat
git diff`}</Terminal>

      <Cuidado>
        No pegues secretos, `.env`, claves SSH ni datos de clientes aunque el modelo sea local. El riesgo no es solo “la nube”: también hay logs, historial de terminal y herramientas con permisos amplios.
      </Cuidado>

      <Comprueba>
        Si el modelo local falla con proyectos multiarchivo, reduce la tarea: un bug, un test, un componente o un script. Si necesita recordar decisiones largas, guarda un `TASK.md` con estado, decisiones y próximos pasos.
      </Comprueba>

      <Guardar>
        Un agente local útil tiene tres piezas: modelo local, contexto bien preparado y verificación automática. Sin verificación, solo tienes un generador de parches con mucha confianza.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://docs.ollama.com/quickstart" target="_blank" rel="noopener noreferrer">Ollama Quickstart</a></li>
          <li><a href="https://docs.ollama.com/context-length" target="_blank" rel="noopener noreferrer">Ollama: context length</a></li>
          <li><a href="https://ml-explore.github.io/mlx/" target="_blank" rel="noopener noreferrer">MLX documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/ia-local/hardware-minimo-2026", label: "Hardware mínimo para IA local" }}
        next={{ href: "/cursos/ia-local/open-webui-qdrant", label: "Open WebUI + Ollama + Qdrant" }}
      />
    </Chapter>
  );
}
