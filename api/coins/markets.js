export default async function handler(req, res) {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets' +
    '?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar criptomoedas' });
  }
}
