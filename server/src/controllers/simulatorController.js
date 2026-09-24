// server/src/controllers/simulatorController.js

export const runSimulation = (req, res) => {
  const { tasaCompraColectiva, fondoGarantia, subsidioMunicipal } = req.body;

  const tc = Number(tasaCompraColectiva) || 50;
  const fg = Number(fondoGarantia) || 2000000;
  const sm = Number(subsidioMunicipal) || 60;

  const baseMargin = -0.9;
  const baseFiado = 630000;

  // 1. Recuperación de margen comercial por compra unificada mayorista
  const wholesaleMarginGain = (tc / 100) * 0.32 * 35.0;

  // 2. Aporte de subsidio municipal logístico desbloqueado
  const activatedPublicFunds = 4200000 * (sm / 100);
  const subsidyMarginGain = (sm / 100) * 7.5;
  const recoveredMargin = Number((baseMargin + wholesaleMarginGain + subsidyMarginGain).toFixed(1));

  // 3. Contención de deuda incobrable por fondo rotatorio
  const badDebtContained = Math.min(90, Number(((fg / 2500000) * 75).toFixed(1)));

  // 4. Ahorro en canasta básica vecinal
  const basketSavings = Number(((tc / 100) * 12.0 + (sm / 100) * 4.5).toFixed(1));

  // 5. Probabilidad de supervivencia de comercios
  const survivalProbability = Math.min(98.0, Number((35.0 + (tc * 0.35) + (sm * 0.20) + (fg / 100000)).toFixed(1)));

  // 6. Retorno Social de Inversión (S-ROI)
  const totalInvestment = activatedPublicFunds + fg;
  const annualizedSavings = (activatedPublicFunds * 2.2) + (baseFiado * 4.0);
  const sRoi = totalInvestment > 0 ? Number((annualizedSavings / totalInvestment).toFixed(2)) : 1.0;

  res.json({
    success: true,
    data: {
      parametrosEntrada: {
        tasaCompraColectiva: tc,
        fondoGarantia: fg,
        subsidioMunicipal: sm
      },
      proyecciones: {
        margenComercialProyectadoPct: recoveredMargin,
        ahorroCanastaBasicaPct: basketSavings,
        probabilidadSupervivenciaPct: survivalProbability,
        deudaInformalContenidaPct: badDebtContained,
        fondosPublicosMovilizadosARS: activatedPublicFunds,
        retornoSocialInversionSROI: sRoi,
        ahorroTotalComunidadARS: annualizedSavings
      },
      diagnosticoCualitativo: recoveredMargin > 12 && survivalProbability > 80
        ? "Escenario de Alta Resiliencia: La compra unificada y el desbloqueo de subsidios garantizan la viabilidad del polo comercial barrial."
        : "Escenario de Transición: Se atenúa el riesgo de quiebra pero se requiere mayor volumen de compras comunitarias."
    }
  });
};
