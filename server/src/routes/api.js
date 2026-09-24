// server/src/routes/api.js
import { Router } from 'express';
import { getStoryNarrative } from '../controllers/storyController.js';
import {
  getSenales,
  getSenalById,
  createSenal,
  softDeleteSenal,
  restoreSenal,
  getActores,
  getFuentes
} from '../controllers/senalesController.js';
import { getCausalGraph } from '../controllers/causalController.js';
import { runSimulation } from '../controllers/simulatorController.js';
import { exportPolymorphicArtifacts } from '../controllers/exportController.js';
import {
  validateCreateSenal,
  validateSimulation,
  validateIdParam
} from '../middlewares/validator.js';

const router = Router();

// 1. Narrativa Estratégica (Storytelling)
router.get('/story', getStoryNarrative);

// 2. Ingesta y Señales Dispersas (CRUD con Relaciones y Eliminación Lógica)
router.get('/senales', getSenales);
router.get('/senales/:id', validateIdParam, getSenalById);
router.post('/senales', validateCreateSenal, createSenal);
router.delete('/senales/:id', validateIdParam, softDeleteSenal); // Soft Delete
router.patch('/senales/:id/restore', validateIdParam, restoreSenal); // Restaurar Soft Delete

// Relaciones Complementarias
router.get('/actores', getActores);
router.get('/fuentes', getFuentes);

// 3. Grafo Causal Relacional
router.get('/causal', getCausalGraph);

// 4. Simulador Socioeconómico 'What-If'
router.post('/simulador', validateSimulation, runSimulation);

// 5. Exportación Polimórfica Adaptativa
router.post('/exportar', exportPolymorphicArtifacts);

export default router;
