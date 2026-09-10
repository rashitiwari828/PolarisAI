import AnalyticsMetricCard from "../components/dashboard/analytics/analyticsMetricCard";
import SeaIceTrendChart from "../components/dashboard/analytics/seaIceTrendChart";
import RouteRiskChart from "../components/dashboard/analytics/routeRiskChart";
import FuelConsumptionChart from "../components/dashboard/analytics/fuelConsumptionChart";
import IcebergDetectionChart from "../components/dashboard/analytics/icebergDetectionChart";

import {
  analyticsMetrics,
  missionEfficiency,
} from "../data/analyticsData";

interface AnalyticsProps {
  onNavigateToModelPerformance: () => void;
}

export default function Analytics({
  onNavigateToModelPerformance,
}: AnalyticsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913] text-slate-100">
      {/* PAGE HEADER */}
      <header className="flex min-h-[70px] shrink-0 items-center justify-between border-b border-cyan-400/10 bg-[#020b16] px-6">
        <div>
          <h1 className="font-mono text-[17px] tracking-[0.12em] text-slate-100">
            MISSION ANALYTICS
          </h1>

          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-500">
            Performance Metrics & Insights
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

            <span className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
              LIVE SYSTEM
            </span>
          </div>

          <div className="hidden text-right lg:block">
            <p className="font-mono text-[9px] text-slate-500">
              Satellite updated:
              <span className="ml-2 text-cyan-300">
                08 SEP 2026 • 18:42 UTC
              </span>
            </p>

            <p className="mt-1 font-mono text-[9px] text-slate-600">
              Vessel:
              <span className="ml-2 text-slate-400">
                MV SAGAR KANYA
              </span>
            </p>
          </div>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-[#061522] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300 sm:flex"
          >
            △
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] font-mono text-[10px] text-cyan-200">
            SK
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* METRICS */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            {analyticsMetrics.map((metric) => (
              <AnalyticsMetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                subLabel={metric.subLabel}
                icon={metric.icon}
                tone={metric.tone}
              />
            ))}
          </section>

          {/* FIRST ROW */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <SeaIceTrendChart />
            <RouteRiskChart />
          </section>

          {/* SECOND ROW */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <FuelConsumptionChart />
            <IcebergDetectionChart />
          </section>

          {/* MISSION EFFICIENCY */}
          <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h2 className="font-sans text-[14px] font-medium tracking-wide text-slate-100">
                  MISSION EFFICIENCY REPORT
                </h2>

                <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
                  SIH Voyage • 06–09 SEP 2026 • MV Sagar Kanya
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateToModelPerformance}
                className="shrink-0 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.03] px-5 py-2.5 font-mono text-[10px] tracking-wide text-slate-400 transition hover:border-cyan-400/60 hover:bg-cyan-400/[0.08] hover:text-cyan-300"
              >
                MODEL PERFORMANCE →
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-6">
              {missionEfficiency.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-4 text-center"
                >
                  <p className="font-mono text-[9px] tracking-wide text-slate-600">
                    {item.label}
                  </p>

                  <p className="mt-2 text-[17px] font-medium text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}