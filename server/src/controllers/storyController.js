// server/src/controllers/storyController.js
import { db } from '../models/db.js';

export const getStoryNarrative = (req, res) => {
  const actores = db.getAllActores();
  const story = {
    areaTematica: "Sociedad y economía",
    desafio: "Dificultad para transformar información dispersa en información útil",
    aQuienesAfecta: [
      {
        grupo: "Comerciantes y Micro-Pymes",
        problema: "Ceguera financiera al no percibir que el costo logístico individual supera su margen.",
        impacto: "Margen real en terreno negativo (-0.9%) y riesgo de quiebra a 3 semanas."
      },
      {
        grupo: "Familias y Hogares Vulnerables",
        problema: "Falta de liquidez que obliga a comprar con sobreprecios y recurrir al crédito informal.",
        impacto: "Aumento del 190% en deuda informal acumulada ('fiado') y canasta básica encarecida."
      },
      {
        grupo: "Comedores y Merenderos Comunitarios",
        problema: "Aumento abrupto de raciones sin canales de alerta temprana coordinados.",
        impacto: "Demanda de viandas creció de 85 a 140 raciones diarias sin presupuesto adicional."
      },
      {
        grupo: "Gobiernos Locales y Municipios",
        problema: "Incapacidad para canalizar fondos de reactivación por exigencias burocráticas.",
        impacto: "Más de $10.200.000 ARS inactivos y subejecutados en programas de apoyo pyme."
      }
    ],
    metodologiaStorytelling: {
      acto1Gancho: {
        titulo: "Doña Marta y el Pan Invisible",
        subtitulo: "La paradoja de vender más y quebrar al mismo tiempo",
        relato: "A las 05:15 AM del viernes, Doña Marta no encendió los hornos. En su teléfono se acumulaban audios de transportistas quejándose por el alza del 28% en combustibles. En el cuaderno de mostrador, el fiado de vecinos superaba los $630.000 ARS. Y a solo 10 cuadras, la Secretaría de Desarrollo tenía $10.2M ARS inactivos por 'falta de proyectos formulados'. Tres realidades incomunicadas por formatos incompatibles.",
        metricaClave: "140 viandas infantiles en riesgo por desabastecimiento de harina"
      },
      acto2ProblemaConsecuencias: {
        titulo: "La Trampa de los Datos Silenciados",
        diagnostico: "La información existe pero vive en silos: audios efímeros de WhatsApp, libretas de papel, boletines municipales impenetrables y asambleas que terminan en discusiones estériles.",
        consecuencias: [
          { tipo: "Ceguera Operativa", detalle: "El comerciante ve entrar más billetes por inflación pero su costo de reposición subió 32%." },
          { tipo: "Colapso de Liquidez", detalle: "El almacén se convierte en banco forzado de las familias sin tener liquidez formal." },
          { tipo: "Parálisis Pública", detalle: "Recursos estatales millonarios vencen sin uso mientras la comunidad siente abandono." }
        ]
      },
      acto3LaSolucion: {
        titulo: "Síntesis Viva: El Puente de Inteligencia Colectiva",
        manifiesto: "No construimos un tablero pasivo ni un chatbot genérico. Síntesis Viva es un motor de resonancia territorial que normaliza cualquier formato desestructurado, infiere causalidades ocultas y alinea a los actores hacia la compra colectiva.",
        pilares: [
          "Ingesta Multifuente Flexible (WhatsApp, CSV, Datos Abiertos, Minutas)",
          "Grafo Causal Relacional con Trazabilidad y Eliminación Lógica",
          "Simulador 'What-If' con Retorno Social de Inversión (S-ROI)",
          "Generación Polimórfica Adaptada a Cada Audiencia"
        ]
      },
      acto4FlujoYCierre: {
        titulo: "De la Dispersión a la Soberanía Comunitaria",
        hojaDeRuta: [
          "Fase 1: Ingesta Inclusiva sin barreras digitales",
          "Fase 2: Grafo Causal y detección de la causa raíz",
          "Fase 3: Simulación 'What-If' reactiva",
          "Fase 4: Ejecución Tri-Partita Simultánea"
        ],
        llamadoALaAccion: "No podemos seguir gobernando la economía comunitaria con vendas en los ojos. La información dispersa no es falta de datos: es riqueza desperdiciada. Conectemos hoy los datos del barrio para transformar la fragilidad individual en soberanía económica colectiva."
      }
    }
  };
  res.json({ success: true, data: story });
};
