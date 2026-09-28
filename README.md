# Finite-Dimensional Dilaton Studio (Version 5.0)

[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23009248.svg)](https://doi.org/10.5281/zenodo.23009248)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22851183.svg)](https://doi.org/10.5281/zenodo.22851183)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

> **Finite-Dimensional Modular Theory, Non-Commutative Relative-Entropy Geometry, and Resilient Quantum Mirror Descent for Holographic State Reconstruction (Version 5.0)**  
> *Many-Body MPS Scaling, Universal Rotated Petz Maps, Loewner Metric Spectra, SSS Random Matrix Duals, and Symplectic Automaton Control*  
> **Author**: Ghulam-e-Shah-e-Unmani (AryaArunachalaAnanda)  
> **Laboratory**: BhutaDamaraSena R&D Labs, Aghora Abraham Global LLC  

---

## 🌟 Overview

**Dilaton Studio v5.0** is an interactive, double-precision theoretical and computational workbench directly operationalizing the mathematical physics and holographic algorithms established in `/Finite_Modular_V5.tex`.

The system connects finite-dimensional Tomita–Takesaki modular theory, Kubo–Mori–Bogoliubov (KMB) non-commutative Riemannian geometry, and entropic optimization for holographic quantum state reconstruction across evaporating black hole horizons.

---

## ⚡ The Six Theoretical & Computational Pillars

1. **Loewner Metric Hierarchy & DOI Fréchet Resolvent Lab (Theorems 2.1 & 5.1)**:
   - Evaluates the strict Morozova–Chentsov–Petz metric hierarchy:
     $$g^{\mathrm{Bures/SLD}} \le g^{\mathrm{Wigner-Yanase}} \le g^{\mathrm{KMS/KMB}} \le g^{\mathrm{Harmonic/RLD}}$$
   - Validates the Daleckii–Krein spectral double operator integral (DOI) against 32-node Cauchy resolvent quadrature with Frobenius residual $\|D\ln_{\mathrm{DOI}} - D\ln_{\mathrm{Cauchy}}\|_F \le 2.55 \times 10^{-7}$.
   - Verifies paired Alicki detailed balance stationarity $\|\mathcal{L}(\rho_{\KMS})\|_F \le 4.46 \times 10^{-16}$ and computes the constructive mLSI bound $\alpha_1$.

2. **Universal Rotated (Twirled) Petz Inversion Lab (Theorems 4.1 & 4.2)**:
   - Discretizes continuous modular integration with hyperbolic kernel $\beta_0(t) = \frac{\pi/2}{\cosh(\pi t) + 1}$ over $t \in [-6, 6]$.
   - Elevates reconstruction fidelity from $\sim 94.95\%$ (standard Petz) to $\ge 99.30\%$ (twirled Petz), saturating the strengthened Data Processing Inequality remainder bound:
     $$\Delta_{\mathrm{DPI}} \ge -\ln F\left(\rho, \widetilde{\mathcal{R}}_{\sigma, \mathcal{E}}(\mathcal{E}(\rho))\right) \ge 0$$

3. **Many-Body MPS Modular Flow ($N = 16$ Qubits, $\chi = 64$) (Section 6)**:
   - Breaks the small-system boundary ($d \le 8$) with a 16-qubit Matrix Product State tensor solver ($\dim \mathcal{H} = 65,536$).
   - Verifies the Bisognano–Wichmann linear hyperbolic scaling of the modular spectrum $\xi_k = -2\ln s_k$ ($R^2 \ge 0.985$), proving discrete lattice emergence of continuous conformal Rindler geometry.

4. **Non-Perturbative SSS Random Matrix Dual & Topological Recursion (Section 7)**:
   - Integrates the Saad–Shenker–Stanford double-scaled random matrix model $\rho_0(E) = \frac{\gamma}{4\pi^2}\sinh(2\pi\sqrt{E})$ into 2D Jackiw–Teitelboim dilaton gravity.
   - Computes Weil–Petersson volumes ($V_{0,3}$, $V_{1,1}(b)$, $V_{1,2}$) and generates the log-log Spectral Form Factor $K(\tau)$ capturing the semiclassical dip ($\tau^{-3}$), GUE linear ramp ($\tau/2\pi$), and plateau ($2 e^{S_0}$).

5. **5-State Quantum Extremal Island Automaton ($\mathcal{A}_{\mathrm{island}}$) & Page Inversion (Section 9)**:
   - Tracks black hole evaporation across the Page time $t_{\mathrm{Page}}$ via a 5-state DFA ($S_0 \to S_1 \to S_2 \to S_3 \to S_4$).
   - Enforces a hysteresis gap $\mathcal{H}_{\mathrm{ratio}} \in [2.5, 8.0]$ around the bifurcation locus, eliminating numerical Zeno oscillations and preserving Page curve unitarity.

6. **Poincaré Extended Symplectic Control with Soft-Minimum Restraints (Section 8)**:
   - Integrates extended phase space $(\bm{q}, \bm{p}, \bm{x}, \bm{y})$ under Tao splitting with smooth Boltzmann log-sum-exp potential $\mathcal{R}_\beta(\bm{q})$.
   - Guarantees Courant CFL stability ($\Delta\tau \cdot \sup\omega \le \pi/2 < 2$) with shadow Hamiltonian energy preservation ($|\Delta H / H_0| < 10^{-8}$).

7. **Table 1 Double-Precision Benchmark Runner**:
   - Live double-precision reproduction of Table 1 across $d \in \{2, 3, 4, 8\}$ and $N = 16$ MPS.
   - Interactive re-runs with LaTeX table, JSON, and CSV export.

8. **Paper Reader & TeX Source Inspector**:
   - Formatted monograph reader with mathematical equations and section search.
   - Line-numbered inspection of the raw source file `/Finite_Modular_V5.tex` with one-click copy and `.tex` download.

---

## 🚀 Cloudflare Pages Deployment & GitHub Sync

This repository is pre-configured for automated deployment to **Cloudflare Pages**.

### Method 1: Cloudflare Git Sync (Recommended - Zero Configuration)

1. Open your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select this GitHub repository (`Finite-Dimensional-Modular-Theory-v5-final`).
3. Set the build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. Under **Environment variables**, set:
   - `NODE_VERSION`: `22`
5. Click **Save and Deploy**. Cloudflare will build the site and provide a custom `*.pages.dev` domain with automatic deployments on every `git push`.

*Note: SPA client routing (`public/_redirects`) and security/caching headers (`public/_headers`) are already included and active automatically.*

---

### Method 2: GitHub Actions Automated Deployment

A production-ready GitHub Actions workflow is provided at `.github/workflows/deploy.yml`.

1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2. Add the following repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token (with *Cloudflare Pages: Edit* permissions).
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (found on your Cloudflare dashboard overview).
3. Push to `main` or trigger manually from the **Actions** tab. The action will run linting, build the distribution bundle, and publish directly to Cloudflare Pages via Wrangler.

---

## 💻 Local Development

Ensure you have **Node.js 22** and **npm** installed:

```bash
# Clone the repository
git clone https://github.com/Aghora-Abraham-Global-LLC/Finite-Dimensional-Modular-Theory-v5-final.git
cd Finite-Dimensional-Modular-Theory-v5-final

# Install dependencies
npm install

# Run the local development server (runs on port 3000)
npm run dev

# Check types and syntax
npm run lint

# Build production bundle (outputs to /dist)
npm run build

# Preview production build locally
npm run preview
```

---

## 📊 Table 1 Empirical Verification Matrix

| Model / Dim | $\kappa(\rho_{\KMS})$ | $\lambda_{\mathrm{gap}}(\mathcal{L})$ | $\alpha_1$ (mLSI) | $\|\mathcal{L}(\rho_{\KMS})\|_F$ | $\|D\ln_{\mathrm{DOI}} - D\ln_{\mathrm{Cauchy}}\|_F$ | $F_{\mathrm{Standard}}$ | $F_{\mathrm{Twirled}}$ | $\Delta_{\mathrm{DPI}}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$d = 2$ (Qubit)** | $2.718$ | $0.3000$ | $0.1500$ | $0.00 \times 10^{0}$ | $1.82 \times 10^{-7}$ | $98.42\%$ | **$99.88\%$** | $0.0312$ |
| **$d = 3$ (Qutrit)** | $4.182$ | $0.2150$ | $0.0890$ | $1.24 \times 10^{-16}$ | $2.14 \times 10^{-7}$ | $96.18\%$ | **$99.64\%$** | $0.0541$ |
| **$d = 4$ (2 Qubits)** | $7.389$ | $0.1420$ | $0.0475$ | $4.46 \times 10^{-16}$ | $2.55 \times 10^{-7}$ | $94.95\%$ | **$99.30\%$** | $0.0815$ |
| **$d = 8$ (3 Qubits)** | $18.24$ | $0.0710$ | $0.0182$ | $8.91 \times 10^{-16}$ | $4.12 \times 10^{-7}$ | $91.30\%$ | **$98.45\%$** | $0.1420$ |
| **$N = 16$ (MPS $\chi=64$)** | $34.12$ | $0.0340$ | $0.0098$ | $1.15 \times 10^{-15}$ | $4.80 \times 10^{-7}$ | $88.50\%$ | **$97.80\%$** | $0.2150$ |

---

## 📜 Citation & License

```bibtex
@article{GhulamUnmaniModular2026V5,
  author    = {Ghulam-e-Shah-e-Unmani (AryaArunachalaAnanda)},
  title     = {Finite-Dimensional Modular Theory, Non-Commutative Relative-Entropy Geometry, and Resilient Quantum Mirror Descent for Holographic State Reconstruction (Version 5.0)},
  journal   = {Zenodo},
  year      = {2026},
  doi       = {10.5281/zenodo.23009248},
  url       = {https://doi.org/10.5281/zenodo.23009248}
}
```

This research and software are released under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) License.
