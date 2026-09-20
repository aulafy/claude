# Lote editorial: 2026-09-12 / connectors

## Encargo y estado

Nueva leccion bilingue sobre conectores, permisos y recorrido de datos.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

El capitulo enseña a dibujar el camino de los datos, reducir permisos a lo minimo, probar con datos desechables y revocar el acceso. Mantiene el envio como accion no permitida y explica por que guardar un borrador no equivale a enviarlo.

El riesgo se marca como `technical`. No se conecta ninguna cuenta, no se ejecutan integraciones y no se hacen afirmaciones sobre un proveedor concreto. Los ejemplos usan una lista y horarios ficticios.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES c69f65c94351ed4ed14cc74ea4621890472096ed6332b1f0bf4b88c41f8070f9
EN 1d83c385d7cccda485e0c12d96e63251febefd7289c5460d6c2b39559b74eb38
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana de los conceptos de permisos, revocacion, reintentos y duplicados.
- Confirmar si el siguiente capitulo `human-approval` debe incluir un ejemplo de aprobacion manual sin conectar servicios.
- QA de navegador tras recompilar para comprobar el bloque de texto y el contraste en esta ruta.
