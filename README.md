# Aulafy

Web educativa gratuita en español sobre IA aplicada, Claude Code e IA local. El primer curso publicado es "Claude Code, de 0 a pro" e incluye una continuacion practica sobre aplicaciones locales con Ollama, LM Studio, RAG, voz, PDF y despliegue.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Chat de ayuda con Groq, opcionalmente limitado con Upstash Redis

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Para probar el chat necesitas crear `.env.local` a partir de `.env.example` y definir `GROQ_API_KEY`.

## Scripts

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Despliegue

El proyecto esta preparado para Vercel. Define estas variables si quieres que el chat funcione y tenga limite de uso:

- `GROQ_API_KEY`
- `GROQ_MODEL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

## Licencia

El contenido educativo se publica bajo CC BY 4.0 y el codigo de la web bajo MIT. Consulta `LICENSE.md`.
