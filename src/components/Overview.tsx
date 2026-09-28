import React from 'react';
import { MathFormula } from './MathFormula';
import { PAPER_METADATA } from '../data/paperContent';
import {
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Compass,
  Zap,
  ExternalLink,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface OverviewProps {
  onNavigateTab: (tabId: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigateTab }) => {
  const pillars = [
    {
      id: 'loewner',
      title: 'Loewner Metric Hierarchy & DOI Resolvents',
      formula: 'g^{\\mathrm{SLD}} \\le g^{\\mathrm{WY}} \\le g^{\\mathrm{KMB}} \\le g^{\\mathrm{RLD}}',
      description: 'Proves the operator monotone metric classification of the Umegaki relative-entropy Hessian, identifying the canonical KMB metric.',
      icon: Zap,
      color: 'text-blue-400 bg-blue-950/40 border-blue-800/40',
    },
    {
      id: 'rotated-petz',
      title: 'Universal Rotated Petz Inversion',
      formula: '\\widetilde{\\mathcal{R}}_{\\sigma, \\mathcal{E}}(X) = \\int \\beta_0(t) \\sigma^{\\mathrm{i}t/2} \\mathcal{R}(X) \\sigma^{-\\mathrm{i}t/2} dt',
      description: 'Continuous integration with hyperbolic kernel β₀(t) boosts reconstruction fidelity from 94.95% to ≥99.30%, saturating the strengthened DPI remainder.',
      icon: ShieldCheck,
      color: 'text-violet-400 bg-violet-950/40 border-violet-800/40',
    },
    {
      id: 'mps-flow',
      title: 'Many-Body MPS Scaling (N = 16)',
      formula: '\\xi_k = -2\\ln s_k = c_0 + c_1 k, \\quad R^2 \\ge 0.985',
      description: 'Breaks small-system dimension bounds (d ≤ 8) with a 16-qubit MPS solver (65,536 states), verifying Bisognano–Wichmann linear hyperbolic scaling.',
      icon: TrendingUp,
      color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40',
    },
    {
      id: 'sss-matrix',
      title: 'SSS Random Matrix Dual & SFF Ramp',
      formula: '\\rho_0(E) = \\frac{\\gamma}{4\\pi^2} \\sinh(2\\pi\\sqrt{E})',
      description: 'Eynard–Orantin topological recursion computes higher-genus Weil–Petersson volumes and captures the quantum chaotic SFF ramp and plateau.',
      icon: Layers,
      color: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
    },
    {
      id: 'island-automaton',
      title: '5-State QES Island Automaton',
      formula: '\\mathcal{A}_{\\mathrm{island}} = \\{S_0, S_1, S_2, S_3, S_4\\}, \\quad \\mathcal{H}_{\\mathrm{ratio}} \\in [2.5, 8.0]',
      description: '5-state Deterministic Finite Automaton with hysteresis gap eliminates numerical Zeno chattering across the Page threshold.',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
    },
    {
      id: 'symplectic',
      title: 'Poincaré Symplectic Control',
      formula: '\\Delta\\tau \\cdot \\sup\\omega(\\mathcal{R}_\\beta) \\le \\frac{\\pi}{2} < 2',
      description: 'Integrates extended phase space with smooth Boltzmann soft-minimum restraints, preserving shadow Hamiltonian energy to machine precision.',
      icon: Compass,
      color: 'text-teal-400 bg-teal-950/40 border-teal-800/40',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
              Dilaton Studio Version 5.0 Engine
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
              Aghora-Abraham-Global-LLC
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Double-Precision
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Finite-Dimensional Modular Theory, Relative-Entropy Geometry & Holographic Reconstruction
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            A unified theoretical and computational workbench connecting finite-dimensional Tomita–Takesaki modular theory, Kubo–Mori–Bogoliubov Riemannian geometry, universal rotated Petz maps, many-body Matrix Product States, and symplectic control across evaporating black hole horizons.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500">Author: </span>
              <strong className="text-slate-200">{PAPER_METADATA.author}</strong>
            </div>
            <div>
              <span className="text-slate-500">Affiliation: </span>
              <span className="text-slate-300">{PAPER_METADATA.affiliation}</span>
            </div>
            <div>
              <span className="text-slate-500">Date: </span>
              <span className="text-slate-300">{PAPER_METADATA.date}</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('loewner')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all"
            >
              <span>Explore Interactive Labs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('paper')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Read Full Monograph & TeX</span>
            </button>
            <a
              href="https://doi.org/10.5281/zenodo.23009248"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              Zenodo DOI: {PAPER_METADATA.doiZenodo1}
            </a>
          </div>
        </div>
      </div>

      {/* The 6 Core Foundations / Pillars */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">The Six Theoretical & Computational Pillars</h2>
            <p className="text-xs text-slate-400">
              Select any pillar to launch its live numerical solver, spectral visualizer, and proof verification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => onNavigateTab(p.id)}
                className="border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 rounded-xl p-5 cursor-pointer transition-all hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`p-2 rounded-lg border ${p.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/60 p-2.5 rounded-lg text-center overflow-x-auto">
                  <MathFormula display math={p.formula} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlights Verification Bar */}
      <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Empirical Engine Benchmarks (Table 1 Summary)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Thermal Stationarity</div>
            <div className="font-mono text-base font-bold text-emerald-400 mt-1">
              ≤ 4.46 × 10⁻¹⁶
            </div>
            <div className="text-[10px] text-slate-500">Machine Zero</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Fréchet DOI Agreement</div>
            <div className="font-mono text-base font-bold text-cyan-300 mt-1">
              ≤ 2.55 × 10⁻⁷
            </div>
            <div className="text-[10px] text-slate-500">Cauchy 32-node</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Twirled Petz Fidelity</div>
            <div className="font-mono text-base font-bold text-violet-300 mt-1">
              ≥ 99.30%
            </div>
            <div className="text-[10px] text-slate-500">Post-Page Time</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">MPS Hyperbolic Fit</div>
            <div className="font-mono text-base font-bold text-amber-300 mt-1">
              R² ≥ 0.985
            </div>
            <div className="text-[10px] text-slate-500">N = 16, χ = 64</div>
          </div>
        </div>
      </div>
    </div>
  );
};
