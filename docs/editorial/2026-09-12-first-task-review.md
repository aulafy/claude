# Lote editorial: 2026-09-12 / first-task

## Encargo y estado

Primera revision del capitulo inicial del libro vivo de Aulafy.

Estado: comprobado localmente; pendiente de revision editorial humana.
Idioma de referencia: ES. EN esta vinculado a la revision ES existente.
Rama: `codex/aulafy-living-book`.

## Resultado de la revision

No se han aplicado cambios de contenido en este lote. El capitulo cumple el objetivo pedagogico inicial: transformar una peticion vaga en un encargo limitado, comprobar un borrador y corregir un dato inventado antes de usarlo.

La version inglesa mantiene la misma secuencia, datos ficticios, limites, error deliberado y respuesta correcta. No se ha tratado ninguna salida como ejecucion real de un modelo.

## Comprobaciones pedagogicas

- El lector no necesita programar, instalar una herramienta ni compartir datos reales.
- El ejercicio distingue objetivo, hechos, audiencia, limites y formato.
- La practica incluye un fallo plausible: una fecha limite que no estaba en los datos.
- La correccion pide retirar el dato y vuelve a comprobar el texto completo.
- El resultado observable es un aviso breve, no el envio del aviso.
- El quiz tiene una sola respuesta correcta y explica por que las otras decisiones son inseguras.
- No crea un prerrequisito hacia un capitulo aun no redactado.

## Evidencias y procedencia

El capitulo declara como antecedente:

```text
public/recursos/ia-desde-cero/curso-ia-desde-cero.md
```

La procedencia se conserva en `chapter.json`. El cuerpo actual es una redaccion nueva y no se presenta como copia literal ni como respuesta obtenida en una prueba.

No hay claims volatiles en este capitulo. Por eso no se ha añadido una fuente externa ni una fecha artificial de actualidad.

## Revisiones ejecutadas

```sh
npm run book:validate
npm run test:living-book
```

Resultado real: validacion correcta; 14 pruebas del motor correctas.

Hashes de revision actuales:

```text
ES cf54f9a06c8b1176e628a988bde56b44a7e33675e77f1458fb8aa76832e477a6
EN 83a642c53e14142886bf73eeb1742b4f7ab9ebd55f0aa69c9882af1f51576c27
```

`translationFrom.en` apunta a la hash ES usada como referencia. Las listas `approvals.es` y `approvals.en` permanecen vacias deliberadamente.

## Pendientes

- Revision humana de la claridad y dificultad para una persona sin experiencia.
- Confirmar que el ejemplo de "subject" en ingles encaja con la variante de correo que se quiera ensenar.
- Decidir si el siguiente lote amplia este capitulo o redacta `read-documents`.
- No publicar ni marcar como aprobado hasta recibir la identidad y la decision del revisor autorizado.

## Siguiente accion recomendada

Revisar los cuatro capitulos de la parte inicial con el mismo criterio y despues redactar `research-sources`, manteniendo una entrega bilingue por lote. No generar todavia los 20 capitulos planificados restantes.
