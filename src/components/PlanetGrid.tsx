import { useState, useEffect } from "react";
import { PlanetCard } from "./PlanetCard";
import { Pagination } from "./Pagination";
import { PlanetCandidate } from "@/types/exoplanet";
import { getCandidates, PaginatedResponse } from "@/services/api";
import { Search, Loader2, X } from "lucide-react";

interface PlanetGridProps {
  onSelectPlanet: (planet: PlanetCandidate) => void;
}

export const PlanetGrid = ({ onSelectPlanet }: PlanetGridProps) => {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(""); // Input temporal
  const [activeSearch, setActiveSearch] = useState(""); // Búsqueda activa
  const [currentPage, setCurrentPage] = useState(1);

  const loadPlanets = async (page: number = 1, search: string = "") => {
    setLoading(true);
    try {
      const data = await getCandidates(search, page, 12);
      setPaginatedData(data);
    } catch (error) {
      console.error("Error loading planets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlanets(currentPage, activeSearch);
  }, [currentPage, activeSearch]);

  const handleSearchClick = () => {
    setActiveSearch(searchInput.trim());
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-xl text-muted-foreground">Cargando candidatos planetarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Archivo de Candidatos Planetarios
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Selecciona un candidato para iniciar el proceso de análisis con nuestros 
            agentes de IA especializados en detección de exoplanetas.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nombre (ej: K00001)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 glass-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-foreground placeholder-muted-foreground"
              />
            </div>
            
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              disabled={loading}
              className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Buscar
            </button>

            {/* Clear Button */}
            {activeSearch && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Limpiar
              </button>
            )}
          </div>
          
          {/* Active search indicator */}
          {activeSearch && (
            <div className="mt-2 text-sm text-muted-foreground text-center">
              Buscando: "<span className="text-primary font-medium">{activeSearch}</span>"
            </div>
          )}
        </div>

        {/* Results Info */}
        {paginatedData && (
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Mostrando {paginatedData.data.length} de {paginatedData.pagination.totalItems} candidatos
              {activeSearch && ` (filtrados por "${activeSearch}")`}
            </p>
          </div>
        )}

        {/* Planet Grid */}
        {paginatedData && paginatedData.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedData.data.map((planet) => (
                <PlanetCard
                  key={planet.id}
                  planet={planet}
                  onClick={() => onSelectPlanet(planet)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={paginatedData.pagination.currentPage}
              totalPages={paginatedData.pagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={paginatedData.pagination.hasNextPage}
              hasPrevPage={paginatedData.pagination.hasPrevPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {activeSearch 
                ? `No se encontraron candidatos que coincidan con "${activeSearch}"`
                : "No se encontraron candidatos planetarios"
              }
            </p>
            {activeSearch && (
              <button
                onClick={handleClearSearch}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
