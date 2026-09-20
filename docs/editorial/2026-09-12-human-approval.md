# Lote editorial: 2026-09-12 / human-approval

## Encargo y estado

Nueva leccion bilingue sobre aprobacion humana, rechazo y parada segura.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo define la frontera entre borrador y accion externa, una lista de comprobaciones, un motivo de rechazo y una recuperacion que conserva la entrada y la evidencia. El riesgo se marca como `high`; no hay integraciones reales ni envios.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 0ee13c9cfea70d300b8c30267442240c9bb5fb68019a9fa298a8b241f334be26
EN 27ac2c712a5c6fa363ea2c12305bc6c3247ac9eac65f9599c150d6097bcc4242
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana de los criterios de aprobacion y del comportamiento ante reintentos.
- Confirmar que el siguiente bloque de IA local explica medicion sin mezclarlo con el tutorial de Ollama.
- QA de navegador tras recompilar para verificar bloques de codigo, contraste y navegacion.
