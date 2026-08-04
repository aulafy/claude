"use client";

import Icon from "@/components/Icon";

export default function WebCourseActions() {
  return (
    <div className="web-course-actions" aria-label="Opciones de descarga">
      <a className="aula-button aula-button-primary" href="/web/descargar">
        <Icon name="download" /> Descargar HTML
      </a>
      <button className="aula-button aula-button-secondary" type="button" onClick={() => window.print()}>
        <Icon name="printer" /> Imprimir o guardar en PDF
      </button>
    </div>
  );
}
