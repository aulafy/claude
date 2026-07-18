# Estándar editorial y de actualización de Aulafy

Este documento es el contrato mínimo para publicar o actualizar una lección. Su objetivo no es producir muchas páginas, sino conservar contenido útil, verificable y mantenible en español.

## Principio

Una lección no se considera actualizada porque haya cambiado su fecha, su título o unas palabras. La fecha `updatedAt` solo cambia cuando existe una revisión sustancial y trazable: una afirmación contrastada, un procedimiento ejecutado, una fuente revisada, un ejemplo corregido o una mejora pedagógica real.

Nunca se actualizan todas las fechas mediante una tarea automática para aparentar frescura.

## Las dos capas de una lección

1. **Misión práctica:** objetivo pequeño, tres acciones, decisión con feedback y evidencia copiable. Puede usar estado temporal de la página, pero no cuenta, cookies, almacenamiento ni transmisión de respuestas.
2. **Manual vivo:** respuesta directa, explicación, ejemplo, práctica ampliada, errores, riesgos, fuentes, resumen y siguiente paso.

La micropráctica no sustituye la profundidad. El manual no sustituye la acción del alumno.

## Contrato de publicación

Toda lección nueva o revisada debe declarar:

- audiencia y conocimiento previo;
- resultado observable;
- evidencia que demuestra el aprendizaje;
- fecha de revisión real;
- volatilidad: estable, revisable o volátil;
- fuentes primarias pertinentes;
- afirmaciones que necesitan nueva comprobación;
- riesgos de privacidad, seguridad, coste o impacto, cuando proceda;
- autoría y forma en que se utilizó IA;
- registro resumido del cambio.

Los tutoriales técnicos añaden:

- sistema operativo y versiones probadas;
- repositorio o código reproducible;
- comando de instalación y ejecución;
- resultado esperado;
- al menos un caso normal y uno de fallo;
- límites conocidos y procedimiento para deshacer o detener.

## Estados permitidos

| Estado | Significado |
| --- | --- |
| Revisión editorial | Se han comprobado estructura, claridad, fuentes y coherencia. No implica que exista código ejecutable. |
| Probado | El procedimiento o código se ejecutó en el entorno indicado y produjo el resultado documentado. |
| Necesita revisión | Ha vencido el intervalo editorial o una dependencia/fuente ha cambiado. |
| Archivado | Se conserva por contexto, pero no debe seguirse como procedimiento actual. |

No se usa «verificado» sin explicar qué se verificó y con qué evidencia.

## Ritmo según volatilidad

- **Estable:** conceptos y métodos generales; revisión cada 180 días.
- **Revisable:** integraciones y procedimientos con dependencias; revisión cada 30 días.
- **Volátil:** modelos, precios, límites, interfaces, comandos de proveedores o normativa cambiante; revisión cada 7 días o ante un cambio oficial.

Una alerta de caducidad no invalida automáticamente toda la explicación. Advierte qué parte requiere comprobarse de nuevo.

## Jerarquía de fuentes

1. Documentación, repositorio, model card, norma o publicación oficial.
2. Artículo académico o entidad pública competente.
3. Evidencia reproducible del repositorio de Aulafy.
4. Fuente secundaria especializada, claramente identificada.
5. Conversaciones y publicaciones sociales como señal de preguntas reales, nunca como única prueba técnica.

X y Google Trends sirven para descubrir lenguaje, dudas y necesidades. No sustituyen la documentación primaria. Hugging Face permite seguir modelos abiertos, pero cada ficha debe revisar autor, licencia, archivos, requisitos, limitaciones y model card antes de recomendar su uso.

## Flujo editorial

```text
Necesidad real -> fuentes primarias -> borrador -> práctica -> ejecución o contraste
-> revisión de seguridad y costes -> pruebas automáticas -> revisión visual
-> fecha y registro de cambio -> publicación
```

La IA puede investigar, estructurar, proponer ejemplos y detectar inconsistencias. No publica directamente ni decide de memoria si un dato volátil es correcto.

## Criterio de retirada

Una lección se corrige, marca o archiva si contiene comandos rotos, identificadores no verificables, costes sin fecha, fuentes que ya no sostienen la afirmación, ejemplos inseguros o una promesa educativa que el ejercicio no permite demostrar.

## Definición de terminado

Una lección está terminada cuando una persona de la audiencia indicada puede completar la misión, explicar la decisión, conservar una evidencia, identificar los límites y saber qué hacer después; además, el repositorio supera las comprobaciones correspondientes y la página se revisa en escritorio y móvil.
