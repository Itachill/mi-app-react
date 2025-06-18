import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './Login.css';

function Login() {
  const { usuario, login } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías validar credenciales contra un backend más adelante
    if (correo && clave) {
      login(correo);
    }
  };

  if (usuario) {
    return (
      <section className="main-container login-container">
        <h2>Bienvenido</h2>
        <p>Has iniciado sesión correctamente como <strong>{usuario}</strong>.</p>
      </section>
    );
  }

  return (
    <section className="main-container login-container">
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
