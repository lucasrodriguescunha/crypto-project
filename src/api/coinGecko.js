const BASE_URL = '/api';
const cache = new Map();

export const fetchCryptos = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (!response.ok) {
    throw new Error('Falha ao obter criptomoedas.');
  }

  return await response.json();
};

export const fetchCoinData = async (id) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Limite de requisições excedido. Tente novamente em alguns segundos.');
    }
    throw new Error('Falha ao obter criptomoeda.');
  }

  const data = await response.json();
  cache.set(id, data);

  return data;
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=brl&days=7`
  );
  if (!response.ok) {
    throw new Error('Falha ao obter criptomoedas.');
  }
  return response.json();
};