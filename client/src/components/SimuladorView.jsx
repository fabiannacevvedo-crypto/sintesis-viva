import React, { useState, useEffect } from 'react';
import { Sliders, TrendingUp, ShieldCheck, DollarSign, Activity } from 'lucide-react';

export default function SimuladorView({ onRunSimulation }) {
  const [tasaCompra, setTasaCompra] = useState(50);
  const [fondoGarantia, setFondoGarantia] = useState(2000000);
  const [subsidioMunicipal, setSubsidioMunicipal] = useState(60);
  const [simResults, setSimResults] = useState(null);

  const executeSim = async (tc, fg, sm) => {
    const res = await onRunSimulation({
      tasaCompraColectiva: tc,
      fondoGarantia: fg,
      subsidioMunicipal: sm
    });
    if (res?.data) {
      setSimResults(res.data);
    }
  };

  useEffect(() => {
    executeSim(tasaCompra, fondoGarantia, subsidioMunicipal);
  }, [tasaCompra, fondoGarantia, subsidioMunicipal]);

  const p = simResults?.proyecciones;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Simulador Socioeconómico 'What-If'
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Modelo Matemático Predictivo
          </span>
        </h2>
        <p className="text-sm text-slate-400">
          Modifica las palancas de compra agrupada y fondos rotatorios en tiempo real para proyectar la recuperación del tejido comercial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controles de Entrada */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            Palancas de Intervención
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Tasa de Compra Colectiva</span>
              <span className="font-mono font-bold text-emerald-400">{tasaCompra}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={tasaCompra}
              onChange={(e) => setTasaCompra(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-500">% de comercios que unifican pedidos mayoristas con transporte común.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Fondo Rotatorio de Garantía</span>
              <span className="font-mono font-bold text-cyan-400">${fondoGarantia.toLocaleString('es-AR')} ARS</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000000"
              step="250000"
              value={fondoGarantia}
              onChange={(e) => setFondoGarantia(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[11px] text-slate-500">Colchón solidario para cubrir desfases del crédito informal ('fiado').</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Desbloqueo Subsidio Municipal</span>
              <span className="font-mono font-bold text-purple-400">{subsidioMunicipal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={subsidioMunicipal}
              onChange={(e) => setSubsidioMunicipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[11px] text-slate-500">% de partidas municipales de flete activadas mediante el consorcio.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Diagnóstico Predictivo</span>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">
              {simResults?.diagnosticoCualitativo || "Calculando modelo..."}
            </p>
          </div>
        </div>

        {/* Métricas Proyectadas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Margen Comercial</span>
              <p className={`text-2xl font-black mt-1 ${p?.margenComercialProyectadoPct > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {p?.margenComercialProyectadoPct > 0 ? '+' : ''}{p?.margenComercialProyectadoPct || 0}%
              </p>
              <span className="text-[10px] text-emerald-500">Recuperación neta</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Ahorro Canasta</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">{p?.ahorroCanastaBasicaPct || 0}%</p>
              <span className="text-[10px] text-cyan-400">Menos inflación barrial</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Supervivencia Pyme</span>
              <p className="text-2xl font-black text-purple-400 mt-1">{p?.probabilidadSupervivenciaPct || 0}%</p>
              <span className="text-[10px] text-purple-400">Basal: 35%</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Retorno Social</span>
              <p className="text-2xl font-black text-amber-400 mt-1">{p?.retornoSocialInversionSROI || 0}x</p>
              <span className="text-[10px] text-amber-400">S-ROI por peso</span>
            </div>
          </div>

          {/* Comparativa Visual de Barras */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Comparativa de Escenario Basal vs Simulación Colectiva
            </h4>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Margen Comercial Real</span>
                  <span className="font-mono text-emerald-400 font-bold">{p?.margenComercialProyectadoPct}% (Basal: -0.9%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                  <div className="h-full bg-rose-500" style={{ width: '10%' }}></div>
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, (p?.margenComercialProyectadoPct || 0) * 4))}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Ahorro en Canasta Básica Familiar</span>
                  <span className="font-mono text-cyan-400 font-bold">{p?.ahorroCanastaBasicaPct}% (Basal: 0%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${Math.min(100, (p?.ahorroCanastaBasicaPct || 0) * 5)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Probabilidad de Supervivencia de Comercios</span>
                  <span className="font-mono text-purple-400 font-bold">{p?.probabilidadSupervivenciaPct}% (Basal: 35%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${p?.probabilidadSupervivenciaPct || 35}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
