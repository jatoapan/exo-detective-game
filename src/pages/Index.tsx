import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PlanetGrid } from "@/components/PlanetGrid";
import { AnalysisCenter } from "@/components/AnalysisCenter";
import { VerdictScreen } from "@/components/VerdictScreen";
import { PlanetCandidate } from "@/types/exoplanet";
import { getCandidates } from "@/services/api";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ViewState = "landing" | "grid" | "analysis" | "verdict";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [planets, setPlanets] = useState<PlanetCandidate[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetCandidate | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load planets when entering grid view
  useEffect(() => {
    if (currentView === "grid" && planets.length === 0) {
      loadPlanets();
    }
  }, [currentView]);

  const loadPlanets = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Starting to load planets...");
      const data = await getCandidates();
      console.log("Loaded planets:", data.length);
      setPlanets(data);
      
      if (data.length === 0) {
        setError("No se pudieron cargar los datos. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error loading planets:", error);
      setError("Error al conectar con la API. Verifica tu conexión a internet.");
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

  const handleRetry = () => {
    loadPlanets();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-xl text-muted-foreground">Cargando datos del observatorio...</p>
          <p className="text-sm text-muted-foreground">Conectando con la NASA...</p>
        </div>
      </div>
    );
  }

  if (error && currentView === "grid") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Alert className="border-destructive/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mt-2">
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
            >
              Reintentar
            </button>
          </div>
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
