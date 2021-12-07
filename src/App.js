import './App.css';
import { Routes, Route } from 'react-router-dom';
import Orders from './Orders';
import View from './View';
import Customer from './Customer';

function App() {
  return (
    <div className="App">
      <View />
      <Routes>
        <Route path="/employee" element={<Orders />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/" element={<Customer />} />
      </Routes>
    </div>
  );
}

export default App;
