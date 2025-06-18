import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Carrito from './Carrito';
import Login from './Login'; // ✅ Importar Login

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">TrasherBox</div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Ruta funcional */}
      </Routes>
    </div>
  );
}

export default App;
