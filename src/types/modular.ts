// Type definitions for Finite-Dimensional Modular Theory & Dilaton Studio v5.0

export type Complex = [number, number]; // [real, imag]

export interface Matrix2x2 {
  data: [[Complex, Complex], [Complex, Complex]];
}

export interface MetricValues {
  sld: number;
  wy: number;
  kmb: number;
  rld: number;
  satisfiesLoewner: boolean;
}

export interface FrechetComparison {
  doiMatrix: number[][];
  cauchyMatrix: number[][];
  frobeniusResidual: number;
}

export interface PetzBenchmark {
  standardFidelity: number;
  twirledFidelity: number;
  dpiDeficit: number;
  logFidelityBound: number; // -ln(F_twirled)
  inequalityHolds: boolean; // dpiDeficit >= -ln(F_twirled)
}

export interface MPSSpectrumResult {
  nQubits: number;
  bondDimension: number;
  schmidtCoefficients: number[];
  modularSpectrum: number[]; // xi_k = -2 ln(s_k)
  rSquared: number;
  slope: number;
  intercept: number;
  isBisognanoWichmann: boolean; // R^2 >= 0.985
}

export interface SSSMatrixResult {
  gamma: number;
  s0: number;
  energyGrid: number[];
  spectralDensity: number[];
  wpVolumes: {
    v03: number;
    v11_b0: number;
    v11_b2: number;
    v12_b00: number;
  };
  sffTimes: number[];
  sffValues: number[];
  tauDip: number;
  tauPlateau: number;
}

export type IslandAutomatonState = 'S0' | 'S1' | 'S2' | 'S3' | 'S4';

export interface IslandAutomatonSnapshot {
  state: IslandAutomatonState;
  stateName: string;
  physicalRegime: string;
  islandTopology: string;
  entanglementEntropy: number;
  semiclassicalEntropy: number;
  twirledFidelity: number;
  hierarchyRatio: number;
  hasIsland: boolean;
  timeNormalized: number; // t / t_Page
}

export interface SymplecticStepResult {
  step: number;
  tau: number;
  energyError: number;
  cflProduct: number;
  cflSatisfied: boolean;
  transverseDistance: number;
  q1: [number, number];
  q2: [number, number];
  q3: [number, number];
}

export interface DilatonBenchmarkRow {
  model: string;
  dim: number | string;
  conditionNumber: number;
  spectralGap: number;
  alpha1Mlsi: number;
  lindbladResidual: number;
  frechetResidual: number;
  standardFidelity: number;
  twirledFidelity: number;
  dpiDeficit: number;
}
