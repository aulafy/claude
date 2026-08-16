# Métricas educativas agregadas de Aulafy

Este sistema permite observar el embudo educativo sin crear perfiles de visitante.
Está desactivado por defecto.

## Qué se almacena

Una fila por día y tipo de evento:

```text
event_day | event_name        | event_count
2026-08-16| mission_complete  | 42
```

No se almacena IP, cookie, identificador de navegador, cuenta, ruta, referrer,
user-agent, prompt, respuesta, búsqueda ni evidencia del alumno. El servidor fija
la fecha y solo acepta los nombres cerrados de la migración.

El navegador conserva un marcador local durante ocho días para no enviar el mismo
tipo de evento más de una vez al día. Ese marcador nunca se transmite.

## Activación

1. Aplica `supabase/migrations/20260816180000_aggregate_learning_metrics.sql`.
2. Configura en el servidor:

```dotenv
NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED=true
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role
```

3. Despliega de nuevo y comprueba que `POST /api/learning-events` devuelve `204`.

La clave `SUPABASE_SERVICE_ROLE_KEY` es secreta. No debe llevar el prefijo
`NEXT_PUBLIC_`, aparecer en capturas ni guardarse en Git. La función SQL de escritura
solo concede ejecución a `service_role`; la clave pública no puede incrementar ni leer
los contadores directamente.

Para revisar el panel `/admin/aprendizaje` sin conectar una base real, usa en
desarrollo `AULAFY_SOCIAL_PREVIEW=true`, `NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED=true`
y `AULAFY_METRICS_PREVIEW=true`. Los datos son ficticios y este modo se ignora
si `NODE_ENV=production`.

## Lectura operativa

Con las variables anteriores disponibles en la terminal:

```bash
npm run metrics:learning
npm run metrics:learning -- 90
```

El informe muestra totales y detalle diario. Las proporciones son aproximaciones por
navegador/día, no personas únicas ni cohortes identificadas.

## Interpretación

- `mission_start / landing_view`: capacidad de la portada para iniciar una práctica.
- `mission_complete / mission_start`: claridad de la primera misión.
- `lesson_90 / lesson_25`: continuidad de lectura, sin usar tiempo bruto como éxito.
- `next_lesson_click / lesson_90`: calidad de la siguiente acción.
- `continue_return`: uso del acceso local para retomar el aprendizaje.
- `return_7d`: primera visita registrada tras al menos 7 días completos desde la anterior.
- `return_30d`: primera visita registrada tras al menos 30 días completos; es exclusiva y no suma también `return_7d`.
- `search_no_results / search_used`: huecos de contenido o vocabulario.
- `route_selected`: recomendaciones que alguien decidió conservar en «Mi ruta».
- `external_source_open`: consulta de alguna fuente externa; no identifica URL ni dominio.

## Límites

- Un navegador puede borrar el marcador local y volver a contar.
- Bloqueadores, JavaScript desactivado o fallos de red reducen los conteos.
- Un tercero puede automatizar peticiones contra el endpoint público; por eso estas
  métricas orientan decisiones editoriales, pero no son datos financieros ni un censo.
- No existe atribución por campaña, usuario, ruta o dispositivo, deliberadamente.
- Los plazos de retorno se comparan en el navegador con la última fecha local. El
  servidor recibe solo el nombre del contador, nunca ambas fechas ni su diferencia.

Para desactivar la ingesta, cambia
`NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED=false` y vuelve a desplegar. Los datos
ya agregados pueden borrarse directamente desde la tabla privada de Supabase.
