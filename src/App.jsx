import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CoinDetailsPage } from './pages/CoinDetailsPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/coin/:id' element={<CoinDetailsPage />} />
    </Routes>
  );
}

export default App;
