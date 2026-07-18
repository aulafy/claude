# Diagnóstico y piloto de IA para pymes

> **Versión 1.0 · Revisado el 18 de julio de 2026**
>
> Plantilla educativa de Aulafy para empresas de 1 a 50 personas. No sustituye asesoramiento jurídico, de protección de datos, fiscal, contable ni de ciberseguridad.

## Para qué sirve

Esta plantilla ayuda a elegir un primer caso de IA que sea **pequeño, útil y reversible**. No parte de una herramienta concreta: parte de un proceso que hoy consume tiempo o provoca errores.

El resultado deseado no es “tener un agente”. Es uno de estos cuatro resultados verificables:

- un borrador que una persona aprueba;
- una extracción que una persona valida;
- una clasificación que se puede corregir;
- una consulta sobre documentos que cita la fuente y sabe abstenerse.

## Límites importantes

- No prometas ahorro, coste cero, privacidad absoluta ni un plazo de instalación universal. Mide el caso real.
- Una solución local o self-hosted ofrece más control sobre el entorno, pero también exige administrar accesos, secretos, copias, actualizaciones, red y soporte.
- Una solución cloud puede ser adecuada si sus datos, contrato, configuración y coste encajan con el caso.
- Nunca inicies el primer piloto con una acción irreversible: enviar, publicar, cobrar, pagar, borrar, modificar contabilidad, aceptar contratos o decidir sobre personas.

## 1. Ficha de descubrimiento

Completa una ficha por proceso. Evita responder “todos los datos” o “que lo haga todo”.

```text
Empresa / equipo:
Fecha y responsable:

1. Tarea repetitiva:
2. Persona responsable hoy:
3. Frecuencia:
4. Tiempo actual por caso y por semana:
5. Errores, retrasos o costes que provoca:
6. Entrada mínima necesaria:
7. Datos personales, financieros, de salud o secretos:
8. Herramientas actuales (correo, Excel, CRM, Drive, ERP...):
9. Salida que una persona puede revisar:
10. Acción que el sistema tiene prohibida:
11. Persona que revisa y puede parar el flujo:
12. Métrica y fecha de revisión:
```

Preguntas útiles en la entrevista:

- ¿Qué tres tareas manuales quitan más tiempo cada semana?
- ¿Qué documentos o mensajes se buscan repetidamente?
- ¿Qué pasa si una salida es errónea? ¿Puede corregirse antes de afectar a alguien?
- ¿Qué datos no deben entrar en el piloto?
- Si el equipo recuperase tiempo, ¿en qué actividad de valor lo invertiría?

## 2. Matriz de priorización

Puntúa de 1 a 5. **No calcules una media que esconda riesgo alto**: una tarea de alto impacto legal, económico o sobre personas no es una primera prueba aunque ahorre tiempo.

| Caso candidato | Impacto | Frecuencia | ¿Se puede revisar? | Riesgo si falla | Exposición de datos | Decisión |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Clasificar emails y preparar borradores | 4 | 5 | 5 | 2 | 2 | Buen piloto |
| Extraer campos de facturas a CSV | 4 | 4 | 4 | 3 | 4 | Piloto con datos controlados |
| Enviar respuestas automáticamente | 4 | 5 | 2 | 4 | 3 | No como primer piloto |
| Registrar pagos o contabilidad | 5 | 3 | 1 | 5 | 5 | Fuera del primer piloto |

Prioriza una tarea frecuente, repetitiva, con salida comprobable y poco daño si el borrador falla. Tiene que haber una persona dueña del resultado.

## 3. Decisión técnica: local, cloud o híbrida

| Opción | Encaja cuando | Costes y obligaciones a recordar |
| --- | --- | --- |
| Cloud | Necesitas empezar rápido y la tarea admite un proveedor externo evaluado | Suscripción/API, límites, retención, contrato, accesos, formación y revisión |
| Local / self-hosted | Necesitas más control del entorno y puedes operar la infraestructura | Equipo o servidor, energía, copias, parches, monitorización, acceso remoto y soporte |
| Híbrida | Puedes separar tareas y datos por sensibilidad | Mantener reglas de enrutamiento, contratos y trazas de cada parte |

No hay una opción “gratis” o “privada” por defecto. Añade al cálculo el tiempo de quien revisa resultados y de quien mantiene el sistema.

### Nota sobre n8n, Ollama y el AI Starter Kit

