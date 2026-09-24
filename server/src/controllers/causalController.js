// server/src/controllers/causalController.js
import { db } from '../models/db.js';

export const getCausalGraph = (req, res) => {
  const senalesActivas = db.getAllSenales(false);
  const patrones = db.getAllPatrones(false);

  // Construir nodos del Grafo Causal Relacional
  const nodes = [
    { id: 'flete_macro', label: 'Alza Flete Regional (+34.2%)', categoria: 'Macro / Datos Abiertos', severidad: 'alta' },
    { id: 'cuello_logistico', label: `Fletes Atomizados (${senalesActivas.length} señales activas)`, categoria: 'Voz Territorial', severidad: 'critica' },
    { id: 'colapso_margen', label: 'Margen Real Cae a -0.9%', categoria: 'Financiero Comercios', severidad: 'critica' },
    { id: 'explosion_fiado', label: 'Explosión Fiado (+190%)', categoria: 'Social / Liquidez', severidad: 'critica' },
    { id: 'fondo_dormido', label: 'Fondo Municipal Inactivo ($10.2M ARS)', categoria: 'Política Pública', severidad: 'oportunidad' },
    { id: 'compra_colectiva', label: 'Capacidad de Compra Conjunta', categoria: 'Palanca de Solución', severidad: 'accion' }
  ];

  const edges = [
    { from: 'flete_macro', to: 'cuello_logistico', relation: 'Sobrecosto directo en reposición individual' },
    { from: 'cuello_logistico', to: 'colapso_margen', relation: 'Costo de transporte devora el margen del 30% al -0.9%' },
    { from: 'colapso_margen', to: 'explosion_fiado', relation: 'Familias sin efectivo compran al fiado; almacén absorbe déficit' },
    { from: 'explosion_fiado', to: 'fondo_dormido', relation: 'Brecha: Municipio exige balances individuales auditados' },
    { from: 'fondo_dormido', to: 'compra_colectiva', relation: 'Desbloqueo inmediato agrupando demanda comunitaria' }
  ];

  // Si hay señales dinámicas creadas recientemente, conectar al nodo
  senalesActivas.forEach(s => {
    if (s.id.startsWith('sig-') && s.id.length > 7) {
      nodes.push({
        id: s.id,
        label: `${s.actor ? s.actor.nombre : 'Actor'}: ${s.contenido.slice(0, 35)}...`,
        categoria: 'Señal en Vivo',
        severidad: s.severidad
      });
      edges.push({
        from: s.id,
        to: 'cuello_logistico',
        relation: `Impacto reportado: $${s.impactoARS.toLocaleString('es-AR')} ARS`
      });
    }
  });

  const insights = patrones.map((p, idx) => ({
    id: p.id,
    orden: idx + 1,
    titulo: p.titulo,
    descripcion: p.descripcion,
    severidad: p.severidad,
    senalesEvidencia: p.senalesRelacionadas.map(s => `[${s.actor?.nombre || 'Actor'}] ${s.contenido}`)
  }));

  res.json({
    success: true,
    data: {
      totalSenalesActivas: senalesActivas.length,
      nodes,
      edges,
      insights
    }
  });
};
