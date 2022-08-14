import './App.css';

import { Routes, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';

function App() {
  return (
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} exact />
          <Route path="/coins/:id" element={<CoinPage/>} />
        </Routes>
      </div>
  );
}

export default App;
