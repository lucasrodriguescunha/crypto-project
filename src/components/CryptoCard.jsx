import { formatPrice } from '../utils/formatPrice';
import { formatMarketCap } from '../utils/formatPrice';

export const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <article
      className="crypto-card"
      aria-label={`Informações da criptomoeda ${crypto.name}`}
    >
      <header className="crypto-header">
        <div className="crypto-info">
          <img
            src={crypto.image}
            alt={`Logo da criptomoeda ${crypto.name}`}
          />

          <div>
            <h3>{crypto.name}</h3>

            <p className="symbol" aria-label="Símbolo da criptomoeda">
              {crypto.symbol.toUpperCase()}
            </p>

            <span
              className="rank"
              aria-label={`Posição no ranking: ${crypto.market_cap_rank}`}
            >
              #{crypto.market_cap_rank}
            </span>
          </div>
        </div>
      </header>

      <section
        className="crypto-price"
        aria-label="Preço e variação nas últimas 24 horas"
      >
        <p className="price">
          {formatPrice(crypto.current_price)}
        </p>

        <p
          className={`change ${isPositive ? 'positive' : 'negative'}`}
          aria-label={
            isPositive
              ? `Alta de ${Math.abs(crypto.price_change_percentage_24h).toFixed(2)} por cento nas últimas 24 horas`
              : `Queda de ${Math.abs(crypto.price_change_percentage_24h).toFixed(2)} por cento nas últimas 24 horas`
          }
        >
          <span aria-hidden="true">
            {isPositive ? '↑' : '↓'}
          </span>{' '}
          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
        </p>
      </section>

      <section
        className="crypto-stats"
        aria-label="Estatísticas da criptomoeda"
      >
        <dl className="stat">
          <dt className="stat-label">Capitalização de mercado</dt>
          <dd className="stat-value">
            R$ {formatMarketCap(crypto.market_cap)}
          </dd>
        </dl>

        <dl className="stat">
          <dt className="stat-label">Volume</dt>
          <dd className="stat-value">
            R$ {formatMarketCap(crypto.total_volume)}
          </dd>
        </dl>
      </section>
    </article>
  );
};
