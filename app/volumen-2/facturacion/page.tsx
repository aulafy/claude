import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import { Chapter, Objetivos, Idea, Cuidado, Cristiano, Comprueba, Guardar, Nota, ChapterNav, Terminal } from "@/components/Book";

export const metadata: Metadata = {
  title: "Un asistente de oficina para autónomos",
  description: "Una app local que ayuda con el papeleo: crear facturas, llevar ingresos y gastos y consultar tus documentos. Sin cuotas y con tus datos privados.",
  alternates: { canonical: "/cursos/ia-local/facturacion" },
};

export default function Page() {
  return (
    <Chapter
      crumb="Asistente para autónomos"
      title="Un asistente de oficina para autónomos"
      icon="document"
      lead={<>Una pequeña aplicación local que te ayuda con el papeleo del día a día como autónomo: <strong>crear facturas</strong>, llevar un registro de ingresos y gastos, y responder preguntas sobre tus propios documentos. Todo en tu ordenador, sin cuotas mensuales.</>}
    >
      <Objetivos>
        <ul>
          <li>Montar una herramienta de facturación sencilla a tu medida.</li>
          <li>Automatizar tareas repetitivas de oficina con IA local.</li>
          <li>Mantener tus datos financieros privados en tu equipo.</li>
        </ul>
      </Objetivos>

      <div className="prose"><h2>Conceptos clave</h2></div>

      <Cristiano term="¿por qué hacértela tú y no usar un programa de pago?">
        Los programas comerciales cobran cada mes y guardan tus datos en sus servidores. Una herramienta hecha a tu medida hace <em>exactamente</em> lo que necesitas, es gratis de usar y tus números no salen de tu ordenador. No sustituye a tu gestoría, pero te ahorra horas de trabajo mecánico.
      </Cristiano>

      <Cuidado>Esto es una ayuda administrativa, <strong>no un asesor fiscal</strong>. Los impuestos y la normativa cambian y dependen de tu caso: confirma siempre con tu gestor o gestora antes de presentar nada.</Cuidado>

      <Nota title="Requisitos">
        <strong>Claude Code</strong> y <strong>Node.js</strong>. Si quieres que “lea” documentos o responda preguntas, añade <strong>Ollama</strong> (<code>qwen3:4b</code>). Para las facturas en PDF, Claude Code instalará lo necesario.
      </Nota>

      <div className="prose"><h2>Paso a paso</h2></div>

      <Terminal>{`cd ~/proyectos-ia
mkdir asistente-autonomo
cd asistente-autonomo
claude`}</Terminal>

      <Prompt>{`Crea una app web local para autónomos:
- Crear facturas (mis datos, cliente, conceptos, importes, IVA e IRPF) y exportarlas en PDF con numeración automática.
- Guardar clientes y conceptos frecuentes para reutilizarlos.
- Registro de ingresos y gastos con un resumen por trimestre.
- Todo se guarda en una base de datos local en mi ordenador.
- (Opcional) un chat con Ollama para preguntar sobre mis facturas ("¿cuánto facturé en marzo?").
- README con instrucciones y cómo hacer copia de seguridad.`}</Prompt>

      <Idea>Fíjate en el detalle “copia de seguridad”: cuando manejas datos que importan (facturas, clientes), pide siempre a Claude Code una forma fácil de exportar y respaldar. Es tu red de seguridad.</Idea>

      <div className="prose"><h2>Ejecutar en tu ordenador</h2></div>

      <Terminal>{`npm install
npm run dev`}</Terminal>

      <div className="prose"><p>Crea una factura de prueba y expórtala a PDF.</p></div>

      <Comprueba>Deberías poder rellenar una factura, <strong>descargarla en PDF</strong> con los totales bien calculados (IVA e IRPF incluidos) y verla luego en el registro. Comprueba que la numeración avanza sola.</Comprueba>

      <Guardar>Proyecto: carpeta <code>asistente-autonomo</code>. Aquí los datos importan de verdad: <strong>haz copias de seguridad</strong> de la base de datos con regularidad (el README te dirá qué archivo copiar) y guárdala también fuera del ordenador. Cerrar: <code>Ctrl + C</code>. Reabrir: <code>cd ~/proyectos-ia/asistente-autonomo</code> y <code>npm run dev</code>.</Guardar>

      <div className="prose">
        <h2>Si algo falla</h2>
        <ul>
          <li><strong>Totales mal calculados</strong> — dile a Claude Code el porcentaje exacto de IVA/IRPF de tu caso; que muestre el desglose.</li>
          <li><strong>Perdí datos</strong> — por eso insistimos en las copias; restaura la última.</li>
          <li><strong>El PDF sale feo</strong> — pide un diseño de factura más limpio con tu logo.</li>
        </ul>

        <h2>Reto para practicar</h2>
        <p>Añade recordatorios de <strong>facturas pendientes de cobro</strong> y un botón para generar el resumen trimestral listo para enviar a tu gestoría.</p>
      </div>

      <ChapterNav prev={{ href: "/cursos/ia-local/landing", label: "Una web en minutos" }} next={{ href: "/cursos/ia-local/estudio", label: "App para estudiar" }} />
    </Chapter>
  );
}
