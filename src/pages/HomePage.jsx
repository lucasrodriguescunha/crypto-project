import { useEffect } from 'react';
import { fetchCryptos } from '../api/coinGecko';

export const HomePage = () => {
  const fetchCryptoData = async () => {
    const data = await fetchCryptos();
    console.log(data);
  }

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div>This is the home page</div>
  );
}