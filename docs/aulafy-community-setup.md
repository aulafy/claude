# Aulafy Comunidad — puesta en marcha del piloto

La capa social está integrada, pero permanece oculta y bloqueada por defecto hasta
que el piloto esté terminado y aprobado. Los cursos siguen públicos y no dependen
de Supabase.

El interruptor `NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED` controla conjuntamente la
navegación, las llamadas desde las lecciones, el buscador, el índice SEO y el
acceso a todas las rutas sociales. Debe permanecer en `false` durante el desarrollo.

## Alcance deliberado del piloto

Incluido:

- acceso por enlace de email y Google;
- perfil público sin exponer el email;
- proyectos vinculados a tres lecciones de `codex-desde-cero`;
- revisiones educativas estructuradas;
- denuncias y cola de moderación;
- RLS, límites de longitud y registro de decisiones.

Pospuesto hasta validar el uso:

- seguidores y feed personalizado;
- XP, niveles e insignias;
- comentarios libres y mensajes privados;
- notificaciones;
- imágenes y vídeos;
- tutor o recomendaciones con IA;
- sincronización del progreso guardado en `localStorage`.

## 1. Crear el proyecto Supabase

1. Crea un proyecto vacío en Supabase dentro de una organización controlada por Aulafy.
2. Elige una región europea adecuada para los usuarios previstos.
3. Guarda de forma segura las credenciales administrativas. La aplicación solo necesita la URL y la **publishable key**; no necesita la `service_role` key.

## 2. Aplicar la migración

Ejecuta, una sola vez y en un proyecto nuevo, el contenido de:

```text
supabase/migrations/20260714160000_social_learning_mvp.sql
```

Después comprueba en el editor SQL:

```sql
select course_slug, lesson_slug, enabled
from public.social_learning_units
order by course_slug, lesson_slug;
```

Deben aparecer tres lecciones de `codex-desde-cero`.

## 3. Configurar autenticación

En Supabase Auth:

- Site URL de producción: `https://www.aulafy.net`.
- Redirect URLs:
  - `https://www.aulafy.net/auth/callback`
  - la URL de preview de Vercel que se utilice para probar;
  - `http://localhost:3000/auth/callback` durante desarrollo.
- Mantén activado el proveedor Email.
- Para Google, configura el cliente OAuth y habilita el proveedor. Si todavía no se configura, debe ocultarse temporalmente el botón de Google antes del lanzamiento público.

La aplicación usa PKCE, cookies de sesión y `proxy.ts` para renovar la sesión antes del renderizado.

## 4. Variables de entorno

Añade en `.env.local` y en Vercel:

```dotenv
NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED=false
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED=false
NEXT_PUBLIC_SITE_URL=https://www.aulafy.net
```

No añadas `service_role` al frontend ni a variables con prefijo `NEXT_PUBLIC_`.
No cambies `NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED` a `true` hasta completar la prueba
mínima, revisar los textos legales y aprobar expresamente el lanzamiento.
Pon `NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED=true` únicamente después de que el
proveedor de Google haya quedado configurado y probado en Supabase.

En desarrollo local cambia temporalmente `NEXT_PUBLIC_SITE_URL` a
`http://localhost:3000`. Esta URL se usa para construir retornos de autenticación
sin confiar en cabeceras enviadas por el navegador.

Para revisar la interfaz con datos ficticios en desarrollo:

```dotenv
AULAFY_SOCIAL_PREVIEW=true
```

El modo preview está deshabilitado por código en producción.

## 5. Asignar el primer administrador

1. Entra una vez en `/acceso` con la cuenta que moderará el piloto.
2. Busca su usuario en `auth.users`.
3. Ejecuta como administrador del proyecto:

```sql
update public.user_roles
set role = 'admin'
where user_id = 'UUID_DEL_USUARIO';
```

No existe ninguna acción pública que permita modificar roles.

## 6. Prueba mínima antes de publicar

Utiliza dos cuentas normales y una administradora:

1. Cuenta A entra por email y edita el perfil.
2. Cuenta A publica un borrador y confirma que otra cuenta no puede verlo.
3. Cuenta A publica el proyecto y aparece en `/comunidad`.
4. Cuenta B revisa el proyecto y no puede revisarlo una segunda vez.
5. Cuenta A no puede revisar su propio proyecto.
6. Cuenta B denuncia el proyecto.
7. La cuenta administradora ve la denuncia, oculta el proyecto y confirma que deja de ser público.
8. La cuenta administradora restaura el proyecto y la decisión queda en `moderation_actions`.
9. Un usuario no puede actualizar `user_roles`, `published_at`, `created_at` ni el autor de un proyecto mediante la API pública.
10. El email nunca aparece en `profiles`, el HTML público ni las consultas anónimas.
11. Solo después de superar todas las comprobaciones, cambia
    `NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED=true` y realiza una última prueba en preview.

## 7. Operación del piloto

- Empieza con 20–30 participantes invitados.
- Publica varios ejemplos reales antes de abrir la comunidad para evitar una galería vacía.
- Garantiza al menos una revisión humana de Aulafy por proyecto durante el piloto.
- Revisa la cola de moderación a diario.
- Responde las denuncias urgentes de privacidad, claves o malware con prioridad.

Métricas iniciales:

- proporción de personas que publican después de completar una lección piloto;
- proyectos con una revisión sustantiva en menos de 72 horas;
- autores que regresan durante los siete días siguientes;
- denuncias, contenido ocultado y motivos;
- abandonos del formulario de publicación.

No se deben añadir seguidores, XP o recomendaciones con IA hasta demostrar que las personas publican, revisan y regresan.

## 8. Retirada y emergencia

Si aparece un problema de seguridad o moderación:

1. Deshabilita las unidades del piloto:

```sql
update public.social_learning_units set enabled = false;
```

2. Cambia `NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED=false` y vuelve a desplegar.
3. Conserva la tabla `moderation_actions` para auditoría.
4. No borres denuncias abiertas mientras se investiga el incidente.

Los cursos y el progreso local seguirán funcionando aunque la capa social quede desactivada.
