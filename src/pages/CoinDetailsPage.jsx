import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchChartData, fetchCoinData } from '../api/coinGecko';
import { formatMarketCap, formatPrice } from '../utils/formatPrice';
import { Footer } from '../components/Footer';
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip
} from 'recharts';
import { MoveLeft, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

export const CoinDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCoinData = async () => {
      try {
        const data = await fetchCoinData(id);
        setCoin(data);
      } catch (err) {
        console.error('Falha ao obter criptomoeda', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoinData();
  }, [id]);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const data = await fetchChartData(id);
        const formatData = data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
          }),
          price: price[1].toFixed(2),
        }));

        setChartData(formatData);
      } catch (err) {
        console.error('Falha ao obter criptomoeda', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChartData();
  }, [id]);

  if (isLoading) {
    return (
      <div className='app'>
        <section className='loading' aria-live='polite'>
          <div className='spinner' />
          <p>Carregando dados de criptomoedas...</p>
        </section>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className='app'>
        <section className='no-results'>
          <p>Criptomoeda não encontrada.</p>
          <button
            onClick={() => navigate('/')}
            className='back-button'
          >
            &#8592; Voltar
          </button>
        </section>
      </div>
    );
  }

  const priceChange = coin.market_data.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <main className='app'>
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <h1>
              Visão Cripto
            </h1>
            <p>Preços e dados de mercado de criptomoedas em tempo real</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className='back-button'
          >
            &#8592; Voltar à lista
          </button>
        </div>
      </header>

      <section className='coin-detail'>
        <header className='coin-header'>
          <div className='coin-title'>
            <img
              src={coin.image.large}
              alt={`Logo da criptomoeda ${coin.name}`}
            />
            <div>
              <h1>{coin.name}</h1>
              <p className='symbol'>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <span className='rank'>
            Ranking #{coin.market_data.market_cap_rank}
          </span>
        </header>

        <section
          className='coin-price-section'
          aria-label='Preço e variação nas últimas 24 horas'
        >
          <div className='current-price'>
            <h2>
              {formatPrice(
                coin.market_data.current_price.brl
              )}
            </h2>

            <span
              className={`change-badge ${isPositive ? 'positive' : 'negative'
                }`}
              aria-label={
                isPositive
                  ? `Alta de ${Math.abs(priceChange).toFixed(
                    2
                  )} por cento nas últimas 24 horas`
                  : `Queda de ${Math.abs(priceChange).toFixed(
                    2
                  )} por cento nas últimas 24 horas`
              }
            >
              <span aria-hidden='true'>
                {isPositive ? <ArrowUp /> : <ArrowDown />}
              </span>{' '}
              {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>

          <div className='price-ranges'>
            <div className='price-range'>
              <span className='range-label'>Alta de 24 horas</span>
              <span className='range-value'>
                {formatPrice(coin.market_data.high_24h.brl)}
              </span>
            </div>

            <div className='price-range'>
              <span className='range-label'>Baixa de 24 horas</span>
              <span className='range-value'>
                {formatPrice(coin.market_data.low_24h.brl)}
              </span>
            </div>
          </div>
        </section>

        <div className='chart-section'>
          <h3>Gráfico de preços (7 dias)</h3>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='rgba(255, 255, 255, 0.1)'
              />

              <XAxis
                dataKey='time'
                stroke='#9ca3af'
                style={{ fontSize: '12px' }}
              />

              <YAxis
                stroke='#9ca3af'
                style={{ fontSize: '12px' }}
                domain={['auto', 'auto']}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#e0e0e0'
                }}
              />

              <Line
                type='monotone'
                dataKey='price'
                stroke='#add8e6'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='stats-grid'>
          <div className='stat-card'>
            <span className='stat-label'>Capitalização de mercado</span>
            <span className='stat-value'>
              R$ {formatMarketCap(coin.market_data.market_cap.brl)}
            </span>
          </div>

          <div className='stat-card'>
            <span className='stat-label'>Volume negociado (24h)</span>
            <span className='stat-value'>
              R$ {formatMarketCap(coin.market_data.total_volume.brl)}
            </span>
          </div>

          <div className='stat-card'>
            <span className='stat-label'>Suprimento circulante</span>
            <span className='stat-value'>
              {coin.market_data.circulating_supply?.toLocaleString() || 'N/A'}
            </span>
          </div>

          <div className='stat-card'>
            <span className='stat-label'>Suprimento total</span>
            <span className='stat-value'>
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
