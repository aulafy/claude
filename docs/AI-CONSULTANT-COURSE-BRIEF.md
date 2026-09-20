# Aulafy: AI Consultant

Estado: diseño local, no publicado.

## Decisiones confirmadas

- Slug: `ai-consultant`.
- Ruta prevista: `/cursos/ai-consultant`.
- Primera edición: inglés (`/en/courses/ai-consultant`); la estructura debe dejar preparada la traducción al español.
- Audiencia: desarrolladores, consultores técnicos, especialistas en automatización, freelancers, profesionales IT, emprendedores y pequeñas agencias.
- Caso conductor: una pyme ficticia de 10-100 empleados, con ventas, presupuestos, atención, documentación, CRM y datos sensibles.
- Trabajo: preview local únicamente.
- Sin certificado.
- Licencia y privacidad de Aulafy: conservar MIT, sin cuentas obligatorias, cookies ni seguimiento del alumno.

## Promesa

Al terminar, el alumno podrá investigar un proceso empresarial, localizar una pérdida o cuello de botella, decidir si la IA es adecuada, estimar el retorno, prototipar una solución, desplegarla con controles, medirla y ofrecer mantenimiento continuo.

La unidad de valor no es la IA: es el resultado empresarial verificable.

## Mapa curricular inicial

### 1. The AI Consultant

1. What an AI consultant actually does
2. Consultant, developer or automation agency?
3. The consulting lifecycle
4. The AI Consultant Operating Model

### 2. Understand the Business

5. Read a business before proposing AI
6. Revenue, customers and operating constraints
7. Knowledge flows, handoffs and information loss
8. SIPOC and value-stream mapping

### 3. Find the Money

9. Revenue leakage and missed opportunities
10. Bottlenecks, delays and rework
11. Missed calls, slow quotes and weak follow-up
12. The AI Opportunity Matrix

### 4. The 15-Minute AI Assessment

13. Opening a useful discovery conversation
14. The assessment interview
15. Evidence, baseline and assumptions
16. Writing the one-page opportunity brief

### 5. The Paid AI Assessment

17. Turning a conversation into a scoped engagement
18. Process discovery workshop
19. Data and systems inventory
20. Assessment deliverables and decision gates

### 6. ROI Engineering

21. Establish the baseline
22. Cost per task and cost of delay
23. Conservative ROI scenarios
24. Build an ROI calculator

### 7. Select the Solution

25. When not to use AI
26. Rules, search, automation or an LLM?
27. Hosted, hybrid, local and private deployment
28. Make, buy or integrate

### 8. LLM Engineering for Consultants

29. Model capabilities and limits
30. Structured outputs and schemas
31. Tool calling and permissions
32. Prompts, versions and regression tests

### 9. RAG and Company Knowledge

33. When company knowledge needs retrieval
34. Ingestion, chunks and metadata
35. Citations, permissions and tenant boundaries
36. Evaluate whether retrieval helps

### 10. Automation

37. Map event, process, decision and action
38. Email, CRM and document workflows
39. n8n, Make, Zapier and custom code
40. Retries, idempotency and human approval

### 11. AI Agents

41. What makes a workflow an agent
42. Boundaries, tools and allowed actions
43. Designing a safe agent loop
44. Agent evaluations and failure recovery

### 12. Voice AI

45. Use cases for calls and voice assistants
46. Consent, transcripts and escalation
47. Design a voice pilot
48. Measure quality and business outcome

### 13. Local and Private AI

49. Hardware, latency and model fit
50. Ollama, llama.cpp, MLX and vLLM
51. Private data boundaries and on-premise patterns
52. A local pilot for the fictional company

### 14. Security, Privacy and Governance

53. Threat model for an AI workflow
54. GDPR, data minimisation and retention
55. EU AI Act and transparency obligations
56. Prompt injection, supply chain and access control

### 15. Production AI

57. Deploy with rollback and a degraded mode
58. Observability, logs and cost controls
59. Evaluation after launch
60. Maintenance, incidents and model changes

### 16. The AI Consulting Business

61. Present findings to management
62. Scope, price and sell an engagement
63. Assessment to implementation to retainer
64. Final project: deliver a complete AI consulting engagement

## Contract for every lesson

Each lesson must include: an observable outcome, a business problem, a fictional dataset or complete input, numbered steps, expected results, one incorrect case to diagnose, a verification checklist, limitations, and a saved deliverable. Variable claims require dated primary sources. A proposal from Grok, Groq or a local model is never evidence by itself.

## Final project

The student receives the fictional company pack and must deliver:

1. process map and baseline;
2. opportunity matrix with one selected use case;
3. data and risk assessment;
4. architecture decision and prototype;
5. evaluation set and results;
6. ROI scenario and management proposal;
7. deployment, rollback and monitoring plan;
8. maintenance and retainer proposal.

The project is reviewed with a rubric, not certified. It must be possible to complete it locally with supplied fictional data and without sending real company data to a model.

## Research and freshness

Before each technical lesson, verify current official documentation for the relevant provider or project: OpenAI, Anthropic, Google, Ollama, MLX, vLLM, llama.cpp, MCP, n8n, Make, Zapier, CRM APIs, evaluation tools, GDPR and EU AI Act. Store URL, access date, relevant claim and checked version in the editorial dossier. Keep providers interchangeable behind configuration; do not hard-code a vendor into the learning objective.

## Build order

1. Add catalog metadata and route generation only after the first four lessons have real English content.
2. Build the fictional company pack and final-project rubric before writing integration lessons.
3. Implement lessons 1-16 as the first reviewable slice.
4. Add Spanish translations after the English slice has passed content, link and accessibility checks.
5. Run the local preview, structural validation, browser matrix and full build. Do not publish automatically.
