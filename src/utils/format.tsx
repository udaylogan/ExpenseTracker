export const formatCurrency = (value: number) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
