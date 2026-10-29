# Cotiza tu Kit anti lluvias

Mini web para la Ferretería La Llave, en Los Olivos, Lima. Permite calcular una cotización referencial de materiales para proteger el techo según sus metros cuadrados, tipo de techo y, opcionalmente, el largo de canaleta. También prepara el pedido para enviarlo por WhatsApp.

## Cómo abrirla

1. Guarda los cuatro archivos (`index.html`, `styles.css`, `script.js` y `README.md`) en la misma carpeta.
2. Abre `index.html` con un navegador web actualizado desde tu computadora o celular.
3. Ingresa los metros cuadrados del techo, elige el tipo de techo y, si corresponde, escribe los metros de canaleta.
4. Pulsa **Calcular mi kit** para ver cantidades redondeadas hacia arriba, subtotales y total. Pulsa **Pedir por WhatsApp** para abrir el mensaje listo para enviar.

No requiere instalación, cuenta, pago ni conexión a una base de datos. La web no guarda los datos ingresados. Para abrir WhatsApp desde el botón se necesita conexión a internet.

## Cómo cambiar productos y precios

Abre `script.js` en un editor de texto y busca la lista `PRODUCTS`, al inicio del archivo. Cada producto tiene:

- `name`: nombre que aparece en la cotización.
- `coverage`: metros que cubre una unidad (m² para techo o metros lineales para canaleta).
- `unitPrice`: precio referencial en soles por unidad.
- `unit`: nombre de la unidad.
- `appliesTo`: `todos`, `canaleta` o `calamina`, según cuándo se incluya.

Por ejemplo, cambia `unitPrice: 65` para actualizar el precio referencial del impermeabilizante. Las cantidades se calculan dividiendo la medida entre `coverage` y redondeando siempre hacia arriba.

## Cómo cambiar el número de WhatsApp

Al inicio de `script.js`, edita `WHATSAPP_NUMBER`. Escríbelo en formato internacional, solo con números: código de país y número, sin `+`, espacios ni guiones. Por ejemplo, para Perú se empieza con `51`.

## Precios

Los precios y rendimientos incluidos son datos de ejemplo. Confirma stock, medidas y precio final con la ferretería antes de comprar.
