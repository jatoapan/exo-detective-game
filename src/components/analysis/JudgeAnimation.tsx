import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { RadialProgress } from "@/components/ui/radial-progress";

interface JudgeAnimationProps {
  agentResults: {
    silhouette: number;
    metronome: number;
    reality: number;
    mirage: number;
  };
  onComplete: () => void;
}

export const JudgeAnimation = ({ agentResults, onComplete }: JudgeAnimationProps) => {
  const [phase, setPhase] = useState<"gathering" | "weighing" | "deciding" | "complete">("gathering");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("weighing"), 1500);
    const timer2 = setTimeout(() => setPhase("deciding"), 3000);
    const timer3 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="glass-card p-12 space-y-8">
      {/* Judge Icon */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 border-2 border-accent mb-4">
          <Scale className={`w-12 h-12 text-accent ${
            phase === "weighing" ? "animate-bounce" : ""
          }`} />
        </div>
        <h2 className="text-3xl font-bold text-accent">El Juez Final</h2>
      </div>

      {/* Agent Results - Animated */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${
        phase === "gathering" ? "scale-100 opacity-100" : "scale-75 opacity-50"
      }`}>
        <div className="text-center space-y-2">
          <RadialProgress 
            value={agentResults.silhouette} 
            size={80} 
            color="primary"
          />
          <p className="text-xs text-muted-foreground">Silueta</p>
        </div>
        <div className="text-center space-y-2">
          <RadialProgress 
            value={agentResults.metronome} 
            size={80} 
            color="success"
          />
          <p className="text-xs text-muted-foreground">Metrónomo</p>
        </div>
        <div className="text-center space-y-2">
          <RadialProgress 
            value={agentResults.reality} 
            size={80} 
            color="primary"
          />
          <p className="text-xs text-muted-foreground">Realidad</p>
        </div>
        <div className="text-center space-y-2">
          <RadialProgress 
            value={100 - agentResults.mirage} 
            size={80} 
            color={agentResults.mirage > 50 ? "danger" : "success"}
          />
          <p className="text-xs text-muted-foreground">Anti-Espejismo</p>
        </div>
      </div>

      {/* Status Messages */}
      <div className="text-center space-y-2 min-h-[60px]">
        {phase === "gathering" && (
          <p className="text-xl font-mono text-primary animate-pulse">
            RECOPILANDO EVIDENCIA...
          </p>
        )}
        {phase === "weighing" && (
          <p className="text-xl font-mono text-secondary animate-pulse">
            PONDERANDO EVIDENCIA...
          </p>
        )}
        {phase === "deciding" && (
          <p className="text-xl font-mono text-accent animate-pulse">
            TOMANDO DECISIÓN FINAL...
          </p>
        )}
        {phase === "complete" && (
          <p className="text-2xl font-bold text-primary animate-fade-in">
            ✓ VEREDICTO LISTO
          </p>
        )}
      </div>
    </div>
  );
};
