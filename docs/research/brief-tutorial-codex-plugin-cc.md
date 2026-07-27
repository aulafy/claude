# Brief verificable — tutorial `codex-plugin-cc`

Fecha: 2026-07-27
Estado: preparado para redacción, pendiente de prueba completa
Prioridad: máxima

## Título de trabajo

Claude Code + Codex: cómo trabajar con dos agentes sin duplicar trabajo

## Audiencia

Personas técnicas que ya usan o quieren usar asistentes de programación. No hace falta que sean expertas en agentes, pero sí deben poder abrir un terminal, instalar herramientas y trabajar con un repositorio Git.

## Problema real

Muchos alumnos usan un único asistente para todo: planificar, escribir, revisar y decidir. Eso aumenta el riesgo de errores invisibles. Este tutorial debe enseñar un flujo más sano:

```text
Claude Code organiza el trabajo.
Codex revisa o ejecuta una parte acotada.
La persona decide.
```

## Fuente primaria inicial

- Repositorio oficial: https://github.com/openai/codex-plugin-cc

Antes de publicar hay que volver a consultar el README y registrar:

- versión del plugin;
- comandos disponibles;
- requisitos de Node/Codex/Claude Code;
- sistema operativo probado;
- limitaciones o issues relevantes.

## Resultado observable

Al terminar, el alumno debe poder enseñar:

1. el plugin instalado;
2. la salida de comprobación inicial;
3. una revisión generada por Codex sobre un cambio pequeño;
4. una decisión humana sobre qué aceptar;
5. una nota de riesgo/coste.

## Estructura recomendada de la lección

### 1. Idea en una frase

No se trata de “poner dos IAs a hablar”, sino de separar responsabilidades: una ayuda a conducir el trabajo y otra revisa con mirada externa.

### 2. Cuándo usarlo

- revisión de pull requests;
- segunda opinión sobre refactors;
- rescate de tareas atascadas;
- comprobación adversarial antes de publicar;
- handoff entre sesiones.

### 3. Cuándo no usarlo

- proyectos con secretos sin limpiar;
- cambios legales, médicos o financieros sin revisión profesional;
- repositorios enormes sin acotar la tarea;
- cuando el alumno no entiende qué cambios se proponen.

### 4. Práctica guiada

```text
1. Preparar repositorio de prueba.
2. Instalar el marketplace/plugin.
3. Ejecutar setup.
4. Crear un cambio pequeño.
5. Pedir revisión.
6. Leer la revisión como humano.
7. Aplicar una mejora.
8. Registrar evidencia.
```

### 5. Evidencia que debe guardar el alumno

```text
Fecha:
Sistema:
Repositorio:
Comando usado:
Resultado:
Qué acepté:
Qué rechacé:
Por qué:
Riesgo detectado:
```

### 6. Errores previsibles

- instalar el plugin sin tener Codex listo;
- lanzar tareas demasiado amplias;
- aceptar una revisión sin leer el diff;
- confundir “revisión del agente” con garantía;
- olvidar limpiar variables de entorno o secretos.

### 7. Cierre pedagógico

La lección debe terminar reforzando una idea central de Aulafy: los agentes multiplican capacidad, pero también multiplican superficie de error. La habilidad importante no es obedecer al agente, sino diseñar trabajos pequeños, verificables y reversibles.
