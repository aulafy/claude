import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Segundo cerebro local con Obsidian y RAG",
  description:
    "Convierte notas Markdown de Obsidian en un RAG local con limpieza, frontmatter, backlinks, permisos, Qdrant y respuestas con citas.",
  keywords: ["segundo cerebro local ollama obsidian rag", "Obsidian RAG local", "RAG notas Markdown", "Qdrant Obsidian"],
  alternates: { canonical: "/cursos/rag-seguro/obsidian-segundo-cerebro" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Obsidian RAG"
      title="Segundo cerebro local con Obsidian y RAG"
      icon="book"
      lead={<>Obsidian funciona muy bien como base de conocimiento porque tus notas son Markdown. El reto no es leer archivos: es limpiar, etiquetar, filtrar y citar sin convertir tu segundo cerebro en ruido vectorial.</>}
      courseHref="/cursos/rag-seguro"
      courseLabel="RAG avanzado y seguro"
    >
      <Objetivos>
        <ul>
          <li>Preparar notas Markdown para RAG sin perder contexto.</li>
          <li>Usar frontmatter y carpetas como metadatos.</li>
          <li>Evitar mezclar notas privadas, borradores y conocimiento fiable.</li>
        </ul>
      </Objetivos>

      <Cristiano term="vault">
        Es la carpeta donde Obsidian guarda tus notas. Normalmente son archivos Markdown, enlaces internos y adjuntos.
      </Cristiano>

      <Terminal>{`---
title: "Política de devoluciones"
type: "fuente"
status: "vigente"
tenant_id: "personal"
tags: ["soporte", "legal"]
---

# Política de devoluciones

Texto claro, actualizado y con fecha.
Enlaces relacionados: [[Garantías]], [[Atención al cliente]]`}</Terminal>

      <Idea>
        No indexas “Obsidian”; indexas una carpeta de Markdown con metadatos. Eso te permite filtrar por estado, carpeta, etiqueta o tipo de nota.
      </Idea>

      <div className="prose">
        <h2>Qué excluir</h2>
        <ul>
          <li>Diarios personales si no son necesarios.</li>
          <li>Borradores sin revisar.</li>
          <li>Notas con secretos, claves o datos de terceros.</li>
          <li>Plantillas vacías y archivos duplicados.</li>
        </ul>
      </div>

      <Terminal>{`payload:
  source: "obsidian/soporte/devoluciones.md"
  title: "Política de devoluciones"
  status: "vigente"
  tags: ["soporte", "legal"]
  backlinks: ["Garantías", "Atención al cliente"]
  updated_at: "2026-07-05"`}</Terminal>

      <Cuidado>
        Un segundo cerebro suele mezclar hechos, opiniones, borradores y recuerdos personales. Si todo entra al índice con la misma confianza, el RAG responderá con la misma mezcla.
      </Cuidado>

      <Comprueba>
        Pregunta algo que solo esté en una nota obsoleta. El sistema debería ignorarla o marcarla como no vigente, no responder como si fuera fuente actual.
      </Comprueba>

      <Guardar>
        El mejor RAG sobre Obsidian empieza antes del embedding: estructura, metadatos, limpieza y una política clara de qué notas son fuente fiable.
      </Guardar>

      <div className="prose">
        <h2>Fuentes oficiales</h2>
        <ul>
          <li><a href="https://obsidian.md/help/syntax" target="_blank" rel="noopener noreferrer">Obsidian basic formatting syntax</a></li>
          <li><a href="https://obsidian.md/help/obsidian-flavored-markdown" target="_blank" rel="noopener noreferrer">Obsidian Flavored Markdown</a></li>
          <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">Qdrant documentation</a></li>
        </ul>
      </div>

      <ChapterNav
        prev={{ href: "/cursos/rag-seguro/qdrant-permisos", label: "Qdrant permisos" }}
        next={{ href: "/cursos/rag-seguro/prompt-injection", label: "Prompt injection" }}
      />
    </Chapter>
  );
}
