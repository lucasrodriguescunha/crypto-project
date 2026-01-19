import { useState, useEffect } from 'react';
import { fetchCryptos } from '../api/coinGecko';
import { CryptoCard } from '../components/CryptoCard';

export const HomePage = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      setCryptoList(data);
    } catch (err) {
      console.error('Falha ao obter criptomoedas', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='app'>
      {isLoading ? (
        <section className='loading' aria-live='polite'>
          <div className='spinner' />
          <p>Carregando dados de criptomoedas...</p>
        </section>
      ) : (
        <section
          className='crypto-container'
          aria-label='Lista de criptomoedas'
        >
          {cryptoList.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
            />
          ))}
        </section>
      )}
    </main>
  );
};