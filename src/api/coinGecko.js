const BASE_URL = '/api';

export const fetchCryptos = async () => {
  const response = await fetch(`${BASE_URL}/coins/markets`);
  if (!response.ok) throw new Error('Erro');
  return response.json();
};

export const fetchCoinData = async (id) => {
  const response = await fetch(`${BASE_URL}/coins/${id}`);
  if (!response.ok) throw new Error('Erro');
  return response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(`${BASE_URL}/coins/${id}/market_chart`);
  if (!response.ok) throw new Error('Erro');
  return response.json();
};
