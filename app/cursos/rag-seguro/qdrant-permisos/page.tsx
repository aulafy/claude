import type { Metadata } from "next";
import { RigorousLesson } from "@/components/RigorousLesson";
import { RAG_LESSONS } from "@/lib/rag-seguro-lessons";

export const metadata: Metadata = {
  title: "Qdrant multiusuario y permisos",
  description:
    "Diseña RAG multiusuario con Qdrant usando payloads, filtros, tenant_id, document_id y permisos antes de recuperar contexto.",
  keywords: ["Qdrant multiusuario", "Qdrant permisos RAG", "RAG multiusuario", "payload filtering Qdrant", "RAG permisos por usuario"],
  alternates: { canonical: "/cursos/rag-seguro/qdrant-permisos" },
};

export default function Page() {
  return <RigorousLesson d={RAG_LESSONS["qdrant-permisos"]} />;
}
