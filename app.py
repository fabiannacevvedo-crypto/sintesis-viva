import os
import json
from flask import Flask, render_template, jsonify, request
from engine.ingestion import DispersedDataIngestor
from engine.causal_graph import CausalCorrelationEngine
from engine.storyteller import SocioeconomicStoryteller
from engine.simulator import SocioeconomicSimulator
from engine.polymorphic_exporter import PolymorphicDecisionExporter

app = Flask(__name__, static_folder='static', template_folder='templates')

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data', 'raw')
ingestor = DispersedDataIngestor(DATA_DIR)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "online",
        "platform": "Síntesis Viva - Motor de Storytelling Socioeconómico y Acción Colectiva",
        "version": "1.1.0",
        "desafio": "Dificultad para transformar información dispersa en información útil",
        "area_tematica": "Sociedad y economía"
    })

@app.route('/api/ingest/snapshot', methods=['GET'])
def get_snapshot():
    snapshot = ingestor.get_ingested_snapshot()
    return jsonify(snapshot)

@app.route('/api/ingest/add_signal', methods=['POST'])
def add_signal():
    data = request.get_json() or {}
    remitente = data.get('remitente', 'Vecino Participante')
    contenido = data.get('contenido', '').strip()
    canal = data.get('canal', 'WhatsApp Comunitario')
    tono = data.get('tono', 'Alerta en Vivo')
    tema = data.get('tema', 'Cadena de Abastecimiento')

    if not contenido:
        return jsonify({"error": "El contenido del mensaje no puede estar vacío"}), 400

    new_sig = ingestor.add_custom_signal(remitente, contenido, canal, tono, tema)
    snapshot = ingestor.get_ingested_snapshot()
    causal_engine = CausalCorrelationEngine(snapshot)
    analysis = causal_engine.analyze_cross_correlations()

    return jsonify({
        "success": True,
        "signal_added": new_sig,
        "updated_causal_analysis": analysis
    })

@app.route('/api/causal/analysis', methods=['GET'])
def get_causal_analysis():
    snapshot = ingestor.get_ingested_snapshot()
    causal_engine = CausalCorrelationEngine(snapshot)
    analysis = causal_engine.analyze_cross_correlations()
    return jsonify(analysis)

@app.route('/api/story/narrative', methods=['GET'])
def get_story_narrative():
    snapshot = ingestor.get_ingested_snapshot()
    causal_engine = CausalCorrelationEngine(snapshot)
    causal_analysis = causal_engine.analyze_cross_correlations()
    storyteller = SocioeconomicStoryteller(causal_analysis, snapshot)
    narrative = storyteller.generate_narrative_story()
    return jsonify(narrative)

@app.route('/api/simulator/run', methods=['POST'])
def run_simulation():
    data = request.get_json() or {}
    tasa_compra = float(data.get('tasa_compra_colectiva_pct', 50.0))
    fondo_garantia = float(data.get('fondo_garantia_ars', 2000000.0))
    subsidio_pct = float(data.get('subsidio_municipal_pct', 60.0))

    snapshot = ingestor.get_ingested_snapshot()
    simulator = SocioeconomicSimulator(snapshot)
    results = simulator.run_simulation(
        tasa_compra_colectiva=tasa_compra,
        fondo_garantia=fondo_garantia,
        subsidio_municipal_pct=subsidio_pct
    )
    return jsonify(results)

@app.route('/api/export/decision_artifacts', methods=['POST'])
def export_artifacts():
    data = request.get_json() or {}
    tasa_compra = float(data.get('tasa_compra_colectiva_pct', 50.0))
    fondo_garantia = float(data.get('fondo_garantia_ars', 2000000.0))
    subsidio_pct = float(data.get('subsidio_municipal_pct', 60.0))

    snapshot = ingestor.get_ingested_snapshot()
    causal_engine = CausalCorrelationEngine(snapshot)
    causal_analysis = causal_engine.analyze_cross_correlations()
    storyteller = SocioeconomicStoryteller(causal_analysis, snapshot)
    narrative = storyteller.generate_narrative_story()

    simulator = SocioeconomicSimulator(snapshot)
    sim_results = simulator.run_simulation(
        tasa_compra_colectiva=tasa_compra,
        fondo_garantia=fondo_garantia,
        subsidio_municipal_pct=subsidio_pct
    )

    exporter = PolymorphicDecisionExporter(narrative, sim_results)
    return jsonify({
        "dossier_ejecutivo": exporter.export_executive_dossier(),
        "boletin_audio_comunitario": exporter.export_community_audio_script(),
        "playbook_comerciante": exporter.export_tactical_merchant_guide()
    })

if __name__ == '__main__':
    print("Iniciando Síntesis Viva en http://127.0.0.1:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=False)
