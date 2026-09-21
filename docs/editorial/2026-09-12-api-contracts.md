# Lote editorial: 2026-09-12 / api-contracts

## Encargo y estado

Nueva leccion bilingue de construccion sobre contratos de entrada y salida.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo define entrada, salida, casos validos y fallidos, y una recuperacion segura. Usa un contrato ficticio con `draft`, `supportedFacts`, `pending` y `send: false`; no realiza llamadas reales ni depende de una API concreta.

El ejercicio enseña a rechazar una respuesta con formato incompleto aunque su texto parezca correcto. El bloque de ejemplo hereda el tratamiento de contraste explicito del lector.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES 8b7c71a7d5ece8eade3175e113a5a9a0eb94f858d2eac4161425278594d54b84
EN 5f2b31cf805bc85ccbc5aba5ae05d164ff231a7ce85eb1d2a7cc617b70f60011
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana de los criterios de validacion y recuperacion.
- Conectar en el futuro con un ejemplo ejecutable solo cuando se definan proveedor, esquema y entorno.
- QA de navegador tras recompilar para revisar contraste y desbordamiento de los bloques.
