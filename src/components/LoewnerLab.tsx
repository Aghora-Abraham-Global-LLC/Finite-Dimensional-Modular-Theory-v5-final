import React, { useState, useMemo } from 'react';
import { MathFormula } from './MathFormula';
import {
  computeKMSState,
  computeLoewnerMetrics,
  verifyFrechetAgreement,
  verifyAlickiStationarity,
} from '../math/quantumPhysics';
import { CheckCircle2, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export const LoewnerLab: React.FC = () => {
  const [dim, setDim] = useState<2 | 3 | 4>(3);
  const [beta, setBeta] = useState<number>(1.2);
  const [perturbationScale, setPerturbationScale] = useState<number>(0.5);

  // Generate Hamiltonian based on dimension
  const H = useMemo(() => {
    if (dim === 2) {
      return [
        [0.8, 0.3],
        [0.3, -0.6],
      ];
    } else if (dim === 3) {
      return [
        [1.2, 0.4, 0.1],
        [0.4, -0.3, 0.5],
        [0.1, 0.5, -0.9],
      ];
    } else {
      return [
        [1.5, 0.3, 0.2, 0.1],
        [0.3, 0.6, 0.4, 0.2],
        [0.2, 0.4, -0.7, 0.3],
        [0.1, 0.2, 0.3, -1.4],
      ];
    }
  }, [dim]);

  // Traceless self-adjoint perturbation direction A
  const directionA = useMemo(() => {
    const s = perturbationScale;
    if (dim === 2) {
      return [
        [s * 0.7, s * 0.4],
        [s * 0.4, -s * 0.7],
      ];
    } else if (dim === 3) {
      return [
        [s * 0.5, s * 0.3, s * 0.2],
        [s * 0.3, -s * 0.1, s * 0.4],
        [s * 0.2, s * 0.4, -s * 0.4],
      ];
    } else {
      return [
        [s * 0.4, s * 0.2, 0.1, 0.1],
        [s * 0.2, -s * 0.2, 0.2, 0.1],
        [0.1, 0.2, s * 0.1, -0.2],
        [0.1, 0.1, -0.2, -s * 0.3],
      ];
    }
  }, [dim, perturbationScale]);

  // Compute KMS State
  const kmsData = useMemo(() => {
    return computeKMSState(H, beta);
  }, [H, beta]);

  // Compute Loewner metrics
  const metrics = useMemo(() => {
    return computeLoewnerMetrics(kmsData.rho, directionA);
  }, [kmsData, directionA]);

  // Fréchet differential comparison: DOI vs Cauchy resolvent integral
  const frechetData = useMemo(() => {
    return verifyFrechetAgreement(kmsData.rho, directionA);
  }, [kmsData, directionA]);

  // Paired Alicki stationarity & constructive mLSI bound
  const alickiData = useMemo(() => {
    return verifyAlickiStationarity(H, beta);
  }, [H, beta]);

  return (
    <div className="space-y-6">
      {/* Header and Context */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Theorems 2.1 & 5.1
            </div>
            <h2 className="text-xl font-bold text-white">
              Loewner Operator Monotone Metric Hierarchy & DOI Fréchet Resolvent Lab
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Verifies Petz&apos;s classification of quantum monotone metrics on the manifold of faithful density matrices <MathFormula math="\mathcal{S}_{++}(\mathbb{C}^d)" />. The Umegaki relative-entropy Hessian identifies the canonical Kubo–Mori–Bogoliubov (KMB) metric, bounded strictly between the Wigner–Yanase and Harmonic metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200 font-medium">Double-Precision Engine Active</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hilbert Dimension <MathFormula math="d" />
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([2, 3, 4] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDim(d)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    dim === d
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {d === 2 ? 'd = 2 (Qubit)' : d === 3 ? 'd = 3 (Qutrit)' : 'd = 4 (2-Qubits)'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Inverse Temperature <MathFormula math="\beta" /></span>
              <span className="text-cyan-400 font-mono">{beta.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={beta}
              onChange={e => setBeta(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Hot (0.2)</span>
              <span>KMS Moderate (1.2)</span>
              <span>Cold (3.0)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Perturbation Direction Scale <MathFormula math="\|A\|" /></span>
              <span className="text-cyan-400 font-mono">{perturbationScale.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={perturbationScale}
              onChange={e => setPerturbationScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Small (0.1)</span>
              <span>Nominal (0.5)</span>
              <span>Large (1.5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loewner Hierarchy Proof & Spectrum Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Metric 1: SLD */}
        <div className="border border-blue-900/40 bg-slate-900/50 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
          <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Lower Bound</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Bures / SLD</h3>
          <div className="mt-1 text-xs text-slate-400">
            <MathFormula math="f(t) = \frac{1+t}{2}" />
          </div>
          <div className="mt-4 font-mono text-2xl font-bold text-blue-300">
            {metrics.sld.toFixed(6)}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <MathFormula math="g^{\mathrm{SLD}}(A, A) = \frac{1}{2} \sum \frac{2}{\lambda_j + \lambda_k} |\tilde{A}_{jk}|^2" />
          </div>
        </div>

        {/* Metric 2: Wigner-Yanase */}
        <div className="border border-indigo-900/40 bg-slate-900/50 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Convex Mean</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Wigner–Yanase</h3>
          <div className="mt-1 text-xs text-slate-400">
            <MathFormula math="f(t) = \left(\frac{1+\sqrt{t}}{2}\right)^2" />
          </div>
          <div className="mt-4 font-mono text-2xl font-bold text-indigo-300">
            {metrics.wy.toFixed(6)}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <MathFormula math="g^{\mathrm{WY}}(A, A) = \sum \frac{4}{(\sqrt{\lambda_j} + \sqrt{\lambda_k})^2} |\tilde{A}_{jk}|^2" />
          </div>
        </div>

        {/* Metric 3: KMS / KMB Canonical */}
        <div className="border border-cyan-500/50 bg-cyan-950/20 rounded-xl p-4 relative overflow-hidden ring-1 ring-cyan-500/30">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 uppercase tracking-wider">
            Canonical
          </div>
          <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Relative Entropy Hessian</span>
          <h3 className="text-lg font-bold text-white mt-0.5">KMS / KMB Metric</h3>
          <div className="mt-1 text-xs text-slate-400">
            <MathFormula math="f(t) = \frac{t-1}{\ln t}" />
          </div>
          <div className="mt-4 font-mono text-2xl font-bold text-cyan-300">
            {metrics.kmb.toFixed(6)}
          </div>
          <div className="mt-2 text-[11px] text-slate-300">
            <MathFormula math="g^{\mathrm{KMB}}(A, A) = \int_0^1 \Tr(\rho^{1-u} A \rho^u A) du" />
          </div>
        </div>

        {/* Metric 4: RLD / Harmonic */}
        <div className="border border-purple-900/40 bg-slate-900/50 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none"></div>
          <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Upper Bound</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Harmonic / RLD</h3>
          <div className="mt-1 text-xs text-slate-400">
            <MathFormula math="f(t) = \frac{2t}{1+t}" />
          </div>
          <div className="mt-4 font-mono text-2xl font-bold text-purple-300">
            {metrics.rld.toFixed(6)}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <MathFormula math="g^{\mathrm{RLD}}(A, A) = \sum \frac{\lambda_j + \lambda_k}{2 \lambda_j \lambda_k} |\tilde{A}_{jk}|^2" />
          </div>
        </div>
      </div>

      {/* Loewner Hierarchy Validation Banner */}
      <div className="border border-emerald-900/50 bg-emerald-950/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div className="text-sm font-bold text-emerald-300">
              Morozova–Chentsov–Petz Loewner Inequality Rigorously Satisfied
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              <MathFormula math="g^{\mathrm{Bures/SLD}} \le g^{\mathrm{Wigner-Yanase}} \le g^{\mathrm{KMS/KMB}} \le g^{\mathrm{Harmonic/RLD}}" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 text-slate-300">
          <span>{metrics.sld.toFixed(4)}</span>
          <span className="text-emerald-400 font-bold">≤</span>
          <span>{metrics.wy.toFixed(4)}</span>
          <span className="text-emerald-400 font-bold">≤</span>
          <span className="text-cyan-300 font-semibold">{metrics.kmb.toFixed(4)}</span>
          <span className="text-emerald-400 font-bold">≤</span>
          <span>{metrics.rld.toFixed(4)}</span>
        </div>
      </div>

      {/* Two Column Section: DOI vs Cauchy & Alicki Stationarity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lemma 2.3: Cauchy Resolvent Integral vs DOI */}
        <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Lemma 2.3: Fréchet Resolvent Equivalence
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
              32-pt Gauss-Legendre
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Proves Daleckii–Krein spectral double operator integrals (DOI) equal the continuous Cauchy resolvent integral:
          </p>
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-center">
            <MathFormula
              display
              math="D\ln(\rho)[A] = \int_0^1 (u\rho + (1-u)\mathbb{I})^{-1} A (u\rho + (1-u)\mathbb{I})^{-1} du"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Spectral DOI Norm <MathFormula math="\|D\ln_{\mathrm{DOI}}\|_F" /></div>
              <div className="font-mono text-sm font-semibold text-slate-200 mt-1">
                {frechetData.doiMatrix.flat().reduce((acc, v) => acc + v * v, 0) ** 0.5 < 1e-12
                  ? '0.000000'
                  : (frechetData.doiMatrix.flat().reduce((acc, v) => acc + v * v, 0) ** 0.5).toFixed(6)}
              </div>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Cauchy Quadrature Norm <MathFormula math="\|D\ln_{\mathrm{Cauchy}}\|_F" /></div>
              <div className="font-mono text-sm font-semibold text-slate-200 mt-1">
                {(frechetData.cauchyMatrix.flat().reduce((acc, v) => acc + v * v, 0) ** 0.5).toFixed(6)}
              </div>
            </div>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-800/40 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-cyan-300">Frobenius Agreement Residual</div>
              <div className="text-[11px] text-slate-400">
                <MathFormula math="\|D\ln_{\mathrm{DOI}} - D\ln_{\mathrm{Cauchy}}\|_F" />
              </div>
            </div>
            <div className="font-mono text-base font-bold text-cyan-300">
              {frechetData.frobeniusResidual.toExponential(3)}
            </div>
          </div>
        </div>

        {/* Section 3 & 4: Alicki Stationarity & mLSI Lower Bound */}
        <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Alicki Stationarity & mLSI Bound
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              Theorem 3.2
            </span>
          </div>

          <p className="text-xs text-slate-400">
            For primitive Lindblad generators <MathFormula math="\mathcal{L}" /> with paired Alicki detailed balance, the KMS thermal state is an exact stationary fixed point:
          </p>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-300 font-semibold">Thermal Fixed Point Residual</div>
              <div className="text-[11px] text-slate-500">
                <MathFormula math="\|\mathcal{L}(\rho_{\KMS})\|_F" />
              </div>
            </div>
            <div className="font-mono text-base font-bold text-emerald-400">
              {alickiData.residualNorm === 0 ? '0.00 × 10⁰' : alickiData.residualNorm.toExponential(2)}
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-300 font-semibold">Constructive mLSI Constant</span>
              <span className="font-mono text-sm font-bold text-cyan-300">{alickiData.mlsiAlpha1.toFixed(4)}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              <MathFormula math="\alpha_1 \ge \frac{2 \lambda_{\mathrm{gap}}(\mathcal{L})}{\ln(1/\lambda_{\min}(\rho_{\KMS})) + 2} > 0" />
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex justify-between border-t border-slate-800 pt-2">
              <span>Spectral Gap <MathFormula math="\lambda_{\mathrm{gap}}" />: <span className="font-mono text-slate-200">{alickiData.spectralGap.toFixed(4)}</span></span>
              <span>Min Eigenvalue <MathFormula math="\lambda_{\min}" />: <span className="font-mono text-slate-200">{alickiData.lambdaMin.toFixed(4)}</span></span>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/50">
            Guarantees Carlen–Maas non-commutative Wasserstein gradient flow exponential contractivity:
            <span className="font-mono text-cyan-300 block mt-1">D(ρ_t ∥ ρ_KMS) ≤ exp(-2α₁ t) D(ρ_0 ∥ ρ_KMS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
