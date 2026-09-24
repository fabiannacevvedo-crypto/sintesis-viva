import React from 'react';
import { Flame, AlertTriangle, Cpu, Zap, Heart, TrendingDown, CheckCircle2, ArrowRightCircle, Users, Check } from 'lucide-react';

export default function StorytellingView({ storyData, onNavigateToIngesta }) {
  const meta = storyData?.metodologiaStorytelling;
  const afectados = storyData?.aQuienesAfecta || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="max-w-3xl relative z-10">
          <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800 px-3 py-1 rounded-full">
            Metodología de Storytelling Estratégico (React + Express)
          </span>
          <h2 className="text-3xl font-black text-white mt-4 tracking-tight sm:text-4xl">
            Transformando la Niebla de Datos en Soberanía Comunitaria
          </h2>
          <p className="text-slate-300 mt-3 text-base leading-relaxed">
            Convertimos información heterogénea (mensajes de WhatsApp, planillas de almacén, minutas vecinales y datos públicos) en un relato vivo que diagnostica la causa raíz y moviliza la acción colectiva.
          </p>
        </div>
      </div>

      {/* 4-Act Storytelling Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Acto 1 */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Acto 1</span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Flame className="w-5 h-5" /></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">El Gancho</h3>
            <p className="text-xs text-amber-300 font-medium mb-3">{meta?.acto1Gancho?.titulo || "Doña Marta y el Pan Invisible"}</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              A las 5:15 AM los hornos están apagados. El flete subió 28%, el fiado vecinal desborda el cuaderno ($630.000), y en la web municipal hay $10.2M ARS intactos. Tres realidades a 10 cuadras desconectadas por formatos incompatibles.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-amber-300 flex items-center font-semibold">
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Resonancia humana y empatía
          </div>
        </div>

        {/* Acto 2 */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-rose-500/30 flex flex-col justify-between hover:border-rose-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Acto 2</span>
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Problema & Consecuencias</h3>
            <p className="text-xs text-rose-300 font-medium mb-3">{meta?.acto2ProblemaConsecuencias?.titulo || "La Trampa de los Datos Silenciados"}</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ceguera operativa (ventas nominales suben pero margen real cae a -0.9%), parálisis por crédito informal (+190% en fiado) y desaprovechamiento de recursos públicos por barreras burocráticas.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-rose-300 flex items-center font-semibold">
            <TrendingDown className="w-3.5 h-3.5 mr-1.5" /> Destrucción de capital territorial
          </div>
        </div>

        {/* Acto 3 */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Acto 3</span>
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg"><Cpu className="w-5 h-5" /></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">La Solución</h3>
            <p className="text-xs text-cyan-300 font-medium mb-3">El Grafo Causal y Motor Vivo</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Un backend Express que ingesta audios, CSVs y decretos con validaciones estrictas y eliminación lógica, infiriendo correlaciones para orquestar compras colectivas sin trabas contables.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-cyan-300 flex items-center font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Inteligencia relacional multi-fuente
          </div>
        </div>

        {/* Acto 4 */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Acto 4</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Zap className="w-5 h-5" /></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">El Flujo & Cierre</h3>
            <p className="text-xs text-emerald-300 font-medium mb-3">Acción y Resiliencia en 4 Fases</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ingesta ➡️ Grafo Causal ➡️ Simulación 'What-If' ➡️ Exportación Tri-Partita (Dossier Político + Boletín de Audio WhatsApp + Playbook del Almacenero).
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-emerald-300 flex items-center font-semibold">
            <ArrowRightCircle className="w-3.5 h-3.5 mr-1.5" /> Llamado a la acción medible
          </div>
        </div>
      </div>

      {/* Human Story Spotlight */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400 text-lg">DM</div>
              <div>
                <h4 className="font-bold text-white text-base">Relato Central: Doña Marta y la Fragilidad Oculta</h4>
                <p className="text-xs text-slate-400">Panadería & Almacén La Unión • 24 años en el barrio</p>
              </div>
            </div>
            <blockquote className="text-slate-300 text-sm leading-relaxed border-l-2 border-emerald-500 pl-4 py-2 italic bg-slate-950/40 rounded-r-lg">
              "{meta?.acto1Gancho?.relato}"
            </blockquote>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400">Margen Comercial Real</span>
                <p className="text-xl font-extrabold text-rose-400 mt-1">-0.9%</p>
                <span className="text-[10px] text-rose-500">Pérdida por flete individual</span>
              </div>
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400">Deuda Informal Acumulada</span>
                <p className="text-xl font-extrabold text-amber-400 mt-1">$630,000 ARS</p>
                <span className="text-[10px] text-amber-500">+190% en 5 semanas</span>
              </div>
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400">Fondo Público Ocioso</span>
                <p className="text-xl font-extrabold text-emerald-400 mt-1">$10.2M ARS</p>
                <span className="text-[10px] text-emerald-500">Desbloqueable colectivamente</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-cyan-400" /> ¿A quiénes afecta?
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {afectados.map((a, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>{a.grupo}:</strong> {a.problema}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onNavigateToIngesta}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
            >
              <span>Explorar Ingesta y Modelos</span>
              <ArrowRightCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
