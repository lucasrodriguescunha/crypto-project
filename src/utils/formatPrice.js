export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: price < 0.01 ? 8 : 2,
    maximumFractionDigits: price < 0.01 ? 8 : 2,
  }).format(price);
};

export const formatMarketCap = (marketCap) => {
  if (marketCap === null || marketCap === undefined) {
    return '—';
  }

  if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;

  return marketCap.toLocaleString('pt-BR');
};

