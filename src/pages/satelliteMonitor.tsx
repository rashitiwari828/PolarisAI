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
            Sentinel-1 SAR Observation & Mission Impact Analysis
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
              Sentinel-1 updated:
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
              SENTINEL-1 OBSERVATION
          ================================================= */}

          <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">

            {/* SENTINEL-1 */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="SENTINEL-1"
                type="SAR / C-Band Radar"
                icon="radar"
                latestObservation="10 SEP 2026 • 18:42 UTC"
                orbit="Near-Polar Orbit • 693 km"
                coverage="400 km swath"
                resolution="10 m / 40 m"
                passes="2 passes / day"
                status="ACTIVE"
              />
            </div>

            {/* SAR PROCESSING */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="SAR PROCESSING"
                type="Ice Detection + Change Analysis"
                icon="ai"
                latestObservation="10 SEP 2026 • 18:42 UTC"
                orbit="POLARIS-AI Processing Pipeline"
                coverage="Mission Area"
                resolution="10 m effective"
                passes="Processed per pass"
                status="COMPLETE"
              />
            </div>

            {/* MISSION IMPACT */}

            <div className="min-w-0">
              <SatelliteSourceCard
                name="MISSION IMPACT"
                type="Risk + Mission Feasibility"
                icon="ai"
                latestObservation="10 SEP 2026 • 18:42 UTC"
                orbit="Adaptive Mission Planner"
                coverage="Active Mission Waypoints"
                resolution="Waypoint-Level Analysis"
                passes="Re-evaluated per observation"
                status="ACTIVE"
              />
            </div>

          </section>

          {/* =================================================
              SAR ANALYSIS
          ================================================= */}

          <SARImageAnalysis />

          {/* =================================================
              UPCOMING SENTINEL-1 PASSES
          ================================================= */}

          <UpcomingSatellitePasses />

        </div>
      </main>
    </div>
  );
}