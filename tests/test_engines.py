import unittest
import os
from engine.ingestion import DispersedDataIngestor
from engine.causal_graph import CausalCorrelationEngine
from engine.storyteller import SocioeconomicStoryteller
from engine.simulator import SocioeconomicSimulator
from engine.polymorphic_exporter import PolymorphicDecisionExporter
from app import app

class TestSintesisViva(unittest.TestCase):
    def setUp(self):
        self.data_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
        self.ingestor = DispersedDataIngestor(self.data_dir)
        self.client = app.test_client()

    def test_ingestion_snapshot(self):
        snapshot = self.ingestor.get_ingested_snapshot()
        self.assertIn('sources_detected', snapshot)
        self.assertGreaterEqual(snapshot['sources_detected']['whatsapp_notes_count'], 4)
        self.assertGreaterEqual(snapshot['sources_detected']['sales_records_count'], 10)
        self.assertIn('financial_trends', snapshot)
        self.assertIn('caida_margen_puntos', snapshot['financial_trends'])

    def test_causal_graph_analysis(self):
        snapshot = self.ingestor.get_ingested_snapshot()
        engine = CausalCorrelationEngine(snapshot)
        analysis = engine.analyze_cross_correlations()
        self.assertIn('nodes', analysis)
        self.assertIn('edges', analysis)
        self.assertIn('insights', analysis)
        self.assertGreaterEqual(len(analysis['nodes']), 5)
        self.assertGreaterEqual(len(analysis['insights']), 3)

    def test_storyteller_4_acts(self):
        snapshot = self.ingestor.get_ingested_snapshot()
        causal = CausalCorrelationEngine(snapshot).analyze_cross_correlations()
        storyteller = SocioeconomicStoryteller(causal, snapshot)
        story = storyteller.generate_narrative_story()
        self.assertIn('gancho', story)
        self.assertIn('problema_y_consecuencias', story)
        self.assertIn('la_solucion', story)
        self.assertIn('flujo_y_cierre', story)
        self.assertTrue('Marta' in story['gancho']['relato'] or 'Doña' in story['gancho']['relato'])

    def test_simulator_bounds(self):
        snapshot = self.ingestor.get_ingested_snapshot()
        simulator = SocioeconomicSimulator(snapshot)
        res_zero = simulator.run_simulation(0, 0, 0)
        self.assertLessEqual(res_zero['proyecciones']['margen_comercial_proyectado_pct'], 0)
        res_full = simulator.run_simulation(100, 5000000, 100)
        self.assertGreater(res_full['proyecciones']['margen_comercial_proyectado_pct'], 15.0)
        self.assertGreater(res_full['proyecciones']['retorno_social_inversion_sroi'], 1.0)

    def test_polymorphic_exporter(self):
        snapshot = self.ingestor.get_ingested_snapshot()
        causal = CausalCorrelationEngine(snapshot).analyze_cross_correlations()
        story = SocioeconomicStoryteller(causal, snapshot).generate_narrative_story()
        sim = SocioeconomicSimulator(snapshot).run_simulation(50, 2000000, 60)
        exporter = PolymorphicDecisionExporter(story, sim)

        dossier = exporter.export_executive_dossier()
        audio = exporter.export_community_audio_script()
        playbook = exporter.export_tactical_merchant_guide()

        self.assertIn('Dossier', dossier['tipo_documento'])
        self.assertIn('WHATSAPP', audio['script_completo'])
        self.assertIn('acciones_semana_1', playbook)

    def test_flask_api_routes(self):
        routes = ['/', '/api/status', '/api/ingest/snapshot', '/api/causal/analysis', '/api/story/narrative']
        for r in routes:
            res = self.client.get(r)
            self.assertEqual(res.status_code, 200)

        post_sim = self.client.post('/api/simulator/run', json={'tasa_compra_colectiva_pct': 50})
        self.assertEqual(post_sim.status_code, 200)

        post_sig = self.client.post('/api/ingest/add_signal', json={
            'remitente': 'Test Store',
            'contenido': 'Test signal for causal verification'
        })
        self.assertEqual(post_sig.status_code, 200)

if __name__ == '__main__':
    unittest.main()
