import './App.css';
import Home from './components/screens/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/screens/Login.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Signup from './components/screens/Signup.js';
import CartProvider from './components/ContextReducer.js';
import Orders from './components/screens/Orders.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/myOrder' element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
