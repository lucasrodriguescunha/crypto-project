import { useState, useEffect } from 'react';
import { fetchCryptos } from '../api/coinGecko';
import { CryptoCard } from '../components/CryptoCard';
import { Footer } from '../components/Footer';
import { useFilteredCryptos } from '../hooks/useFilteredCryptos';
import { useSortedCryptos } from '../hooks/useSortedCryptos';
import { Rocket, Grid2x2, List } from 'lucide-react';

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
            <h1>
              Visão Cripto
            </h1>
            <p>Preços e dados de mercado de criptomoedas em tempo real</p>{' '}
          </div>

          <form className='search-section' role='search'>
            <input
              type='text'
              placeholder='Buscar criptomoedas'
              className='search-input'
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
            />
          </form>
        </div>
      </header>

      <div className='controls' aria-label='Controles de visualização'>
        <form className='filter-group'>
          <label>Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value='market_cap_rank'>Ranking</option>
            <option value='name'>Nome</option>
            <option value='price'>Preço (do mais baixo ao mais alto)</option>
            <option value='price_desc'>
              Preço (do mais alto para o mais baixo)
            </option>
            <option value='change'>Variação em 24 horas</option>
            <option value='market_cap'>Capitalização de mercado</option>
          </select>
        </form>

        <div className='view-toggle'>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            <Grid2x2 />
          </button>

          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <List />
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

      <Footer />
    </main>
  );
};
