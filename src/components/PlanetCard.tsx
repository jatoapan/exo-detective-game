import { PlanetCandidate } from "@/types/exoplanet";
import { Globe, ThermometerSun } from "lucide-react";

interface PlanetCardProps {
  planet: PlanetCandidate;
  onClick: () => void;
}

export const PlanetCard = ({ planet, onClick }: PlanetCardProps) => {
  return (
    <button
      onClick={onClick}
      className="glass-card p-0 overflow-hidden hover-glow transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={planet.imageUrl}
          alt={planet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback image si la imagen no carga
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=800&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1">
            {planet.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {planet.isConfirmed
              ? "Exoplaneta Confirmado"
              : "Candidato a Exoplaneta"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {planet.preliminaryData.planetRadius > 0
                ? `${planet.preliminaryData.planetRadius.toFixed(2)} R⊕`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">
              {planet.preliminaryData.equilibriumTemp > 0
                ? `${planet.preliminaryData.equilibriumTemp.toFixed(0)}K`
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          {planet.preliminaryData.habitableZone && (
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30">
              Zona Habitable
            </div>
          )}
          {planet.isConfirmed && (
            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
              Confirmado
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
