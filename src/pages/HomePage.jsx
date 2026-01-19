import { useState, useEffect } from 'react';
import { fetchCryptos } from '../api/coinGecko';
import { CryptoCard } from '../components/CryptoCard';
import { useFilteredCryptos } from '../hooks/useFilteredCryptos';
import { useSortedCryptos } from '../hooks/useSortedCryptos';

export const HomePage = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCryptos()
      .then(setCryptoList)
      .catch((err) =>
        console.error('Falha ao obter criptomoedas', err)
      )
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCryptos = useFilteredCryptos(cryptoList, searchQuery);
  const sortedCryptos = useSortedCryptos(filteredCryptos, sortBy);

  return (
    <main className='app'>
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <h1>🚀 Rastreador de Criptomoedas</h1>
            <p>Preços e dados de mercado de criptomoedas em tempo real</p>
          </div>
          <div className='search-section'>
            <input
              type='text'
              placeholder='Buscar criptomoedas'
              className='search-input'
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
            />
          </div>
        </div>
      </header>

      <div className='controls'>
        <div className='filter-group'>
          <label>Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value='market_cap_rank'>Classificação</option>
            <option value='name'>Nome</option>
            <option value='price'>Preço (do mais baixo ao mais alto)</option>
            <option value='price_desc'>
              Preço (do mais alto para o mais baixo)
            </option>
            <option value='change'>Alteração em 24 horas</option>
            <option value='market_cap'>Capitalização de mercado</option>
          </select>
        </div>

        <div className='view-toggle'>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grade
          </button>

          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            Lista
          </button>
        </div>
      </div>

      {isLoading ? (
        <section className='loading' aria-live='polite'>
          <div className='spinner' />
          <p>Carregando dados de criptomoedas...</p>
        </section>
      ) : (
        <section
          className={`crypto-container ${viewMode}`}
          aria-label='Lista de criptomoedas'
        >
          {sortedCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </section>
      )}

      <footer className='footer'>
        <p>
          Dados fornecidos pela API do CoinGecko • Atualizados a cada 30
          segundos.
        </p>
      </footer>
    </main>
  );
};
