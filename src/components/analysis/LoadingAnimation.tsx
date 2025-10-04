import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const loadingSteps = [
  "ACCEDIENDO A LA BASE DE DATOS KEPLER...",
  "CALIBRANDO SENSORES FOTOMÉTRICOS...",
  "EJECUTANDO MODELOS DE IA...",
  "ANÁLISIS LISTO."
];

export const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="text-center space-y-8 max-w-2xl px-6">
        {/* Animated neural network or planet */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-4 rounded-full bg-primary/40 animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto w-16 h-16 text-primary animate-spin" />
        </div>

        {/* Terminal-like text */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`text-lg font-mono transition-all duration-500 ${
                index <= currentStep
                  ? "opacity-100 text-primary"
                  : "opacity-30 text-muted-foreground"
              } ${
                index === currentStep && !isComplete
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {index < currentStep && "✓ "}
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
