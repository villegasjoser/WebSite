const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Rutas de archivos
const JSON_PATH = path.join(__dirname, '../Data/adventures.json');

app.use(cors());
app.use(express.json());

// Permitir servir la carpeta raíz (para acceder a /Images, /Data, etc.)
app.use(express.static(path.join(__dirname, '..')));

// Obtener experiencias
app.get('/api/aventuras', (req, res) => {
  fs.readFile(JSON_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer el archivo' });
    res.json(JSON.parse(data || '[]'));
  });
});

// Guardar experiencias
app.post('/api/aventuras', (req, res) => {
  const nuevasAventuras = req.body;
  fs.writeFile(JSON_PATH, JSON.stringify(nuevasAventuras, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar datos' });
    res.json({ message: 'Archivo JSON actualizado con éxito' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/Admin/index.html`);
});