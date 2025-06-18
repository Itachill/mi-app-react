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
    <section className="carrito-container">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.nombre}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                    <button onClick={() => cambiarCantidad(item.nombre, -1)}>-</button>
                    <span style={{ margin: '0 8px' }}>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.nombre, 1)}>+</button>
                  </td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <button onClick={() => eliminarProducto(item.nombre)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-total">
            <p><strong>Total:</strong> ${total}</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={vaciarCarrito}>Vaciar Carrito</button>

              <Link to="/">
                <button>Seguir Comprando</button>
              </Link>

              <Link to="/pago">
                <button style={{ backgroundColor: '#28a745', color: 'white' }}>
                  Ir a Pagar
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