El [Self-hosted AI Starter Kit de n8n](https://github.com/n8n-io/self-hosted-ai-starter-kit) combina n8n, Ollama, Qdrant y PostgreSQL para empezar a experimentar. n8n explica que es un punto de partida o prueba de concepto, no una instalación optimizada para producción. Úsalo para aprender o validar un flujo con datos de prueba/autorizados; antes de operar un proceso real, diseña autenticación, secretos, copias, actualizaciones, mínimos privilegios, registros, recuperación y revisión de seguridad.

Ollama puede ser útil para modelos locales, embeddings y salidas estructuradas, pero el modelo y el hardware deben probarse con la muestra real. No selecciones un modelo solo porque sea nuevo o viral.

## 4. Diseña el piloto en cuatro semanas

### Semana 1 — Línea base

1. Reúne 10–30 ejemplos autorizados, minimizados o sintéticos; incluye casos normales, ambiguos y difíciles.
2. Registra tiempo actual, errores frecuentes, coste y resultado esperado.
3. Define los campos o criterios de aceptación antes de usar la IA.

### Semana 2 — Prototipo seguro

1. El sistema produce una vista previa, un borrador o un JSON/CSV temporal.
2. No tiene permisos para enviar, pagar, publicar, borrar o escribir en el sistema final.
3. La persona revisora puede aprobar, corregir, rechazar y detener el flujo.

### Semana 3 — Evaluación

1. Compara la salida con una revisión humana de la misma muestra.
2. Registra errores por campo, abstenciones, tiempo de revisión, incidencias y coste por caso.
3. Corrige el proceso, los documentos de origen o la instrucción. No escondas errores cambiando la métrica.

### Semana 4 — Decisión

Elige una de cuatro opciones: **mantener**, **corregir**, **ampliar con otra revisión** o **descartar**. Descartar un piloto que no supera sus criterios evita deuda técnica y gasto.

```yaml
piloto:
  caso: "extracción de facturas a borrador CSV"
  modo: "vista previa; sin importación contable"
  muestra: "20 documentos autorizados o anonimizados"
  campos: [emisor, fecha, número, base, IVA, total]
  aceptación: "campos críticos correctos o marcados como dudosos"
  revisor: "administración"
  coste_a_medir: "API/suscripción + infraestructura + tiempo de revisión + mantenimiento"
  fecha_decisión: "AAAA-MM-DD"
  acciones_prohibidas: ["pago", "asiento contable", "envío automático"]
```

## 5. Cuatro pilotos iniciales

### A. Email: clasificación y borradores

Entrada: un correo minimizado.  
Salida: categoría, urgencia, borrador y datos que faltan.  
Control: una persona envía o descarta. No prometas plazos, precios ni condiciones sin confirmación.

### B. Reuniones: resumen verificable

Entrada: transcripción cuyo uso esté autorizado.  
Salida: decisiones, tareas, responsables y dudas.  
Control: la persona que dirigió la reunión valida antes de compartirlo.

### C. Facturas: extracción estructurada

Entrada: imagen o PDF autorizado.  
Salida: JSON/CSV con emisor, fecha, número, base, IVA, total y alertas.  
Control: administración valida cada salida antes de exportar. La IA no decide impuestos, no crea asientos y no ejecuta pagos.

Usa un esquema fijo y una regla de abstención:

```json
{
  "numero_factura": "",
  "fecha": "",
  "emisor": "",
  "nif_emisor": "",
  "base_imponible": null,
  "iva": null,
  "total": null,
  "alertas": []
}
```

Si falta o no se puede leer un campo, debe quedar vacío y aparecer una alerta. No se “entrena” un extractor general con tres facturas: se evalúa una muestra representativa y se corrigen los casos límite.

### D. RAG interno: preguntas sobre procedimientos

Entrada: un conjunto pequeño de documentos vigentes y autorizados.  
Salida: respuesta con cita a documento, sección y fecha.  
Control: el sistema se abstiene cuando la evidencia no aparece y respeta los permisos de cada persona.

No indexes carpetas enteras sin inventario, permisos, vigencia y revisión de una muestra de extracción/OCR.

## 6. Lista de salida y registro operativo

Antes de ampliar el piloto, confirma:

- [ ] Existe una persona responsable del proceso y otra capaz de detenerlo.
- [ ] Se conocen la finalidad, los datos mínimos, la ubicación, los accesos y la retención.
- [ ] La prueba incluye casos erróneos y ambiguos, no solo demostraciones bonitas.
- [ ] Los resultados quedan registrados con correcciones e incidencias.
- [ ] Las acciones irreversibles requieren aprobación humana explícita.
- [ ] El presupuesto incluye proveedor, hardware, energía, soporte, copias, mantenimiento y revisión.
- [ ] Los datos personales y los tratamientos de riesgo se han tratado con el responsable o asesor competente.

```text
Registro por ejecución
ID de caso:
Fecha:
Versión de flujo y modelo:
Datos de entrada minimizados:
Resultado:
Resultado de la revisión humana:
Error o incidencia:
Acción tomada:
Coste/tiempo:
```

## 7. Cómo se mantiene esta guía

Este es un recurso vivo, no una lista infinita de herramientas. La revisión editorial programada es semanal; una alerta de seguridad, cambio de precio o incompatibilidad relevante se corrige fuera de ese ciclo.

Para añadir o actualizar una herramienta se publica una tarjeta con:

```text
Herramienta y versión:
Fecha de comprobación:
Caso de uso concreto:
Local, cloud o híbrida:
Datos procesados y ubicación:
Supuesto de coste:
Requisitos técnicos:
Riesgos / límites conocidos:
Alternativa si desaparece o cambia:
Fuente oficial y ejemplo probado:
Estado: candidato / validado en laboratorio / retirado
```

No se sustituye una herramienta porque haya una novedad. Primero se comprueba que conserva la seguridad, el coste y la calidad que el proceso necesita.

## Recursos oficiales para seguir

- [n8n: Self-hosted AI Starter Kit](https://github.com/n8n-io/self-hosted-ai-starter-kit)
- [n8n: explicación y límites del Starter Kit](https://blog.n8n.io/self-hosted-ai/)
- [Ollama: modelos de embeddings para RAG](https://ollama.com/blog/embedding-models)
- [Ollama: salidas estructuradas](https://ollama.com/blog/structured-outputs)
- [AEPD: orientaciones sobre IA agéntica y protección de datos](https://www.aepd.es/guias/orientaciones-ia-agentica.pdf)
- [AEPD: protección de datos para autónomos y pymes](https://www.aepd.es/infografias/ayuda-rgpd-pymes-autonomos.pdf)
- [Curso Aulafy: IA para pymes y autónomos](/cursos/ia-pymes)
- [Lección Aulafy: RGPD básico para usar IA sin sustos](/cursos/ia-pymes/rgpd-basico)
- [Lección Aulafy: facturas, OCR y revisión humana](/cursos/ia-pymes/facturas-verifactu-ocr)

