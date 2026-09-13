import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Target,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import {
  aiConfidence,
  decisionFactors,
  missionObjectives,
  missionPlan,
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
            MISSION EXPLAINABILITY
          </p>

          <h1 className="mt-2 text-[28px] tracking-wide text-white">
            WHY POLARIS CHOSE THIS MISSION PLAN
          </h1>

          <p className="mt-2 font-mono text-[11px] text-slate-500">
            Adaptive Mission-Aware Navigation
            <span className="mx-2 text-cyan-400">•</span>
            AI Confidence:
            <span className="ml-1 text-cyan-300">
              {missionPlan.confidence}%
            </span>
            <span className="mx-2 text-cyan-400">•</span>
            Generated 10 SEP 2026
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-[#04111d] px-4 py-3 font-mono text-[11px] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-200"
        >
          <ArrowLeft size={14} />
          BACK TO PLANNER
        </button>
      </div>

      {/* MISSION DECISION */}
      <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#04111d] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06]">
              <ShieldCheck
                size={25}
                className="text-emerald-400"
              />
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
                MISSION FEASIBILITY
              </p>

              <h2 className="mt-1 text-[21px] text-white">
                {missionPlan.feasibility}
              </h2>

              <p className="mt-2 max-w-2xl font-mono text-[10px] leading-5 text-slate-500">
                POLARIS selected a route that preserves all mandatory
                scientific objectives while maintaining the required
                safety margin and arrival window.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MissionMetric
              label="OBJECTIVES"
              value={`${missionPlan.scientificObjectives.completed}/${missionPlan.scientificObjectives.total}`}
            />

            <MissionMetric
              label="MANDATORY"
              value={`${missionPlan.mandatoryObjectives.completed}/${missionPlan.mandatoryObjectives.total}`}
            />

            <MissionMetric
              label="ARRIVAL"
              value={missionPlan.arrivalWindow}
            />

            <MissionMetric
              label="SAFETY"
              value={missionPlan.safetyMargin}
            />
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="space-y-5">
          {/* MISSION OBJECTIVES */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <div className="flex items-center gap-3">
              <Target size={18} className="text-cyan-400" />

              <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
                SCIENTIFIC OBJECTIVES
              </h2>
            </div>

            <p className="mt-2 font-mono text-[10px] text-slate-600">
              Mission objectives are evaluated alongside navigation risk.
            </p>

            <div className="mt-5 space-y-3">
              {missionObjectives.map((objective) => (
                <div
                  key={objective.waypoint}
                  className="flex items-center justify-between gap-4 rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-emerald-400"
                    />

                    <div>
                      <p className="text-[13px] text-slate-300">
                        {objective.name}
                      </p>

                      <p className="mt-1 font-mono text-[9px] text-slate-600">
                        {objective.waypoint}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[8px] tracking-[0.08em] ${
                      objective.status === "MANDATORY"
                        ? "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300"
                        : "border-amber-400/20 bg-amber-400/[0.05] text-amber-300"
                    }`}
                  >
                    {objective.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* MISSION SEQUENCE */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <div className="flex items-center gap-3">
              <RefreshCw size={17} className="text-cyan-400" />

              <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
                MISSION SEQUENCE
              </h2>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {missionPlan.sequence.map((point, index) => (
                <div
                  key={`${point}-${index}`}
                  className="flex items-center gap-2"
                >
                  <div className="rounded-lg border border-cyan-400/15 bg-[#061522] px-3 py-2 font-mono text-[9px] text-cyan-300">
                    {point}
                  </div>

                  {index < missionPlan.sequence.length - 1 && (
                    <span className="text-slate-700">→</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4">
              <p className="font-mono text-[9px] tracking-[0.1em] text-slate-600">
                ADAPTIVE REPLANNING LOGIC
              </p>

              <p className="mt-2 font-mono text-[10px] leading-5 text-slate-400">
                New Sentinel-1 observations can change iceberg risk.
                POLARIS re-evaluates the complete mission rather than
                only rerouting the vessel around an individual hazard.
              </p>
            </div>
          </section>

          {/* MISSION IMPACT */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              MISSION IMPACT ANALYSIS
            </h2>

            <div className="mt-5 space-y-3">
              <ImpactRow
                title="Mandatory objectives"
                detail="Protected from route-level optimization trade-offs"
                status="PRESERVED"
                positive
              />

              <ImpactRow
                title="Optional objectives"
                detail="May be skipped when required to preserve mission feasibility"
                status="FLEXIBLE"
              />

              <ImpactRow
                title="Arrival window"
                detail="Route must remain compliant with the mission schedule"
                status={missionPlan.arrivalWindow}
                positive
              />

              <ImpactRow
                title="Safety margin"
                detail="High-priority constraint under changing ice conditions"
                status={missionPlan.safetyMargin}
                positive
              />
            </div>
          </section>

          {/* DECISION FACTORS */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              NAVIGATION DECISION FACTORS
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
              NAVIGATION OPTIMIZATION WEIGHTS
            </h2>

            <p className="mt-2 font-mono text-[10px] text-slate-600">
              These weights optimize the route after mission constraints
              have been evaluated.
            </p>

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
          {/* OPTIMAL ROUTE */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-6">
            <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
              POLARIS OPTIMAL ROUTE
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
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

            <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3 font-mono text-[10px] text-slate-500">
              <span>Mission priority:</span>

              <strong className="ml-2 text-cyan-300">
                {missionPlan.missionPriority}
              </strong>
            </div>
          </section>

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

          {/* ADAPTIVE REPLANNING */}
          <section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.03] p-6">
            <div className="flex gap-3">
              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-amber-400"
              />

              <div>
                <h2 className="font-mono text-[13px] tracking-[0.08em] text-amber-300">
                  ADAPTIVE REPLANNING
                </h2>

                <p className="mt-3 font-mono text-[10px] leading-5 text-slate-500">
                  If new Sentinel-1 observations increase hazard risk,
                  POLARIS does not simply select another path. It
                  re-evaluates mission feasibility, scientific
                  objectives, arrival constraints, and route risk before
                  generating a new mission plan.
                </p>
              </div>
            </div>
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

          <button
            type="button"
            className="w-full rounded-xl border border-cyan-400/60 bg-cyan-400/[0.12] px-5 py-4 font-mono text-[13px] tracking-[0.08em] text-cyan-100 transition hover:bg-cyan-400/[0.18]"
          >
            CONFIRM THIS MISSION PLAN →
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function MissionMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3 text-center">
      <p className="font-mono text-[8px] tracking-[0.1em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 font-mono text-[11px] text-cyan-300">
        {value}
      </p>
    </div>
  );
}

function ImpactRow({
  title,
  detail,
  status,
  positive = false,
}: {
  title: string;
  detail: string;
  status: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-cyan-400/[0.08] bg-[#061522] p-4">
      <div className="flex min-w-0 gap-3">
        {positive ? (
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-400"
          />
        ) : (
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-amber-400"
          />
        )}

        <div>
          <p className="text-[12px] text-slate-300">
            {title}
          </p>

          <p className="mt-1 font-mono text-[9px] leading-4 text-slate-600">
            {detail}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 font-mono text-[9px] ${
          positive
            ? "text-emerald-400"
            : "text-amber-300"
        }`}
      >
        {status}
      </span>
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
      <span className="text-slate-500">
        {label}
      </span>

      <span className="text-cyan-300">
        {value}%
      </span>
    </div>
  );
}