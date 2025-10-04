import { useState } from "react";
import { PlanetCandidate } from "@/types/exoplanet";
import { Button } from "@/components/ui/button";
import { PreliminaryData } from "./analysis/PreliminaryData";
import { AgentPanel } from "./analysis/AgentPanel";
import { LoadingAnimation } from "./analysis/LoadingAnimation";
import { JudgeAnimation } from "./analysis/JudgeAnimation";
import { ArrowLeft, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react";

interface AnalysisCenterProps {
  planet: PlanetCandidate;
  onBack: () => void;
  onComplete: (userGuess: boolean, isCorrect: boolean) => void;
}

type AnalysisStep = "preliminary" | "loading" | "silhouette" | "metronome" | "reality" | "mirage" | "judge";

export const AnalysisCenter = ({ planet, onBack, onComplete }: AnalysisCenterProps) => {
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("preliminary");

  const agentSteps: AnalysisStep[] = ["silhouette", "metronome", "reality", "mirage"];
  const currentAgentIndex = agentSteps.indexOf(currentStep);

  const handleGuess = (guess: boolean) => {
    setUserGuess(guess);
    setCurrentStep("loading");
  };

  const handleLoadingComplete = () => {
    setCurrentStep("silhouette");
  };

  const handleNext = () => {
    if (currentStep === "silhouette") setCurrentStep("metronome");
    else if (currentStep === "metronome") setCurrentStep("reality");
    else if (currentStep === "reality") setCurrentStep("mirage");
    else if (currentStep === "mirage") setCurrentStep("judge");
  };

  const handlePrevious = () => {
    if (currentStep === "metronome") setCurrentStep("silhouette");
    else if (currentStep === "reality") setCurrentStep("metronome");
    else if (currentStep === "mirage") setCurrentStep("reality");
  };

  const handleJudgeComplete = () => {
    const isCorrect = userGuess === planet.isConfirmed;
    onComplete(userGuess!, isCorrect);
  };

  const getStepNumber = () => {
    const stepMap: Record<AnalysisStep, number> = {
      preliminary: 0,
      loading: 0,
      silhouette: 1,
      metronome: 2,
      reality: 3,
      mirage: 4,
      judge: 5
    };
    return stepMap[currentStep];
  };

  const getStepTitle = () => {
    const titleMap: Record<AnalysisStep, string> = {
      preliminary: "Datos Preliminares",
      loading: "Procesando...",
      silhouette: "Análisis de Silueta",
      metronome: "Análisis de Periodicidad",
      reality: "Análisis de Plausibilidad",
      mirage: "Detección de Falsos Positivos",
      judge: "Veredicto Final"
    };
    return titleMap[currentStep];
  };

  return (
    <>
      {/* Loading Animation */}
      {currentStep === "loading" && (
        <LoadingAnimation onComplete={handleLoadingComplete} />
      )}

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

          {/* Progress Indicator - Show after preliminary */}
          {currentStep !== "preliminary" && currentStep !== "loading" && (
            <div className="glass-card p-4">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <span className="text-sm text-muted-foreground">
                  Paso {getStepNumber()} de 5
                </span>
                <span className="text-lg font-semibold text-primary">
                  {getStepTitle()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((getStepNumber() / 5) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted/20 rounded-full mt-3">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(getStepNumber() / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Preliminary Data Section */}
          {currentStep === "preliminary" && (
            <div className="animate-fade-in">
              <PreliminaryData 
                planet={planet}
                onGuess={handleGuess}
                hasGuessed={userGuess !== null}
              />
            </div>
          )}

          {/* Agent Analysis Steps */}
          {agentSteps.includes(currentStep) && (
            <div className="space-y-6 animate-fade-in">
              <AgentPanel
                agentType={currentStep as "silhouette" | "metronome" | "reality" | "mirage"}
                planet={planet}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === "silhouette"}
                  className="min-w-[120px]"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="min-w-[200px] animate-glow-pulse"
                >
                  {currentStep === "mirage" ? "Ver Veredicto Final" : "Siguiente Análisis"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Judge Animation and Final Step */}
          {currentStep === "judge" && (
            <div className="animate-fade-in">
              <JudgeAnimation
                agentResults={{
                  silhouette: planet.agentAnalysis.silhouetteTracker.confidence,
                  metronome: planet.agentAnalysis.galacticMetronome.precision,
                  reality: planet.agentAnalysis.realityCensor.plausibility,
                  mirage: planet.agentAnalysis.antiMirage.risk
                }}
                onComplete={handleJudgeComplete}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
