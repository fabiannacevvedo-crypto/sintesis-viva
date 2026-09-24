// server/src/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', apiRoutes);

// Servir frontend compilado de React si existe
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Síntesis Viva API',
    stack: 'Node.js + Express + Express-Validator',
    features: ['Eliminación Lógica (Soft Delete)', 'Relaciones entre Modelos', 'Simulador What-If']
  });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express de Síntesis Viva corriendo en http://localhost:${PORT}`);
});
