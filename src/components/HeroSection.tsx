import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";

interface HeroSectionProps {
  onStartMission: () => void;
}

export const HeroSection = ({ onStartMission }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroNebula})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold glow-text animate-fade-in">
            Exo-Discover
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-primary font-light tracking-wide">
            El Desafío de la Habitabilidad
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Convierte en un juego la validación de exoplanetas. Trabaja con agentes de IA especializados 
            para analizar señales del telescopio Kepler y determinar si estos mundos distantes 
            podrían albergar vida.
          </p>
          
          {/* Mission Brief */}
          <div className="glass-card p-6 max-w-2xl mx-auto border-primary/30">
            <h2 className="text-xl font-semibold mb-3 text-primary">
              📋 Briefing de la Misión
            </h2>
            <p className="text-sm text-muted-foreground">
              Tu objetivo: evaluar candidatos a exoplanetas usando datos reales de la NASA. 
              Cuatro agentes de IA te ayudarán a interpretar las señales. Cada decisión te acerca 
              a descubrir si estamos solos en el universo.
            </p>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 animate-glow-pulse hover-glow group"
            onClick={onStartMission}
          >
            <Rocket className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            INICIAR MISIÓN
          </Button>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 pt-8 text-sm">
            <div>
              <div className="text-3xl font-bold text-primary">5,000+</div>
              <div className="text-muted-foreground">Candidatos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">4</div>
              <div className="text-muted-foreground">Agentes IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-muted-foreground">Datos Reales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
