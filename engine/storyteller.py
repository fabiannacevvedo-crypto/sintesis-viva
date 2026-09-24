class SocioeconomicStoryteller:
    """
    Transforma la inteligencia causal de datos dispersos en una
    narrativa estratégica humana, persuasiva y orientada a la acción colectiva.
    """
    def __init__(self, causal_data, snapshot):
        self.causal = causal_data
        self.snapshot = snapshot

    def generate_narrative_story(self):
        fin = self.snapshot.get('financial_trends', {})
        pub = self.snapshot.get('public_indicators', {}).get('indicadores', {})
        total_fiado = fin.get('total_fiado_actual_ars', 630000)
        unused_funds = pub.get('fondo_municipal_apoyo_pymes_presupuesto_total', 15000000) * 0.685

        story = {
            "gancho": {
                "titulo": "El Silencio de los Hornos y el Pan Invisible",
                "subtitulo": "Cuando una planilla en Excel, un audio de WhatsApp y una estadística oficial cuentan la misma tragedia sin que nadie lo note.",
                "personaje_eje": "Doña Marta, panadera de barrio hace 24 años",
                "relato": (
                    "A las 05:15 AM del viernes, Doña Marta no encendió los hornos. En su teléfono sonaba un audio "
                    "del transportista quejándose por el alza del combustible. En el cuaderno de mostrador, la lista de "
                    f"vecinos 'al fiado' superaba ya los ${total_fiado:,.0f} ARS. Mientras tanto, en la página web del "
                    f"municipio, una partida de ${unused_funds:,.0f} ARS destinada al desarrollo productivo permanecía "
                    "intacta y sin ejecutar por 'falta de proyectos viables'. "
                    "Tres realidades ocurriendo a menos de 10 cuadras de distancia, condenadas al silencio porque nadie "
                    "tenía el mapa para conectar sus piezas."
                ),
                "metrica_impacto_emocional": "140 viandas infantiles en riesgo por falta de harina comunitaria"
            },
            "problema_y_consecuencias": {
                "titulo": "La Trampa de la Información Dispersa: Ceguera, Parálisis y Colapso",
                "subtitulo": "El verdadero costo de los datos aislados en la economía real",
                "diagnostico_estructural": (
                    "Las comunidades y los pequeños comerciantes no fracasan por falta de trabajo, "
                    "sino por asimetría y dispersión informativa. La información existe, pero vive en silos incompatibles: "
                    "audios de WhatsApp que se pierden, cuadernos de almacén con números incompletos, ordenanzas "
                    "municipales redactadas en lenguaje burocrático impenetrable y asambleas que terminan en discusiones estériles."
                ),
                "consecuencias_clave": [
                    {
                        "fase": "Ceguera Operativa",
                        "descripcion": "El comercio cree que sus ventas aumentan porque ve más billetes, pero la inflación de flete atomizado destruye su margen real (pasando de +30.1% a -0.9%)."
                    },
                    {
                        "fase": "Parálisis Financiera",
                        "descripcion": "El almacén se convierte en prestamista involuntario de las familias sin liquidez, acumulando deuda incobrable hasta asfixiar su capital de trabajo."
                    },
                    {
                        "fase": "Costo de Oportunidad",
                        "descripcion": "Los recursos públicos existen pero caducan sin uso, mientras que los actores territoriales siguen creyendo que el Estado 'los abandonó'."
                    }
                ]
            },
            "la_solucion": {
                "titulo": "Síntesis Viva: El Puente de Inteligencia Colectiva",
                "subtitulo": "Centralización multifuente, causalidad cruzada y narrativas para la acción",
                "manifiesto": (
                    "Síntesis Viva no es otro tablero con gráficos incomprensibles. Es un motor de resonancia territorial "
                    "que ingesta el caos (audios informales, planillas rústicas, datos abiertos oficiales) y lo traduce "
                    "en un Grafo Causal Vivo capaz de orquestar soluciones reales antes de que ocurra la quiebra."
                ),
                "pilares_tecnologicos": [
                    {
                        "nombre": "Normalización Polimórfica",
                        "detalle": "Lee desde una nota de voz de 20 segundos hasta una planilla CSV o un PDF presupuestario."
                    },
                    {
                        "nombre": "Motor Causal Cruzado",
                        "detalle": "Cruza automáticamente la alerta de transporte con la caída de margen y el fondo municipal disponible."
                    },
                    {
                        "nombre": "Traductor Adaptativo de Audiencias",
                        "detalle": "Genera el informe técnico para el banco, el flyer de WhatsApp para el vecino y el plan táctico para el comerciante."
                    }
                ]
            },
            "flujo_y_cierre": {
                "titulo": "De los Datos Dispersos a la Acción Transformadora",
                "subtitulo": "La Hoja de Ruta de 4 Fases para la Resiliencia Territorial",
                "pasos_flujo": [
                    {"paso": "Fase 1: Ingesta Inclusiva", "detalle": "Captura sin fricción vía WhatsApp, planillas o encuestas rápidas."},
                    {"paso": "Fase 2: Grafo Causal", "detalle": "Detección de patrones invisibles y correlación multifuente automática."},
                    {"paso": "Fase 3: Simulación 'What-If'", "detalle": "Modelado de impacto económico antes de gastar un solo peso."},
                    {"paso": "Fase 4: Ejecución Polimórfica", "detalle": "Despliegue simultáneo de acuerdos de compra agrupada y solicitud de fondos."}
                ],
                "llamado_a_la_accion": (
                    "No podemos seguir gestionando la economía social con vendas en los ojos. La información dispersa es "
                    "riqueza desperdiciada y sufrimiento evitable. Conectemos hoy los datos de la comunidad para transformar "
                    "la fragilidad en soberanía económica colectiva. Es momento de actuar."
                ),
                "kpis_meta": {
                    "ahorro_logistico_inmediato": "28.5%",
                    "recuperacion_margen_comercial": "+14 puntos",
                    "desbloqueo_fondos_publicos": "$10.2M ARS"
                }
            }
        }
        return story
