import { useState } from "react";
import { PlanetCandidate, AgentParameter } from "@/types/exoplanet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AgentPanelProps {
  agentType: "silhouette" | "metronome" | "reality" | "mirage";
  planet: PlanetCandidate;
}

export const AgentPanel = ({ agentType, planet }: AgentPanelProps) => {
  const [showExpertMode, setShowExpertMode] = useState(false);

  const agentConfig = getAgentConfig(agentType, planet);

  return (
    <div className="glass-card p-8 space-y-6">
      {/* Agent Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-primary">
            {agentConfig.icon} {agentConfig.name}
          </h3>
          <div className={`text-4xl font-bold ${agentConfig.outputColor}`}>
            {agentConfig.output}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {agentConfig.description}
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        {agentConfig.mainMetrics.map((metric, idx) => (
          <div key={idx} className="bg-card/50 p-4 rounded-lg border border-border/50">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              {metric.name}
            </h4>
            <p className="text-2xl font-bold text-primary">
              {metric.value}
            </p>
            {metric.hint && (
              <p className="text-sm text-green-400 mt-1">
                {metric.hint}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Expert Mode Toggle */}
      <Button
        variant="outline"
        onClick={() => setShowExpertMode(!showExpertMode)}
        className="w-full"
      >
        {showExpertMode ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Ocultar Parámetros Completos
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Ver Parámetros Completos
          </>
        )}
      </Button>

      {/* Expert Mode - Detailed Parameters */}
      {showExpertMode && (
        <div className="space-y-3 pt-4 border-t border-border/50">
          <h4 className="font-semibold text-lg text-secondary mb-4">
            Modo Experto - Todos los Parámetros
          </h4>
          {agentConfig.expertParams.map((param, idx) => (
            <div key={idx} className="bg-card/30 p-4 rounded border border-border/30">
              <div className="flex justify-between items-start mb-1">
                <h5 className="font-semibold text-sm text-primary">
                  {param.name}
                </h5>
                <span className="font-mono text-sm">
                  {param.value}
                  {param.unit && ` ${param.unit}`}
                </span>
              </div>
              {param.error && (
                <p className="text-xs text-muted-foreground mb-2">
                  Error: +{param.error.plus} / {param.error.minus}
                </p>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {param.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Agent configuration helper
function getAgentConfig(agentType: string, planet: PlanetCandidate) {
  const { fullData, agentAnalysis } = planet;

  switch (agentType) {
    case "silhouette":
      return {
        name: "El Rastreador de Siluetas",
        icon: "🔍",
        description: "Evalúa la calidad, forma y claridad de la señal del tránsito (la caída de brillo). Su objetivo es determinar si la señal es robusta y tiene la morfología de un tránsito planetario.",
        output: `${agentAnalysis.silhouetteTracker.confidence}%`,
        outputColor: "text-primary",
        mainMetrics: [
          {
            name: "Relación Señal-Ruido",
            value: agentAnalysis.silhouetteTracker.mainMetrics.signalToNoise.toFixed(1),
            hint: agentAnalysis.silhouetteTracker.mainMetrics.signalToNoise > 30 ? "✓ Señal muy clara" : undefined
          },
          {
            name: "Profundidad del Tránsito",
            value: `${agentAnalysis.silhouetteTracker.mainMetrics.transitDepth.toFixed(1)} ppm`,
            hint: "Porcentaje de brillo que disminuye"
          }
        ],
        expertParams: [
          {
            name: "Duración del Tránsito",
            value: fullData.koi_duration.toFixed(2),
            unit: "horas",
            error: { plus: fullData.koi_duration_err1, minus: fullData.koi_duration_err2 },
            explanation: "Tiempo total en horas que el planeta tarda en pasar frente a su estrella."
          },
          {
            name: "Profundidad del Tránsito",
            value: fullData.koi_depth.toFixed(1),
            unit: "ppm",
            error: { plus: fullData.koi_depth_err1, minus: fullData.koi_depth_err2 },
            explanation: "Porcentaje de brillo que disminuye en la estrella durante el tránsito."
          },
          {
            name: "Parámetro de Impacto",
            value: fullData.koi_impact.toFixed(3),
            error: { plus: fullData.koi_impact_err1, minus: fullData.koi_impact_err2 },
            explanation: "Qué tan centrado pasa el planeta (0 es un cruce perfecto por el centro)."
          },
          {
            name: "Relación Señal-Ruido (SNR)",
            value: fullData.koi_model_snr.toFixed(1),
            explanation: "Claridad de la señal comparada con el ruido de fondo. Un valor alto indica una detección robusta."
          }
        ] as AgentParameter[]
      };

    case "metronome":
      return {
        name: "El Metrónomo Galáctico",
        icon: "⏱️",
        description: "Se enfoca exclusivamente en la periodicidad y regularidad de la órbita. Su objetivo es confirmar que la señal se repite de manera estable y predecible, como un reloj.",
        output: `${agentAnalysis.galacticMetronome.precision}%`,
        outputColor: "text-secondary",
        mainMetrics: [
          {
            name: "Periodo Orbital",
            value: `${agentAnalysis.galacticMetronome.mainMetrics.orbitalPeriod.toFixed(1)} días`,
            hint: "Tiempo de una órbita completa"
          },
          {
            name: "Estabilidad",
            value: agentAnalysis.galacticMetronome.mainMetrics.stability,
            hint: agentAnalysis.galacticMetronome.precision > 90 ? "✓ Muy predecible" : undefined
          }
        ],
        expertParams: [
          {
            name: "Periodo Orbital",
            value: fullData.koi_period.toFixed(3),
            unit: "días",
            error: { plus: fullData.koi_period_err1, minus: fullData.koi_period_err2 },
            explanation: "Tiempo que tarda el planeta en dar una vuelta completa a su estrella (su 'año')."
          },
          {
            name: "Época del Tránsito",
            value: fullData.koi_time0bk.toFixed(4),
            unit: "BJD",
            error: { plus: fullData.koi_time0bk_err1, minus: fullData.koi_time0bk_err2 },
            explanation: "Punto de referencia temporal exacto para el inicio de un tránsito, en formato Barycentric Julian Date."
          }
        ] as AgentParameter[]
      };

    case "reality":
      return {
        name: "El Censor de Realidad",
        icon: "⚖️",
        description: "Evalúa las características de la estrella anfitriona para proveer contexto físico. Ayuda a determinar si el sistema es físicamente plausible.",
        output: `${agentAnalysis.realityCensor.plausibility}%`,
        outputColor: "text-accent",
        mainMetrics: [
          {
            name: "Temperatura Estelar",
            value: `${agentAnalysis.realityCensor.mainMetrics.stellarTemp}K`,
            hint: "Temperatura de la estrella anfitriona"
          },
          {
            name: "Radio del Planeta",
            value: `${agentAnalysis.realityCensor.mainMetrics.planetRadius} R⊕`,
            hint: "Comparado con la Tierra"
          }
        ],
        expertParams: [
          {
            name: "Radio Planetario",
            value: fullData.koi_prad.toFixed(2),
            unit: "R⊕",
            error: { plus: fullData.koi_prad_err1, minus: fullData.koi_prad_err2 },
            explanation: "Tamaño del planeta comparado con la Tierra (Tierra=1)."
          },
          {
            name: "Temperatura de Equilibrio",
            value: fullData.koi_teq.toFixed(0),
            unit: "K",
            error: { plus: fullData.koi_teq_err1, minus: fullData.koi_teq_err2 },
            explanation: "Temperatura estimada en la superficie del planeta, asumiendo distribución uniforme del calor."
          },
          {
            name: "Insolación Recibida",
            value: fullData.koi_insol.toFixed(2),
            unit: "S⊕",
            error: { plus: fullData.koi_insol_err1, minus: fullData.koi_insol_err2 },
            explanation: "Energía que recibe el planeta comparada con la Tierra (Tierra=1)."
          },
          {
            name: "Temperatura Estelar",
            value: fullData.koi_steff.toFixed(0),
            unit: "K",
            error: { plus: fullData.koi_steff_err1, minus: fullData.koi_steff_err2 },
            explanation: "Temperatura de la superficie de la estrella anfitriona."
          },
          {
            name: "Gravedad Superficial Estelar",
            value: fullData.koi_slogg.toFixed(3),
            unit: "log(g)",
            error: { plus: fullData.koi_slogg_err1, minus: fullData.koi_slogg_err2 },
            explanation: "Gravedad en la superficie de la estrella, en escala logarítmica."
          },
          {
            name: "Radio Estelar",
            value: fullData.koi_srad.toFixed(3),
            unit: "R☉",
            error: { plus: fullData.koi_srad_err1, minus: fullData.koi_srad_err2 },
            explanation: "Tamaño de la estrella comparado con el Sol (Sol=1)."
          },
          {
            name: "Magnitud Kepler",
            value: fullData.koi_kepmag.toFixed(3),
            explanation: "Brillo aparente de la estrella visto desde la Tierra, en la banda Kepler."
          }
        ] as AgentParameter[]
      };

    case "mirage":
      return {
        name: "El Anti-Espejismo",
        icon: "🚫",
        description: "Actúa como un detector especializado en firmas conocidas que indican un falso positivo de origen instrumental o por contaminación de otras estrellas.",
        output: `${agentAnalysis.antiMirage.risk}%`,
        outputColor: agentAnalysis.antiMirage.risk > 50 ? "text-destructive" : "text-green-400",
        mainMetrics: [
          {
            name: "Banderas Activas",
            value: agentAnalysis.antiMirage.activeFlags.length.toString(),
            hint: agentAnalysis.antiMirage.activeFlags.length === 0 ? "✓ Sin alertas" : "⚠️ Revisar"
          },
          {
            name: "Estado",
            value: agentAnalysis.antiMirage.activeFlags.length === 0 ? "Limpio" : "Contaminado",
            hint: agentAnalysis.antiMirage.activeFlags.join(", ")
          }
        ],
        expertParams: [
          {
            name: "Bandera 'No es Tránsito'",
            value: fullData.koi_fpflag_nt === 1 ? "ACTIVA" : "Inactiva",
            explanation: "Se activa si la forma de la señal no corresponde a un tránsito planetario real."
          },
          {
            name: "Bandera 'Contaminación Estelar'",
            value: fullData.koi_fpflag_ss === 1 ? "ACTIVA" : "Inactiva",
            explanation: "Se activa si la señal puede ser de otra estrella cercana o un sistema binario eclipsante."
          },
          {
            name: "Bandera 'Desplazamiento de Centroide'",
            value: fullData.koi_fpflag_co === 1 ? "ACTIVA" : "Inactiva",
            explanation: "Se activa si el centro de luz se desplaza durante el tránsito, indicando que la fuente no es la estrella principal."
          },
          {
            name: "Bandera 'Contaminación por Efemérides'",
            value: fullData.koi_fpflag_ec === 1 ? "ACTIVA" : "Inactiva",
            explanation: "Se activa si la señal coincide con un evento conocido de contaminación instrumental del telescopio Kepler."
          }
        ] as AgentParameter[]
      };

    default:
      return {
        name: "Unknown Agent",
        icon: "❓",
        description: "",
        output: "N/A",
        outputColor: "",
        mainMetrics: [],
        expertParams: []
      };
  }
}
