# SEO en español y Google Search Console

Este documento define qué página debe responder a cada intención de búsqueda, cómo está preparado el rastreo y qué revisar en Google Search Console después de publicar. La fuente ejecutable del mapa editorial está en [`lib/seo-strategy.ts`](../lib/seo-strategy.ts).

## Hallazgos de demanda en español

Investigación realizada el 15 de julio de 2026 en Google Trends, región España y últimos 12 meses. Los valores de Trends son índices relativos, no volúmenes absolutos ni previsiones de tráfico.

En una comparación directa entre consultas educativas, los promedios relativos observados fueron:

| Consulta | Índice relativo |
| --- | ---: |
| `curso de IA` | 62 |
| `curso de inteligencia artificial` | 41 |
| `aprender IA` | 39 |
| `curso IA gratis` | 15 |
| `inteligencia artificial desde cero` | 0, volumen insuficiente como frase exacta |

En las consultas relacionadas de `curso IA` aparecieron `curso de ia` como referencia 100 y `curso ia gratis` con 27. Esto no significa que las frases largas no sean útiles: indica que deben escribirse de forma natural dentro de páginas que respondan bien a la intención principal, en vez de crear muchas páginas casi idénticas.

Enlaces de reproducción:

- [Comparación de términos educativos en Google Trends, España, 12 meses](https://trends.google.com/trends/explore?date=today%2012-m&geo=ES&q=curso%20de%20ia,curso%20ia%20gratis,curso%20inteligencia%20artificial,inteligencia%20artificial%20desde%20cero,aprender%20ia)
- [Comparación con ChatGPT e inteligencia artificial](https://trends.google.com/trends/explore?date=today%2012-m&geo=ES&q=inteligencia%20artificial,ChatGPT,curso%20inteligencia%20artificial,aprender%20inteligencia%20artificial,curso%20IA)

## Una intención, una página canónica

| Intención | Consulta principal | Página canónica |
| --- | --- | --- |
| Formación general y gratuita | `curso de IA` | `/cursos` |
| Encontrar un punto de partida | `aprender IA` | `/rutas` |
| Aprender Codex | `curso de Codex en español` | `/curso-codex-espanol` |
| Construir una web | `crear una página web con IA` | `/crear-pagina-web-con-ia` |
| Aplicar IA a un negocio | `IA para pymes` | `/ia-para-pymes` |
| Crear agentes | `curso de agentes de IA` | `/curso-agentes-ia-espanol` |

No se debe crear una landing distinta para cada variante (`curso IA gratis`, `cursos de IA gratis`, `curso de inteligencia artificial gratis`). Todas pertenecen a `/cursos`. Así se reduce la canibalización y se concentra el enlazado interno.

Las etiquetas `meta keywords` no son la estrategia. La prioridad editorial es: título descriptivo, H1 coherente, respuesta útil, enlaces internos con texto comprensible, canónica correcta y contenido que cumpla la promesa de búsqueda.

## Rastreo e indexación

La URL pública del archivo es `https://www.aulafy.net/robots.txt`. Declara un único índice canónico:

```text
Sitemap: https://www.aulafy.net/sitemap-index.xml
```

El índice distribuye las URLs entre `core`, `courses`, `english`, `blog`, `landings` y `documents`. El archivo `robots.txt` bloquea rutas técnicas que no deben consumir rastreo (`/api/`, `/auth/` y el alias de descarga `/course/`). Las páginas que no deben indexarse deben usar además `noindex`: bloquear una URL en `robots.txt` no equivale a retirarla del índice.

Referencias oficiales:

- [Descripción general de sitemaps de Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Buenas prácticas para enlaces rastreables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Reglas robots meta y X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

## Lista de publicación en Search Console

Después de desplegar estos cambios:

1. Abrir la propiedad de URL `https://www.aulafy.net/` o la propiedad de dominio equivalente.
2. En **Sitemaps**, enviar solo `https://www.aulafy.net/sitemap-index.xml`. Si existen envíos antiguos de sitemaps individuales, se pueden retirar del informe para simplificar la lectura; retirarlos del informe no elimina URLs de Google.
3. Usar **Inspección de URL** sobre estas páginas prioritarias:
   - `https://www.aulafy.net/cursos`
   - `https://www.aulafy.net/rutas`
   - `https://www.aulafy.net/curso-codex-espanol`
   - `https://www.aulafy.net/crear-pagina-web-con-ia`
   - `https://www.aulafy.net/ia-para-pymes`
   - `https://www.aulafy.net/curso-agentes-ia-espanol`
4. Solicitar indexación únicamente cuando la versión publicada responda 200, tenga la canónica esperada y aparezca en el sitemap. No es necesario solicitar manualmente cada lección.
5. Revisar semanalmente **Rendimiento > Resultados de búsqueda** agrupando las consultas por intención, no solo por una palabra exacta.

Documentación oficial de la consola:

- [Herramienta de inspección de URLs](https://support.google.com/webmasters/answer/9012289?hl=es)
- [Informe de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=es)

## Medición sin autoengaño

Comparar periodos de 28 días y excluir consultas de marca cuando se quiera medir descubrimiento nuevo. Los indicadores principales son impresiones no asociadas a `Aulafy`, clics, CTR y posición mediana de cada grupo de intención. Antes de cambiar títulos por un CTR bajo, comprobar que hay suficientes impresiones y que la página aparece para la intención correcta.

Revisar también:

- páginas enviadas frente a páginas indexadas;
- consultas nuevas que ya reciben impresiones;
- páginas con muchas impresiones y CTR bajo;
- dos URLs distintas apareciendo para el mismo grupo de consultas;
- errores 404, redirecciones y canónicas elegidas por Google distintas de las declaradas.

La revisión inicial tiene sentido a los 14-28 días del despliegue. El SEO no garantiza posiciones ni tráfico; este sistema mejora la claridad técnica y editorial para que Google pueda descubrir, entender y evaluar el contenido.
