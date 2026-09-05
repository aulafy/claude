import BrandMark from "@/components/BrandMark";
import Link from "next/link";
import DocumentLanguage from "@/components/DocumentLanguage";
import MaintenanceScene from "@/components/MaintenanceScene";
import styles from "./Maintenance.module.css";

export default function Maintenance({ english = false }: { english?: boolean }) {
  return <div className={styles.page} lang={english ? "en" : "es"}>
    <DocumentLanguage locale={english ? "en" : "es"} />
    <header className={styles.header}><Link href={english ? "/en" : "/"} prefetch={false} className={styles.brand} aria-label="Aulafy"><BrandMark /><strong>Aulafy</strong></Link><nav aria-label={english ? "Language" : "Idioma"}><Link href="/" prefetch={false} hrefLang="es" aria-current={!english ? "page" : undefined}>ES</Link><Link href="/en" prefetch={false} hrefLang="en" aria-current={english ? "page" : undefined}>EN</Link></nav></header>
    <main className={styles.main}>
      <MaintenanceScene english={english} />
      <section className={styles.message} aria-labelledby="maintenance-title">
        <p className={styles.eyebrow}>{english ? "A little work. A better place to learn." : "Estamos preparando algo mejor."}</p>
        <h1 id="maintenance-title">{english ? "Aulafy is under construction." : "Aulafy está en construcción."}</h1>
        <p className={styles.lead}>{english ? "We’re rebuilding our classroom to make learning AI clearer, more practical and open to everyone. We’ll be back soon." : "Estamos renovando nuestra aula para que aprender IA sea más claro, más práctico y accesible para todos. Volvemos pronto."}</p>
        <p className={styles.translation} lang={english ? "es" : "en"}>{english ? "Estamos renovando Aulafy. Volvemos pronto." : "We’re rebuilding Aulafy. We’ll be back soon."}</p>
        <div className={styles.promise}>{english ? "Free education" : "Enseñanza libre"}<span aria-hidden="true">/</span>{english ? "No registration" : "Sin registro"}<span aria-hidden="true">/</span>{english ? "No cookies" : "Sin cookies"}</div>
      </section>
    </main>
    <footer className={styles.footer}><span>{english ? "Open knowledge. Human curiosity." : "Conocimiento abierto. Curiosidad humana."}</span><a href="https://github.com/aulafy/claude">{english ? "Open source on GitHub · MIT" : "Código abierto en GitHub · MIT"}</a></footer>
  </div>;
}
