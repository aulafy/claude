import type { Metadata } from "next";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "AEO para pymes: aparecer en respuestas de IA — IA para pymes",
  description:
    "Cómo preparar la web de una pyme para que ChatGPT, Perplexity, Grok y otros agentes entiendan servicios, precios, ubicación, autoridad y respuestas frecuentes.",
  keywords: ["AEO pymes", "aparecer en ChatGPT", "SEO para agentes IA", "Perplexity empresas", "Grok búsquedas pymes"],
  alternates: { canonical: "/cursos/ia-pymes/aeo-pymes" },
};

export default function Page() {
  return (
    <Chapter
      crumb="AEO para pymes"
      title="AEO para pymes: aparecer en respuestas de IA"
      icon="search"
      lead={<>Cada vez más clientes preguntan a un asistente antes de buscar en Google. AEO significa poner tu información tan clara, verificable y estructurada que un agente pueda entenderla y citarla bien.</>}
      courseHref="/cursos/ia-pymes"
      courseLabel="IA para pymes y autónomos"
    >
      <Objetivos>
        <ul>
          <li>Convertir servicios, precios y zonas en respuestas claras.</li>
          <li>Crear FAQs que respondan preguntas reales de clientes.</li>
          <li>Mejorar datos estructurados, fuentes y señales de confianza.</li>
        </ul>
      </Objetivos>

      <Cristiano term="AEO">
        Answer Engine Optimization: optimizar para motores que responden, no solo para páginas de resultados.
      </Cristiano>

      <Terminal>{`Ficha mínima que una IA debe entender:
empresa: "Taller ACME"
servicios: ["reparación de bicicletas", "mantenimiento e-bike"]
zona: "Valencia"
precios_desde: "25 EUR revisión básica"
horario: "L-V 9:00-18:00"
pruebas: ["reseñas", "casos", "fotos reales", "garantía"]
faq:
  - "¿Reparáis bicicletas eléctricas?"
  - "¿Cuánto tarda una revisión?"
  - "¿Dais presupuesto antes de reparar?"`}</Terminal>

      <Idea>
        Las respuestas de IA favorecen información específica. “Soluciones integrales” aporta poco; “reparamos Bosch, Shimano y Bafang en Valencia con presupuesto previo” aporta mucho.
      </Idea>

      <div className="prose">
        <h2>Qué crear primero</h2>
        <ul>
          <li>Página de servicios con precios orientativos y límites.</li>
          <li>FAQ con preguntas literales de clientes.</li>
          <li>Casos reales, fotos propias y proceso de trabajo.</li>
          <li>Datos estructurados de negocio, organización y FAQ.</li>
          <li>Una página “cómo elegir” que eduque sin vender agresivamente.</li>
        </ul>
      </div>

      <Cuidado>
        No inventes autoridad. Si un agente detecta contradicciones entre web, redes, reseñas y directorios, puede omitir tu negocio o mezclar datos.
      </Cuidado>

      <Comprueba>
        Pregunta a varios asistentes: “¿Qué empresa me recomiendas para X en mi ciudad?”. Si no apareces, mira qué fuentes citan y qué información les falta.
      </Comprueba>

      <Guardar>
        Mantén una tabla de preguntas reales, páginas que las responden y fecha de actualización. El AEO se gana por claridad sostenida.
      </Guardar>

      <ChapterNav
        prev={{ href: "/cursos/ia-pymes/whatsapp-atencion", label: "WhatsApp" }}
        next={{ href: "/cursos/ia-pymes", label: "Curso IA para pymes" }}
      />
    </Chapter>
  );
}
