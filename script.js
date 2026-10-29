// Número de WhatsApp de la ferretería en formato internacional, sin espacios ni símbolos.
const WHATSAPP_NUMBER = '51999999999';

// Lista de productos de ejemplo: edita aquí nombres, rendimientos y precios.
// Rendimiento indica cada cuántos m² o metros lineales se necesita una unidad.
const PRODUCTS = [
  { id: 'waterproofing', name: 'Impermeabilizante para techos (galón)', coverage: 4, unitPrice: 65, unit: 'galón', appliesTo: 'todos' },
  { id: 'sealer', name: 'Sellador para grietas (tubo)', coverage: 15, unitPrice: 18, unit: 'tubo', appliesTo: 'todos' },
  { id: 'gutter', name: 'Canaleta de PVC (tramo de 3 m)', coverage: 3, unitPrice: 32, unit: 'tramo', appliesTo: 'canaleta' },
  { id: 'reinforcement', name: 'Cinta de refuerzo (rollo de 10 m)', coverage: 20, unitPrice: 28, unit: 'rollo', appliesTo: 'calamina' }
];

// Referencias a los elementos de la página.
const quoteForm = document.querySelector('#quote-form');
const roofAreaInput = document.querySelector('#roof-area');
const roofTypeInput = document.querySelector('#roof-type');
const gutterLengthInput = document.querySelector('#gutter-length');
const roofError = document.querySelector('#roof-error');
const quoteResult = document.querySelector('#quote-result');
const productsList = document.querySelector('#products-list');
const quoteTotal = document.querySelector('#quote-total');
const whatsappButton = document.querySelector('#whatsapp-button');

// Convierte coma o punto decimal a un número. Los campos vacíos se devuelven como cero.
function readDecimal(value) {
  const cleaned = value.trim().replace(',', '.');
  if (cleaned === '') return 0;
  return Number(cleaned);
}

// Presenta los importes en soles con dos decimales.
function formatSoles(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

// Calcula unidades enteras hacia arriba y arma las filas de productos de la cotización.
function buildQuote(roofArea, roofType, gutterLength) {
  const rows = [];

  PRODUCTS.forEach((product) => {
    let measuredAmount = 0;
    if (product.appliesTo === 'todos') measuredAmount = roofArea;
    if (product.appliesTo === 'canaleta') measuredAmount = gutterLength;
    if (product.appliesTo === 'calamina') measuredAmount = roofType === 'calamina' ? roofArea : 0;
    if (measuredAmount <= 0) return;

    const quantity = Math.ceil(measuredAmount / product.coverage);
    rows.push({ ...product, quantity, subtotal: quantity * product.unitPrice });
  });

  return { rows, total: rows.reduce((sum, row) => sum + row.subtotal, 0) };
}

// Dibuja la tabla y prepara el mensaje de WhatsApp con los datos calculados.
function showQuote(roofArea, roofType, quote) {
  productsList.replaceChildren();

  quote.rows.forEach((product) => {
    const row = document.createElement('tr');
    [product.name, `${product.quantity} ${product.unit}${product.quantity === 1 ? '' : 's'}`, formatSoles(product.unitPrice), formatSoles(product.subtotal)].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    productsList.append(row);
  });

  quoteTotal.textContent = formatSoles(quote.total);
  const roofTypeLabel = roofType === 'calamina' ? 'Calamina' : 'Concreto';
  const productLines = quote.rows.map((product) => `- ${product.name}: ${product.quantity} ${product.unit}${product.quantity === 1 ? '' : 's'}`);
  const message = [
    'Hola Jorge, quiero mi Kit anti lluvias:',
    `- Techo: ${roofArea} m²`,
    `- Tipo de techo: ${roofTypeLabel}`,
    ...productLines,
    `- Total referencial: ${formatSoles(quote.total)}`
  ].join('\n');
  whatsappButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  quoteResult.hidden = false;
}

// Valida los m² y, si son correctos, calcula y muestra la cotización.
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const roofArea = readDecimal(roofAreaInput.value);

  if (!Number.isFinite(roofArea) || roofArea <= 0) {
    roofError.hidden = false;
    roofAreaInput.setAttribute('aria-invalid', 'true');
    roofAreaInput.focus();
    quoteResult.hidden = true;
    return;
  }

  roofError.hidden = true;
  roofAreaInput.removeAttribute('aria-invalid');

  const gutterLength = readDecimal(gutterLengthInput.value);
  const validGutterLength = Number.isFinite(gutterLength) && gutterLength > 0 ? gutterLength : 0;
  const quote = buildQuote(roofArea, roofTypeInput.value, validGutterLength);
  showQuote(roofArea, roofTypeInput.value, quote);
});

// Oculta el aviso de error mientras la persona corrige los metros del techo.
roofAreaInput.addEventListener('input', () => {
  if (!roofError.hidden) {
    roofError.hidden = true;
    roofAreaInput.removeAttribute('aria-invalid');
  }
});
