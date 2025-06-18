import { useContext, useState } from 'react';
import { CarritoContext } from './context/CarritoContext';
import { AuthContext } from './context/AuthContext';
import './Pago.css';

function Pago() {
  const { usuario } = useContext(AuthContext);
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState(usuario || '');
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  if (!usuario) {
    return (
      <section style={{ padding: '2rem' }}>
        <h2>Proceso de Pago</h2>
        <p>Debes iniciar sesión para completar el pago.</p>
      </section>
    );
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías enviar los datos a una base de datos o backend
    // En producción se enviaría la información del pedido al servidor

    setPedidoEnviado(true);
    vaciarCarrito();
  };

  if (pedidoEnviado) {
    return (
      <section style={{ padding: '2rem' }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Te hemos enviado un correo con los detalles del pedido.</p>
      </section>
    );
  }

  return (
    <section className="pago-container" style={{ padding: '2rem' }}>
      <h2>Proceso de Pago</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <label>Nombre completo:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Dirección de entrega:</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

        <label>Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          readOnly={!!usuario}
        />

        <button type="submit">Confirmar Pedido</button>
      </form>

      <div>
        <h3>Resumen del Carrito</h3>
        {carrito.length === 0 ? (
          <p>No hay productos en tu carrito.</p>
        ) : (
          <ul>
            {carrito.map((item) => (
              <li key={item.nombre}>
                {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
        )}
        <p><strong>Total a pagar:</strong> ${total}</p>
      </div>
    </section>
  );
}

export default Pago;
