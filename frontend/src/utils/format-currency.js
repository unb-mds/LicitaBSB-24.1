export default function formatCurrency(valor) {
  let valorNumerico;

  if (typeof valor === 'string') {
    valorNumerico = parseFloat(valor);
  } else {
    valorNumerico = parseFloat(valor[0].replace(".", ","));
  }

  if (isNaN(valorNumerico)) {
    return valor;
  }

  return valorNumerico
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace('R$', '')
    .trim();
}
