import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Una web para tu servicio en minutos — Claude Code + IA Local",
  description: "Crea una landing page atractiva para presentar tu servicio, recoger contactos o vender, y prepárala para publicarla.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Una web en minutos"
      title="Una web para tu servicio en minutos"
      emoji="🌐"
      lead={<>Una <strong>página de aterrizaje</strong> (<em>landing page</em>): una web de una sola página, atractiva y clara, para presentar tu servicio, recoger contactos o vender algo. De la idea a la web publicada, muy rápido.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué debe tener una landing que convierte visitas en clientes.</li>
          <li>Crear una con Claude Code describiéndola en lenguaje normal.</li>
          <li>Prepararla para publicarla (capítulo siguiente).</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="landing page">
        Es la web-escaparate: lo primero que ve alguien que llega desde un anuncio, un enlace de LinkedIn o una tarjeta. Su único trabajo es que el visitante <strong>entienda qué ofreces</strong> y <strong>haga una acción</strong> (escribirte, comprar, reservar).
      </Cristiano>

      <Idea>Una buena landing tiene: un titular claro (qué haces y para quién), tres beneficios, una prueba (testimonio o dato), y un botón de acción visible. Si le das esto a Claude Code, tendrás una base sólida.</Idea>

      <Nota title="Requisitos">
        Solo <strong>Claude Code</strong> y <strong>Node.js</strong>. No necesita IA local: es una web estática y rápida.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir mi-landing
cd mi-landing
claude`}</Terminal>

      <Prompt>{`Crea una landing page moderna y rápida para mi servicio. Datos:
- Servicio: [describe qué ofreces y a quién].
- Titular potente y subtítulo.
- Sección de 3 beneficios con iconos.
- Un testimonio y una sección de precios (o "contáctame").
- Formulario de contacto y botón de acción destacado.
- Diseño responsive (se ve bien en móvil).
- README con instrucciones.`}</Prompt>

      <Cristiano term="responsive">
        Que la web se <em>adapta</em> al tamaño de la pantalla: se ve bien tanto en el ordenador como en el móvil. Es imprescindible hoy: la mayoría de visitas llegan desde el teléfono.
      </Cristiano>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Abre la dirección local y revisa la página. Achica la ventana del navegador para comprobar que se ve bien en pantallas pequeñas.</p></div>

      <Comprueba>La página debería verse profesional, con tu titular arriba y un botón de acción claro. Redúcela a tamaño móvil: los elementos deben reordenarse sin romperse.</Comprueba>

      <Guardar>Proyecto: carpeta <code>mi-landing</code>. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/mi-landing</code> y <code>npm run dev</code>. En el próximo capítulo la publicas en internet gratis y con tu propio enlace.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>El formulario no envía</strong> — una landing local no manda correos por sí sola; en el capítulo de publicar conectamos un servicio de formularios gratuito.</li>
          <li><strong>Se ve mal en móvil</strong> — pide a Claude Code que “mejore el responsive” de la sección concreta.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Crea dos versiones del titular y pide a Claude Code que prepare la web para <strong>probar cuál funciona mejor</strong> (un test A/B sencillo). Aprender qué convence a tus visitantes es oro.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/wordpress", label: "Tema de WordPress" }} next={{ href: "/volumen-2/facturacion", label: "Asistente para autónomos" }} />
    </Chapter>
  );
}
