import React, { useState } from 'react';
import { Database, PlusCircle, Trash2, RotateCcw, AlertCircle, CheckCircle, Radio, UserCheck, Layers } from 'lucide-react';

export default function IngestaRelacionalView({
  senales,
  actores,
  fuentes,
  includeDeleted,
  onToggleIncludeDeleted,
  onCreateSenal,
  onSoftDelete,
  onRestore
}) {
  const [actorId, setActorId] = useState(actores[0]?.id || 'act-01');
  const [fuenteId, setFuenteId] = useState(fuentes[0]?.id || 'fnt-01');
  const [contenido, setContenido] = useState('');
  const [severidad, setSeveridad] = useState('alta');
  const [impactoARS, setImpactoARS] = useState('250000');
  const [serverErrors, setServerErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors([]);
    setSuccessMsg('');

    const res = await onCreateSenal({
      actorId,
      fuenteId,
      contenido,
      severidad,
      impactoARS: Number(impactoARS)
    });

    if (res.errors) {
      setServerErrors(res.errors);
    } else {
      setSuccessMsg('¡Señal registrada y vinculada relacionalmente con éxito!');
      setContenido('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Hub de Ingesta & Modelos Relacionales
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Express-Validator + Soft Delete
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Cada señal se relaciona con un <strong>Actor Territorial (1:N)</strong> y un canal de <strong>Fuente de Datos (1:N)</strong> con trazabilidad y eliminación lógica.
          </p>
        </div>

        {/* Toggle Eliminación Lógica */}
        <div className="flex items-center space-x-3 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Ver Auditoría / Papelera:</span>
          <button
            onClick={onToggleIncludeDeleted}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              includeDeleted
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {includeDeleted ? 'Mostrando Eliminados Lógicamente' : 'Solo Señales Activas'}
          </button>
        </div>
      </div>

      {/* Formulario de Creación con express-validator */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          Registrar Nueva Señal Territorial (Validada con express-validator)
        </h3>

        {serverErrors.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Errores detectados por Express-Validator en el servidor:
            </div>
            <ul className="list-disc pl-5">
              {serverErrors.map((err, i) => (
                <li key={i}><strong>{err.campo}:</strong> {err.mensaje}</li>
              ))}
            </ul>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Relación con Actor */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Relación Actor (1:N)</label>
              <select
                value={actorId}
                onChange={(e) => setActorId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {actores.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombre} ({a.rol})</option>
                ))}
              </select>
            </div>

            {/* Relación con Fuente */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Relación Fuente (1:N)</label>
              <select
                value={fuenteId}
                onChange={(e) => setFuenteId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {fuentes.map((f) => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
            </div>

            {/* Severidad */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Severidad Causal</label>
              <select
                value={severidad}
                onChange={(e) => setSeveridad(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>

            {/* Impacto ARS */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Impacto Estimado ($ ARS)</label>
              <input
                type="number"
                value={impactoARS}
                onChange={(e) => setImpactoARS(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Contenido del Reporte Territorial (Mínimo 10 caracteres)</label>
            <input
              type="text"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Ej: Los proveedores aumentaron un 30% el combustible del flete de lácteos y no hay entrega esta semana..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Guardar Señal Relacional</span>
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Señales con Trazabilidad y Eliminación Lógica */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Registros Territoriales ({senales.length} {includeDeleted ? 'totales en auditoría' : 'activos'})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {senales.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border transition-all ${
                s.isDeleted
                  ? 'bg-slate-950/40 border-amber-800/60 opacity-70'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {s.actor?.nombre || 'Actor Desconocido'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {s.fuente?.nombre || 'Fuente'}
                  </span>
                  {s.isDeleted && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      Eliminado Lógicamente
                    </span>
                  )}
                </div>

                {/* Acciones de Soft Delete y Restore */}
                <div>
                  {s.isDeleted ? (
                    <button
                      onClick={() => onRestore(s.id)}
                      className="px-2.5 py-1 rounded bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1 transition-all border border-amber-500/40"
                      title="Restaurar registro"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restaurar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSoftDelete(s.id)}
                      className="px-2.5 py-1 rounded bg-rose-600/10 hover:bg-rose-600/30 text-rose-300 text-[11px] font-semibold flex items-center gap-1 transition-all border border-rose-500/20"
                      title="Eliminación lógica (Soft Delete)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar (Lógico)</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">"{s.contenido}"</p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                <span>Severidad: <strong className={s.severidad === 'critica' ? 'text-rose-400' : 'text-amber-400'}>{s.severidad}</strong></span>
                <span>Impacto: <strong className="text-white">${s.impactoARS?.toLocaleString('es-AR')} ARS</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
