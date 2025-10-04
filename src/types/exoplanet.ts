export interface PlanetCandidate {
  id: string;
  name: string;
  imageUrl: string;
  isConfirmed: boolean;
  
  // Friendly preliminary data
  preliminaryData: {
    habitableZone: boolean;
    orbitalPeriod: number;
    planetRadius: number;
    equilibriumTemp: number;
  };
  
  // Full KOI data for expert mode
  fullData: {
    // Transit characteristics (El Rastreador de Siluetas)
    koi_duration: number;
    koi_duration_err1: number;
    koi_duration_err2: number;
    koi_depth: number;
    koi_depth_err1: number;
    koi_depth_err2: number;
    koi_impact: number;
    koi_impact_err1: number;
    koi_impact_err2: number;
    koi_model_snr: number;
    
    // Orbital parameters (El Metrónomo Galáctico)
    koi_period: number;
    koi_period_err1: number;
    koi_period_err2: number;
    koi_time0bk: number;
    koi_time0bk_err1: number;
    koi_time0bk_err2: number;
    
    // Physical parameters (El Censor de Realidad)
    koi_prad: number;
    koi_prad_err1: number;
    koi_prad_err2: number;
    koi_teq: number;
    koi_teq_err1: number;
    koi_teq_err2: number;
    koi_insol: number;
    koi_insol_err1: number;
    koi_insol_err2: number;
    koi_steff: number;
    koi_steff_err1: number;
    koi_steff_err2: number;
    koi_slogg: number;
    koi_slogg_err1: number;
    koi_slogg_err2: number;
    koi_srad: number;
    koi_srad_err1: number;
    koi_srad_err2: number;
    koi_kepmag: number;
    
    // False positive flags (El Anti-Espejismo)
    koi_fpflag_nt: number;
    koi_fpflag_ss: number;
    koi_fpflag_co: number;
    koi_fpflag_ec: number;
  };
  
  // AI Agent analysis results
  agentAnalysis: {
    silhouetteTracker: {
      confidence: number;
      mainMetrics: {
        signalToNoise: number;
        transitDepth: number;
      };
    };
    galacticMetronome: {
      precision: number;
      mainMetrics: {
        orbitalPeriod: number;
        stability: string;
      };
    };
    realityCensor: {
      plausibility: number;
      mainMetrics: {
        stellarTemp: number;
        planetRadius: number;
      };
    };
    antiMirage: {
      risk: number;
      activeFlags: string[];
    };
  };
}

export interface AgentParameter {
  name: string;
  value: number | string;
  error?: { plus: number; minus: number };
  explanation: string;
  unit?: string;
}
