import formatCurrency from '~/helpers/formatCurrency';

describe('formatCurrency()', () => {
  it('executed without required options should throw error', () => {
    expect(() => { formatCurrency(100, 'en-US', {}); }).toThrowError();
  });

  it('should return formatted currency string', () => {
    const currency = 'EUR';
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
      format: (value) => `${value}${currency}`,
    }));
    const result = formatCurrency(123, 'de-DE', { currency });
    expect(result).toBe('123EUR');
  });
});
