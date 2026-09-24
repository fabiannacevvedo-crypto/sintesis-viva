let simChart = null;

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initSimulationChart();
  loadDataSnapshot();
  loadCausalAnalysis();
  triggerSimulation();
  loadPolymorphicArtifacts();
});

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('block');
  });

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.remove('active-tab');
    btn.classList.add('text-slate-400');
  });

  const targetView = document.getElementById(`view-${tabName}`);
  if (targetView) {
    targetView.classList.remove('hidden');
    targetView.classList.add('block');
  }

  const targetBtn = document.getElementById(`tab-btn-${tabName}`);
  if (targetBtn) {
    targetBtn.classList.add('active-tab');
    targetBtn.classList.remove('text-slate-400');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

async function loadDataSnapshot() {
  try {
    const res = await fetch('/api/ingest/snapshot');
    const data = await res.json();

    const waFeed = document.getElementById('whatsapp-feed');
    if (waFeed && data.whatsapp_signals) {
      waFeed.innerHTML = data.whatsapp_signals.map(w => `
        <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-200">${w.remitente}</span>
            <span class="text-[10px] text-slate-500 font-mono">${w.fecha}</span>
          </div>
          <p class="text-slate-300 italic text-[11px]">"${w.contenido}"</p>
          <div class="flex items-center space-x-2 pt-1 text-[10px]">
            <span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">${w.canal}</span>
            <span class="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300">${w.tono}</span>
          </div>
        </div>
      `).join('');
    }

    const csvTable = document.getElementById('csv-table-body');
    if (csvTable) {
      const sampleRows = [
        { sem: 'Semana 1', com: 'Panadería La Unión', vent: '$450.000', marg: '+31.1%', fiad: '$85.000', cls: 'text-emerald-400' },
        { sem: 'Semana 1', com: 'Almacén Don Pepe', vent: '$380.000', marg: '+28.9%', fiad: '$92.000', cls: 'text-emerald-400' },
        { sem: 'Semana 3', com: 'Panadería La Unión', vent: '$478.000', marg: '+22.5%', fiad: '$138.000', cls: 'text-amber-400' },
        { sem: 'Semana 5', com: 'Panadería La Unión', vent: '$490.000', marg: '+5.1%', fiad: '$235.000', cls: 'text-rose-400' },
        { sem: 'Semana 5', com: 'Almacén Don Pepe', vent: '$415.000', marg: '-2.4%', fiad: '$250.000', cls: 'text-rose-500 font-bold' }
      ];
      csvTable.innerHTML = sampleRows.map(r => `
        <tr class="hover:bg-slate-800/40">
          <td class="p-2 text-slate-300">${r.sem}</td>
          <td class="p-2 text-slate-200">${r.com}</td>
          <td class="p-2 text-slate-300">${r.vent}</td>
          <td class="p-2 ${r.cls}">${r.marg}</td>
          <td class="p-2 text-amber-300">${r.fiad}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Error cargando snapshot:', err);
  }
}

async function loadCausalAnalysis() {
  try {
    const res = await fetch('/api/causal/analysis');
    const data = await res.json();

    const insightsContainer = document.getElementById('insights-container');
    if (insightsContainer && data.insights) {
      insightsContainer.innerHTML = data.insights.map((ins, i) => `
        <div class="p-5 rounded-xl bg-slate-900 border ${i === 0 && ins.titulo.includes('En Vivo') ? 'border-brand-500/80 shadow-brand-500/20 shadow-lg' : 'border-slate-800'} flex flex-col justify-between">
          <div>
            <div class="flex items-center space-x-2 text-accent-cyan text-xs font-bold mb-2">
              <i data-lucide="compass" class="w-4 h-4"></i>
              <span>Patrón Causal #${i + 1}</span>
            </div>
            <h4 class="font-bold text-white text-sm mb-2">${ins.titulo}</h4>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">${ins.sintesis}</p>
          </div>
          <div class="pt-3 border-t border-slate-800">
            <span class="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Evidencia Cruzada:</span>
            <div class="flex flex-wrap gap-1">
              ${ins.evidencia_cruzada.map(e => `
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">${e}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');
      if (window.lucide) lucide.createIcons();
    }
  } catch (err) {
    console.error('Error cargando causalidad:', err);
  }
}

async function injectLiveSignal() {
  const remitenteInput = document.getElementById('input-live-remitente');
  const contenidoInput = document.getElementById('input-live-contenido');

  const remitente = remitenteInput.value.trim() || 'Vecino Participante';
  const contenido = contenidoInput.value.trim();

  if (!contenido) {
    alert('Por favor escribe un mensaje o selecciona un ejemplo preestablecido.');
    return;
  }

  try {
    const res = await fetch('/api/ingest/add_signal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        remitente: remitente,
        contenido: contenido,
        canal: 'WhatsApp en Vivo',
        tono: 'Alerta Territorial',
        tema: 'Logística & Precios'
      })
    });
    const result = await res.json();
    if (result.success) {
      contenidoInput.value = '';
      await loadDataSnapshot();
      await loadCausalAnalysis();
      switchTab('grafo');
    }
  } catch (err) {
    console.error('Error inyectando señal:', err);
  }
}

function setLivePreset(presetType) {
  const rem = document.getElementById('input-live-remitente');
  const con = document.getElementById('input-live-contenido');
  if (presetType === 'frigorifico') {
    rem.value = 'Don José (Carnicería Central)';
    con.value = 'El frigorífico me duplicó el flete mínimo por caja. Si no compramos entre 4 carnicerías, tenemos que subir la carne un 30% mañana.';
  } else if (presetType === 'lacteos') {
    rem.value = 'Miriam (Almacén La Esquina)';
    con.value = 'El camión de la leche no bajó mercadería hoy porque no le alcanzaba el combustible. Solo queda leche para 2 días en toda la cuadra.';
  } else if (presetType === 'cooperativa') {
    rem.value = 'Cooperativa Hortícola Regional';
    con.value = 'Tenemos 1500 cajones de verdura fresca listos para despachar directo sin intermediarios si se habilita un punto de descarga común.';
  }
}

function initSimulationChart() {
  const ctx = document.getElementById('simulationChart');
  if (!ctx) return;

  simChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Margen Comercial Real (%)', 'Canasta Básica Ahorro (%)', 'Supervivencia Comercios (%)'],
      datasets: [
        {
          label: 'Escenario Actual (Fragmentado)',
          data: [-0.9, 0, 35],
          backgroundColor: 'rgba(239, 68, 68, 0.65)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1
        },
        {
          label: 'Simulación Colectiva (Síntesis Viva)',
          data: [16.6, 10.3, 84.5],
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(51, 65, 85, 0.3)' },
          ticks: { color: '#94a3b8' }
        },
        x: {
          grid: { color: 'rgba(51, 65, 85, 0.1)' },
          ticks: { color: '#cbd5e1' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#e2e8f0', font: { size: 11 } }
        }
      }
    }
  });
}

async function triggerSimulation() {
  const sliderTC = document.getElementById('slider-tasa-compra');
  const sliderFG = document.getElementById('slider-fondo-garantia');
  const sliderSM = document.getElementById('slider-subsidio-pct');

  if (!sliderTC || !sliderFG || !sliderSM) return;

  const tasaCompra = parseFloat(sliderTC.value);
  const fondoGarantia = parseFloat(sliderFG.value);
  const subsidioPct = parseFloat(sliderSM.value);

  document.getElementById('label-tasa-compra').innerText = `${tasaCompra}%`;
  document.getElementById('label-fondo-garantia').innerText = `$${fondoGarantia.toLocaleString('es-AR')} ARS`;
  document.getElementById('label-subsidio-pct').innerText = `${subsidioPct}%`;

  try {
    const res = await fetch('/api/simulator/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tasa_compra_colectiva_pct: tasaCompra,
        fondo_garantia_ars: fondoGarantia,
        subsidio_municipal_pct: subsidioPct
      })
    });
    const data = await res.json();
    const p = data.proyecciones;

    const kpiMargen = document.getElementById('kpi-margen');
    kpiMargen.innerText = `${p.margen_comercial_proyectado_pct > 0 ? '+' : ''}${p.margen_comercial_proyectado_pct}%`;
    kpiMargen.className = p.margen_comercial_proyectado_pct > 0 ? 'text-2xl font-black text-brand-400 mt-1' : 'text-2xl font-black text-rose-500 mt-1';

    document.getElementById('kpi-ahorro').innerText = `${p.ahorro_canasta_vecinal_pct}%`;
    document.getElementById('kpi-supervivencia').innerText = `${p.probabilidad_supervivencia_comercios_pct}%`;
    document.getElementById('kpi-sroi').innerText = `${p.retorno_social_inversion_sroi}x`;
    document.getElementById('sim-narrative-eval').innerText = data.evaluacion_cualitativa;

    if (simChart) {
      simChart.data.datasets[1].data = [
        p.margen_comercial_proyectado_pct,
        p.ahorro_canasta_vecinal_pct,
        p.probabilidad_supervivencia_comercios_pct
      ];
      simChart.update();
    }
  } catch (err) {
    console.error('Error ejecutando simulador:', err);
  }
}

async function loadPolymorphicArtifacts() {
  const sliderTC = document.getElementById('slider-tasa-compra');
  const sliderFG = document.getElementById('slider-fondo-garantia');
  const sliderSM = document.getElementById('slider-subsidio-pct');

  const tasaCompra = parseFloat(sliderTC ? sliderTC.value : 50);
  const fondoGarantia = parseFloat(sliderFG ? sliderFG.value : 2000000);
  const subsidioPct = parseFloat(sliderSM ? sliderSM.value : 60);

  try {
    const res = await fetch('/api/export/decision_artifacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tasa_compra_colectiva_pct: tasaCompra,
        fondo_garantia_ars: fondoGarantia,
        subsidio_municipal_pct: subsidioPct
      })
    });
    const data = await res.json();

    const dos = data.dossier_ejecutivo;
    const dosEl = document.getElementById('export-dossier-content');
    if (dosEl && dos) {
      dosEl.innerHTML = `
        <p class="text-purple-300 font-bold">DOC: ${dos.tipo_documento}</p>
        <p class="text-slate-400">DESTINO: ${dos.audiencia_objetivo}</p>
        <div class="my-2 border-t border-slate-800 pt-2 text-slate-300 font-sans leading-relaxed">${dos.resumen_ejecutivo}</div>
        <p class="text-brand-400 font-bold">ROI SOCIAL: ${dos.justificacion_inversion.sroi_retorno_social}</p>
        <p class="text-slate-400">FONDOS: ${dos.justificacion_inversion.fondos_publicos_requeridos}</p>
        <p class="text-slate-300 text-[11px] font-sans mt-2"><strong>Mecanismo:</strong> ${dos.mecanismo_instrumentacion}</p>
      `;
    }

    const wa = data.boletin_audio_comunitario;
    const waEl = document.getElementById('export-whatsapp-content');
    if (waEl && wa) {
      waEl.innerText = wa.script_completo;
    }

    const pb = data.playbook_comerciante;
    const pbEl = document.getElementById('export-merchant-content');
    if (pbEl && pb) {
      pbEl.innerHTML = `
        <p class="text-cyan-300 font-bold text-xs">${pb.tipo_documento}</p>
        <p class="text-slate-400 text-[11px] mb-2">Meta: ${pb.objetivo_inmediato}</p>
        <div class="space-y-1.5 text-slate-300 text-xs">
          <strong class="text-amber-400 text-[11px]">Acciones Semana 1:</strong>
          ${pb.acciones_semana_1.map(a => `<p class="pl-2 border-l border-cyan-500/40">${a}</p>`).join('')}
          <strong class="text-amber-400 text-[11px] pt-2 block">Acciones Semana 2:</strong>
          ${pb.acciones_semana_2.map(a => `<p class="pl-2 border-l border-brand-500/40">${a}</p>`).join('')}
        </div>
        <div class="mt-3 p-2 rounded bg-amber-950/40 border border-amber-800 text-[11px] text-amber-300">
          💡 <strong>Regla de Oro:</strong> ${pb.regla_de_oro}
        </div>
      `;
    }
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error('Error cargando exportación polimórfica:', err);
  }
}

function copyToClipboard(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('¡Copiado con éxito al portapapeles!');
  });
}
