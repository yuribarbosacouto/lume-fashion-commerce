export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function installmentLabel(value: number) {
  const installment = value / 5;
  return `5x de ${formatCurrency(installment)} sem juros`;
}
