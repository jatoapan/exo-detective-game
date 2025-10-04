import { PlanetCandidate } from "@/types/exoplanet";

export const mockPlanets: PlanetCandidate[] = [
  {
    id: "koi-7016",
    name: "KOI-7016.01",
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=800&fit=crop",
    isConfirmed: true,
    preliminaryData: {
      habitableZone: true,
      orbitalPeriod: 395.2,
      planetRadius: 1.09,
      equilibriumTemp: 282,
    },
    fullData: {
      koi_duration: 6.8, koi_duration_err1: 0.3, koi_duration_err2: -0.3,
      koi_depth: 285.3, koi_depth_err1: 12.4, koi_depth_err2: -12.4,
      koi_impact: 0.146, koi_impact_err1: 0.089, koi_impact_err2: -0.089,
      koi_model_snr: 47.3,
      koi_period: 395.203, koi_period_err1: 0.012, koi_period_err2: -0.012,
      koi_time0bk: 189.1547, koi_time0bk_err1: 0.0034, koi_time0bk_err2: -0.0034,
      koi_prad: 1.09, koi_prad_err1: 0.15, koi_prad_err2: -0.12,
      koi_teq: 282, koi_teq_err1: 14, koi_teq_err2: -14,
      koi_insol: 1.18, koi_insol_err1: 0.19, koi_insol_err2: -0.19,
      koi_steff: 5812, koi_steff_err1: 85, koi_steff_err2: -85,
      koi_slogg: 4.467, koi_slogg_err1: 0.028, koi_slogg_err2: -0.028,
      koi_srad: 0.927, koi_srad_err1: 0.041, koi_srad_err2: -0.041,
      koi_kepmag: 13.562,
      koi_fpflag_nt: 0, koi_fpflag_ss: 0, koi_fpflag_co: 0, koi_fpflag_ec: 0,
    },
    agentAnalysis: {
      silhouetteTracker: {
        confidence: 87,
        mainMetrics: { signalToNoise: 47.3, transitDepth: 285.3 }
      },
      galacticMetronome: {
        precision: 95,
        mainMetrics: { orbitalPeriod: 395.2, stability: "Excelente" }
      },
      realityCensor: {
        plausibility: 82,
        mainMetrics: { stellarTemp: 5812, planetRadius: 1.09 }
      },
      antiMirage: {
        risk: 8,
        activeFlags: []
      }
    }
  },
  {
    id: "koi-4878",
    name: "KOI-4878.01",
    imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800&h=800&fit=crop",
    isConfirmed: false,
    preliminaryData: {
      habitableZone: false,
      orbitalPeriod: 2.47,
      planetRadius: 8.92,
      equilibriumTemp: 1843,
    },
    fullData: {
      koi_duration: 3.2, koi_duration_err1: 0.8, koi_duration_err2: -0.8,
      koi_depth: 4821.7, koi_depth_err1: 187.3, koi_depth_err2: -187.3,
      koi_impact: 0.523, koi_impact_err1: 0.214, koi_impact_err2: -0.214,
      koi_model_snr: 18.4,
      koi_period: 2.4681, koi_period_err1: 0.0023, koi_period_err2: -0.0023,
      koi_time0bk: 134.8923, koi_time0bk_err1: 0.0189, koi_time0bk_err2: -0.0189,
      koi_prad: 8.92, koi_prad_err1: 1.34, koi_prad_err2: -1.21,
      koi_teq: 1843, koi_teq_err1: 127, koi_teq_err2: -127,
      koi_insol: 289.4, koi_insol_err1: 43.2, koi_insol_err2: -43.2,
      koi_steff: 6234, koi_steff_err1: 143, koi_steff_err2: -143,
      koi_slogg: 4.127, koi_slogg_err1: 0.089, koi_slogg_err2: -0.089,
      koi_srad: 1.534, koi_srad_err1: 0.112, koi_srad_err2: -0.112,
      koi_kepmag: 14.892,
      koi_fpflag_nt: 0, koi_fpflag_ss: 1, koi_fpflag_co: 0, koi_fpflag_ec: 0,
    },
    agentAnalysis: {
      silhouetteTracker: {
        confidence: 64,
        mainMetrics: { signalToNoise: 18.4, transitDepth: 4821.7 }
      },
      galacticMetronome: {
        precision: 88,
        mainMetrics: { orbitalPeriod: 2.47, stability: "Buena" }
      },
      realityCensor: {
        plausibility: 45,
        mainMetrics: { stellarTemp: 6234, planetRadius: 8.92 }
      },
      antiMirage: {
        risk: 67,
        activeFlags: ["Contaminación Estelar"]
      }
    }
  },
  {
    id: "koi-5856",
    name: "KOI-5856.01",
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=800&fit=crop",
    isConfirmed: true,
    preliminaryData: {
      habitableZone: true,
      orbitalPeriod: 267.3,
      planetRadius: 1.42,
      equilibriumTemp: 294,
    },
    fullData: {
      koi_duration: 5.9, koi_duration_err1: 0.4, koi_duration_err2: -0.4,
      koi_depth: 412.8, koi_depth_err1: 18.7, koi_depth_err2: -18.7,
      koi_impact: 0.287, koi_impact_err1: 0.124, koi_impact_err2: -0.124,
      koi_model_snr: 38.9,
      koi_period: 267.291, koi_period_err1: 0.018, koi_period_err2: -0.018,
      koi_time0bk: 201.3421, koi_time0bk_err1: 0.0041, koi_time0bk_err2: -0.0041,
      koi_prad: 1.42, koi_prad_err1: 0.19, koi_prad_err2: -0.16,
      koi_teq: 294, koi_teq_err1: 17, koi_teq_err2: -17,
      koi_insol: 1.34, koi_insol_err1: 0.22, koi_insol_err2: -0.22,
      koi_steff: 5643, koi_steff_err1: 92, koi_steff_err2: -92,
      koi_slogg: 4.512, koi_slogg_err1: 0.031, koi_slogg_err2: -0.031,
      koi_srad: 0.854, koi_srad_err1: 0.038, koi_srad_err2: -0.038,
      koi_kepmag: 14.127,
      koi_fpflag_nt: 0, koi_fpflag_ss: 0, koi_fpflag_co: 0, koi_fpflag_ec: 0,
    },
    agentAnalysis: {
      silhouetteTracker: {
        confidence: 91,
        mainMetrics: { signalToNoise: 38.9, transitDepth: 412.8 }
      },
      galacticMetronome: {
        precision: 94,
        mainMetrics: { orbitalPeriod: 267.3, stability: "Excelente" }
      },
      realityCensor: {
        plausibility: 86,
        mainMetrics: { stellarTemp: 5643, planetRadius: 1.42 }
      },
      antiMirage: {
        risk: 5,
        activeFlags: []
      }
    }
  },
  {
    id: "koi-3284",
    name: "KOI-3284.01",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=800&fit=crop",
    isConfirmed: true,
    preliminaryData: {
      habitableZone: false,
      orbitalPeriod: 12.8,
      planetRadius: 2.14,
      equilibriumTemp: 687,
    },
    fullData: {
      koi_duration: 4.1, koi_duration_err1: 0.5, koi_duration_err2: -0.5,
      koi_depth: 1124.6, koi_depth_err1: 54.2, koi_depth_err2: -54.2,
      koi_impact: 0.412, koi_impact_err1: 0.156, koi_impact_err2: -0.156,
      koi_model_snr: 28.7,
      koi_period: 12.789, koi_period_err1: 0.003, koi_period_err2: -0.003,
      koi_time0bk: 145.6234, koi_time0bk_err1: 0.0067, koi_time0bk_err2: -0.0067,
      koi_prad: 2.14, koi_prad_err1: 0.24, koi_prad_err2: -0.21,
      koi_teq: 687, koi_teq_err1: 38, koi_teq_err2: -38,
      koi_insol: 8.47, koi_insol_err1: 1.12, koi_insol_err2: -1.12,
      koi_steff: 5923, koi_steff_err1: 97, koi_steff_err2: -97,
      koi_slogg: 4.389, koi_slogg_err1: 0.042, koi_slogg_err2: -0.042,
      koi_srad: 1.067, koi_srad_err1: 0.054, koi_srad_err2: -0.054,
      koi_kepmag: 13.945,
      koi_fpflag_nt: 0, koi_fpflag_ss: 0, koi_fpflag_co: 0, koi_fpflag_ec: 0,
    },
    agentAnalysis: {
      silhouetteTracker: {
        confidence: 79,
        mainMetrics: { signalToNoise: 28.7, transitDepth: 1124.6 }
      },
      galacticMetronome: {
        precision: 92,
        mainMetrics: { orbitalPeriod: 12.8, stability: "Muy Buena" }
      },
      realityCensor: {
        plausibility: 77,
        mainMetrics: { stellarTemp: 5923, planetRadius: 2.14 }
      },
      antiMirage: {
        risk: 12,
        activeFlags: []
      }
    }
  },
  {
    id: "koi-1923",
    name: "KOI-1923.01",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop",
    isConfirmed: false,
    preliminaryData: {
      habitableZone: false,
      orbitalPeriod: 0.87,
      planetRadius: 14.23,
      equilibriumTemp: 2456,
    },
    fullData: {
      koi_duration: 1.9, koi_duration_err1: 1.2, koi_duration_err2: -1.2,
      koi_depth: 8934.2, koi_depth_err1: 423.7, koi_depth_err2: -423.7,
      koi_impact: 0.723, koi_impact_err1: 0.287, koi_impact_err2: -0.287,
      koi_model_snr: 12.3,
      koi_period: 0.8712, koi_period_err1: 0.0041, koi_period_err2: -0.0041,
      koi_time0bk: 98.4512, koi_time0bk_err1: 0.0234, koi_time0bk_err2: -0.0234,
      koi_prad: 14.23, koi_prad_err1: 2.14, koi_prad_err2: -1.89,
      koi_teq: 2456, koi_teq_err1: 178, koi_teq_err2: -178,
      koi_insol: 687.3, koi_insol_err1: 89.4, koi_insol_err2: -89.4,
      koi_steff: 6789, koi_steff_err1: 187, koi_steff_err2: -187,
      koi_slogg: 3.987, koi_slogg_err1: 0.123, koi_slogg_err2: -0.123,
      koi_srad: 1.823, koi_srad_err1: 0.156, koi_srad_err2: -0.156,
      koi_kepmag: 15.234,
      koi_fpflag_nt: 1, koi_fpflag_ss: 1, koi_fpflag_co: 1, koi_fpflag_ec: 0,
    },
    agentAnalysis: {
      silhouetteTracker: {
        confidence: 42,
        mainMetrics: { signalToNoise: 12.3, transitDepth: 8934.2 }
      },
      galacticMetronome: {
        precision: 71,
        mainMetrics: { orbitalPeriod: 0.87, stability: "Aceptable" }
      },
      realityCensor: {
        plausibility: 31,
        mainMetrics: { stellarTemp: 6789, planetRadius: 14.23 }
      },
      antiMirage: {
        risk: 89,
        activeFlags: ["No es Tránsito", "Contaminación Estelar", "Desplazamiento de Centroide"]
      }
    }
  }
];
