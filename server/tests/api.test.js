// server/tests/api.test.js
import test from 'node:test';
import assert from 'node:assert';
import { db } from '../src/models/db.js';

test('1. Modelos Relacionales: Población de Actor y Fuente', () => {
  const senales = db.getAllSenales(false);
  assert.ok(senales.length >= 5, 'Deben existir al menos 5 señales pre-cargadas');
  const s = senales[0];
  assert.ok(s.actor, 'La señal debe tener un Actor relacionado poblado');
  assert.ok(s.fuente, 'La señal debe tener una Fuente de Dato relacionada poblada');
  assert.strictEqual(typeof s.actor.nombre, 'string');
});

test('2. Eliminación Lógica (Soft Delete) y Trazabilidad', () => {
  const senalesIniciales = db.getAllSenales(false);
  const targetId = senalesIniciales[0].id;

  // Ejecutar eliminación lógica
  const eliminada = db.softDeleteSenal(targetId);
  assert.strictEqual(eliminada.isDeleted, true, 'El flag isDeleted debe ser true');
  assert.ok(eliminada.deletedAt, 'Debe registrar la marca de tiempo deletedAt');

  // Verificar que ya no figura en consultas activas
  const activas = db.getAllSenales(false);
  assert.strictEqual(activas.find(s => s.id === targetId), undefined, 'No debe aparecer en señales activas');

  // Verificar que sigue existiendo en modo auditoría
  const todas = db.getAllSenales(true);
  const auditItem = todas.find(s => s.id === targetId);
  assert.ok(auditItem, 'Debe seguir existiendo en auditoría / papelera');
  assert.strictEqual(auditItem.isDeleted, true);

  // Restaurar registro
  const restaurada = db.restoreSenal(targetId);
  assert.strictEqual(restaurada.isDeleted, false, 'El flag isDeleted debe volver a false');
  assert.strictEqual(restaurada.deletedAt, null, 'deletedAt debe ser null tras restaurar');

  const activasTrasRestaurar = db.getAllSenales(false);
  assert.ok(activasTrasRestaurar.find(s => s.id === targetId), 'Debe reaparecer en señales activas');
});

test('3. Creación y Validación Relacional de Nueva Señal', () => {
  const countBefore = db.getAllSenales(false).length;
  const nueva = db.createSenal({
    actorId: 'act-01',
    fuenteId: 'fnt-01',
    contenido: 'Prueba de integración relacional con Express',
    severidad: 'alta',
    impactoARS: 350000
  });

  assert.ok(nueva.id.startsWith('sig-'));
  assert.strictEqual(nueva.isDeleted, false);
  assert.strictEqual(nueva.actor.id, 'act-01');
  assert.strictEqual(nueva.fuente.id, 'fnt-01');
  assert.strictEqual(db.getAllSenales(false).length, countBefore + 1);
});
