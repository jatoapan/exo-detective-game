import { PlanetCandidate } from "@/types/exoplanet";

const API_BASE_URL = "/api";

// 16 imágenes predeterminadas de cuerpos celestes
const DEFAULT_PLANET_IMAGES = [
  "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=800&fit=crop", // Exoplaneta azul
  "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=800&fit=crop", // Planeta rojizo
  "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&h=800&fit=crop", // Planeta gaseoso
  "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800&h=800&fit=crop", // Planeta rocoso
  "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=800&fit=crop", // Planeta con anillos
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=800&fit=crop", // Planeta nebulosa
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=800&fit=crop", // Planeta dorado
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=800&fit=crop", // Nebulosa espacial
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop", // Exoplaneta verde
  "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&h=800&fit=crop", // Planeta púrpura
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop", // Planeta volcánico
  "https://images.unsplash.com/photo-1530841344095-ca2b95bd46de?w=800&h=800&fit=crop", // Planeta helado
  "https://images.unsplash.com/photo-1555991896-2bd4b6cd6932?w=800&h=800&fit=crop", // Exoplaneta distante
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop", // Planeta oscuro
  "https://images.unsplash.com/photo-1502741126161-b048400d085d?w=800&h=800&fit=crop", // Planeta brillante
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop"  // Planeta misterioso
];

/**
 * Obtener imagen basada en índice para rotación consistente
 */
const getPlanetImageByIndex = (planetName: string, index: number): string => {
  // Usar hash del nombre para consistencia + índice para variación
  const hash = planetName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const imageIndex = (Math.abs(hash) + index) % DEFAULT_PLANET_IMAGES.length;
  return DEFAULT_PLANET_IMAGES[imageIndex];
};

// Simulated network delay for better UX
const simulateDelay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Transform API response to our PlanetCandidate format
 */
const transformApiDataToPlanetCandidate = (apiData: any, index: number): PlanetCandidate => {
  // Usar imagen predeterminada basada en índice
  const imageUrl = getPlanetImageByIndex(apiData.kepoi_name || `unknown-${index}`, index);
  
  return {
    id: apiData.kepoi_name || `koi-${Math.random().toString(36).substr(2, 9)}`,
    name: apiData.kepoi_name || "Unknown KOI",
    imageUrl: imageUrl,
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
 * Tipo para la respuesta paginada
 */
export interface PaginatedResponse {
  data: PlanetCandidate[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Get paginated planet candidates from real API
 */
export const getCandidates = async (
  searchQuery?: string, 
  page: number = 1, 
  limit: number = 12
): Promise<PaginatedResponse> => {
  try {
    console.log("Fetching data from API...");
    
    const response = await fetch(`${API_BASE_URL}/index/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    console.log("API Response received:", apiData.length, "items");
    
    if (!Array.isArray(apiData)) {
      throw new Error("API response is not an array");
    }
    
    // Transform API data to our format
    const transformedData = apiData.map((item, index) => 
      transformApiDataToPlanetCandidate(item, index)
    );
    
    // Apply search filter if provided
    let filteredData = transformedData;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = transformedData.filter(planet => 
        planet.name.toLowerCase().includes(query)
      );
    }
    
    // Calculate pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    console.log(`Page ${page}/${totalPages}: showing ${paginatedData.length} of ${totalItems} planets`);
    
    // Add a small delay for better UX
    await simulateDelay(300);
    
    return {
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
    
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

/**
 * Get detailed data for a specific planet candidate
 */
export const getCandidateDetails = async (planetId: string): Promise<PlanetCandidate | null> => {
  try {
    const response = await getCandidates();
    const planet = response.data.find(p => p.id === planetId);
    return planet || null;
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    return null;
  }
};