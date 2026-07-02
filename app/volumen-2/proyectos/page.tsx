import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cristiano, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cómo trabajar con tus proyectos — Claude Code + IA Local",
  description: "La columna vertebral del libro: crear, guardar, cerrar y reabrir tus proyectos sin perder nada. Git como máquina del tiempo.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Cómo trabajar con tus proyectos"
      title="Cómo trabajar con tus proyectos"
      icon="folder"
      lead={<>Este capítulo es la columna vertebral del libro. Cada aplicación que construyas vivirá en una <strong>carpeta de proyecto</strong>. Aquí aprendes a crearla, guardarla, cerrarla y <strong>volver a abrirla otro día</strong> sin perder nada.</>}
    >
      <Objetivos>
        <ul>
          <li>Organizar tus proyectos en carpetas ordenadas.</li>
          <li>Arrancar y detener una aplicación web.</li>
          <li>Reabrir un proyecto días después y continuar donde lo dejaste.</li>
          <li>Usar Git como una “máquina del tiempo” para no perder trabajo.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Un sitio para todo: la carpeta de proyectos</h2>
        <p>Crea una carpeta donde vivirán todos tus experimentos. Solo hay que hacerlo una vez:</p>
      </div>

      <Terminal>{`cd ~            # ir a tu carpeta personal
mkdir proyectos-ia
cd proyectos-ia`}</Terminal>

      <Cristiano term="el símbolo ~">
        La virgulilla ~ es un atajo que significa “mi carpeta personal de usuario”. Escribir <code>cd ~</code> te lleva a casa desde cualquier sitio. Muy útil cuando te pierdes.
      </Cristiano>

      <div className="prose">
        <p>A partir de ahora, cada proyecto del libro será una subcarpeta aquí dentro. Así siempre sabes dónde está todo.</p>

        <h2>El ciclo de vida de un proyecto</h2>
        <p>Todos los proyectos siguen el mismo ritmo:</p>
        <ol>
          <li><strong>Crear</strong> la carpeta y entrar: <code>mkdir nombre</code> y <code>cd nombre</code>.</li>
          <li><strong>Construir</strong> con Claude Code (arrancándolo con <code>claude</code>).</li>
          <li><strong>Instalar</strong> sus piezas una vez: <code>npm install</code>.</li>
          <li><strong>Arrancar</strong> para probar: <code>npm run dev</code>.</li>
          <li><strong>Detener</strong> cuando acabas: <code>Ctrl + C</code> en esa terminal.</li>
        </ol>
      </div>

      <Cristiano term="Ctrl + C">
        Es la forma universal de decirle a un programa en la terminal “para ya”. No borra nada: solo apaga la aplicación que estaba corriendo. Puedes volver a arrancarla cuando quieras.
      </Cristiano>

      <div className="prose">
        <h2>Reabrir un proyecto otro día</h2>
        <p>Esta es la parte que más tranquiliza: <strong>nada se pierde al apagar el ordenador</strong>. Para retomar un proyecto:</p>
      </div>

      <Terminal>{`cd ~/proyectos-ia/nombre-del-proyecto
npm run dev`}</Terminal>

      <div className="prose">
        <p>Y ya está. El <code>npm install</code> no se repite (salvo que Claude Code añada piezas nuevas). Abre la dirección local que aparezca (por ejemplo <code>http://localhost:3000</code>) y seguirás donde lo dejaste.</p>

        <h2>Git: la máquina del tiempo de tus archivos</h2>
        <p>Git guarda “fotos” (llamadas <em>commits</em>) del estado de tu proyecto. Si algo se rompe, vuelves a una foto anterior. Es la mejor red de seguridad que existe.</p>
      </div>

      <Cristiano term="commit">
        Un <em>commit</em> es una foto guardada de todos tus archivos en un momento dado, con una nota que explica qué cambió. Puedes tener cientos y saltar entre ellos. Es imposible perder trabajo si haces commits a menudo.
      </Cristiano>

      <div className="prose">
        <p>No hace falta que memorices comandos: pídeselo a Claude Code. Al empezar un proyecto:</p>
      </div>

      <Prompt>{`Inicializa git en este proyecto y haz un primer commit con todo el código. A partir de ahora, cada vez que terminemos algo importante, recuérdame hacer un commit.`}</Prompt>

      <div className="prose"><p>Y cuando quieras guardar un avance:</p></div>

      <Prompt>{`Haz un commit con los cambios de ahora y ponle un mensaje que describa lo que hemos hecho.`}</Prompt>

      <Idea>Regla práctica: haz un commit cada vez que algo <em>funcione</em>. Así, si el siguiente cambio lo estropea, siempre puedes volver a la última versión que iba bien.</Idea>

      <Guardar>
        Resumen para no perder nada nunca:
        <ul>
          <li>Tu trabajo <strong>es la carpeta</strong> del proyecto. No la borres.</li>
          <li>Para cerrar: <code>Ctrl + C</code> y cierra la ventana.</li>
          <li>Para volver: <code>cd</code> a la carpeta y <code>npm run dev</code>.</li>
          <li>Para dormir tranquilo: haz <strong>commits</strong> de Git a menudo.</li>
          <li>Extra: guarda de vez en cuando una copia de la carpeta en un disco externo o en la nube.</li>
        </ul>
      </Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Crea la carpeta <code>proyectos-ia</code>, entra en ella, crea dentro una carpeta <code>prueba</code>, entra, y pídele a Claude Code que inicialice Git y haga el primer commit. Ya tienes tu método de trabajo montado para todo el libro.</p>
      </div>

      <ChapterNav prev={{ href: "/volumen-2/terminal", label: "La terminal sin miedo" }} next={{ href: "/volumen-2/prompts", label: "Escribir buenos encargos" }} />
    </Chapter>
  );
}
