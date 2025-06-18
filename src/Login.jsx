import { useState } from 'react';
import './Login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías validar credenciales contra un backend más adelante
    if (correo && clave) {
      setLogueado(true);
    }
  };

  if (logueado) {
    return (
      <section className="login-container">
        <h2>Bienvenido</h2>
        <p>Has iniciado sesión correctamente como <strong>{correo}</strong>.</p>
      </section>
    );
  }

  return (
    <section className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

export default Login;
