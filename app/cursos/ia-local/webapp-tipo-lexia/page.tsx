import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Crea una web app tipo Lexia con RAG local",
  description:
    "Crea una web app de IA inspirada en Lexia: interfaz, backend Node.js, corpus, embeddings, RAG local, citas y despliegue.",
  alternates: { canonical: "/cursos/ia-local/webapp-tipo-lexia" },
  keywords: [
    "Lexia",
    "RAG local",
    "web app IA",
    "LM Studio",
    "embeddings",
    "Aulafy",
    "Next.js",
    "Vercel",
  ],
};

export default function Page() {
  return (
    <Chapter
      crumb="Web app tipo Lexia"
      title="Crea una web app tipo Lexia con RAG local"
      icon="laptopCode"
      lead={<>En esta lección vas a construir el patrón técnico de <strong>Lexia</strong>: una aplicación web que no se limita a chatear, sino que consulta una biblioteca propia, recupera fuentes relevantes y genera respuestas citadas con un modelo local compatible con OpenAI.</>}
    >
      <Objetivos>
        <ul>
          <li>Separar interfaz, API, corpus, embeddings y modelo generativo.</li>
          <li>Crear una arquitectura RAG local reutilizable para distintos dominios.</li>
          <li>Diseñar prompts que obliguen a responder con fuentes y límites claros.</li>
          <li>Preparar la app para una demo local y para publicar la parte web en Vercel.</li>
        </ul>
      </Objetivos>

      <Cristiano term="una app tipo Lexia">
        Lexia es una IA jurídico-administrativa local. Lo importante no es copiar el dominio legal, sino su arquitectura: el usuario pregunta, la app busca en documentos controlados, entrega fragmentos al modelo y exige una respuesta verificable con citas.
      </Cristiano>

      <div className="prose">
        <h2>El mapa de la aplicación</h2>
        <p>Antes de programar, mira el sistema como una cadena de piezas pequeñas:</p>
      </div>

      <Terminal>{`usuario -> interfaz web -> API -> recuperador RAG -> fuentes -> prompt con reglas -> LLM -> respuesta citada`}</Terminal>

      <Idea>
        Una app de IA fiable no nace de un prompt largo. Nace de controlar <strong>qué documentos entran</strong>, <strong>qué fragmentos se recuperan</strong>, <strong>qué reglas recibe el modelo</strong> y <strong>qué se muestra al usuario</strong>.
      </Idea>

      <div className="prose">
        <h2>Qué vamos a construir</h2>
        <p>El proyecto final tendrá estas piezas:</p>
        <ul>
          <li>Una interfaz web con caja de consulta, respuesta, fuentes e historial.</li>
          <li>Un backend Node.js con endpoints para consultar, buscar y ver el estado del índice.</li>
          <li>Una carpeta de corpus con documentos fragmentados.</li>
          <li>Embeddings locales generados con LM Studio, Ollama o un servidor OpenAI-compatible.</li>
          <li>Recuperación semántica y búsqueda por términos.</li>
          <li>Un prompt de sistema que exige citas y abstención cuando faltan fuentes.</li>
        </ul>
      </div>

      <Nota title="Repositorio de referencia">
        Puedes estudiar el patrón completo en <a href="https://github.com/raym33/lexia">github.com/raym33/lexia</a>. En esta lección lo usamos como inspiración práctica: <code>public/</code> para la interfaz, <code>server.mjs</code> para la API, <code>ingest.mjs</code> para preparar corpus y <code>embed.mjs</code> para generar embeddings.
      </Nota>

      <div className="prose">
        <h2>Paso 1: define tu dominio</h2>
        <p>No empieces por el código. Empieza por el producto. Rellena esta ficha:</p>
      </div>

      <Terminal>{`Nombre de la app:
Usuario:
Problema:
Fuentes:
Tono:
Formato de respuesta:
Límites:`}</Terminal>

      <div className="prose">
        <p>Ejemplo para una versión educativa:</p>
      </div>

      <Terminal>{`Nombre: EduLexia
Usuario: profesores y alumnos de FP
Problema: resolver dudas sobre materiales del curso
Fuentes: apuntes, rubricas, programaciones y ejercicios
Tono: claro, práctico y pedagógico
Formato: respuesta breve, pasos, fuentes y tarea sugerida
Límites: no inventar temario ni calificaciones`}</Terminal>

      <Cuidado>
        Si tu dominio toca salud, derecho, fiscalidad, psicología, finanzas o datos personales, añade desde el principio una regla de revisión humana. RAG reduce errores, pero no convierte la app en autoridad profesional ni sustituye asesoramiento profesional.
      </Cuidado>

      <div className="prose">
        <h2>Paso 2: crea la base del proyecto</h2>
        <p>Para aprender el patrón desde Lexia, clona el repositorio y arráncalo en local:</p>
      </div>

      <Terminal>{`git clone https://github.com/raym33/lexia.git
cd lexia
cp .env.example .env
npm start`}</Terminal>

      <div className="prose">
        <p>Variables clave de configuración:</p>
      </div>

      <Terminal>{`PORT=5174
LM_BASE=http://127.0.0.1:1234/v1
CHAT_MODEL=gemma-3-12b-it
EMBED_MODEL=bge-m3
USE_RERANK=0
TOP_K=6`}</Terminal>

      <Comprueba>
        Abre <code>http://localhost:5174</code>. Si la app carga pero el índice aparece vacío, no pasa nada: todavía falta corpus y embeddings.
      </Comprueba>

      <div className="prose">
        <h2>Paso 3: conecta un runtime local de modelos</h2>
        <p>En LM Studio, carga un modelo de chat y un modelo de embeddings. Activa el servidor local compatible con OpenAI en <code>http://127.0.0.1:1234/v1</code>.</p>
      </div>

      <Terminal>{`curl http://127.0.0.1:1234/v1/models`}</Terminal>

      <div className="prose">
        <p>Prueba embeddings:</p>
      </div>

      <Terminal>{`curl -s http://127.0.0.1:1234/v1/embeddings \\
  -H 'content-type: application/json' \\
  -d '{"model":"bge-m3","input":["prueba de embeddings"]}'`}</Terminal>

      <Cristiano term="embeddings">
        Un embedding convierte texto en una lista de números. Textos con significado parecido quedan cerca. Gracias a eso, el sistema encuentra fragmentos útiles aunque el usuario no use las mismas palabras del documento.
      </Cristiano>

      <div className="prose">
        <h2>Paso 4: prepara tu biblioteca documental</h2>
        <p>Para un primer prototipo, usa un corpus pequeño en JSON. Lo importante es que cada fragmento tenga texto y cita.</p>
      </div>

      <Terminal>{`corpus/
  documentos.json`}</Terminal>

      <Terminal>{`[
  {
    "id": "doc-001#p1",
    "titulo": "Manual del curso",
    "cita": "Manual del curso, apartado 1",
    "texto": "Contenido del fragmento...",
    "materia": "curso"
  }
]`}</Terminal>

      <Idea>
        Un buen fragmento contiene una idea completa. Como regla práctica: entre 500 y 1.500 caracteres, con metadatos suficientes para citarlo.
      </Idea>

      <div className="prose">
        <h2>Paso 5: genera el índice de embeddings</h2>
      </div>

      <Terminal>{`npm run embed`}</Terminal>

      <div className="prose">
        <p>Ficheros esperados:</p>
      </div>

      <Terminal>{`data/embeddings.bin
data/embeddings.ids.txt
data/embeddings.meta.json`}</Terminal>

      <Cuidado>
        Si cambias el modelo de embeddings, borra o aparta los embeddings anteriores y vuelve a generarlos. Mezclar vectores de modelos distintos rompe la recuperación.
      </Cuidado>

      <div className="prose">
        <h2>Paso 6: construye la API de consulta</h2>
        <p>La ruta central de una app tipo Lexia es una consulta RAG:</p>
      </div>

      <Terminal>{`POST /api/consulta`}</Terminal>

      <Terminal>{`async function consulta(pregunta) {
  const fuentes = await retrieve(pregunta, 6);
  const prompt = buildPrompt(pregunta, fuentes);
  const respuesta = await chat(prompt);
  return { respuesta, fuentes };
}`}</Terminal>

      <Prompt label="Prompt base del sistema">{`Eres un asistente experto. Responde SOLO con la información de las fuentes.
Si las fuentes no bastan, dilo claramente.
Cada afirmación importante debe incluir una cita como [1] o [2].
No inventes articulos, cifras, pasos ni requisitos.
Termina con una sección "Siguiente paso recomendado".`}</Prompt>

      <div className="prose">
        <h2>Paso 7: añade recuperación híbrida</h2>
        <p>Lexia combina búsqueda semántica y búsqueda por términos. Es una decisión importante porque los dominios técnicos tienen vocabulario exacto.</p>
        <ul>
          <li><strong>Embeddings:</strong> captan significado.</li>
          <li><strong>BM25 o búsqueda léxica:</strong> captura palabras exactas.</li>
          <li><strong>Pesos de autoridad:</strong> priorizan fuentes canónicas.</li>
          <li><strong>Reranker opcional:</strong> reordena candidatos cuando necesitas más precisión.</li>
        </ul>
      </div>

      <Cristiano term="recuperación híbrida">
        Es como buscar en una biblioteca con dos estrategias a la vez: una persona entiende lo que quieres decir, la otra busca las palabras exactas en el índice. Juntas fallan menos.
      </Cristiano>

      <div className="prose">
        <h2>Paso 8: diseña la interfaz</h2>
        <p>La interfaz mínima debe mostrar:</p>
        <ul>
          <li>Caja de consulta.</li>
          <li>Selector de modo: responder, redactar o buscar.</li>
          <li>Respuesta principal.</li>
          <li>Fuentes recuperadas con snippet.</li>
          <li>Historial local.</li>
          <li>Estado del índice y mensajes de error útiles.</li>
        </ul>
      </div>

      <Terminal>{`Recuperando fuentes...
Generando respuesta citada...
No hay indice disponible. Ejecuta npm run ingest y npm run embed.
El modelo local no responde. Revisa LM Studio.`}</Terminal>

      <Idea>
        Las fuentes deben estar visibles junto a la respuesta. Si las escondes, el usuario vuelve a confiar en el texto como si fuera magia. La gracia de Lexia es que se puede verificar.
      </Idea>

      <div className="prose">
        <h2>Paso 9: guardrails responsables</h2>
      </div>

      <Prompt label="Bloque de límites">{`Límites:
- No diagnostiques.
- No prometas resultados.
- No inventes fuentes.
- Si hay riesgo o falta información, recomienda revisión humana.
- Si la pregunta queda fuera del corpus, dilo y pide documentos adecuados.`}</Prompt>

      <Cuidado>
        No guardes consultas sensibles en logs durante la demo. No subas a Git <code>data/users.json</code>, <code>data/embeddings.*</code>, <code>.env</code> ni documentos privados.
      </Cuidado>

      <div className="prose">
        <h2>Paso 10: evalúa antes de publicar</h2>
        <p>Crea cinco preguntas conocidas y anota qué fuente debería aparecer. No evalúes solo si la respuesta suena bien.</p>
      </div>

      <Terminal>{`[
  {
    "pregunta": "Que plazo tengo para entregar la actividad?",
    "fuente_esperada": "rubrica-entrega#p2"
  },
  {
    "pregunta": "Como se califica el proyecto final?",
    "fuente_esperada": "rubrica-final#p1"
  }
]`}</Terminal>

      <div className="prose">
        <p>Métricas sencillas:</p>
        <ul>
          <li><strong>Hit@3:</strong> la fuente esperada aparece entre las tres primeras.</li>
          <li><strong>Hit@6:</strong> aparece entre las seis primeras.</li>
          <li><strong>Respuesta citada:</strong> la respuesta incluye referencias.</li>
          <li><strong>Abstención correcta:</strong> si no hay fuente, la app lo reconoce.</li>
        </ul>
      </div>

      <Comprueba>
        Prueba una pregunta fácil, una ambigua, una fuera del corpus, una que pida inventar y otra que solicite consejo profesional definitivo. La app debe responder con matices distintos.
      </Comprueba>

      <div className="prose">
        <h2>Paso 11: preparar para Vercel</h2>
        <p>Vercel es perfecto para publicar la parte web y el contenido educativo. Para una app RAG con modelos locales, recuerda esta separación:</p>
        <ul>
          <li>La web estática o Next.js puede desplegarse en Vercel.</li>
          <li>El modelo local y los embeddings viven en tu máquina o servidor privado.</li>
          <li>Si necesitas una demo pública, usa datos de ejemplo y un backend remoto controlado.</li>
        </ul>
      </div>

      <Terminal>{`npm run build
vercel deploy`}</Terminal>

      <Nota title="Arquitectura recomendada para producción">
        Separa la app web, el servicio RAG, el runtime de modelos, el almacenamiento del corpus y la observabilidad. Documenta versión de modelo, versión de corpus y fecha de generación de embeddings.
      </Nota>

      <Nota title="Fuentes y repositorios para contrastar">
        Revisa el repositorio de referencia <a href="https://github.com/raym33/lexia">raym33/lexia</a>, la documentación oficial de <a href="https://lmstudio.ai/docs">LM Studio</a>, <a href="https://docs.ollama.com/">Ollama</a>, <a href="https://qdrant.tech/documentation/">Qdrant</a> y <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/">OWASP Top 10 for LLM Applications</a> antes de usar este patrón con datos reales.
      </Nota>

      <Guardar>
        Tu proyecto queda como una plantilla reutilizable. Para otro dominio, cambia corpus, prompt, textos de interfaz, criterios de evaluación y guardrails. Mantén intacta la disciplina: fuentes visibles, respuestas citadas y revisión humana.
      </Guardar>

      <div className="prose">
        <h2>Reto final</h2>
        <p>Crea una mini Lexia para un dominio propio:</p>
        <ol>
          <li>Elige un dominio.</li>
          <li>Prepara 15 fragmentos de corpus sin datos sensibles.</li>
          <li>Configura modelo local y embeddings.</li>
          <li>Crea cinco preguntas de evaluación.</li>
          <li>Personaliza el prompt.</li>
          <li>Graba una demo de dos minutos mostrando respuesta y fuentes.</li>
        </ol>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/chatbot-legal", label: "Chatbot que cita la ley" }} next={{ href: "/cursos/ia-local/pdf", label: "Pregúntale a tus PDF" }} />
    </Chapter>
  );
}
