import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PlanetGrid } from "@/components/PlanetGrid";
import { AnalysisCenter } from "@/components/AnalysisCenter";
import { VerdictScreen } from "@/components/VerdictScreen";
import { PlanetCandidate } from "@/types/exoplanet";

type ViewState = "landing" | "grid" | "analysis" | "verdict";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetCandidate | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleStartMission = () => {
    setCurrentView("grid");
  };

  const handleSelectPlanet = (planet: PlanetCandidate) => {
    setSelectedPlanet(planet);
    setCurrentView("analysis");
  };

  const handleBackToGrid = () => {
    setSelectedPlanet(null);
    setCurrentView("grid");
  };

  const handleAnalysisComplete = (guess: boolean, correct: boolean) => {
    setUserGuess(guess);
    setIsCorrect(correct);
    setCurrentView("verdict");
  };

  const handleAnalyzeAnother = () => {
    setSelectedPlanet(null);
    setUserGuess(null);
    setIsCorrect(false);
    setCurrentView("grid");
  };

  return (
    <>
      {currentView === "landing" && (
        <HeroSection onStartMission={handleStartMission} />
      )}

      {currentView === "grid" && (
        <PlanetGrid onSelectPlanet={handleSelectPlanet} />
      )}

      {currentView === "analysis" && selectedPlanet && (
        <AnalysisCenter
          planet={selectedPlanet}
          onBack={handleBackToGrid}
          onComplete={handleAnalysisComplete}
        />
      )}

      {currentView === "verdict" && selectedPlanet && userGuess !== null && (
        <VerdictScreen
          planet={selectedPlanet}
          userGuess={userGuess}
          isCorrect={isCorrect}
          onAnalyzeAnother={handleAnalyzeAnother}
        />
      )}
    </>
  );
};

export default Index;
