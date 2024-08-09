export default function formatCurrency(valor) {
  let valorNumerico;

  if (Array.isArray(valor)) {
    valorNumerico = parseFloat(valor[0]);
  } else {
    valorNumerico = parseFloat(valor);
  }

  return valorNumerico
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .trim();
}
