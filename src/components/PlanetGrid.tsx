import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PlanetCandidate } from "@/types/exoplanet";
import { PlanetCard } from "./PlanetCard";

interface PlanetGridProps {
  planets: PlanetCandidate[];
  onSelectPlanet: (planet: PlanetCandidate) => void;
}

export const PlanetGrid = ({ planets, onSelectPlanet }: PlanetGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPlanets = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold glow-text">
            Observatorio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Selecciona un candidato a exoplaneta para analizar
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nombre (ej: KOI-7016)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 glass-card h-14 text-lg border-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlanets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onClick={() => onSelectPlanet(planet)}
            />
          ))}
        </div>

        {filteredPlanets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No se encontraron candidatos con ese nombre
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
