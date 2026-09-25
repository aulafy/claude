import Link from "next/link";

/** Aviso para páginas complementarias: remite al camino principal en 3 niveles. */
export default function PathNotice() {
  return (
    <aside className="path-notice" aria-label="Camino recomendado">
      <p>
        <strong>¿Es tu primera vez en Aulafy?</strong> Esta página es material complementario.
        El camino recomendado tiene 3 niveles:
      </p>
      <ol>
        <li><Link href="/empezar"><span>1</span> Empieza</Link></li>
        <li><Link href="/cursos/ia-pymes"><span>2</span> Aplica</Link></li>
        <li><Link href="/cursos/claude-code"><span>3</span> Construye</Link></li>
      </ol>
    </aside>
  );
}
