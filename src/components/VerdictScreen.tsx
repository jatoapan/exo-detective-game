import { PlanetCandidate } from "@/types/exoplanet";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface VerdictScreenProps {
  planet: PlanetCandidate;
  userGuess: boolean;
  isCorrect: boolean;
  onAnalyzeAnother: () => void;
}

export const VerdictScreen = ({ planet, userGuess, isCorrect, onAnalyzeAnother }: VerdictScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full space-y-12">
        {/* Result Header */}
        <div className="text-center space-y-6">
          {isCorrect ? (
            <>
              <CheckCircle2 className="h-32 w-32 text-green-400 mx-auto animate-scale-in" />
              <h1 className="text-5xl md:text-6xl font-bold text-green-400 glow-text">
                ¡Misión Cumplida!
              </h1>
              <p className="text-2xl text-muted-foreground">
                Tu análisis fue correcto
              </p>
            </>
          ) : (
            <>
              <XCircle className="h-32 w-32 text-destructive mx-auto animate-scale-in" />
              <h1 className="text-5xl md:text-6xl font-bold text-destructive glow-text">
                No Esta Vez
              </h1>
              <p className="text-2xl text-muted-foreground">
                Pero aprendiste algo nuevo
              </p>
            </>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Your Answer */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold text-primary">
              Tu Respuesta
            </h3>
            <p className="text-3xl font-bold">
              {userGuess ? "Exoplaneta Confirmado" : "Falso Positivo"}
            </p>
          </div>

          {/* Correct Answer */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold text-secondary">
              Respuesta Correcta
            </h3>
            <p className="text-3xl font-bold">
              {planet.isConfirmed ? "Exoplaneta Confirmado" : "Falso Positivo"}
            </p>
          </div>
        </div>

        {/* Agent Summary */}
        <div className="glass-card p-8 space-y-6">
          <h3 className="text-2xl font-bold text-primary text-center mb-6">
            Resumen de Análisis de Agentes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">🔍 Rastreador de Siluetas</span>
                <span className="text-2xl font-bold text-primary">
                  {planet.agentAnalysis.silhouetteTracker.confidence}%
                </span>
              </div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">⏱️ Metrónomo Galáctico</span>
                <span className="text-2xl font-bold text-secondary">
                  {planet.agentAnalysis.galacticMetronome.precision}%
                </span>
              </div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">⚖️ Censor de Realidad</span>
                <span className="text-2xl font-bold text-accent">
                  {planet.agentAnalysis.realityCensor.plausibility}%
                </span>
              </div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">🚫 Anti-Espejismo</span>
                <span className={`text-2xl font-bold ${
                  planet.agentAnalysis.antiMirage.risk > 50 ? 'text-destructive' : 'text-green-400'
                }`}>
                  {planet.agentAnalysis.antiMirage.risk}% riesgo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Note */}
        <div className="glass-card p-6 border-primary/30">
          <h4 className="font-semibold text-lg mb-2 text-primary">
            💡 ¿Sabías que?
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {planet.isConfirmed ? (
              <>
                Este exoplaneta fue confirmado por la misión Kepler de la NASA después de un riguroso 
                proceso de validación. Los científicos utilizan múltiples métodos de análisis similares 
                a nuestros agentes de IA para eliminar falsos positivos y confirmar la existencia de 
                planetas más allá de nuestro sistema solar.
              </>
            ) : (
              <>
                Aproximadamente el 90% de las señales detectadas inicialmente resultan ser falsos positivos. 
                Estos pueden ser causados por sistemas binarios de estrellas, manchas estelares, o incluso 
                ruido instrumental. Por eso es tan importante el proceso de validación riguroso que realizan 
                los científicos de la NASA.
              </>
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onAnalyzeAnother}
            className="text-lg px-12 py-6 animate-glow-pulse hover-glow"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Analizar Otro Candidato
          </Button>
        </div>
      </div>
    </div>
  );
};
