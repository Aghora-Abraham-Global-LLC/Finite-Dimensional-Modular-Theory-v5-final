import React, { useState, useMemo } from 'react';
import { MathFormula } from './MathFormula';
import { PAPER_METADATA, PAPER_SECTIONS, RAW_TEX_SOURCE } from '../data/paperContent';
import { BookOpen, Code2, Search, Copy, Check, Download, ExternalLink, Hash } from 'lucide-react';

export const PaperReader: React.FC = () => {
  const [activeView, setActiveView] = useState<'reader' | 'tex'>('reader');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedTex, setCopiedTex] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>('sec-intro');

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return PAPER_SECTIONS;
    const q = searchQuery.toLowerCase();
    return PAPER_SECTIONS.filter(
      s =>
        s.title.toLowerCase().includes(q) ||
        s.abstractSnippet.toLowerCase().includes(q) ||
        s.number.includes(q)
    );
  }, [searchQuery]);

  const copyTexToClipboard = () => {
    navigator.clipboard.writeText(RAW_TEX_SOURCE);
    setCopiedTex(true);
    setTimeout(() => setCopiedTex(false), 2000);
  };

  const downloadTexFile = () => {
    const blob = new Blob([RAW_TEX_SOURCE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Finite_Modular_V5.tex';
    a.click();
    URL.revokeObjectURL(url);
  };

  const texLines = useMemo(() => RAW_TEX_SOURCE.split('\n'), []);

  return (
    <div className="space-y-6">
      {/* Frontmatter & Paper Header */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <span>Research Monograph</span>
            <span>•</span>
            <span>Version 5.0 Final</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight leading-tight">
            {PAPER_METADATA.title}
          </h1>

          <div className="text-sm font-sans text-cyan-400 font-medium">
            {PAPER_METADATA.subTitle}
          </div>

          <div className="pt-2 text-xs text-slate-300 flex flex-wrap items-center gap-y-2 gap-x-4 border-t border-slate-800/80">
            <span className="font-semibold text-white">{PAPER_METADATA.author}</span>
            <span className="text-slate-500">•</span>
            <span>{PAPER_METADATA.affiliation}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{PAPER_METADATA.date}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://doi.org/10.5281/zenodo.23009248"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              DOI: {PAPER_METADATA.doiZenodo1}
            </a>
            <a
              href="https://doi.org/10.5281/zenodo.22851183"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              DOI: {PAPER_METADATA.doiZenodo2}
            </a>
            <span className="text-[11px] text-slate-500">
              License: CC BY 4.0
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveView('reader')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeView === 'reader'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Formatted Paper Reader
            </button>
            <button
              onClick={() => setActiveView('tex')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeView === 'tex'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              LaTeX Source (Finite_Modular_V5.tex)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTexToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700/60 font-medium"
            >
              {copiedTex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTex ? 'Copied TeX!' : 'Copy TeX Source'}
            </button>
            <button
              onClick={downloadTexFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700/60 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              Download .tex
            </button>
          </div>
        </div>
      </div>

      {/* Reader View */}
      {activeView === 'reader' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-4 sticky top-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-xs">
                  Sections & Theorems
                </h3>
                <span className="text-[11px] font-mono text-slate-500">10 Sections</span>
              </div>

              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Section list */}
              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                {filteredSections.map(sec => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                      selectedSection === sec.id
                        ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-800/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 font-bold shrink-0">{sec.number}.</span>
                    <span className="font-medium line-clamp-1">{sec.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section Detail Reader Panel */}
          <div className="lg:col-span-8 space-y-6">
            {PAPER_SECTIONS.map(sec => {
              if (selectedSection && selectedSection !== sec.id) return null;
              return (
                <div
                  key={sec.id}
                  className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Hash className="w-3.5 h-3.5" />
                    Section {sec.number}
                  </div>
                  <h2 className="text-xl font-bold font-serif text-white">{sec.title}</h2>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {sec.abstractSnippet}
                  </p>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center my-4 overflow-x-auto">
                    <MathFormula display math={sec.keyFormula} />
                  </div>

                  {/* Curated Deep Mathematical Physics Narrative for Each Section */}
                  {sec.number === '1' && (
                    <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800/80 pt-4">
                      <p>
                        In algebraic quantum field theory (AQFT) and holographic AdS/CFT, modular Hamiltonians <MathFormula math="K = -\ln\rho" /> play a central role through the Jafferis–Lewkowycz–Maldacena–Suh (JLMS) relation:
                      </p>
                      <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 font-mono text-slate-200">
                        K_boundary = Φ(QES) / (4 G_N) + K_bulk(Σ_island)
                      </div>
                      <p>
                        Coupling the black hole interior in 2D dilaton gravity (JT, AP, CGHS, RST) to an external flat bath allows Hawking radiation to escape. Past the Page time, quantum extremal surface islands nucleate inside the horizon.
                      </p>
                    </div>
                  )}

                  {sec.number === '2' && (
                    <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800/80 pt-4">
                      <p>
                        For any continuously differentiable function <MathFormula math="f" />, the Birman–Solomyak double operator integral governs the Fréchet differential:
                      </p>
                      <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 font-mono text-slate-200">
                        Df(ρ)[H] = Σ_{"{j,k}"} f^[1](λ_j, λ_k) |v_j⟩⟨v_j| H |v_k⟩⟨v_k|
                      </div>
                      <p>
                        By Lemma 2.3, the Cauchy resolvent integral <MathFormula math="\int_0^1 (u\rho + (1-u)\mathbb{I})^{-1} H (u\rho + (1-u)\mathbb{I})^{-1} du" /> is identically equivalent to the DOI formula.
                      </p>
                    </div>
                  )}

                  {sec.number === '5' && (
                    <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800/80 pt-4">
                      <p>
                        Theorem 5.1 proves the strict Loewner operator monotone metric ordering:
                      </p>
                      <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 font-mono text-cyan-300">
                        g^SLD ≤ g^WY ≤ g^KMB ≤ g^RLD
                      </div>
                      <p>
                        The universal rotated Petz map establishes a tight non-perturbative lower bound on the strengthened Data Processing Inequality deficit: <MathFormula math="\Delta_{\mathrm{DPI}} \ge -\ln F" />.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Raw LaTeX Source View with Line Numbers */
        <div className="border border-slate-800 bg-slate-900/60 rounded-xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400 font-semibold flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              /Finite_Modular_V5.tex ({texLines.length} lines, 43,194 bytes)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">XeLaTeX / pdfLaTeX Dual-Mode</span>
          </div>

          <div className="p-4 bg-slate-950 overflow-x-auto max-h-[650px] font-mono text-xs leading-relaxed">
            <pre className="text-slate-300">
              {texLines.map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/70">
                  <span className="table-cell pr-4 text-slate-600 select-none text-right w-12 font-mono">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre text-slate-200">
                    {line}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
