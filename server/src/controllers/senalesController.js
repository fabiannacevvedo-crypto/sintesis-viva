// server/src/controllers/senalesController.js
import { db } from '../models/db.js';

export const getSenales = (req, res) => {
  const includeDeleted = req.query.includeDeleted === 'true';
  const senales = db.getAllSenales(includeDeleted);
  res.json({
    success: true,
    total: senales.length,
    includeDeleted,
    data: senales
  });
};

export const getSenalById = (req, res) => {
  const { id } = req.params;
  const includeDeleted = req.query.includeDeleted === 'true';
  const senal = db.getSenalById(id, includeDeleted);

  if (!senal) {
    return res.status(404).json({
      success: false,
      message: `Señal con ID '${id}' no encontrada o fue eliminada lógicamente`
    });
  }

  res.json({ success: true, data: senal });
};

export const createSenal = (req, res) => {
  const { actorId, fuenteId, contenido, tono, severidad, impactoARS } = req.body;

  // Validar existencia de relaciones
  const actor = db.getActorById(actorId);
  if (!actor) {
    return res.status(400).json({
      success: false,
      message: `El actorId '${actorId}' no existe en la base relacional`
    });
  }

  const fuentes = db.getAllFuentes(true);
  const fuente = fuentes.find(f => f.id === fuenteId);
  if (!fuente) {
    return res.status(400).json({
      success: false,
      message: `La fuenteId '${fuenteId}' no existe en la base relacional`
    });
  }

  const nuevaSenal = db.createSenal({
    actorId,
    fuenteId,
    contenido,
    tono,
    severidad,
    impactoARS
  });

  res.status(201).json({
    success: true,
    message: 'Señal territorial registrada y vinculada relacionalmente con éxito',
    data: nuevaSenal
  });
};

// ELIMINACIÓN LÓGICA (Soft Delete)
export const softDeleteSenal = (req, res) => {
  const { id } = req.params;
  const eliminada = db.softDeleteSenal(id);

  if (!eliminada) {
    return res.status(404).json({
      success: false,
      message: `No se pudo eliminar: La señal '${id}' no existe o ya está eliminada lógicamente`
    });
  }

  res.json({
    success: true,
    message: `Señal '${id}' eliminada lógicamente con éxito (isDeleted: true). Se conserva en auditoría.`,
    data: eliminada
  });
};

// RESTAURACIÓN DE ELIMINACIÓN LÓGICA
export const restoreSenal = (req, res) => {
  const { id } = req.params;
  const restaurada = db.restoreSenal(id);

  if (!restaurada) {
    return res.status(404).json({
      success: false,
      message: `No se pudo restaurar: La señal '${id}' no se encuentra en la papelera lógica`
    });
  }

  res.json({
    success: true,
    message: `Señal '${id}' restaurada con éxito (isDeleted: false)`,
    data: restaurada
  });
};

// Relaciones: Listar Actores
export const getActores = (req, res) => {
  res.json({ success: true, data: db.getAllActores() });
};

// Relaciones: Listar Fuentes
export const getFuentes = (req, res) => {
  res.json({ success: true, data: db.getAllFuentes() });
};
