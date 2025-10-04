import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PlanetGrid } from "@/components/PlanetGrid";
import { AnalysisCenter } from "@/components/AnalysisCenter";
import { VerdictScreen } from "@/components/VerdictScreen";
import { PlanetCandidate } from "@/types/exoplanet";
import { getCandidates } from "@/services/api";
import { Loader2 } from "lucide-react";

type ViewState = "landing" | "grid" | "analysis" | "verdict";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [planets, setPlanets] = useState<PlanetCandidate[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetCandidate | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Load planets when entering grid view
  useEffect(() => {
    if (currentView === "grid" && planets.length === 0) {
      loadPlanets();
    }
  }, [currentView]);

  const loadPlanets = async () => {
    setLoading(true);
    try {
      const data = await getCandidates();
      setPlanets(data);
    } catch (error) {
      console.error("Error loading planets:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-xl text-muted-foreground">Cargando datos del observatorio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === "landing" && (
        <HeroSection onStartMission={handleStartMission} />
      )}

      {currentView === "grid" && (
        <PlanetGrid planets={planets} onSelectPlanet={handleSelectPlanet} />
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
