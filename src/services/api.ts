import { PlanetCandidate } from "@/types/exoplanet";
import { mockPlanets } from "@/data/mockPlanets";

/**
 * API Service for exoplanet data
 * Currently uses mock data, but structured to easily connect to real API
 */

// Simulated network delay
const simulateDelay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all planet candidates
 * @param searchQuery Optional search filter by name
 */
export const getCandidates = async (searchQuery?: string): Promise<PlanetCandidate[]> => {
  await simulateDelay(300);
  
  if (!searchQuery) {
    return mockPlanets;
  }
  
  const query = searchQuery.toLowerCase();
  return mockPlanets.filter(planet => 
    planet.name.toLowerCase().includes(query)
  );
};

/**
 * Get detailed data for a specific planet candidate
 * @param planetId The ID of the planet to fetch
 */
export const getCandidateDetails = async (planetId: string): Promise<PlanetCandidate | null> => {
  await simulateDelay(200);
  
  const planet = mockPlanets.find(p => p.id === planetId);
  return planet || null;
};

/**
 * Future: Connect to real NASA Exoplanet Archive API
 * API endpoint: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI
 * Example query: ?table=cumulative&format=json&where=koi_disposition like 'CANDIDATE'
 */
