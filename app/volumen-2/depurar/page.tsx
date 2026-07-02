import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Cuando algo se rompe: depurar y proteger tu trabajo — Claude Code + IA Local",
  description: "Un método sereno para resolver errores y, sobre todo, para no perder nunca tu trabajo ni exponer tus datos: Git, claves y copias de seguridad.",
};

export default function Page() {
  return (
    <Chapter
      crumb="Cuando algo se rompe"
      title="Cuando algo se rompe: depurar y proteger tu trabajo"
      icon="shield"
      lead={<>Tarde o temprano algo fallará: un error al arrancar, una instalación que se atasca, Claude Code que hace algo distinto. No es un drama: es parte de construir. Este capítulo te da un método sereno para resolverlo y, sobre todo, para <strong>no perder nunca tu trabajo</strong> ni exponer tus datos.</>}
    >
      <Objetivos>
        <ul>
          <li>Leer un error sin asustarte y resolverlo con Claude Code.</li>
          <li>Un método de depuración paso a paso que sirve para todo.</li>
          <li>Proteger tus claves, tus datos personales y tus copias de seguridad.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Los errores son mensajes, no castigos</h2></div>

      <Cristiano term="qué es un “error” en la terminal">
        Cuando algo va mal, el ordenador escribe un texto largo (a veces en rojo) que parece amenazante. En realidad es una <em>pista</em>: te dice qué esperaba y qué encontró. No tienes que entenderlo tú: tu trabajo es <strong>copiarlo entero</strong> y pasárselo a Claude Code.
      </Cristiano>

      <Idea>La frase más útil del libro: <em>“Me sale este error, ¿qué significa y cómo lo arreglo?”</em> seguida del error pegado tal cual. Depurar es una de las cosas que mejor hace Claude Code.</Idea>

      <div className="prose">
        <h2>Método de depuración en cinco pasos</h2>
        <p>Cuando algo no funcione, ve en orden. No saltes pasos:</p>
        <ol>
          <li><strong>Lee el mensaje.</strong> La última línea suele decir lo esencial.</li>
          <li><strong>Aísla qué cambió.</strong> ¿Funcionaba antes? ¿Qué hiciste justo antes de que fallara?</li>
          <li><strong>Comprueba lo básico.</strong> ¿Está Ollama en marcha? ¿Hiciste <code>npm install</code>? ¿Estás en la carpeta correcta (<code>pwd</code>)?</li>
          <li><strong>Pásaselo a Claude Code</strong> con el error completo y qué estabas haciendo.</li>
          <li><strong>Un cambio cada vez.</strong> Aplica una solución, prueba, y solo si no va, prueba la siguiente.</li>
        </ol>
      </div>

      <Cuidado>Evita el “cambiarlo todo a la vez” con la esperanza de que algo funcione. Si tocas cinco cosas y arregla, no sabrás cuál era y volverá a pasar. Un cambio, una prueba.</Cuidado>

      <div className="prose">
        <h2>La red de seguridad: Git y copias</h2>
        <p>Si tienes miedo de “romper algo”, la solución es poder volver atrás. Ya lo viste en el capítulo de proyectos, pero aquí es donde de verdad te salva:</p>
      </div>

      <Terminal>{`Algo se ha estropeado y no sé qué. Vuelve al último commit que funcionaba y explícame qué has revertido.`}</Terminal>

      <Idea>Haz un commit <strong>cada vez que algo funcione</strong>. Así, ante cualquier destrozo, siempre hay un punto seguro al que regresar. Es la diferencia entre un susto y un desastre.</Idea>

      <div className="prose">
        <h2>Protege tus datos y tus claves</h2>
        <p>Cuando tus proyectos manejan información real —facturas, documentos de clientes, claves de API— la seguridad deja de ser opcional.</p>
        <ul>
          <li><strong>Claves y contraseñas nunca en el código.</strong> Van en un archivo <code>.env</code> que <em>no</em> se sube a internet. Pídeselo a Claude Code: <em>“asegúrate de que mis claves están en .env y de que .env está en el .gitignore”</em>.</li>
          <li><strong>No subas datos personales a GitHub.</strong> Antes de publicar, revisa que no haya documentos de clientes ni bases de datos reales dentro.</li>
          <li><strong>Cuidado al construir con datos sensibles.</strong> La app corre en local, pero Claude Code razona en la nube. No pegues datos confidenciales reales en el chat mientras construyes; usa ejemplos ficticios.</li>
          <li><strong>Copias de seguridad de verdad.</strong> Una copia que nunca has probado a restaurar no es una copia. Comprueba de vez en cuando que puedes recuperar tus datos.</li>
        </ul>
      </div>

      <Cristiano term="el archivo .gitignore">
        Es una lista de cosas que Git <strong>debe ignorar</strong> y nunca subir: claves, datos, archivos temporales. Es tu primera línea de defensa contra publicar sin querer algo privado.
      </Cristiano>

      <Comprueba>Antes de publicar cualquier proyecto en internet, hazte tres preguntas: ¿hay alguna clave en el código? ¿hay datos personales reales en las carpetas? ¿está el <code>.env</code> en el <code>.gitignore</code>? Si las tres respuestas son correctas, adelante.</Comprueba>

      <Guardar>
        Rutina de seguridad que vale para todos tus proyectos:
        <ul>
          <li>Commit de Git cuando algo funcione.</li>
          <li>Claves en <code>.env</code>, nunca en el código ni en GitHub.</li>
          <li>Copia de la carpeta (y de la base de datos) fuera del ordenador cada cierto tiempo.</li>
          <li>Prueba de vez en cuando que sabes restaurar esa copia.</li>
        </ul>
      </Guardar>

      <div className="prose">
        <h2>Reto para practicar</h2>
        <p>Provoca un error a propósito en un proyecto de prueba (por ejemplo, borra una línea del código), observa el mensaje, pégaselo a Claude Code y arréglalo. Perder el miedo a los errores es lo que te convierte en autónomo de verdad.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/conectar-ollama", label: "Conecta Claude Code con tu IA local" }} next={{ href: "/volumen-2/chatbot-legal", label: "Un chatbot que cita la ley" }} />
    </Chapter>
  );
}
