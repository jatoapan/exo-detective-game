import { useState } from "react";
import { PlanetCandidate } from "@/types/exoplanet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreliminaryData } from "./analysis/PreliminaryData";
import { AgentPanel } from "./analysis/AgentPanel";
import { ArrowLeft } from "lucide-react";

interface AnalysisCenterProps {
  planet: PlanetCandidate;
  onBack: () => void;
  onComplete: (userGuess: boolean, isCorrect: boolean) => void;
}

export const AnalysisCenter = ({ planet, onBack, onComplete }: AnalysisCenterProps) => {
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleGuess = (guess: boolean) => {
    setUserGuess(guess);
    setShowAnalysis(true);
    
    // Scroll to analysis section
    setTimeout(() => {
      const analysisSection = document.getElementById('agent-analysis');
      analysisSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFinish = () => {
    const isCorrect = userGuess === planet.isConfirmed;
    onComplete(userGuess!, isCorrect);
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Observatorio
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold glow-text">
            Centro de Análisis
          </h1>
          <p className="text-xl text-primary">
            {planet.name}
          </p>
        </div>

        {/* Preliminary Data Section */}
        <PreliminaryData 
          planet={planet}
          onGuess={handleGuess}
          hasGuessed={userGuess !== null}
        />

        {/* AI Agents Analysis - Only show after guess */}
        {showAnalysis && (
          <div id="agent-analysis" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-secondary">
                Análisis de Agentes IA
              </h2>
              <p className="text-muted-foreground">
                Nuestros cuatro agentes especializados han evaluado los datos
              </p>
            </div>

            <Tabs defaultValue="silhouette" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-card/50 p-2">
                <TabsTrigger value="silhouette" className="text-xs md:text-sm py-3">
                  🔍 Rastreador
                </TabsTrigger>
                <TabsTrigger value="metronome" className="text-xs md:text-sm py-3">
                  ⏱️ Metrónomo
                </TabsTrigger>
                <TabsTrigger value="reality" className="text-xs md:text-sm py-3">
                  ⚖️ Censor
                </TabsTrigger>
                <TabsTrigger value="mirage" className="text-xs md:text-sm py-3">
                  🚫 Anti-Espejismo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="silhouette">
                <AgentPanel
                  agentType="silhouette"
                  planet={planet}
                />
              </TabsContent>

              <TabsContent value="metronome">
                <AgentPanel
                  agentType="metronome"
                  planet={planet}
                />
              </TabsContent>

              <TabsContent value="reality">
                <AgentPanel
                  agentType="reality"
                  planet={planet}
                />
              </TabsContent>

              <TabsContent value="mirage">
                <AgentPanel
                  agentType="mirage"
                  planet={planet}
                />
              </TabsContent>
            </Tabs>

            {/* Finish Button */}
            <div className="text-center pt-8">
              <Button
                size="lg"
                onClick={handleFinish}
                className="text-lg px-12 animate-glow-pulse"
              >
                Ver Veredicto Final
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
