import React, { useState, useMemo } from 'react';
import { MathFormula } from './MathFormula';
import { computeSSSModel } from '../math/sssMatrixModel';
import { Layers, Activity, Database, GitBranch } from 'lucide-react';

export const SSSRandomMatrixLab: React.FC = () => {
  const [gamma, setGamma] = useState<number>(1.0);
  const [s0, setS0] = useState<number>(4.2);
  const [bParam, setBParam] = useState<number>(1.5);

  const sssData = useMemo(() => {
    return computeSSSModel(gamma, s0, 0.5);
  }, [gamma, s0]);

  // Compute Weil-Petersson volume V_{1, 1}(b) for current b
  const v11Current = useMemo(() => {
    return (1 / 24) * (bParam * bParam + 4 * Math.PI * Math.PI);
  }, [bParam]);

  // SFF Chart calculations
  const sffChartData = useMemo(() => {
    const times = sssData.sffTimes;
    const values = sssData.sffValues;
    const n = times.length;

    const width = 600;
    const height = 240;
    const padX = 45;
    const padY = 25;

    const plotWidth = width - 2 * padX;
    const plotHeight = height - 2 * padY;

    // Log-log transformation
    const logTimes = times.map(t => Math.log10(t));
    const logValues = values.map(v => Math.log10(Math.max(v, 1e-3)));

    const minLogT = Math.min(...logTimes);
    const maxLogT = Math.max(...logTimes);
    const minLogV = Math.min(...logValues);
    const maxLogV = Math.max(...logValues);

    const polyline = logTimes
      .map((lt, i) => {
        const x = padX + ((lt - minLogT) / (maxLogT - minLogT)) * plotWidth;
        const y = height - padY - ((logValues[i] - minLogV) / (maxLogV - minLogV)) * plotHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    // X positions for Dip and Plateau markers
    const dipX = padX + ((Math.log10(sssData.tauDip) - minLogT) / (maxLogT - minLogT)) * plotWidth;
    const plateauX = padX + ((Math.log10(sssData.tauPlateau) - minLogT) / (maxLogT - minLogT)) * plotWidth;

    return { polyline, width, height, padX, padY, dipX, plateauX };
  }, [sssData]);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              Section 7: Quantum Gravity Matrix Dual
            </div>
            <h2 className="text-xl font-bold text-white">
              Non-Perturbative SSS Random Matrix Dual & Topological Recursion
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Maps 2D Jackiw–Teitelboim (JT) dilaton gravity to the double-scaled Saad–Shenker–Stanford (SSS) random matrix model. Eynard–Orantin topological recursion computes higher-genus Weil–Petersson volumes and captures the non-perturbative late-time Spectral Form Factor (SFF) ramp-plateau transition.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700/50">
            <Database className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Ensemble</div>
              <div className="text-amber-300 font-mono font-bold">Gaussian Unitary (GUE)</div>
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>JT Dilaton Coupling <MathFormula math="\gamma" /></span>
              <span className="text-amber-400 font-mono">{gamma.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.1"
              value={gamma}
              onChange={e => setGamma(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Weak (0.4)</span>
              <span>Nominal (1.0)</span>
              <span>Strong (2.5)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Extremal Horizon Entropy <MathFormula math="S_0" /></span>
              <span className="text-amber-400 font-mono">{s0.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="6.0"
              step="0.2"
              value={s0}
              onChange={e => setS0(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Small BH (2.0)</span>
              <span>Intermediate (4.2)</span>
              <span>Macroscopic (6.0)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Geodesic Boundary Length <MathFormula math="b" /></span>
              <span className="text-amber-400 font-mono">{bParam.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="4.0"
              step="0.25"
              value={bParam}
              onChange={e => setBParam(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Cusp (b = 0)</span>
              <span>Throat (b = 1.5)</span>
              <span>Wide (b = 4.0)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SFF Graph: Semiclassical Dip -> GUE Ramp -> Plateau */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Spectral Form Factor <MathFormula math="K(\tau) = \langle |Z(\beta + \mathrm{i}\tau)|^2 \rangle" /> (Log-Log Chart)
          </h3>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-blue-400">1. Dip (~τ⁻³)</span>
            <span className="text-amber-400 font-bold">2. GUE Ramp (~τ/2π)</span>
            <span className="text-emerald-400">3. Plateau (~2e^{"{S_0}"})</span>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full bg-slate-950/80 rounded-lg border border-slate-800 p-3 overflow-x-auto relative">
          <svg
            viewBox="0 0 600 240"
            className="w-full h-60 select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Regime shaded background bands */}
            <rect
              x={sffChartData.padX}
              y={sffChartData.padY}
              width={Math.max(0, sffChartData.dipX - sffChartData.padX)}
              height={240 - 2 * sffChartData.padY}
              fill="#1e3a8a"
              fillOpacity="0.08"
            />
            <rect
              x={sffChartData.dipX}
              y={sffChartData.padY}
              width={Math.max(0, sffChartData.plateauX - sffChartData.dipX)}
              height={240 - 2 * sffChartData.padY}
              fill="#d97706"
              fillOpacity="0.10"
            />
            <rect
              x={sffChartData.plateauX}
              y={sffChartData.padY}
              width={Math.max(0, 600 - sffChartData.padX - sffChartData.plateauX)}
              height={240 - 2 * sffChartData.padY}
              fill="#059669"
              fillOpacity="0.08"
            />

            {/* Transition indicator lines */}
            <line
              x1={sffChartData.dipX}
              y1={sffChartData.padY}
              x2={sffChartData.dipX}
              y2={240 - sffChartData.padY}
              stroke="#60a5fa"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            <line
              x1={sffChartData.plateauX}
              y1={sffChartData.padY}
              x2={sffChartData.plateauX}
              y2={240 - sffChartData.padY}
              stroke="#34d399"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Labels in chart */}
            <text x={sffChartData.padX + 10} y={sffChartData.padY + 20} fill="#93c5fd" fontSize="10" fontWeight="600">
              Semiclassical Dip
            </text>
            <text x={sffChartData.dipX + 15} y={150} fill="#fcd34d" fontSize="11" fontWeight="700">
              Linear Ramp (Random Matrix Chaos)
            </text>
            <text x={sffChartData.plateauX + 10} y={sffChartData.padY + 20} fill="#6ee7b7" fontSize="10" fontWeight="600">
              Plateau (Discrete Spectra)
            </text>

            {/* Polyline SFF */}
            <polyline
              points={sffChartData.polyline}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Axes labels */}
            <text x={sffChartData.padX} y="15" fill="#64748b" fontSize="10">
              log₁₀ K(τ) (Spectral Form Factor)
            </text>
            <text x={500} y={235} fill="#64748b" fontSize="10">
              log₁₀ τ (Evolution Time) →
            </text>
          </svg>
        </div>

        <div className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
          The linear ramp <MathFormula math="K(\tau) \sim \frac{\tau}{2\pi}" /> is the diagnostic signature of quantum chaotic energy level repulsion in holographic Jackiw–Teitelboim gravity. In gravity, the ramp is generated by Euclidean wormholes connecting the two boundaries of the double-cone geometry.
        </div>
      </div>

      {/* Weil-Petersson Topological Volumes from Eynard-Orantin Recursion */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          Topological Recursion & Weil–Petersson Moduli Space Volumes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Sphere with 3 Geodesics</div>
            <div className="mt-1 text-sm font-bold text-white">
              <MathFormula math="V_{0, 3} = 1" />
            </div>
            <div className="mt-3 font-mono text-xl font-bold text-cyan-300">
              {sssData.wpVolumes.v03.toFixed(4)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Euler characteristic χ = -1</div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Torus with 1 Geodesic Boundary (b = {bParam.toFixed(2)})</div>
            <div className="mt-1 text-sm font-bold text-white">
              <MathFormula math="V_{1, 1}(b) = \frac{1}{24}(b^2 + 4\pi^2)" />
            </div>
            <div className="mt-3 font-mono text-xl font-bold text-amber-300">
              {v11Current.toFixed(4)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              At b=0 cusp: <MathFormula math="\frac{\pi^2}{6} \approx 1.6449" />
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Torus with 2 Geodesic Boundaries (b₁=b₂=0)</div>
            <div className="mt-1 text-sm font-bold text-white">
              <MathFormula math="V_{1, 2}(0, 0) = \frac{4\pi^2 \cdot 12\pi^2}{192} = \frac{\pi^4}{4}" />
            </div>
            <div className="mt-3 font-mono text-xl font-bold text-emerald-300">
              {sssData.wpVolumes.v12_b00.toFixed(4)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Exact analytical value: <MathFormula math="\approx 24.352" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
