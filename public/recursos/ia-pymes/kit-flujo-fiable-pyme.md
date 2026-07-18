# Kit: del piloto al flujo fiable para pymes

> **Versión 1.0 · Revisado el 18 de julio de 2026**
>
> Recurso educativo de Aulafy para empresas de 1 a 50 personas. No sustituye asesoramiento jurídico, de protección de datos, fiscal, contable ni de ciberseguridad.

## Para qué sirve

Este kit se usa **después** de elegir un piloto y **antes** de conceder permisos de envío, publicación, pago, borrado, escritura en un CRM o acceso de agente a herramientas.

El resultado no es un “agente autónomo”. Es una decisión documentada:

- mantener el flujo en modo borrador;
- corregir un fallo y volver a probar;
- conceder un permiso pequeño y reversible;
- o descartar el caso.

No necesitas una infraestructura local para completar las fichas. Local, cloud e híbrido son opciones de implementación; el método exige el mismo control en las tres.

## 1. Contrato del flujo

Completa una ficha por flujo. Evita respuestas como “todos los documentos”, “que responda bien” o “que lo haga todo”.

~~~yaml
nombre:
versión:
propósito concreto:
persona propietaria:

entrada permitida:
entrada no permitida:
origen autorizado:
datos personales o sensibles:

salida esperada:
esquema de salida:
fuentes o evidencia que debe conservar:

qué hace si falta evidencia:
qué hace si el formato es inválido:
acción prohibida:
persona revisora:
fecha de siguiente revisión:
~~~

### Criterio de calidad

Describe antes de probar qué significa una salida aceptable.

~~~text
Ejemplo: “La factura produce emisor, fecha, número, base, IVA y total.
Todo campo crítico incluye evidencia o queda como null con una alerta.
El flujo no exporta datos a contabilidad.”
~~~

## 2. Esquema, fuentes, abstención y validación

Marca las cuatro piezas que necesita el flujo:

- [ ] La salida tiene campos, tipos y estados definidos.
- [ ] Las respuestas basadas en documentos incluyen referencia de fuente, versión y fecha.
- [ ] El flujo puede abstenerse: falta de evidencia, contradicción, entrada ilegible o petición fuera de alcance.
- [ ] Hay reglas fuera del modelo para campos obligatorios, formatos, rangos, duplicados o relaciones simples.
- [ ] Si falla una regla, el estado pasa a «revisar», no a «listo».

~~~yaml
salida:
  estado: listo | revisar | abstenerse | error_tecnico
  datos:
    campo_critico: null
  evidencia:
    - documento: ""
      versión: ""
      sección_o_página: ""
  dudas: []

validaciones:
  - campos_criticos_presentes_o_null
  - formato_de_fecha
  - rango_de_importe
  - no_duplicado
~~~

## 3. Matriz de pruebas

Prepara una muestra de datos sintéticos, minimizados o autorizados. No pruebes solo casos fáciles.

| ID | Tipo | Entrada | Resultado esperado | Riesgo | Resultado obtenido | Decisión |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Normal | Factura clara | Extrae y marca «revisar» | Medio |  |  |
| 02 | Ambiguo | Falta fecha | Fecha null y duda visible | Medio |  |  |
| 03 | Difícil | OCR malo | Abstención o revisión | Medio |  |  |
| 04 | Fuera de alcance | Pide pagar | Rechazo; no actúa | Alto |  |  |
| 05 | Hostil | Instrucción ajena en email | Ignorar instrucción; marcar riesgo | Alto |  |  |
| 06 | Técnico | API caída | Cola o proceso manual | Medio |  |  |
| 07 | Duplicado | Misma entrada dos veces | No duplica acción | Alto |  |  |

Para cada incidente, conserva:

~~~text
caso_id:
versión del flujo:
resultado esperado:
resultado obtenido:
revisión humana:
severidad: baja | media | crítica
causa probable:
corrección:
fecha de repetición:
~~~

## 4. Métricas que ayudan a decidir

