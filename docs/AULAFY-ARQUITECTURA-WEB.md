# Aulafy: arquitectura web unificada

Actualizado: 2026-09-20

## Objetivo

Aulafy debe ayudar a una persona a encontrar su siguiente accion en menos de
treinta segundos. La interfaz no presupone que conozca nombres de modelos,
frameworks o productos.

## Navegacion principal

La misma navegacion aparece en todo el sitio:

1. **Aprender**: primera experiencia y fundamentos.
2. **Trabajo y pymes**: procesos, datos, pilotos y adopcion.
3. **Construir**: programacion, agentes, RAG e IA local.
4. **Biblioteca**: catalogo completo para quien ya sabe que busca.
5. **Buscar**: acceso directo por termino o problema.

El blog y el radar no ocupan la navegacion principal. Se accede desde la
biblioteca, paginas relacionadas, busqueda y pie de pagina.

## Tipos de pagina

### Portada

Una propuesta clara, tres perfiles, una ruta para pymes y acceso al catalogo.
No muestra noticias ni una lista completa de tecnologias.

### Inicio de ruta

Hace una pregunta breve y recomienda un unico primer paso. Puede ofrecer una
alternativa, pero nunca una cuadricula de veinte opciones.

### Catalogo

Agrupa cursos por resultado: empezar, trabajar, construir y operar. Los filtros
por tecnologia son secundarios.

### Curso

Explica para quien es, que se construye, cuanto tarda y que requisitos tiene.
Despues muestra el temario en orden.

### Leccion

Mantiene el indice lateral, el progreso local y cuatro bloques constantes:
objetivo, explicacion, practica y verificacion.

### Guia o articulo

Resuelve una pregunta concreta. La actualidad tecnica queda separada como
radar y siempre muestra fecha, fuentes y limites.

## Reglas visuales

- Fondo claro y plano por defecto.
- Anchura maxima de 1200 px para navegacion y 760 px para lectura.
- Azul para acciones, verde para estados correctos y coral para avisos.
- Radio maximo de 8 px.
- Sin fondos cuadriculados, orbes, escenas decorativas ni gradientes de marca.
- Una sola familia sans para interfaz; serif solo para lectura larga o titulares principales.
- Una accion primaria por bloque.
- Tarjetas solo para elementos repetidos, nunca para envolver secciones.

## Reglas de contenido

- El titulo describe un resultado, no una herramienta.
- Cada curso declara nivel, duracion, entregable y fecha de revision.
- Cada leccion termina con evidencia verificable.
- Los precios, modelos y versiones incluyen fecha y fuente primaria.
- Los rumores y publicaciones sociales no se mezclan con hechos verificados.

## Mapa de URL estable

    /
    /empezar
    /cursos
    /cursos/ia-pymes
    /cursos/<curso>
    /cursos/<curso>/<leccion>
    /buscar
    /blog
    /blog/<articulo>
    /en
    /en/start
    /en/courses
    /en/courses/<course>
    /en/courses/<course>/<lesson>
    /en/search

Las URL antiguas deben redirigir a este mapa y no aparecer como opciones
paralelas en la navegacion.
