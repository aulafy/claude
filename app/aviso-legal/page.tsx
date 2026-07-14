import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Aviso legal - Aulafy",
  description:
    "Aviso legal de Aulafy: información del sitio educativo, condiciones de uso, propiedad intelectual, enlaces externos y contacto.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="fileContract" className="mt-1 text-2xl text-violet-400 flex-none" />
        <h1 className="min-w-0 text-3xl sm:text-4xl font-bold leading-tight text-white">Aviso legal</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: 2 de julio de 2026</p>

      <div className="prose">
        <p>
          Aulafy es un proyecto educativo abierto, gratuito e independiente que
          publica cursos, rutas, tutoriales y proyectos sobre inteligencia artificial,
          herramientas abiertas, IA local, Codex, Claude Code, RAG, agentes y automatización.
        </p>

        <h2>Identificación y contacto</h2>
        <p>
          Responsable editorial del sitio: Aulafy. Responsable de contenido:
          Ramón Guillamón. Contacto:{" "}
          <a href="mailto:contacto@aulafy.net">contacto@aulafy.net</a>.
        </p>
        <p>
          La web no ofrece contratación online, pagos, suscripciones, cuentas de
          usuario ni venta directa de servicios desde el sitio. Si necesitas datos
          identificativos adicionales para una relación jurídica o administrativa
          concreta, puedes solicitarlos por el email de contacto.
        </p>

        <h2>Condiciones de uso</h2>
        <p>
          Puedes consultar los contenidos con fines educativos, profesionales o
          personales. No debes usar la web para intentar dañar el servicio, eludir
          medidas técnicas, introducir contenido ilegal en herramientas
          interactivas o reutilizar materiales de forma que induzca a confusión
          sobre su autoría.
        </p>

        <h2>Propiedad intelectual y licencias</h2>
        <p>
          Los contenidos educativos se publican con licencia Creative Commons
          Attribution 4.0 International (CC BY 4.0) y el código fuente de la web
          bajo licencia MIT, salvo que se indique otra cosa. Tienes el detalle en
          la página de <Link href="/licencia">Licencia y reutilización</Link>.
        </p>

        <h2>Independencia y marcas</h2>
        <p>
          Aulafy es una guía educativa independiente. Claude, Claude Code,
          Anthropic, OpenAI, Ollama, LM Studio, GitHub y otros productos o marcas
          mencionados pertenecen a sus respectivos titulares.
        </p>

        <h2>Responsabilidad sobre el contenido</h2>
        <p>
          Los materiales se preparan para ayudar a aprender y practicar, pero no
          sustituyen asesoramiento profesional, legal, médico, financiero ni de
          seguridad. Verifica siempre comandos, dependencias, costes y políticas
          de terceros antes de aplicarlos en un entorno real.
        </p>

        <h2>Enlaces externos</h2>
        <p>
          La web puede enlazar documentación, repositorios y servicios externos.
          Aulafy no controla esos sitios ni responde de sus contenidos,
          disponibilidad, condiciones o políticas de privacidad.
        </p>

        <h2>Privacidad y cookies</h2>
        <p>
          Aulafy no recoge emails mediante formularios, no crea cuentas de usuario
          y no usa cookies de analítica o publicidad. Puedes ampliar información
          en la <Link href="/privacidad">Política de privacidad</Link> y en la{" "}
          <Link href="/cookies">Política de cookies</Link>.
        </p>
      </div>
    </div>
  );
}
