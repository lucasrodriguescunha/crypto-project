import { useMemo } from 'react';

export const useFilteredCryptos = (cryptos, searchQuery) => {
  return useMemo(() => {
    if (!searchQuery) return cryptos;

    return cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cryptos, searchQuery]);
};
