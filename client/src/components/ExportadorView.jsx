import React, { useState, useEffect } from 'react';
import { Send, Copy, Check, Landmark, MessageCircle, Briefcase, RefreshCw } from 'lucide-react';

export default function ExportadorView({ onExportArtifacts }) {
  const [artifacts, setArtifacts] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchArtifacts = async () => {
    const res = await onExportArtifacts({
      tasaCompraColectiva: 50,
      fondoGarantia: 2000000,
      subsidioMunicipal: 60
    });
    if (res?.data) {
      setArtifacts(res.data);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const dos = artifacts?.dossierEjecutivo;
  const wa = artifacts?.scriptWhatsApp;
  const pb = artifacts?.playbookComerciante;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Generador Polimórfico de Decisiones
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Traductor Adaptativo
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Convierte la misma verdad causal objetiva en tres formatos específicos adaptados a cada actor territorial.
          </p>
        </div>

        <button
          onClick={fetchArtifacts}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerar Artefactos</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Dossier Ejecutivo */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Para Autoridades & Bancos</span>
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Landmark className="w-5 h-5" /></div>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{dos?.tipoDocumento}</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">Destino: {dos?.destinatario}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono space-y-2 max-h-72 overflow-y-auto">
              <p className="text-slate-300 font-sans leading-relaxed">{dos?.resumen}</p>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <p className="text-emerald-400 font-bold">ROI Social: {dos?.justificacionPresupuestaria?.retornoSocialSROI}</p>
                <p className="text-slate-400">Fondos: {dos?.justificacionPresupuestaria?.fondosRequeridosARS}</p>
                <p className="text-slate-400">Canasta: {dos?.justificacionPresupuestaria?.reduccionInflacionLocal}</p>
                <p className="text-purple-300">Normativa: {dos?.propuestaNormativa}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleCopy('dos', JSON.stringify(dos, null, 2))}
            className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {copiedId === 'dos' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'dos' ? '¡Copiado con Éxito!' : 'Copiar Dossier Técnico'}</span>
          </button>
        </div>

        {/* 2. WhatsApp Audio Script */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Para Familias & Vecinos</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><MessageCircle className="w-5 h-5" /></div>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{wa?.tipoDocumento}</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">{wa?.formato}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
              {wa?.contenido}
            </div>
          </div>

          <button
            onClick={() => handleCopy('wa', wa?.contenido || '')}
            className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {copiedId === 'wa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'wa' ? '¡Copiado con Éxito!' : 'Copiar Script WhatsApp'}</span>
          </button>
        </div>

        {/* 3. Playbook Comerciante */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Para Pequeños Negocios</span>
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg"><Briefcase className="w-5 h-5" /></div>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{pb?.tipoDocumento}</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">Meta: {pb?.metaInmediata}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans space-y-3 max-h-72 overflow-y-auto">
              <div>
                <strong className="text-amber-400 block mb-1">Acciones Semana 1:</strong>
                {pb?.semana1?.map((a, i) => (
                  <p key={i} className="pl-2 border-l border-cyan-500/50 mb-1">{a}</p>
                ))}
              </div>
              <div>
                <strong className="text-amber-400 block mb-1">Acciones Semana 2:</strong>
                {pb?.semana2?.map((a, i) => (
                  <p key={i} className="pl-2 border-l border-emerald-500/50 mb-1">{a}</p>
                ))}
              </div>
              <div className="p-2 rounded bg-amber-950/40 border border-amber-800 text-[11px] text-amber-300">
                💡 <strong>Regla de Oro:</strong> {pb?.reglaDeOro}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleCopy('pb', JSON.stringify(pb, null, 2))}
            className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {copiedId === 'pb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'pb' ? '¡Copiado con Éxito!' : 'Copiar Playbook Comercial'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
