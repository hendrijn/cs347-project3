import './App.css';
import { Routes, Route } from 'react-router-dom';
import Orders from './Orders';
import View from './View';

function App() {
  return (
    <div className="App">
      <View />
      <Routes>
        <Route path="/" element={<Orders />} />
        {/* <Route path="/albums/:artist" element={<Albums />} />
        <Route path="/tracks/:artist/:album" element={<Tracks />} /> */}
      </Routes>
    </div>
  );
}

export default App;
