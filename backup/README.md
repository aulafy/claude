# Respaldo de Aulafy antes del curso unificado

Este directorio documenta el último estado de la experiencia anterior a la arquitectura de documentación continua.

- Fecha del respaldo: `2026-08-04`
- Commit: `94c4d7391bcc879fb6699131c39970277e73949a`
- Etiqueta Git: `backup/aulafy-pre-documentacion-2026-08-04`
- Repositorio: `aulafy/claude`

No se duplica el árbol completo dentro de `backup/`: Git ya conserva cada archivo, permiso y ruta sin aumentar artificialmente el repositorio.

## Recuperar la versión completa

```bash
git fetch --tags
git switch --detach backup/aulafy-pre-documentacion-2026-08-04
npm ci
npm run build
```

Para crear una rama restaurable:

```bash
git switch -c restaurar-aulafy-legacy backup/aulafy-pre-documentacion-2026-08-04
```

La versión incluye la portada anterior, catálogo, rutas, blog, laboratorios, comunidad todavía desactivada, libro, páginas SEO y todos los cursos existentes.

