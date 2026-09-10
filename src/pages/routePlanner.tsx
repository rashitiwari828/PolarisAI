import { useEffect, useState } from "react";

import RoutePlannerMap from "../components/dashboard/routePlanner/routePlannerMap";
import RouteConfiguration from "../components/dashboard/routePlanner/routeConfiguration";
import RouteParameters from "../components/dashboard/routePlanner/routeParameters";
import RouteResults from "../components/dashboard/routePlanner/routeResults";
import RouteExplainability from "../components/dashboard/routePlanner/routeExplanability";

type PlannerStage =
  | "planner"
  | "generating"
  | "results"
  | "explainability";

interface RoutePlannerProps {
  onNavigateToAlerts: () => void;
}

export default function RoutePlanner({
  onNavigateToAlerts,
}: RoutePlannerProps) {
  const [stage, setStage] = useState<PlannerStage>("planner");

  const generating = stage === "generating";
  const resultsVisible =
    stage === "results" || stage === "explainability";

  useEffect(() => {
    if (!generating) return;

    const timer = window.setTimeout(() => {
      setStage("results");
    }, 4200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [generating]);

  if (stage === "explainability") {
    return (
      <div className="flex h-full min-h-0 flex-col bg-[#020913] text-slate-100">
        <RoutePlannerHeader />

        <main className="min-h-0 flex-1 overflow-hidden">
          <RouteExplainability
            onBack={() => setStage("results")}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#020913] text-slate-100">
      {/* =====================================================
          ROUTE PLANNER HEADER
      ===================================================== */}

      <RoutePlannerHeader />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full min-h-0 flex-col xl:flex-row">
          {/* =================================================
              LEFT CONFIGURATION PANEL
          ================================================= */}

          <aside className="w-full shrink-0 overflow-y-auto border-r border-cyan-400/10 bg-[#020b16] p-4 xl:w-[320px]">
            {stage === "results" ? (
              <RouteResults
                onExplain={() => setStage("explainability")}
              />
            ) : (
              <div className="space-y-4">
                <RouteConfiguration
                  generating={generating}
                  onGenerate={() => setStage("generating")}
                />

                <RouteParameters />
              </div>
            )}
          </aside>

          {/* =================================================
              MAP
          ================================================= */}

          <section className="relative min-h-[520px] min-w-0 flex-1 overflow-hidden bg-[#020913]">
            <RoutePlannerMap
              generating={generating}
              resultsVisible={resultsVisible}
              showRoutes={resultsVisible}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   ROUTE PLANNER HEADER
========================================================= */

function RoutePlannerHeader() {
  return (
    <header className="flex min-h-[70px] shrink-0 items-center justify-between border-b border-cyan-400/10 bg-[#020b16] px-6">
      <div>
        <h1 className="font-mono text-[17px] tracking-[0.12em] text-slate-100">
          AI ROUTE PLANNER
        </h1>

        <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-500">
          Optimal Path Optimization
        </p>
      </div>

      <div className="flex items-center gap-8">
        {/* LIVE */}
        <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

          <span className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
            LIVE SYSTEM
          </span>
        </div>

        {/* SATELLITE */}
        <div className="hidden text-right lg:block">
          <p className="font-mono text-[9px] text-slate-500">
            Satellite updated:
            <span className="ml-2 text-cyan-300">
              10 SEP 2026 • 18:42 UTC
            </span>
          </p>

          <p className="mt-1 font-mono text-[9px] text-slate-600">
            Vessel:
            <span className="ml-2 text-slate-400">
              MV SAGAR KANYA
            </span>
          </p>
        </div>

        {/* ALERT */}
        <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-[#061522] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300 sm:flex">
          △
        </button>

        {/* USER */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] font-mono text-[10px] text-cyan-200">
          SK
        </div>
      </div>
    </header>
  );
}