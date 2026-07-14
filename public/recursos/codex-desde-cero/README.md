# Manual «Codex desde cero» de Aulafy

## Archivos finales

- `manual-codex-desde-cero-aulafy.pdf`: edición lista para lectura, impresión y distribución web.
- `manual-codex-desde-cero-aulafy.tex`: fuente LaTeX completa y editable.
- `aulafy-icon-512.png`: recurso gráfico requerido por la portada.
- `curso-codex-desde-cero.md`: fuente editorial aprobada y utilizada por las lecciones web.

Mantén el archivo `.tex` y el icono en la misma carpeta.

## Compilar el LaTeX

Se recomienda una instalación reciente de TeX Live con XeLaTeX:

```bash
latexmk -xelatex -interaction=nonstopmode -halt-on-error \
  manual-codex-desde-cero-aulafy.tex
```

No requiere `--shell-escape`. Si Georgia, Helvetica Neue o Menlo no están instaladas, la plantilla utiliza automáticamente TeX Gyre Schola, TeX Gyre Heros y Latin Modern Mono.

Para eliminar archivos auxiliares sin borrar el PDF:

```bash
latexmk -c manual-codex-desde-cero-aulafy.tex
```

## Controles de esta edición

- Formato A4, 99 páginas.
- 20 lecciones y 10 apéndices.
- Portada, mapa del manual, marcadores y enlaces clicables.
- Código con ajuste de línea y tablas multipágina.
- Fuentes tipográficas incrustadas y subconjuntadas.
- Todas las páginas renderizadas e inspeccionadas visualmente.
- Integridad PDF comprobada con Poppler y `qpdf`.
- Última revisión: 14 de julio de 2026.
