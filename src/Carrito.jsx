import './Carrito.css';
import { useContext } from 'react';
import { CarritoContext } from './context/CarritoContext';
import { Link } from 'react-router-dom';

function Carrito() {
  const {
    carrito,
    eliminarProducto,
    vaciarCarrito,
    cambiarCantidad
  } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <section className="main-container carrito-container">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <img
            src="https://i.imgur.com/MT5QUBx.png"
            alt="Carrito vacío"
          />
          <p>Tu carrito está vacío.</p>
        </div>
      ) : (
        <>
          <div className="carrito-lista">
            {carrito.map((item) => (
              <div className="carrito-card" key={item.nombre}>
                <img
                  src="https://via.placeholder.com/150?text=Caja"
                  alt={item.nombre}
                />
                <h3>{item.nombre}</h3>
                <p>${item.precio}</p>
                <div className="cantidad-controls">
                  <button onClick={() => cambiarCantidad(item.nombre, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => cambiarCantidad(item.nombre, 1)}>+</button>
                </div>
                <p>Total: ${item.precio * item.cantidad}</p>
                <button onClick={() => eliminarProducto(item.nombre)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="carrito-total">
            <p>
              <strong>Total:</strong> ${total}
            </p>

            <div className="acciones">
              <button onClick={vaciarCarrito}>Vaciar Carrito</button>

              <Link to="/">
                <button>Seguir Comprando</button>
              </Link>

              <Link to="/pago">
                <button>Ir a Pagar</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
