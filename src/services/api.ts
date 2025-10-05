import { PlanetCandidate } from "@/types/exoplanet";

const API_BASE_URL = "/api";

/**
 * API Service for exoplanet data
 * Now connects to real NASA data API
 */

// Simulated network delay for better UX
const simulateDelay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Transform API response to our PlanetCandidate format
 */
const transformApiDataToPlanetCandidate = (apiData: any): PlanetCandidate => {
  // Imagen predeterminada por ahora
  const defaultImage = "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=800&fit=crop";
  
  return {
    id: apiData.kepoi_name || `koi-${Math.random().toString(36).substr(2, 9)}`,
    name: apiData.kepoi_name || "Unknown KOI",
    imageUrl: defaultImage,
    isConfirmed: apiData.koi_disposition === "CONFIRMED",
    preliminaryData: {
      habitableZone: calculateHabitableZone(apiData),
      orbitalPeriod: apiData.koi_period || 0,
      planetRadius: apiData.koi_prad || 0,
      equilibriumTemp: apiData.koi_teq || 0,
    },
    fullData: {
      // Transit characteristics
      koi_duration: apiData.koi_duration || 0,
      koi_duration_err1: apiData.koi_duration_err1 || 0,
      koi_duration_err2: apiData.koi_duration_err2 || 0,
      koi_depth: apiData.koi_depth || 0,
      koi_depth_err1: apiData.koi_depth_err1 || 0,
      koi_depth_err2: apiData.koi_depth_err2 || 0,
      koi_impact: apiData.koi_impact || 0,
      koi_impact_err1: apiData.koi_impact_err1 || 0,
      koi_impact_err2: apiData.koi_impact_err2 || 0,
      koi_model_snr: apiData.koi_model_snr || 0,
      
      // Orbital parameters
      koi_period: apiData.koi_period || 0,
      koi_period_err1: apiData.koi_period_err1 || 0,
      koi_period_err2: apiData.koi_period_err2 || 0,
      koi_time0bk: apiData.koi_time0bk || 0,
      koi_time0bk_err1: apiData.koi_time0bk_err1 || 0,
      koi_time0bk_err2: apiData.koi_time0bk_err2 || 0,
      
      // Physical parameters
      koi_prad: apiData.koi_prad || 0,
      koi_prad_err1: apiData.koi_prad_err1 || 0,
      koi_prad_err2: apiData.koi_prad_err2 || 0,
      koi_teq: apiData.koi_teq || 0,
      koi_teq_err1: apiData.koi_teq_err1 || 0,
      koi_teq_err2: apiData.koi_teq_err2 || 0,
      koi_insol: apiData.koi_insol || 0,
      koi_insol_err1: apiData.koi_insol_err1 || 0,
      koi_insol_err2: apiData.koi_insol_err2 || 0,
      koi_steff: apiData.koi_steff || 0,
      koi_steff_err1: apiData.koi_steff_err1 || 0,
      koi_steff_err2: apiData.koi_steff_err2 || 0,
      koi_slogg: apiData.koi_slogg || 0,
      koi_slogg_err1: apiData.koi_slogg_err1 || 0,
      koi_slogg_err2: apiData.koi_slogg_err2 || 0,
      koi_srad: apiData.koi_srad || 0,
      koi_srad_err1: apiData.koi_srad_err1 || 0,
      koi_srad_err2: apiData.koi_srad_err2 || 0,
      koi_kepmag: apiData.koi_kepmag || 0,
      
      // False positive flags
      koi_fpflag_nt: apiData.koi_fpflag_nt || 0,
      koi_fpflag_ss: apiData.koi_fpflag_ss || 0,
      koi_fpflag_co: apiData.koi_fpflag_co || 0,
      koi_fpflag_ec: apiData.koi_fpflag_ec || 0,
    },
    // Generate mock agent analysis for now
    agentAnalysis: generateMockAgentAnalysis(apiData)
  };
};

/**
 * Calculate if planet is in habitable zone based on temperature
 */
const calculateHabitableZone = (apiData: any): boolean => {
  const temp = apiData.koi_teq;
  if (!temp) return false;
  // Rough habitable zone: 200K to 350K
  return temp >= 200 && temp <= 350;
};

/**
 * Generate mock agent analysis based on real data
 */
const generateMockAgentAnalysis = (apiData: any) => {
  const snr = apiData.koi_model_snr || 10;
  const depth = apiData.koi_depth || 100;
  const period = apiData.koi_period || 10;
  const temp = apiData.koi_steff || 5000;
  const radius = apiData.koi_prad || 1;
  
  return {
    silhouetteTracker: {
      confidence: Math.min(95, Math.max(20, Math.round(snr * 2 + Math.random() * 20))),
      mainMetrics: { signalToNoise: snr, transitDepth: depth }
    },
    galacticMetronome: {
      precision: Math.min(95, Math.max(30, Math.round((period > 1 ? 80 : 50) + Math.random() * 20))),
      mainMetrics: { 
        orbitalPeriod: period, 
        stability: period > 10 ? "Excelente" : period > 5 ? "Buena" : "Aceptable" 
      }
    },
    realityCensor: {
      plausibility: Math.min(95, Math.max(25, Math.round((temp > 3000 && temp < 8000 ? 75 : 45) + Math.random() * 20))),
      mainMetrics: { stellarTemp: temp, planetRadius: radius }
    },
    antiMirage: {
      risk: Math.round(Math.random() * 80),
      activeFlags: generateRandomFlags()
    }
  };
};

/**
 * Generate random false positive flags
 */
const generateRandomFlags = (): string[] => {
  const allFlags = [
    "No es Tránsito", 
    "Contaminación Estelar", 
    "Desplazamiento de Centroide",
    "Binario Eclipsante"
  ];
  
  const numFlags = Math.floor(Math.random() * 3);
  const shuffled = allFlags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numFlags);
};

/**
 * Get all planet candidates from real API
 */
export const getCandidates = async (searchQuery?: string): Promise<PlanetCandidate[]> => {
  try {
    console.log("Fetching data from API...");
    
    // Agregar headers CORS si es necesario
    const response = await fetch(`${API_BASE_URL}/index/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    console.log("API Response received:", apiData);
    console.log("API Response type:", typeof apiData);
    console.log("API Response length:", Array.isArray(apiData) ? apiData.length : "Not an array");
    
    // Verificar que sea un array
    if (!Array.isArray(apiData)) {
      console.error("API did not return an array:", apiData);
      throw new Error("API response is not an array");
    }
    
    // Transform API data to our format
    const transformedData = apiData.map((item, index) => {
      console.log(`Transforming item ${index}:`, item);
      return transformApiDataToPlanetCandidate(item);
    });
    
    console.log("Transformed data:", transformedData);
    
    // Apply search filter if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return transformedData.filter(planet => 
        planet.name.toLowerCase().includes(query)
      );
    }
    
    // Add a small delay for better UX
    await simulateDelay(300);
    
    return transformedData;
    
  } catch (error) {
    console.error("Error fetching candidates:", error);
    // Verificar si es un error de red
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    // Re-lanzar el error para que lo maneje el componente
    throw error;
  }
};

/**
 * Get detailed data for a specific planet candidate
 */
export const getCandidateDetails = async (planetId: string): Promise<PlanetCandidate | null> => {
  try {
    const candidates = await getCandidates();
    const planet = candidates.find(p => p.id === planetId);
    return planet || null;
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    return null;
  }
};