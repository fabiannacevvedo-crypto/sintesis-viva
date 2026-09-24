import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Database,
  GitMerge,
  Sliders,
  Send
} from 'lucide-react';
import StorytellingView from './components/StorytellingView.jsx';
import IngestaRelacionalView from './components/IngestaRelacionalView.jsx';
import GrafoCausalView from './components/GrafoCausalView.jsx';
import SimuladorView from './components/SimuladorView.jsx';
import ExportadorView from './components/ExportadorView.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('storytelling');
  const [storyData, setStoryData] = useState(null);
  const [senales, setSenales] = useState([]);
  const [actores, setActores] = useState([]);
  const [fuentes, setFuentes] = useState([]);
  const [causalData, setCausalData] = useState(null);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [storyRes, senalesRes, actoresRes, fuentesRes, causalRes] = await Promise.all([
        fetch('/api/story').then(r => r.json()),
        fetch(`/api/senales?includeDeleted=${includeDeleted}`).then(r => r.json()),
        fetch('/api/actores').then(r => r.json()),
        fetch('/api/fuentes').then(r => r.json()),
        fetch('/api/causal').then(r => r.json())
      ]);

      if (storyRes.success) setStoryData(storyRes.data);
      if (senalesRes.success) setSenales(senalesRes.data);
      if (actoresRes.success) setActores(actoresRes.data);
      if (fuentesRes.success) setFuentes(fuentesRes.data);
      if (causalRes.success) setCausalData(causalRes.data);
    } catch (err) {
      console.error('Error cargando datos de la API:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIncludeDeleted = async () => {
    const nextVal = !includeDeleted;
    setIncludeDeleted(nextVal);
    try {
      const res = await fetch(`/api/senales?includeDeleted=${nextVal}`).then(r => r.json());
      if (res.success) setSenales(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateSenal = async (payload) => {
    try {
      const res = await fetch('/api/senales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        return { errors: data.errors || [{ campo: 'general', mensaje: data.message }] };
      }
      // Refrescar señales y grafo
      const [senalesRes, causalRes] = await Promise.all([
        fetch(`/api/senales?includeDeleted=${includeDeleted}`).then(r => r.json()),
        fetch('/api/causal').then(r => r.json())
      ]);
      if (senalesRes.success) setSenales(senalesRes.data);
      if (causalRes.success) setCausalData(causalRes.data);
      return { success: true };
    } catch (e) {
      return { errors: [{ campo: 'red', mensaje: 'Error de conexión con el servidor' }] };
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      const res = await fetch(`/api/senales/${id}`, { method: 'DELETE' }).then(r => r.json());
      if (res.success) {
        // Refrescar lista y grafo
        const [senalesRes, causalRes] = await Promise.all([
          fetch(`/api/senales?includeDeleted=${includeDeleted}`).then(r => r.json()),
          fetch('/api/causal').then(r => r.json())
        ]);
        if (senalesRes.success) setSenales(senalesRes.data);
        if (causalRes.success) setCausalData(causalRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`/api/senales/${id}/restore`, { method: 'PATCH' }).then(r => r.json());
      if (res.success) {
        const [senalesRes, causalRes] = await Promise.all([
          fetch(`/api/senales?includeDeleted=${includeDeleted}`).then(r => r.json()),
          fetch('/api/causal').then(r => r.json())
        ]);
        if (senalesRes.success) setSenales(senalesRes.data);
        if (causalRes.success) setCausalData(causalRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRunSimulation = async (params) => {
    try {
      return await fetch('/api/simulador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }).then(r => r.json());
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportArtifacts = async (params) => {
    try {
      return await fetch('/api/exportar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }).then(r => r.json());
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { id: 'storytelling', label: '1. Narrativa Estratégica', icon: BookOpen },
    { id: 'ingesta', label: '2. Ingesta Relacional & CRUD', icon: Database },
    { id: 'grafo', label: '3. Grafo Causal', icon: GitMerge },
    { id: 'simulador', label: "4. Simulador 'What-If'", icon: Sliders },
    { id: 'exportar', label: '5. Exportación Polimórfica', icon: Send },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  SÍNTESIS VIVA
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  React + Express 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">Sociedad y Economía • De Información Dispersa a Inteligencia Colectiva</p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
              <span className="w-2 h-2 mr-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              API Express Conectada
            </span>
          </div>
        </div>
      </header>

      {/* Navegación Mobile */}
      <div className="md:hidden flex overflow-x-auto bg-slate-900 border-b border-slate-800 p-2 space-x-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 text-xs rounded transition-all ${
              activeTab === item.id ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'storytelling' && (
          <StorytellingView
            storyData={storyData}
            onNavigateToIngesta={() => setActiveTab('ingesta')}
          />
        )}
        {activeTab === 'ingesta' && (
          <IngestaRelacionalView
            senales={senales}
            actores={actores}
            fuentes={fuentes}
            includeDeleted={includeDeleted}
            onToggleIncludeDeleted={handleToggleIncludeDeleted}
            onCreateSenal={handleCreateSenal}
            onSoftDelete={handleSoftDelete}
            onRestore={handleRestore}
          />
        )}
        {activeTab === 'grafo' && (
          <GrafoCausalView causalData={causalData} />
        )}
        {activeTab === 'simulador' && (
          <SimuladorView onRunSimulation={handleRunSimulation} />
        )}
        {activeTab === 'exportar' && (
          <ExportadorView onExportArtifacts={handleExportArtifacts} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950 text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Síntesis Viva</span>
            <span>•</span>
            <span>Stack: JavaScript + Express + Express-Validator + React + Tailwind + Vite</span>
          </div>
          <div>
            <span>Desafío: Transformar información dispersa en decisiones colectivas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
