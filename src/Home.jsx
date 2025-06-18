import './App.css';
import './Home.css';
import QuoteForm from './QuoteForm';
import { useContext, useState } from 'react';
import { CarritoContext } from './context/CarritoContext';

function Home() {
  const { agregarProducto } = useContext(CarritoContext);
  const [cantidades, setCantidades] = useState({});

  const productos = [
    { nombre: 'Caja pequeña', precio: 1500 },
    { nombre: 'Caja mediana', precio: 2000 },
    { nombre: 'Caja grande', precio: 3000 },
  ];

  // Validar que la cantidad sea al menos 1 y numérica
  const handleAgregar = (producto) => {
    const cantidad = cantidades[producto.nombre] || 1;
    const cantidadSegura = Math.max(1, parseInt(cantidad));
    agregarProducto({ ...producto, cantidad: cantidadSegura });
  };

  const handleCantidadChange = (nombre, valor) => {
    const cantidad = parseInt(valor);
    setCantidades({ ...cantidades, [nombre]: isNaN(cantidad) ? 1 : cantidad });
  };

  return (
    <>
      <section className="hero home-hero">
        <div className="hero-text">
          <h1>Encuentra la caja perfecta</h1>
          <p>Diseñadas para adaptarse a tus necesidades. Rápido, seguro y personalizado.</p>
          <a href="#productos" className="btn-ver">Ver Productos</a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1602524202210-7e2e7f8e1d1b"
            alt="almacén"
          />
        </div>
      </section>

      <section className="productos main-container" id="productos">
        <h2>Nuestros Productos</h2>
        <div className="producto-lista">
          {productos.map((prod) => (
            <div className="producto-card" key={prod.nombre}>
              <img src="https://via.placeholder.com/300x200" alt={prod.nombre} />
              <h3>{prod.nombre}</h3>
              <p>Desde ${prod.precio}</p>
              <input
                type="number"
                min="1"
                value={cantidades[prod.nombre] || 1}
                onChange={(e) => handleCantidadChange(prod.nombre, e.target.value)}
              />
              <button onClick={() => handleAgregar(prod)}>Agregar al carrito</button>
            </div>
          ))}
        </div>
      </section>

      <QuoteForm />
    </>
  );
}

export default Home;
