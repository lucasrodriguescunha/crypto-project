export default async function handler(req, res) {
  const { id } = req.query;

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=brl&days=7`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar gráfico' });
  }
}