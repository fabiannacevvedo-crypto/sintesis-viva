// server/src/controllers/exportController.js

export const exportPolymorphicArtifacts = (req, res) => {
  const { tasaCompraColectiva = 50, fondoGarantia = 2000000, subsidioMunicipal = 60 } = req.body;

  const activatedPublicFunds = 4200000 * (Number(subsidioMunicipal) / 100);
  const basketSavings = ((Number(tasaCompraColectiva) / 100) * 12.0 + (Number(subsidioMunicipal) / 100) * 4.5).toFixed(1);

  const dossierEjecutivo = {
    tipoDocumento: "Dossier Técnico de Articulación Económica Territorial",
    destinatario: "Secretaría de Desarrollo Social y Económico Municipal / Banco de Desarrollo",
    resumen: "Diagnóstico territorial que identifica una pérdida evitable por fletes individuales atomizados en comercios barriales.",
    justificacionPresupuestaria: {
      fondosRequeridosARS: `$${activatedPublicFunds.toLocaleString('es-AR')} ARS`,
      retornoSocialSROI: "2.8x por cada peso invertido",
      reduccionInflacionLocal: `${basketSavings}% en alimentos de primera necesidad`,
      impactoComercios: "Supervivencia comercial proyectada en 85.5% (frente a 35% basal)"
    },
    propuestaNormativa: "Decreto de Excepción de Garantías Hipotecarias Individuales para Nodos de Compra Colectiva."
  };

  const scriptWhatsApp = {
    tipoDocumento: "Boletín Barrial y Audio para WhatsApp",
    destinatario: "Vecinas, Vecinos y Familias del Barrio",
    formato: "Audio de 1 minuto 15 segundos + Flyer para grupos",
    contenido: `🎙️ *[AUDIO PARA GRUPOS DE VECINOS - 1 MINUTO]*\n\n¡Hola a todos en el barrio! Les traemos una noticia importantísima.\nEstuvimos cruzando los números de nuestros almacenes, panaderías y comedores. Descubrimos que el aumento de precios no es culpa de los almaceneros, sino de los fletes separados que cada negocio pagaba solo, mientras en el municipio había fondos de transporte sin usar.\n\n💪 *Organizando compras mayoristas conjuntas, podemos bajar hasta un ${basketSavings}% el precio del pan, verduras y fideos en todo el barrio.*\n\n🗓️ Este jueves nos juntamos a las 19:00 hs en el Club Social para coordinar el primer pedido unificado. ¡Reenviá este mensaje al grupo de tu cuadra!`
  };

  const playbookComerciante = {
    tipoDocumento: "Playbook Táctico para Pequeños Comercios",
    destinatario: "Almacenes, Panaderías, Carnicerías y Talleres",
    metaInmediata: "Recuperar margen neto del -0.9% al +16.6% en 30 días",
    semana1: [
      "Consolidar la planilla de pedidos mayoristas (harina, aceite, azúcar) antes del miércoles 18:00 hs.",
      "Contratar un único camión con parada en 4 puntos estratégicos del barrio.",
      "Exigir el descuento mayorista por volumen agrupado (+4 toneladas)."
    ],
    semana2: [
      "Activar el Fondo Rotatorio Comunitario para absorber desfases de fiado sin descapitalizar la caja.",
      "Señalizar en góndola 'Precio de Compra Colectiva' para recuperar clientes del hipermercado."
    ],
    reglaDeOro: "Prohibido contratar fletes individuales para pedidos menores a 500 kg."
  };

  res.json({
    success: true,
    data: {
      dossierEjecutivo,
      scriptWhatsApp,
      playbookComerciante
    }
  });
};
