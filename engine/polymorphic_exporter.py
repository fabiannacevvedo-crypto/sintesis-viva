import json

class PolymorphicDecisionExporter:
    """
    Convierte la sintesis causal en 3 artefactos de decision personalizados
    segun el perfil y necesidad del receptor.
    """
    def __init__(self, storyteller_data, simulation_data):
        self.story = storyteller_data
        self.sim = simulation_data

    def export_executive_dossier(self):
        """
        Dossier Ejecutivo de Politica Publica y Financiamiento (Para Municipios, Bancos y Donantes).
        """
        proy = self.sim.get('proyecciones', {})
        return {
            "tipo_documento": "Dossier Técnico de Articulación Económica Territorial",
            "audiencia_objetivo": "Secretaría de Desarrollo Económico Municipal / Bancos de Desarrollo",
            "resumen_ejecutivo": (
                "Diagnóstico territorial automatizado basado en el cruce de datos fiscales, transaccionales y comunitarios. "
                f"Se detecta una pérdida evitable de más de ${proy.get('ahorro_total_estimado_comunidad_ars', 0):,.0f} ARS anuales "
                "por atomización logística en pequeños comercios de proximidad."
            ),
            "justificacion_inversion": {
                "fondos_publicos_requeridos": f"${proy.get('fondos_publicos_movilizados_ars', 0):,.0f} ARS (reasignación presupuestaria programa inactivo)",
                "sroi_retorno_social": f"{proy.get('retorno_social_inversion_sroi', 0)}x por cada peso invertido",
                "reduccion_inflacion_alimentos_local": f"{proy.get('ahorro_canasta_vecinal_pct', 0)}%",
                "probabilidad_supervivencia_comercios": f"{proy.get('probabilidad_supervivencia_comercios_pct', 0)}%"
            },
            "mecanismo_instrumentacion": (
                "Constitución de un Consorcio de Compras de Proximidad simplificado, sin necesidad de balance individual "
                "auditado, respaldado por la nómina de compras conjuntas y trazabilidad digital comunitaria."
            ),
            "recomendacion_normativa": "Dictar Decreto de Excepción de Garantías Hipotecarias para Fondos Semilla Colectivos."
        }

    def export_community_audio_script(self):
        """
        Guión para Audio de WhatsApp / Boletín Barrial (Para Vecinos, Madres de Comedores y Familias).
        """
        proy = self.sim.get('proyecciones', {})
        script = (
            "🎙️ [AUDIO PARA WHATSAPP - Duración: 1 min 15 seg]\n\n"
            "¡Hola vecinas y vecinos del barrio! Les compartimos una noticia fundamental. "
            "Estuvimos analizando juntos los números de nuestros almacenes, panaderías y comedores. "
            "Descubrimos que la suba de precios en el barrio no es culpa de los almaceneros, sino de los fletes separados: "
            "cada negocio estaba pagando fletes carísimos por su cuenta mientras en la municipalidad había un fondo de apoyo sin usar.\n\n"
            f"💪 Con la unión de los comercios y la compra mayorista comunitaria, ¡podemos bajar hasta un {proy.get('ahorro_canasta_vecinal_pct', 0)}% "
            "el precio del pan, verduras y alimentos secos!\n\n"
            "🗓️ Este jueves a las 19:00 hs nos encontramos en el Club Social para poner en marcha el primer pedido conjunto. "
            "Cuidar a nuestros negocios locales es cuidar la comida en nuestras mesas. ¡Pasá este mensaje al grupo de tu cuadra!"
        )
        return {
            "tipo_documento": "Guión Radial / Audio WhatsApp & Flyer Barrial",
            "audiencia_objetivo": "Familias del Barrio, Redes Vecinales, Comedores",
            "tono": "Empático, Esperanzador y Convocante",
            "script_completo": script,
            "canales_difusion_recomendados": ["Grupos de WhatsApp de vecinos", "Carteleras de almacenes", "Radio comunitaria local"]
        }

    def export_tactical_merchant_guide(self):
        """
        Playbook Táctico para Comerciantes y Talleres (Para Dueños de Negocios).
        """
        proy = self.sim.get('proyecciones', {})
        return {
            "tipo_documento": "Playbook Táctico Operativo para Comerciantes",
            "audiencia_objetivo": "Almacenes, Panaderías, Talleres Mecánicos y Cooperativas",
            "objetivo_inmediato": f"Elevar el margen real del terreno negativo al {proy.get('margen_comercial_proyectado_pct', 0)}% en 30 días",
            "acciones_semana_1": [
                "1. Consolidar el volumen semanal de harina, azúcar y aceite en la planilla compartida antes del miércoles 18:00 hs.",
                "2. Contratar un único camión de flete consolidado que distribuya en 6 paradas clave del barrio.",
                "3. Solicitar al proveedor mayorista el descuento escalonado por compra de +5 toneladas."
            ],
            "acciones_semana_2": [
                "1. Activar el Fondo Rotatorio Comunitario para respaldar a los vecinos cumplidores de fiado sin descapitalizar la caja.",
                "2. Colocar el cartel 'Precios de Compra Colectiva' en vidriera para recuperar a los clientes que se iban al hipermercado."
            ],
            "regla_de_oro": "Nunca más comprar fletes individuales para pedidos menores a 500 kg."
        }
