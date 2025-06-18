import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { CarritoContext } from './context/CarritoContext';
import './QuoteForm.css';

function QuoteForm() {
  const { usuario } = useContext(AuthContext);
  const { carrito } = useContext(CarritoContext);
  const [tipo, setTipo] = useState('natural');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState(usuario || '');
  const [dimensiones, setDimensiones] = useState('');
  const [cotizaciones, setCotizaciones] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert('Debes iniciar sesión para enviar la cotización');
      return;
    }

    if (carrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    const nuevaCotizacion = {
      tipo,
      nombre,
      rut,
      correo,
      dimensiones,
      carrito,
    };

    try {
      const resp = await fetch('http://localhost:3001/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCotizacion),
      });

      if (resp.ok) {
        alert('Cotización enviada');
        setCotizaciones([...cotizaciones, nuevaCotizacion]);
        setNombre('');
        setRut('');
        setCorreo(usuario || '');
        setDimensiones('');
      } else {
        alert('Error al enviar la cotización');
      }
    } catch {
      alert('No se pudo conectar con el servidor');
    }
  };

  // 👉 Formatea y limita el RUT (ej: 19342283-K)
  const handleRutChange = (e) => {
    let input = e.target.value
      .replace(/[^0-9kK]/g, '') // solo números y letra k/K
      .toUpperCase(); // convierte a mayúscula

    // Limita a máximo 8 números + 1 DV (9 caracteres antes de formatear)
    if (input.length > 9) {
      input = input.slice(0, 9);
    }

    // Aplica formato con guión
    if (input.length > 1) {
      const cuerpo = input.slice(0, -1);
      const dv = input.slice(-1);
      input = `${cuerpo}-${dv}`;
    }

    setRut(input);
  };

  if (!usuario) {
    return (
      <section className="formulario-cotizacion">
        <h2>Solicitar Cotización</h2>
        <p>Debes iniciar sesión para enviar una cotización.</p>
      </section>
    );
  }

  return (
    <section className="formulario-cotizacion">
      <h2>Solicitar Cotización</h2>
      <form onSubmit={handleSubmit}>
        <label>Tipo de cliente:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="natural">Persona Natural</option>
          <option value="empresa">Empresa</option>
        </select>

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>RUT:</label>
        <input
          type="text"
          value={rut}
          onChange={handleRutChange}
          required
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          readOnly={!!usuario}
        />

        <label>Dimensiones del producto (opcional):</label>
        <input
          type="text"
          value={dimensiones}
          onChange={(e) => setDimensiones(e.target.value)}
        />

        <button type="submit">Enviar Cotización</button>
      </form>

      {cotizaciones.length > 0 && (
        <div className="tabla-cotizaciones">
          <h3>Cotizaciones Recibidas</h3>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>RUT</th>
                <th>Correo</th>
                <th>Dimensiones</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((c, index) => (
                <tr key={index}>
                  <td>{c.tipo}</td>
                  <td>{c.nombre}</td>
                  <td>{c.rut}</td>
                  <td>{c.correo}</td>
                  <td>{c.dimensiones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default QuoteForm;
