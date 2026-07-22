# Sistema de calidad y actualización de Aulafy

Aulafy no debe competir por publicar más páginas, sino por publicar contenido que se pueda seguir, comprobar y corregir. Este sistema convierte cada curso en una pieza trazable: qué se revisó, cuándo, con qué fuentes y qué queda sujeto a nueva comprobación.

## Principio operativo

Ningún contenido técnico se considera fiable por haberlo redactado una IA. La IA puede ayudar a investigar, comparar, explicar y mejorar la pedagogía, pero la publicación exige contraste.

El flujo correcto es:

```text
señal real de necesidad
→ fuente primaria
→ borrador educativo
→ práctica o contraste
→ revisión de privacidad, seguridad y coste
→ ficha de confianza
→ audit automático
→ build
→ publicación
→ revisión programada
```

## Qué aporta cada fuente

| Fuente | Sirve para | No sirve para |
| --- | --- | --- |
| Documentación oficial | Comandos, APIs, límites, seguridad, cambios de producto | Saber qué le preocupa al alumno |
| GitHub oficial | Instalación, issues, changelog, ejemplos, licencias | Confirmar precios comerciales si no están ahí |
| Hugging Face | Model cards, licencias, archivos, requisitos, limitaciones | Decidir por hype qué modelo recomendar |
| X y Reddit | Detectar dolores, lenguaje real, dudas y casos de uso | Probar afirmaciones técnicas |
| Pruebas locales | Ver si un tutorial funciona en un entorno concreto | Garantizar que funcionará en todos los equipos |
| Normativa oficial | Privacidad, cumplimiento, educación, facturación | Sustituir asesoramiento profesional |

## Estados visibles

- **Revisión editorial:** estructura, claridad, fuentes y coherencia revisadas. No implica que el código esté ejecutado.
- **Probado parcialmente:** al menos una parte técnica se ha ejecutado y la evidencia se nombra.
- **Necesita revisión:** la fecha o la volatilidad exige volver a comprobar fuentes, comandos, precios o herramientas.

Evitar “verificado” como palabra genérica. Si algo está verificado, debe decirse qué se verificó.

## Cadencia

- **Estable:** 180 días. Conceptos, criterio, explicaciones generales.
- **Revisable:** 30 días. Integraciones, tutoriales con dependencias, despliegues.
- **Volátil:** 7 días. Modelos, precios, APIs, comandos de proveedores, interfaces, normativa cambiante.

## Reglas para redactar una lección nueva

Antes de escribir:

1. Define el alumno: principiante, pyme, técnico, avanzado.
2. Define una misión observable de 20 a 90 minutos.
3. Distingue contenido estable y contenido volátil.
4. Busca fuentes primarias.
5. Si usas X/Reddit, anota que es señal de demanda, no prueba técnica.

Durante la redacción:

1. Abre con el problema real.
2. Da una acción concreta.
3. Incluye advertencias de coste, privacidad y seguridad si hay herramientas externas.
4. Evita listas infinitas de herramientas.
5. Cierra con evidencia: qué debe guardar o enseñar el alumno.

Antes de publicar:

```bash
npm run verify-quality
npm run audit-education
npm run lint
npm run build
```

Para cursos técnicos con repos externos, añade además:

```bash
git clone <repo>
instalar dependencias
ejecutar el ejemplo mínimo
probar un fallo controlado
documentar versiones y sistema operativo
```

## Prompt para investigación con Grok/X

```text
Actúa como investigador curricular para Aulafy.

Busca publicaciones reales en X en español de los últimos 30/90 días sobre:
- aprender IA desde cero
- IA para pymes
- automatización de trabajo
- programar con IA
- crear webs con IA
- RAG
- agentes
- modelos locales
- miedo a quedarse atrás laboralmente

Devuelve solo evidencias verificables:
- enlace
- fecha
- autor
- texto resumido
- intención de aprendizaje
- nivel del usuario
- problema real
- módulo Aulafy al que encaja
- qué lección/proyecto deberíamos crear o mejorar

No inventes métricas. Si algo no puedes verificarlo, márcalo como no verificado.
```

## Prompt para contraste técnico antes de redactar

```text
Voy a redactar una lección técnica de Aulafy sobre [tema].

Antes de escribir, dame una lista de comprobación actualizada:
1. documentación oficial que debo consultar;
2. cambios recientes de versiones, comandos, precios o límites;
3. riesgos de privacidad, seguridad y coste;
4. entorno mínimo de prueba;
5. caso normal y caso de fallo que debo ejecutar;
6. partes volátiles que deben llevar fecha.

No redactes la lección. Solo prepara el plan de verificación.
```

## Qué debe romper el build

El repositorio debe fallar si:

- un curso publicado no tiene ficha de confianza;
- una ficha no tiene fecha ISO;
- una ficha volátil no se revisa cada 7 días;
- una ficha no tiene fuentes HTTPS;
- una ficha dice “probado parcialmente” sin nombrar evidencia ejecutada;
- el programa modular deja de tener siete módulos;
- una ruta visible deja cursos huérfanos.

Ese es el pacto: Aulafy puede crecer, pero no a costa de perder confianza.
