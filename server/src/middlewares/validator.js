// server/src/middlewares/validator.js
import { body, param, query, validationResult } from 'express-validator';

// Middleware que intercepta y formatea los errores de validación de express-validator
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación en la solicitud',
      errors: errors.array().map(err => ({
        campo: err.path || err.param,
        mensaje: err.msg,
        valorRecibido: err.value
      }))
    });
  }
  next();
};

// Validaciones para Crear Señal Dispersa
export const validateCreateSenal = [
  body('actorId')
    .trim()
    .notEmpty()
    .withMessage('El actorId es obligatorio y debe vincularse a un actor existente'),
  body('fuenteId')
    .trim()
    .notEmpty()
    .withMessage('La fuenteId es obligatoria y debe corresponder a un canal de datos'),
  body('contenido')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('El contenido debe contener entre 10 y 500 caracteres para análisis causal'),
  body('severidad')
    .optional()
    .isIn(['baja', 'media', 'alta', 'critica'])
    .withMessage('La severidad debe ser una de: baja, media, alta, critica'),
  body('impactoARS')
    .optional()
    .isNumeric()
    .withMessage('El impacto económico debe ser un valor numérico'),
  handleValidationErrors
];

// Validaciones para Simulación What-If
export const validateSimulation = [
  body('tasaCompraColectiva')
    .isFloat({ min: 0, max: 100 })
    .withMessage('La tasa de compra colectiva debe ser un porcentaje entre 0 y 100'),
  body('fondoGarantia')
    .isFloat({ min: 0, max: 10000000 })
    .withMessage('El fondo de garantía rotatorio debe ser entre $0 y $10.000.000 ARS'),
  body('subsidioMunicipal')
    .isFloat({ min: 0, max: 100 })
    .withMessage('El desbloqueo de subsidio municipal debe ser entre 0 y 100%'),
  handleValidationErrors
];

// Validación de ID en parámetros de ruta
export const validateIdParam = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID en el parámetro de ruta es requerido'),
  handleValidationErrors
];
