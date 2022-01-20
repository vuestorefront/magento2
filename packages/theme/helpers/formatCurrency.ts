const formatCurrency = (value: number | string, locale: string, options: Intl.NumberFormatOptions): string => {
  if (typeof value === 'string') {
    // eslint-disable-next-line no-param-reassign
    value = Number(value);
  }
  // eslint-disable-next-line no-param-reassign

  return new Intl.NumberFormat(locale, { style: 'currency', ...options }).format(value);
};

export default formatCurrency;
