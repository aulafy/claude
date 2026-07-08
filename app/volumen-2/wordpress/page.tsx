import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Crea un tema de WordPress con IA",
  description: "Crea un tema de bloques (Full Site Editing) para WordPress a tu medida con Claude Code, sin pagar plantillas ni depender de una agencia.",
  alternates: { canonical: "/cursos/ia-local/wordpress" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Tema de WordPress"
      title="Crea un tema de WordPress con IA"
      icon="wordpress"
      lead={<>Un <strong>tema</strong> (el diseño y la estructura visual) para WordPress, hecho a tu medida con ayuda de Claude Code. Ideal si tienes o quieres una web con WordPress y no quieres pagar una plantilla ni depender de una agencia.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué es un tema de WordPress y qué tipos hay en 2026.</li>
          <li>Crear un tema de bloques (el estándar actual) con Claude Code.</li>
          <li>Instalarlo y probarlo en un WordPress local.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="tema (theme)">
        El tema es “la ropa” de tu web: colores, tipografías, disposición de la portada, cabecera, pie... El <em>contenido</em> (tus textos y fotos) es independiente; cambiar de tema es como cambiarle el vestido a la web sin tocar lo que dice.
      </Cristiano>

      <Idea>En 2026 el estándar recomendado son los <strong>temas de bloques</strong> (<em>Full Site Editing</em>): permiten editar toda la web visualmente, cargan rápido y son fáciles de mantener sin saber programar. Los temas “clásicos” en PHP siguen funcionando, pero para uno nuevo, empieza con bloques.</Idea>

      <Nota title="Requisitos">
        <strong>Claude Code</strong> y un <strong>WordPress donde probar</strong>. Lo más cómodo es un WordPress local: aplicaciones gratuitas como <em>Local</em> (o <em>Studio</em>, de Automattic) instalan un WordPress en tu ordenador en un par de clics. Claude Code puede guiarte en la instalación.
      </Nota>

      <div className="prose">
        <h2>Paso a paso</h2>
        <p>Crea la carpeta del tema y arranca Claude Code:</p>
      </div>

      <Terminal>{`cd ~/proyectos-ia
mkdir tema-wordpress
cd tema-wordpress
claude`}</Terminal>

      <Prompt>{`Crea un tema de bloques (Full Site Editing) para WordPress:
- Nombre del tema y un estilo limpio y moderno.
- Plantillas para portada, entradas y página.
- Colores y tipografías definidos en theme.json.
- Cabecera con menú y pie con avisos legales.
- Explícame en el README cómo instalarlo en WordPress y cómo cambiar colores y tipografías.`}</Prompt>

      <Cristiano term="theme.json">
        Es el “panel de control” del tema: un único archivo donde se definen colores, tipografías y espaciados. Cambiar el aspecto de toda la web es tan fácil como editar ahí unos valores (o pedírselo a Claude Code).
      </Cristiano>

      <div className="prose">
        <h2>Instalar y probar</h2>
        <p>El README te dirá cómo, pero en esencia: comprime la carpeta del tema en un <code>.zip</code> y súbelo en tu WordPress, en <em>Apariencia → Temas → Añadir nuevo → Subir</em>. Actívalo.</p>
      </div>

      <Comprueba>Tras activarlo, tu web debería mostrar el nuevo diseño. Entra en el editor visual (<em>Apariencia → Editor</em>) y comprueba que puedes cambiar textos y colores con el ratón.</Comprueba>

      <Guardar>Proyecto: carpeta <code>tema-wordpress</code> (el código del tema). Guárdala con Git como cualquier proyecto. Para instalar una versión nueva en WordPress, vuelve a exportar el <code>.zip</code> y súbelo. Tu contenido de WordPress no se pierde al cambiar de tema.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>El tema no aparece al subirlo</strong> — revisa que el <code>.zip</code> contenga los archivos en la raíz y que exista <code>style.css</code> con la cabecera del tema.</li>
          <li><strong>Se ve roto</strong> — pega el error o una captura a Claude Code; suele ser una plantilla mal referenciada.</li>
          <li><strong>No puedo editar visualmente</strong> — confirma que es un tema de <em>bloques</em> y que tu WordPress está actualizado.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Pide a Claude Code una variación del tema en <strong>modo oscuro</strong> y un patrón de sección reutilizable (por ejemplo, un bloque de “testimonios”) que puedas insertar en cualquier página.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/avatar", label: "Un avatar que habla" }} next={{ href: "/cursos/ia-local/landing", label: "Una web en minutos" }} />
    </Chapter>
  );
}
