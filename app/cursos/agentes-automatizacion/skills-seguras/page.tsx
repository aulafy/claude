import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Skills seguras y auditables — Agentes y automatización",
  description:
    "Cómo instalar, revisar y crear skills de Claude Code sin abrir puertas innecesarias ni ejecutar instrucciones que no entiendes.",
  alternates: { canonical: "/cursos/agentes-automatizacion/skills-seguras" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Skills seguras y auditables"
      title="Skills seguras y auditables"
      icon="shield"
      lead={<>Una skill puede ser oro: encapsula una forma excelente de trabajar. También puede ser una puerta peligrosa si la instalas sin mirar. En esta lección aprendes a tratarlas como código: revisar, probar y limitar.</>}
      courseHref="/cursos/agentes-automatizacion"
      courseLabel="Agentes y automatización"
    >
      <Objetivos>
        <ul>
          <li>Entender qué añade una skill y qué no debería hacer.</li>
          <li>Auditar una skill antes de usarla en proyectos reales.</li>
          <li>Crear una skill mínima con criterios de seguridad.</li>
        </ul>
      </Objetivos>

      <Cristiano term="skill">
        Es una carpeta con instrucciones, ejemplos y a veces scripts que enseñan a Claude una forma concreta de trabajar. No es un plugin mágico: es conocimiento empaquetado.
      </Cristiano>

      <div className="prose">
        <h2>Checklist antes de instalar una skill</h2>
        <ul>
          <li>Lee el <code>SKILL.md</code> completo.</li>
          <li>Busca comandos destructivos: <code>rm</code>, <code>curl | sh</code>, cambios en <code>~/.ssh</code>, tokens, exfiltración.</li>
          <li>Revisa si pide acceso a red, navegador, sistema de archivos o secretos.</li>
          <li>Comprueba si trae scripts y qué hacen.</li>
          <li>Pruébala primero en un repo de juguete.</li>
        </ul>
      </div>

      <Terminal>{`rg -n "curl|wget|rm -rf|TOKEN|SECRET|\\.env|ssh|chmod|sudo" ruta/de/la/skill`}</Terminal>

      <Cuidado>
        No instales skills como quien instala fondos de pantalla. Una skill influye en cómo piensa y actúa tu asistente dentro del proyecto. Si una instrucción te parece rara, no la ignores.
      </Cuidado>

      <div className="prose">
        <h2>Una skill buena tiene límites</h2>
        <p>Ejemplo de buen alcance: “generar una auditoría de accesibilidad con pasos manuales y checks automáticos”. Ejemplo demasiado amplio: “optimizar cualquier web y aplicar todos los cambios necesarios”.</p>
      </div>

      <Terminal>{`---
name: qa-accessibilidad
description: Revisa accesibilidad web y propone cambios sin aplicarlos automáticamente.
---

Actúa como revisor de accesibilidad.
No modifiques archivos salvo que el usuario lo pida explícitamente.
Prioriza: contraste, navegación por teclado, etiquetas, estados de foco y textos alternativos.
Devuelve hallazgos con severidad y archivo.`}</Terminal>

      <Idea>
        La mejor skill no hace más cosas: reduce ambigüedad. Te da mejores encargos, mejor checklist y mejor salida.
      </Idea>

      <Comprueba>
        Crea una skill local de solo lectura para revisar una página. Pruébala en una copia. Si el resultado es útil sin tocar archivos, ya tienes una skill segura para iterar.
      </Comprueba>

      <Guardar>
        Trata cada skill como dependencia: origen, versión, lectura, prueba y rollback. Si no puedes explicar qué hace, no debería estar en un proyecto importante.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/agentes-automatizacion/hooks", label: "Hooks" }}
        next={{ href: "/cursos/agentes-automatizacion/mcp-seguro", label: "MCP seguro" }}
      />
    </Chapter>
  );
}
