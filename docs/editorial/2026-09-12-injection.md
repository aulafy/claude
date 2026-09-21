# Lote editorial: 2026-09-12 / injection

## Encargo y estado

Nueva leccion bilingue sobre instrucciones no confiables e inyeccion de prompts.

Estado: borrador validado localmente; pendiente de revision editorial y tecnica humana.
Idioma de referencia: ES. EN se ha redactado a partir de la revision ES.

## Resultado

La leccion separa datos de control, define una frontera de autoridad, prueba instrucciones insertadas y describe una recuperacion sin acciones externas. Usa contenido ficticio y no ejecuta ninguna herramienta.

El riesgo se marca como `high`. Se conserva el caso dificil para evaluacion y se insiste en que el contenido recuperado no puede conceder permisos ni cambiar el objetivo. Los recuadros de ejemplo quedan cubiertos por el test de contraste.

## Comprobaciones

```sh
npm run book:validate
npm run test:living-book
git diff --check
```

Resultado: validacion correcta, 14 pruebas correctas y diff sin errores de whitespace.

Hashes de revision:

```text
ES ec24bd1487b4c8f76b655056f4e96bc0570801324c20e99fef0f0790794d51fa
EN 5f60b0e58f979a072bd5f0544a01222b31f35a1f18e26bbbe30c75c18b6416c0
```

`translationFrom.en` queda vinculado a la revision ES. Las aprobaciones permanecen vacias.

## Pendientes

- Revision tecnica humana de permisos, herramientas, aislamiento y respuesta ante inyecciones.
- Añadir casos reales anonimizados solo con autorizacion y un entorno de prueba.
- QA de navegador tras recompilar para revisar la nueva ruta y todos los bloques de texto.
