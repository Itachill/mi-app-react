const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta para guardar cotización
app.post('/api/cotizacion', (req, res) => {
  const cotizacion = req.body;
  const archivo = './backend/db.json';

  let data = [];
  if (fs.existsSync(archivo)) {
    data = JSON.parse(fs.readFileSync(archivo));
  }

  data.push(cotizacion);
  fs.writeFileSync(archivo, JSON.stringify(data, null, 2));

  res.status(200).json({ mensaje: 'Cotización guardada con éxito' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
