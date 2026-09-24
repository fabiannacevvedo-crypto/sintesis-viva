import json
import os
import pandas as pd

class DispersedDataIngestor:
    def __init__(self, data_dir):
        self.data_dir = data_dir
        self.dynamic_signals = []

    def load_whatsapp_notes(self):
        path = os.path.join(self.data_dir, 'whatsapp_community_notes.json')
        notes = []
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                notes = json.load(f)
        return self.dynamic_signals + notes

    def add_custom_signal(self, remitente, contenido, canal="WhatsApp Comunitario", tono="Alerta Territorial", tema="Logística & Precios"):
        signal = {
            "id": f"dyn-{len(self.dynamic_signals) + 1}",
            "fecha": "En Vivo (Ahora)",
            "remitente": remitente,
            "canal": canal,
            "tipo": "Mensaje en Vivo",
            "contenido": contenido,
            "tono": tono,
            "tema": tema
        }
        self.dynamic_signals.insert(0, signal)
        return signal

    def load_sales_csv(self):
        path = os.path.join(self.data_dir, 'microbusiness_sales.csv')
        if not os.path.exists(path):
            return pd.DataFrame()
        return pd.read_csv(path)

    def load_public_indicators(self):
        path = os.path.join(self.data_dir, 'public_indicators.json')
        if not os.path.exists(path):
            return {}
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def load_assembly_minutes(self):
        path = os.path.join(self.data_dir, 'assembly_minutes.txt')
        if not os.path.exists(path):
            return ''
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()

    def get_ingested_snapshot(self):
        wa = self.load_whatsapp_notes()
        sales_df = self.load_sales_csv()
        public = self.load_public_indicators()
        minutes = self.load_assembly_minutes()

        csv_metrics = {}
        if not sales_df.empty:
            semana1 = sales_df[sales_df['semana'] == 'Semana 1']
            semana5 = sales_df[sales_df['semana'] == 'Semana 5']
            
            avg_margin_s1 = semana1['margen_real_pct'].mean()
            avg_margin_s5 = semana5['margen_real_pct'].mean()
            total_fiado_s1 = semana1['monto_fiado_acumulado'].sum()
            total_fiado_s5 = semana5['monto_fiado_acumulado'].sum()
            total_clients_s1 = semana1['clientes_atendidos'].sum()
            total_clients_s5 = semana5['clientes_atendidos'].sum()

            csv_metrics = {
                'margen_promedio_inicial_pct': round(avg_margin_s1, 1),
                'margen_promedio_actual_pct': round(avg_margin_s5, 1),
                'caida_margen_puntos': round(avg_margin_s1 - avg_margin_s5, 1),
                'explosion_fiado_pct': round(((total_fiado_s5 - total_fiado_s1) / total_fiado_s1) * 100, 1),
                'total_fiado_actual_ars': int(total_fiado_s5),
                'caida_afluencia_clientes_pct': round(((total_clients_s1 - total_clients_s5) / total_clients_s1) * 100, 1)
            }

        return {
            'sources_detected': {
                'whatsapp_notes_count': len(wa),
                'sales_records_count': len(sales_df),
                'public_data_indicators_count': len(public.get('indicadores', {})),
                'assembly_text_words': len(minutes.split()),
                'dynamic_signals_count': len(self.dynamic_signals)
            },
            'whatsapp_signals': wa,
            'financial_trends': csv_metrics,
            'public_indicators': public,
            'assembly_extract': minutes[:350] + '...'
        }
