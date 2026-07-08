import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Un avatar que habla para tus cursos",
  description: "Una cara animada que lee un texto moviendo la boca, para presentaciones, cursos online y vídeos explicativos.",
  alternates: { canonical: "/cursos/ia-local/avatar" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Un avatar que habla"
      title="Un avatar que habla para tus cursos"
      icon="userGraduate"
      lead={<>Una cara animada (un <em>avatar</em>) que <strong>lee un texto moviendo la boca</strong>, para presentaciones, cursos online o vídeos explicativos. Escribes lo que quieres que diga y el avatar lo narra sincronizando los labios.</>}
    >
      <Objetivos>
        <ul>
          <li>Qué es la sincronización labial y cómo se consigue.</li>
          <li>Combinar voz sintética (TTS) con una cara animada.</li>
          <li>Generar clips para tus materiales educativos.</li>
        </ul>
      </Objetivos>

      <div className="prose">
        <h2>Conceptos clave</h2>
        <p>Este proyecto une dos cosas que ya conoces o casi: la <strong>voz sintética</strong> (TTS, del capítulo de audio) y una <strong>cara animada</strong> que mueve la boca al ritmo de esa voz.</p>
      </div>

      <Cristiano term="sincronización labial (lip sync)">
        Es hacer que los movimientos de la boca coincidan con los sonidos. El programa analiza el audio, detecta qué sonido toca en cada instante y coloca la forma de boca correspondiente. El resultado: parece que el avatar habla de verdad.
      </Cristiano>

      <Idea>No necesitas ser diseñador. Puedes empezar con un avatar 2D sencillo (una cara con unas pocas formas de boca) y queda sorprendentemente bien para cursos.</Idea>

      <Cristiano term="visemas (las “formas de boca”)">
        Un <em>visema</em> es la forma que adopta la boca para un sonido. No hay una por letra: muchos sonidos comparten forma (la “m”, la “b” y la “p” cierran los labios igual). Con <strong>apenas 8–12 dibujos de boca</strong> bien elegidos se cubre el habla entera. El programa decide, sonido a sonido, qué visema mostrar. Por eso un avatar convincente es más sencillo de lo que parece.
      </Cristiano>

      <div className="prose">
        <h3>Cómo encaja con lo que ya sabes</h3>
        <p>Este proyecto es una <strong>extensión del capítulo de texto a audio</strong>: allí generabas la voz; aquí, además, la “pones en una cara”. Si aquel te funcionó, este es el siguiente escalón natural. La novedad es solo la capa visual: los visemas sincronizados con el audio que ya sabes producir.</p>
      </div>

      <Nota title="Requisitos">
        <strong>Claude Code</strong>, <strong>Node.js</strong> y un motor de <strong>TTS</strong> local (Kokoro o MagpieTTS, del capítulo de audio). Puede requerir <strong>Python</strong>; Claude Code te guía.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir avatar-parlante
cd avatar-parlante
claude`}</Terminal>

      <Prompt>{`Crea una app web local de "avatar que habla":
- Escribo un texto y elijo idioma/voz.
- Genera la voz con Kokoro (TTS local).
- Muestra una cara 2D sencilla que mueve la boca sincronizada con el audio (lip sync).
- Botón para reproducir y para exportar el resultado como vídeo (o como audio + animación).
- README con instrucciones y cómo cambiar el avatar.`}</Prompt>

      <Idea><strong>Ejemplo resuelto.</strong> Escribe como texto de prueba: <em>“Hola, soy tu tutor virtual. Hoy veremos las fracciones.”</em> Al generar, deberías oír esa frase y ver la boca abrirse en las vocales y cerrarse en la “m” de “soy”/“hoy”. Si la boca se mueve pero no coincide con las palabras, es cuestión de <em>ajustar el desfase</em>, no de que esté roto.</Idea>

      <Cuidado><strong>El error más común: el desfase.</strong> Es fácil que la boca vaya ligeramente adelantada o retrasada respecto a la voz. No lo tomes como un fallo grave: pide a Claude Code que “añada un pequeño ajuste (en milisegundos) para sincronizar la boca con el audio” y prueba valores hasta que cuadre. Un desfase de menos de una décima de segundo el ojo ni lo nota.</Cuidado>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Escribe una frase, genera y observa al avatar hablar.</p></div>

      <Comprueba>Al reproducir, deberías <strong>oír la voz</strong> y ver la <strong>boca moverse acompasada</strong>. Si coinciden razonablemente, el lip sync funciona.</Comprueba>

      <Guardar>Proyecto: carpeta <code>avatar-parlante</code>. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/avatar-parlante</code> y <code>npm run dev</code>. Los vídeos que exportes se guardan como archivos independientes en tu ordenador.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Boca desincronizada</strong> — pide a Claude Code que ajuste el desfase entre audio y animación.</li>
          <li><strong>No exporta vídeo</strong> — puede faltar una herramienta (por ejemplo, para unir audio e imágenes); Claude Code te dirá cuál instalar.</li>
          <li><strong>Voz robótica</strong> — cambia de motor TTS o de voz.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Enlaza el avatar con un modelo de Ollama: que el avatar <strong>responda</strong> a preguntas hablando, no solo lea un texto fijo. Habrás creado un tutor virtual con cara.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/simulaciones-3d", label: "Simulaciones 3D" }} next={{ href: "/cursos/ia-local/wordpress", label: "Tema de WordPress" }} />
    </Chapter>
  );
}
