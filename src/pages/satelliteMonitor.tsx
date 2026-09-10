import SatelliteSourceCard from "../components/dashboard/satellite/satelliteSourceCard";
import SARImageAnalysis from "../components/dashboard/satellite/sarImageAnalysis";
import UpcomingSatellitePasses from "../components/dashboard/satellite/upcomingSatellitePasses";

export default function SatelliteMonitor() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913] text-slate-100">
      {/* =====================================================
          SATELLITE PAGE HEADER
      ===================================================== */}

      <header className="flex min-h-[70px] shrink-0 items-center justify-between border-b border-cyan-400/10 bg-[#020b16] px-6">
        <div className="min-w-0">
          <h1 className="whitespace-nowrap font-mono text-[17px] tracking-[0.12em] text-slate-100">
            SATELLITE INTELLIGENCE
          </h1>

          <p className="mt-1 whitespace-nowrap font-mono text-[10px] tracking-[0.12em] text-slate-500">
            Multi-Source Observation Analysis
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-8">
          {/* LIVE SYSTEM */}

          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

            <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.12em] text-emerald-400">
              LIVE SYSTEM
            </span>
          </div>

          {/* SATELLITE UPDATE */}

          <div className="hidden shrink-0 text-right lg:block">
            <p className="whitespace-nowrap font-mono text-[9px] text-slate-500">
              Satellite updated:
              <span className="ml-2 text-cyan-300">
                10 SEP 2026 • 18:42 UTC
              </span>
            </p>

            <p className="mt-1 whitespace-nowrap font-mono text-[9px] text-slate-600">
              Vessel:
              <span className="ml-2 text-slate-400">
                MV SAGAR KANYA
              </span>
            </p>
          </div>

          {/* ALERT */}

          <button
            type="button"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-[#061522] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300 sm:flex"
          >
            △
          </button>

          {/* USER */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] font-mono text-[10px] text-cyan-200">
            SK
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">

          {/* =================================================
              SATELLITE SOURCES
          ================================================= */}

          <section className="grid min-w-0 grid-cols-3 gap-4">

            {/* SENTINEL-1 */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="SENTINEL-1"
                type="SAR / C-Band Radar"
                icon="radar"
                latestObservation="08 SEP 2026 • 18:42 UTC"
                orbit="Near-Polar Orbit • 693 km"
                coverage="400 km swath"
                resolution="10 m / 40 m"
                passes="2 passes / day"
                status="ACTIVE"
              />
            </div>

            {/* MODIS / TERRA */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="MODIS / TERRA"
                type="Multispectral Optical"
                icon="optical"
                latestObservation="08 SEP 2026 • 14:18 UTC"
                orbit="Sun-Synchronous • 705 km"
                coverage="2,330 km swath"
                resolution="250 m – 1 km"
                passes="1 pass / day"
                status="ACTIVE"
              />
            </div>

            {/* AI PROCESSED */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="AI PROCESSED"
                type="Fusion + Segmentation"
                icon="ai"
                latestObservation="08 SEP 2026 • 18:42 UTC"
                orbit="POLARIS-AI v2.4 • Edge TPU"
                coverage="1,250 × 1,250 km"
                resolution="10 m effective"
                passes="Updated per pass"
                status="COMPLETE"
              />
            </div>

          </section>

          {/* =================================================
              SAR ANALYSIS
          ================================================= */}

          <SARImageAnalysis />

          {/* =================================================
              UPCOMING PASSES
          ================================================= */}

          <UpcomingSatellitePasses />

        </div>
      </main>
    </div>
  );
}