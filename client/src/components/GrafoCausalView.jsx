import React from 'react';
import { Network, Compass, AlertCircle, ArrowRight } from 'lucide-react';

export default function GrafoCausalView({ causalData }) {
  const nodes = causalData?.nodes || [];
  const edges = causalData?.edges || [];
  const insights = causalData?.insights || [];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Grafo Causal de Información Dispersa
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Relaciones Causal-Económicas
          </span>
        </h2>
        <p className="text-sm text-slate-400">
          Cruza variables cuantitativas (inflación, balance de ventas) con señales cualitativas de WhatsApp para revelar cuellos de botella invisibles.
        </p>
      </div>

      {/* Visual Causal Pipeline */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          Nodos de Causalidad Cruzada ({nodes.length} Nodos Activos)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {nodes.slice(0, 5).map((n, i) => (
            <div key={n.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400">Paso #{i + 1}</span>
                <h4 className="font-bold text-xs text-white mt-1">{n.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{n.categoria}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <span>Severidad:</span>
                <strong className={n.severidad === 'critica' ? 'text-rose-400' : 'text-amber-400'}>{n.severidad}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Relaciones entre Nodos (Edges) */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold text-slate-300 mb-2">Relaciones Causales Directas:</h4>
          <div className="space-y-1.5 text-xs text-slate-400 font-mono">
            {edges.slice(0, 4).map((e, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                <span className="text-emerald-400 font-bold">{e.from}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-cyan-400 font-bold">{e.to}:</span>
                <span className="text-slate-300 font-sans">{e.relation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Causal-Económicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((ins) => (
          <div key={ins.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                <Compass className="w-4 h-4" />
                <span>Patrón Causal #{ins.orden}</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-2">{ins.titulo}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{ins.descripcion}</p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Evidencia Cruzada:</span>
              <div className="space-y-1">
                {ins.senalesEvidencia?.map((ev, i) => (
                  <p key={i} className="text-[11px] text-slate-400 italic bg-slate-950/70 p-1.5 rounded border border-slate-800">
                    "{ev}"
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
