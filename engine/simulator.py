class SocioeconomicSimulator:
    """
    Simulador de escenarios 'What-If' para la toma de decisiones comunitarias y de políticas públicas.
    Permite proyectar el impacto económico y social de intervenciones colectivas.
    """
    def __init__(self, baseline_data):
        self.baseline = baseline_data

    def run_simulation(self, tasa_compra_colectiva=50.0, fondo_garantia=2000000.0, subsidio_municipal_pct=60.0):
        base_margin = -0.9 # Margen actual negativo promedio
        base_fiado = 630000 # Deuda informal acumulada promedio por manzana
        base_logistics_cost_impact = 34.2 # % de sobrecosto por fletes atomizados

        # 1. Impacto de Compras Colectivas en Margen (Ahorro de escala mayorista)
        logistics_saving_factor = (tasa_compra_colectiva / 100.0) * 0.32
        wholesale_margin_recovery = logistics_saving_factor * 35.0

        # 2. Desbloqueo de Subsidio Municipal Logístico
        activated_public_funds = 4200000 * (subsidio_municipal_pct / 100.0)
        direct_freight_subsidy_per_store = activated_public_funds / 15.0
        subsidy_margin_recovery = (subsidio_municipal_pct / 100.0) * 7.5

        # Margen total recuperado
        recovered_margin = base_margin + wholesale_margin_recovery + subsidy_margin_recovery

        # 3. Alivio de Liquidez y Reducción de Quiebre por Fondo Rotatorio
        bad_debt_mitigation_pct = min(90.0, (fondo_garantia / 2500000.0) * 75.0)

        # 4. Impacto en el Consumidor Final (Canasta Barrial)
        basket_discount_pct = round((tasa_compra_colectiva / 100.0) * 12.0 + (subsidio_municipal_pct / 100.0) * 4.5, 1)

        # 5. Probabilidad de Supervivencia de Comercios Locales (Baseline es 35%)
        survival_probability = min(98.0, 35.0 + (tasa_compra_colectiva * 0.35) + (subsidio_municipal_pct * 0.20) + (fondo_garantia / 100000.0))

        # 6. Retorno Social de la Inversión (S-ROI)
        total_investment = activated_public_funds + fondo_garantia
        annualized_social_savings = (direct_freight_subsidy_per_store * 15 * 6) + (base_fiado * 4.5) + (activated_public_funds * 1.8)
        s_roi_ratio = round(annualized_social_savings / max(1.0, total_investment), 2) if total_investment > 0 else 1.0

        return {
            "inputs": {
                "tasa_compra_colectiva_pct": tasa_compra_colectiva,
                "fondo_garantia_ars": fondo_garantia,
                "subsidio_municipal_activado_pct": subsidio_municipal_pct
            },
            "proyecciones": {
                "margen_comercial_proyectado_pct": round(recovered_margin, 1),
                "ahorro_canasta_vecinal_pct": basket_discount_pct,
                "probabilidad_supervivencia_comercios_pct": round(survival_probability, 1),
                "fondos_publicos_movilizados_ars": int(activated_public_funds),
                "deuda_informal_contenida_pct": round(bad_debt_mitigation_pct, 1),
                "retorno_social_inversion_sroi": s_roi_ratio,
                "ahorro_total_estimado_comunidad_ars": int(annualized_social_savings)
            },
            "evaluacion_cualitativa": self._get_narrative_evaluation(recovered_margin, survival_probability)
        }

    def _get_narrative_evaluation(self, margin, survival):
        if margin > 12.0 and survival > 80.0:
            return "Escenario de Alta Resiliencia: La articulación colectiva y el rescate de fondos municipales aseguran la viabilidad del polo comercial y bajan los precios de la canasta básica."
        elif margin > 4.0:
            return "Escenario de Estabilización Moderada: Se detiene la hemorragia de capital de trabajo, pero se requiere mayor adhesión de comercios a la compra unificada."
        else:
            return "Escenario de Alto Riesgo: Los parámetros actuales son insuficientes para revertir el colapso del margen comercial ante la inflación de fletes."
