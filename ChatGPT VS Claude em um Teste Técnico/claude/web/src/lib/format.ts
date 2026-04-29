/**
 * Locale-aware money formatter. Defaults to BRL since this is a Brazilian
 * market test, but it accepts any ISO currency code.
 */
export const formatCurrency = (
  value: number,
  currency = 'BRL',
  locale = 'pt-BR',
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);

export const formatDate = (
  isoDate: string,
  locale = 'pt-BR',
): string =>
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
