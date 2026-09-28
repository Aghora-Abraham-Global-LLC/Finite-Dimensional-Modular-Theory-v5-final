import React, { useState } from 'react';
import { Overview } from './components/Overview';
import { LoewnerLab } from './components/LoewnerLab';
import { RotatedPetzLab } from './components/RotatedPetzLab';
import { MPSScalingLab } from './components/MPSScalingLab';
import { SSSRandomMatrixLab } from './components/SSSRandomMatrixLab';
import { IslandAutomatonLab } from './components/IslandAutomatonLab';
import { SymplecticIntegratorLab } from './components/SymplecticIntegratorLab';
import { BenchmarkRunner } from './components/BenchmarkRunner';
import { PaperReader } from './components/PaperReader';
import {
  LayoutDashboard,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  Compass,
  Table,
  BookOpen,
  ExternalLink,
  GitBranch,
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'loewner', label: 'Loewner & DOI', icon: Zap },
    { id: 'rotated-petz', label: 'Rotated Petz', icon: ShieldCheck },
    { id: 'mps-flow', label: 'MPS N=16 Scaling', icon: TrendingUp },
    { id: 'sss-matrix', label: 'SSS Matrix Dual', icon: Layers },
    { id: 'island-automaton', label: 'Island Automaton', icon: Cpu },
    { id: 'symplectic', label: 'Symplectic Control', icon: Compass },
    { id: 'benchmarks', label: 'Table 1 Benchmarks', icon: Table },
    { id: 'paper', label: 'Paper & TeX', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Global Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center font-serif text-lg font-bold text-white shadow-md shadow-cyan-600/20">
              Ψ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                  Dilaton Studio
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                  v5.0 Final
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Finite-Dimensional Modular Theory & Holographic Reconstruction Engine
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://doi.org/10.5281/zenodo.23009248"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              Zenodo: 10.5281/zenodo.23009248
            </a>
            <a
              href="https://github.com/Aghora-Abraham-Global-LLC/Finite-Dimensional-Modular-Theory-v5-final"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/50 py-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && <Overview onNavigateTab={tab => setActiveTab(tab)} />}
        {activeTab === 'loewner' && <LoewnerLab />}
        {activeTab === 'rotated-petz' && <RotatedPetzLab />}
        {activeTab === 'mps-flow' && <MPSScalingLab />}
        {activeTab === 'sss-matrix' && <SSSRandomMatrixLab />}
        {activeTab === 'island-automaton' && <IslandAutomatonLab />}
        {activeTab === 'symplectic' && <SymplecticIntegratorLab />}
        {activeTab === 'benchmarks' && <BenchmarkRunner />}
        {activeTab === 'paper' && <PaperReader />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-slate-300 font-semibold">
              Dilaton Studio v5.0 • Finite-Dimensional Modular Theory
            </div>
            <div>
              Ghulam-e-Shah-e-Unmani (AryaArunachalaAnanda) • BhutaDamaraSena R&D Labs, Aghora Abraham Global LLC
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Zenodo: 10.5281/zenodo.23009248</span>
            <span>•</span>
            <span>CC BY 4.0 International</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
