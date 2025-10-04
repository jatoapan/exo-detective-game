import { PlanetCandidate } from "@/types/exoplanet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Clock, Ruler, ThermometerSun, Zap } from "lucide-react";

interface PreliminaryDataProps {
  planet: PlanetCandidate;
  onGuess: (guess: boolean) => void;
  hasGuessed: boolean;
}

export const PreliminaryData = ({ planet, onGuess, hasGuessed }: PreliminaryDataProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Planet Image */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-2xl font-bold text-primary mb-4">
          Vista del Candidato
        </h3>
        <div className="relative rounded-lg overflow-hidden aspect-square">
          <img
            src={planet.imageUrl}
            alt={planet.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Preliminary Metrics */}
      <div className="space-y-6">
        <div className="glass-card p-6">
          <h3 className="text-2xl font-bold text-primary mb-6">
            Datos Preliminares
          </h3>

          <div className="space-y-4">
            {/* Orbital Period */}
            <DataCard
              icon={<Clock className="h-5 w-5" />}
              title="Periodo Orbital"
              value={`${planet.preliminaryData.orbitalPeriod.toFixed(1)} días`}
              hint="Tiempo que tarda en dar una vuelta completa a su estrella"
              visualHint={
                planet.preliminaryData.orbitalPeriod > 200 && 
                planet.preliminaryData.orbitalPeriod < 500
                  ? "Órbita compatible con zona habitable"
                  : undefined
              }
            />

            {/* Planet Radius */}
            <DataCard
              icon={<Ruler className="h-5 w-5" />}
              title="Radio del Planeta"
              value={`${planet.preliminaryData.planetRadius.toFixed(2)} R⊕`}
              hint="Tamaño comparado con la Tierra (1.0 = Tierra)"
              visualHint={
                planet.preliminaryData.planetRadius < 2
                  ? "Tamaño rocoso terrestre"
                  : undefined
              }
            />

            {/* Equilibrium Temperature */}
            <DataCard
              icon={<ThermometerSun className="h-5 w-5" />}
              title="Temperatura de Equilibrio"
              value={`${planet.preliminaryData.equilibriumTemp}K`}
              hint="Temperatura estimada en la superficie del planeta"
              visualHint={
                planet.preliminaryData.equilibriumTemp > 250 &&
                planet.preliminaryData.equilibriumTemp < 320
                  ? "Rango de temperatura habitable"
                  : undefined
              }
            />

            {/* Habitable Zone */}
            <DataCard
              icon={<Zap className="h-5 w-5" />}
              title="Zona Habitable"
              value={planet.preliminaryData.habitableZone ? "SÍ" : "NO"}
              hint="Si el planeta recibe la cantidad adecuada de energía para agua líquida"
              visualHint={
                planet.preliminaryData.habitableZone
                  ? "✓ En la zona habitable"
                  : "✗ Fuera de la zona habitable"
              }
              isHighlight={planet.preliminaryData.habitableZone}
            />
          </div>
        </div>

        {/* The Big Question */}
        {!hasGuessed && (
          <div className="glass-card p-8 text-center space-y-6 border-primary/30">
            <h3 className="text-2xl font-bold text-primary">
              Tu Decisión
            </h3>
            <p className="text-lg text-foreground">
              ¿Crees que es un exoplaneta confirmado?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onGuess(true)}
                className="w-32 bg-primary hover:bg-primary/80"
              >
                SÍ
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onGuess(false)}
                className="w-32"
              >
                NO
              </Button>
            </div>
          </div>
        )}

        {hasGuessed && (
          <div className="glass-card p-6 text-center border-secondary/30">
            <p className="text-lg text-secondary">
              ✓ Decisión registrada. Revisa el análisis de los agentes a continuación.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface DataCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
  visualHint?: string;
  isHighlight?: boolean;
}

const DataCard = ({ icon, title, value, hint, visualHint, isHighlight }: DataCardProps) => {
  return (
    <div className={`p-4 rounded-lg border ${isHighlight ? 'bg-primary/10 border-primary/30' : 'bg-card/30 border-border/50'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-primary mt-1">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{title}</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{hint}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-2xl font-bold text-primary">{value}</p>
            {visualHint && (
              <p className="text-sm text-green-400 mt-1">
                {visualHint}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
