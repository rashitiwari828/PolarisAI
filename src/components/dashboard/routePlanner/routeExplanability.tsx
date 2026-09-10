import {
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import {
  aiConfidence,
  decisionFactors,
  optimizationWeights,
  routeScores,
} from "../../../data/routePlannerData";

interface RouteExplainabilityProps {
  onBack: () => void;
}

export default function RouteExplainability({
  onBack,
}: RouteExplainabilityProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#020913] p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-cyan-400">
            ROUTE EXPLAINABILITY
          </p>

          <h1 className="mt-2 text-[28px] tracking-wide text-white">
            WHY POLARIS CHOSE THIS ROUTE
          </h1>

          <p className="mt-2 font-mono text-[11px] text-slate-500">
            POLARIS Optimal Route
            <span className="mx-2 text-cyan-400">•</span>
            AI Confidence:
            <span className="ml-1 text-cyan-300">89%</span>
            <span className="mx-2 text-cyan-400">•</span>
            Generated 10 SEP 2026
          </p>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-[#04111d] px-4 py-3 font-mono text-[11px] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-200"
        >
          <ArrowLeft size={14} />
          BACK TO PLANNER
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="space-y-5">
          {/* OPTIMAL ROUTE */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              POLARIS OPTIMAL ROUTE
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <ScoreBox
                label="DISTANCE"
                value="1,925 km"
              />

              <ScoreBox
                label="ETA"
                value="83h 30m"
              />

              <ScoreBox
                label="FUEL"
                value="12,650 L"
                highlight
              />

              <ScoreBox
                label="RISK"
                value="11%"
                highlight
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-3 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3 font-mono text-[10px] text-slate-500">
              <span>
                vs Safest:
                <strong className="ml-2 text-slate-300">
                  8h faster, 450L less fuel
                </strong>
              </span>

              <span>
                vs Fastest:
                <strong className="ml-2 text-slate-300">
                  21% lower risk, 5% less fuel
                </strong>
              </span>
            </div>
          </section>

          {/* DECISION FACTORS */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              DECISION FACTORS
            </h2>

            <div className="mt-5 space-y-3">
              {decisionFactors.map((factor) => (
                <div
                  key={factor.title}
                  className="flex gap-4 rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4"
                >
                  <CheckCircle2
                    size={23}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="text-[14px] text-slate-300">
                      {factor.title}
                    </p>

                    <p className="mt-1 font-mono text-[10px] font-semibold text-cyan-300">
                      {factor.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OPTIMIZATION WEIGHTS */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              OPTIMIZATION WEIGHTS
            </h2>

            <div className="mt-5 space-y-5">
              {optimizationWeights.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-slate-300">
                      {item.name}
                    </span>

                    <span className="font-mono text-[10px] text-slate-500">
                      Weight: {item.weight}%
                      <strong className="ml-3 text-cyan-300">
                        {item.score}/100
                      </strong>
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0a1a27]">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          {/* ROUTE SCORE */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="text-center font-mono text-[14px] tracking-[0.08em] text-slate-200">
              ROUTE SCORE
            </h2>

            <div className="mt-7 grid grid-cols-2 gap-8">
              <ScoreCircle
                value={routeScores.safety}
                label="Safety"
              />

              <ScoreCircle
                value={routeScores.fuelEfficiency}
                label="Fuel Efficiency"
              />

              <ScoreCircle
                value={routeScores.timeEfficiency}
                label="Time Efficiency"
              />

              <ScoreCircle
                value={routeScores.overall}
                label="Overall"
              />
            </div>
          </section>

          {/* AI CONFIDENCE */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-cyan-300">
              AI CONFIDENCE
            </h2>

            <div className="flex justify-center py-7">
              <ScoreCircle
                value={aiConfidence.overall}
                label="Overall confidence"
                suffix="%"
                large
              />
            </div>

            <ConfidenceRow
              label="Ice model conf."
              value={aiConfidence.iceModel}
            />

            <ConfidenceRow
              label="Iceberg traj. conf."
              value={aiConfidence.icebergTrajectory}
            />

            <ConfidenceRow
              label="Weather conf."
              value={aiConfidence.weather}
            />

            <ConfidenceRow
              label="Route optimization"
              value={aiConfidence.routeOptimization}
            />
          </section>

          {/* ALTERNATIVES */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              VS ALTERNATIVES
            </h2>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4">
                <p className="font-mono text-[10px] text-slate-500">
                  vs Fastest
                </p>

                <div className="mt-3 flex gap-8">
                  <div>
                    <p className="font-mono text-[9px] text-slate-600">
                      Risk
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-emerald-400">
                      ↓21%
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] text-slate-600">
                      Ice exp.
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-emerald-400">
                      ↓18%
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4">
                <p className="font-mono text-[10px] text-slate-500">
                  vs Safest
                </p>

                <div className="mt-3 flex gap-8">
                  <div>
                    <p className="font-mono text-[9px] text-slate-600">
                      Speed
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-cyan-300">
                      ↑8h faster
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] text-slate-600">
                      Fuel
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-cyan-300">
                      ↓450L
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button className="w-full rounded-xl border border-cyan-400/60 bg-cyan-400/[0.12] px-5 py-4 font-mono text-[13px] tracking-[0.08em] text-cyan-100 transition hover:bg-cyan-400/[0.18]">
            CONFIRM THIS ROUTE →
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-5 text-center">
      <p className="font-mono text-[9px] tracking-[0.1em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-3 text-[20px] ${
          highlight ? "text-cyan-300" : "text-slate-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ScoreCircle({
  value,
  label,
  suffix = "",
  large = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center rounded-full border-[5px] border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
          large ? "h-36 w-36" : "h-24 w-24"
        }`}
      >
        <div className="text-center">
          <div
            className={`font-mono text-white ${
              large ? "text-4xl" : "text-2xl"
            }`}
          >
            {value}
          </div>

          {suffix && (
            <span className="font-mono text-[10px] text-slate-500">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function ConfidenceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-cyan-400/[0.07] py-3 font-mono text-[10px]">
      <span className="text-slate-500">{label}</span>

      <span className="text-cyan-300">{value}%</span>
    </div>
  );
}