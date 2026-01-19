import { useMemo } from 'react';

export const useSortedCryptos = (cryptos, sortBy) => {
  return useMemo(() => {
    return [...cryptos].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.current_price - b.current_price;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'change':
          return (
            a.price_change_percentage_24h -
            b.price_change_percentage_24h
          );
        case 'market_cap':
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });
  }, [cryptos, sortBy]);
};
