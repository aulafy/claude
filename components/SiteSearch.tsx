"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { trackLearningEvent } from "@/lib/learning-events";
import { getSearchRescues, rankSearchEntries } from "@/lib/search-intents";

type SearchEntry = {
  route: string;
  title: string;
  description: string;
  language: "es" | "en" | "multi";
  type: string;
  priority: number;
};

export default function SiteSearch({ locale = "es" }: { locale?: "es" | "en" }) {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const trackedSearch = useRef(false);
  const trackedEmpty = useRef(false);

  useEffect(() => {
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => rankSearchEntries(entries, query, locale), [entries, locale, query]);

  const rescues = useMemo(() => getSearchRescues(query, locale), [locale, query]);

  const examples = locale === "en"
    ? ["I am starting from zero", "Ollama error", "AI for office work"]
    : ["Empiezo desde cero", "Error de Ollama", "IA para el trabajo"];

  useEffect(() => {
    if (query.trim().length >= 2 && !trackedSearch.current) {
      trackLearningEvent("search_used");
      trackedSearch.current = true;
    }
    if (!loading && query.trim().length >= 2 && results.length === 0 && !trackedEmpty.current) {
      trackLearningEvent("search_no_results");
      trackedEmpty.current = true;
    }
  }, [loading, query, results.length]);

  return (
    <div className="site-search">
      <label htmlFor="aulafy-search">{locale === "en" ? "What do you want to learn or solve?" : "¿Qué quieres aprender o resolver?"}</label>
      <div className="site-search__field">
        <Icon name="search" />
        <input
          id="aulafy-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "en" ? "Describe a goal, tool, or error" : "Describe un objetivo, herramienta o error"}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setQuery("");
              event.currentTarget.blur();
            }
          }}
        />
      </div>
      <div className="site-search__examples" aria-label={locale === "en" ? "Search examples" : "Ejemplos de búsqueda"}>
        {examples.map((example) => <button type="button" key={example} onClick={() => setQuery(example)}>{example}</button>)}
      </div>

      {loading ? <p className="site-search__status">{locale === "en" ? "Loading library…" : "Cargando biblioteca…"}</p> : null}
      {!loading && query.trim() && results.length === 0 ? (
        <div className="site-search__empty">
          <h2>{locale === "en" ? "No exact result yet" : "Todavía no hay un resultado exacto"}</h2>
          <p>{locale === "en" ? "Choose the closest route. Each option explains why it may help." : "Elige la ruta que más se acerque. Cada opción explica por qué puede ayudarte."}</p>
          <div className="site-search__rescues">
            {rescues.map((rescue) => (
              <section key={rescue.id} aria-labelledby={`rescue-${rescue.id}`}>
                <h3 id={`rescue-${rescue.id}`}>{rescue.label}</h3>
                <p>{rescue.description}</p>
                <ul>
                  {rescue.suggestions.map((suggestion) => (
                    <li key={suggestion.href}>
                      <Link href={suggestion.href}>
                        <strong>{suggestion.title}</strong>
                        <span>{suggestion.reason}</span>
                        <Icon name="chevronRight" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ) : null}

      {results.length > 0 ? (
        <section className="site-search__results" aria-live="polite" aria-label={locale === "en" ? "Search results" : "Resultados de búsqueda"}>
          <p>{results.length} {locale === "en" ? "useful results" : "resultados útiles"}</p>
          {results.map((entry) => (
            <Link href={entry.route} key={entry.route}>
              <span>{typeLabel(entry.type, locale)}</span>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              <strong>{locale === "en" ? "Open" : "Abrir"} <Icon name="chevronRight" /></strong>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}

function typeLabel(type: string, locale: "es" | "en") {
  const labels: Record<string, [string, string]> = {
    courses: ["Curso o lección", "Course or lesson"],
    blog: ["Guía", "Guide"],
    landings: ["Ruta", "Path"],
    documents: ["Documento", "Document"],
    core: ["Aulafy", "Aulafy"],
    english: ["English", "English"],
  };
  return labels[type]?.[locale === "en" ? 1 : 0] ?? (locale === "en" ? "Resource" : "Recurso");
}