No prometas ahorro, precisión o retorno antes de medir la muestra real. Registra, como mínimo:

~~~text
casos probados:
resultados aceptados sin corrección crítica:
errores críticos:
abstenciones correctas:
tiempo de generación:
tiempo de revisión:
coste de API/suscripción:
coste de infraestructura:
coste de mantenimiento:
coste por resultado aceptado:
~~~

Interpreta los resultados según el daño posible. Un borrador interno puede tolerar más corrección que un dato contable o una comunicación al cliente. Si aparece un error crítico sin una barrera que lo detenga, no concedas más permisos.

## 5. Ficha de operación mínima

~~~yaml
flujo:
propietario: # decide propósito, alcance y pausa
operador: # revisa alertas, accesos, coste y copias
revisor: # aprueba resultados de impacto

entorno: prueba | producción limitada
horario y volumen esperado:
presupuesto o límite de uso:

logs:
  guardar: [ejecucion_id, versión, estado, validaciones, evidencia, decisión]
  no_guardar: [contraseñas, claves, adjuntos innecesarios, datos excesivos]
  retención:
  acceso:

backup:
  qué: [configuración, plantillas, reglas, datos operativos necesarios]
  dónde:
  quién restaura:
  última prueba de restauración:

modo_degradado:
  proveedor_caído:
  presupuesto_superado:
  validación_fallida:
  entrada_duplicada:
  proceso_manual_alternativo:
~~~

### Simulacro de recuperación

- [ ] Pausa el flujo de prueba.
- [ ] Comprueba que se avisa a la persona adecuada.
- [ ] Ejecuta el modo manual o de cola.
- [ ] Restaura una copia no productiva o verifica el procedimiento de restauración.
- [ ] Registra qué faltaba y actualiza esta ficha.

Una copia no comprobada no es una garantía. Un modo degradado que nadie ha practicado es solo una intención.

## 6. Matriz de permisos

La autonomía se concede por acción y se puede retirar. Define el permiso más pequeño posible.

| Acción | Cuenta o identidad | Entorno | Requiere aprobación | Cómo se revoca | Registro |
| --- | --- | --- | --- | --- | --- |
| Leer ticket asignado | Cuenta de servicio limitada | Prueba | No | Desactivar cuenta | ID y estado |
| Guardar borrador | Cuenta de borradores | Prueba o limitado | No | Pausar flujo | Propuesta y versión |
| Enviar email | Cuenta separada | Limitado | Sí | Retirar permiso | Revisor y envío |
| Pagar, borrar, contratar o decidir sobre personas | No en el piloto | — | Revisión humana y procedimiento específico | — | — |

Antes de ampliar, confirma:

- [ ] Contrato de flujo completo.
- [ ] Pruebas normales, ambiguas, hostiles, técnicas y duplicadas.
- [ ] Métricas revisadas y sin error crítico sin barrera.
- [ ] Responsable, logs, copia probada y modo degradado.
- [ ] Permiso limitado, reversible y auditable.
- [ ] Revisión humana donde haya impacto económico, legal, reputacional o sobre personas.

## Decisión de salida

~~~text
Fecha:
Caso:

[ ] Mantener en modo borrador.
[ ] Corregir y repetir muestra.
[ ] Limitar el alcance.
[ ] Conceder permiso reversible y acotado.
[ ] Pasar a diseño técnico de agente.
[ ] Descartar.

Razones, evidencia y responsable:
Próxima revisión:
~~~

## Continúa en Aulafy

- [Diagnóstico y primer piloto](/cursos/ia-pymes/diagnostico-piloto)
- [De piloto a flujo fiable](/cursos/ia-pymes/flujo-fiable)
- [Pruebas de fallo y métricas](/cursos/ia-pymes/pruebas-metricas)
- [Operación mínima](/cursos/ia-pymes/operacion-minima)
- [Permisos y agentes](/cursos/ia-pymes/permisos-agentes)
- [Agentes en producción](/cursos/agentes-produccion)
