import {
  missionObjectives,
  missionPlan,
  routeOptions,
} from "../../../data/routePlannerData";

interface RouteResultsProps {
  onExplain: () => void;
}

export default function RouteResults({
  onExplain,
}: RouteResultsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4 shrink-0">
        <p className="font-mono text-[10px] tracking-[0.14em] text-cyan-400">
          MISSION PLAN GENERATED
        </p>

        <h2 className="mt-1 text-[18px] tracking-wide text-slate-100">
          ADAPTIVE MISSION PLAN
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          POLARIS evaluates the complete scientific mission against
          navigation safety, ice exposure, fuel, transit time and
          arrival constraints.
        </p>
      </div>

      {/* =====================================================
          ADAPTIVE NAVIGATION USP
      ===================================================== */}

      <div className="mb-4 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.035] p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

          <p className="font-mono text-[9px] tracking-[0.14em] text-cyan-300">
            ADAPTIVE MISSION-AWARE NAVIGATION
          </p>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-slate-400">
          This is not a one-time safe-route calculation. POLARIS
          continuously evaluates mission feasibility and can replan
          the scientific mission when new ice observations change
          the navigation risk.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[8px] tracking-[0.08em]">
          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.05] px-2 py-1 text-cyan-300">
            OBSERVATION
          </span>

          <span className="text-slate-600">→</span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.05] px-2 py-1 text-cyan-300">
            RISK UPDATE
          </span>

          <span className="text-slate-600">→</span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.05] px-2 py-1 text-cyan-300">
            MISSION IMPACT
          </span>

          <span className="text-slate-600">→</span>

          <span className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.05] px-2 py-1 text-emerald-400">
            REPLAN
          </span>
        </div>
      </div>

      {/* =====================================================
          MISSION FEASIBILITY
      ===================================================== */}

      <div className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
              MISSION FEASIBILITY
            </p>

            <p className="mt-1 font-mono text-[18px] font-semibold text-emerald-400">
              {missionPlan.feasibility}
            </p>
          </div>

          <div className="text-right">
            <p className="font-mono text-[8px] tracking-[0.12em] text-slate-600">
              AI CONFIDENCE
            </p>

            <p className="mt-1 font-mono text-[14px] text-cyan-300">
              {missionPlan.confidence}%
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#0a1a27]">
          <div
            className="h-full rounded-full bg-emerald-400"
            style={{
              width: `${missionPlan.confidence}%`,
            }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniMetric
            label="Scientific Objectives"
            value={`${missionPlan.scientificObjectives.completed}/${missionPlan.scientificObjectives.total}`}
          />

          <MiniMetric
            label="Arrival Window"
            value={missionPlan.arrivalWindow}
          />

          <MiniMetric
            label="Mandatory"
            value={`${missionPlan.mandatoryObjectives.completed}/${missionPlan.mandatoryObjectives.total}`}
          />

          <MiniMetric
            label="Safety Margin"
            value={missionPlan.safetyMargin}
          />
        </div>
      </div>

      {/* =====================================================
          SCIENTIFIC OBJECTIVES
      ===================================================== */}

      <div className="mb-4 rounded-xl border border-cyan-400/10 bg-[#04111d] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
              SCIENTIFIC OBJECTIVES
            </p>

            <p className="mt-1 text-[13px] text-slate-200">
              Mission waypoint coverage
            </p>
          </div>

          <span className="font-mono text-[14px] font-semibold text-cyan-300">
            {missionPlan.scientificObjectives.completed}/
            {missionPlan.scientificObjectives.total}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {missionObjectives.map((objective) => (
            <MissionObjective
              key={objective.waypoint}
              waypoint={objective.waypoint}
              name={objective.name}
              status={objective.status}
              state={objective.state}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          MISSION SEQUENCE
      ===================================================== */}

      <div className="mb-4 rounded-xl border border-cyan-400/10 bg-[#04111d] p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            OPTIMIZED MISSION SEQUENCE
          </p>

          <span className="font-mono text-[8px] tracking-[0.1em] text-cyan-400">
            {missionPlan.missionPriority} PRIORITY
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {missionPlan.sequence.map((point, index) => (
            <div
              key={`${point}-${index}`}
              className="flex items-center gap-2"
            >
              <SequenceNode label={point} />

              {index < missionPlan.sequence.length - 1 && (
                <SequenceArrow />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          NAVIGATION OPTIMIZATION OPTIONS
      ===================================================== */}

      <div className="mb-4">
        <div className="mb-3">
          <p className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            NAVIGATION OPTIMIZATION OPTIONS
          </p>

          <p className="mt-1 text-[10px] leading-5 text-slate-600">
            Each navigation strategy is evaluated against the active
            scientific mission.
          </p>
        </div>

        <div className="space-y-3">
          {routeOptions.map((route) => {
            const optimal = route.id === "optimal";

            return (
              <div
                key={route.id}
                className={`rounded-xl border p-4 transition-all ${
                  optimal
                    ? "border-cyan-400/50 bg-cyan-400/[0.07] shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                    : "border-cyan-400/10 bg-[#04111d]"
                }`}
              >
                {/* ROUTE HEADER */}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        route.id === "fastest"
                          ? "bg-red-400"
                          : route.id === "safest"
                            ? "bg-emerald-400"
                            : "bg-cyan-400"
                      }`}
                    />

                    <h3 className="font-mono text-[14px] font-semibold tracking-wide text-slate-200">
                      {route.name}
                    </h3>
                  </div>

                  {optimal && (
                    <span className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2 py-1 font-mono text-[8px] tracking-[0.1em] text-cyan-300">
                      ★ AI RECOMMENDED
                    </span>
                  )}
                </div>

                {/* ROUTE METRICS */}

                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                  <Metric
                    label="Distance"
                    value={route.distance}
                  />

                  <Metric
                    label="ETA"
                    value={route.eta}
                  />

                  <Metric
                    label="Fuel"
                    value={route.fuel}
                  />

                  <Metric
                    label="Ice Exposure"
                    value={route.iceExposure}
                  />
                </div>

                {/* RISK SCORE */}

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-500">
                      Risk Score
                    </span>

                    <span
                      className={`font-mono text-[10px] font-bold ${
                        route.riskScore <= 10
                          ? "text-emerald-400"
                          : route.riskScore <= 20
                            ? "text-cyan-300"
                            : "text-red-400"
                      }`}
                    >
                      {route.riskScore}%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0a1a27]">
                    <div
                      className={`h-full rounded-full ${
                        route.riskScore <= 10
                          ? "bg-emerald-400"
                          : route.riskScore <= 20
                            ? "bg-cyan-400"
                            : "bg-red-400"
                      }`}
                      style={{
                        width: `${Math.max(route.riskScore, 5)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* MISSION STATUS */}

                <div className="mt-4 flex items-center justify-between border-t border-cyan-400/5 pt-3">
                  <span className="font-mono text-[8px] tracking-[0.08em] text-slate-600">
                    MISSION STATUS
                  </span>

                  <span
                    className={`font-mono text-[9px] font-semibold ${
                      route.id === "fastest"
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {route.id === "fastest"
                      ? "FEASIBLE • HIGHER ICE RISK"
                      : "FEASIBLE"}
                  </span>
                </div>

                {/* DESCRIPTION */}

                <p className="mt-3 text-[10px] leading-5 text-slate-500">
                  {route.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          AI RECOMMENDATION
      ===================================================== */}

      <div className="mb-4 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

          <p className="font-mono text-[9px] tracking-[0.14em] text-cyan-300">
            AI MISSION RECOMMENDATION
          </p>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-slate-400">
          POLARIS OPTIMAL is recommended because it preserves
          scientific objective coverage while balancing navigation
          safety, fuel consumption, ice exposure and transit time.
          The mission remains feasible under the current ice-risk
          assessment.
        </p>

        <div className="mt-3 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.03] px-3 py-2.5">
          <p className="font-mono text-[8px] tracking-[0.08em] text-emerald-400">
            CURRENT DECISION
          </p>

          <p className="mt-1 text-[9px] leading-4 text-slate-500">
            Maintain the current mission sequence. Continue monitoring
            Sentinel-1 observations for changes that could affect
            mission feasibility.
          </p>
        </div>
      </div>

      {/* =====================================================
          EXPLAINABILITY
      ===================================================== */}

      <button
        type="button"
        onClick={onExplain}
        className="
          mt-auto
          shrink-0
          w-full
          rounded-xl
          border
          border-cyan-400/50
          bg-cyan-400/[0.10]
          px-4
          py-3.5
          font-mono
          text-[12px]
          tracking-[0.08em]
          text-cyan-200
          transition
          hover:bg-cyan-400/[0.16]
        "
      >
        WHY THIS MISSION PLAN →
      </button>
    </div>
  );
}

/* =========================================================
   MISSION OBJECTIVE
========================================================= */

function MissionObjective({
  waypoint,
  name,
  status,
  state,
}: {
  waypoint: string;
  name: string;
  status: "MANDATORY" | "OPTIONAL";
  state: "PLANNED" | "PENDING";
}) {
  const planned = state === "PLANNED";

  return (
    <div className="flex items-center justify-between rounded-lg border border-cyan-400/5 bg-[#061522] px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[8px] ${
            planned
              ? "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400"
              : "border-cyan-400/20 text-cyan-300"
          }`}
        >
          {planned ? "✓" : waypoint.replace("WP-", "")}
        </span>

        <div className="min-w-0">
          <p className="truncate font-mono text-[10px] text-slate-300">
            {waypoint} • {name}
          </p>

          <p className="mt-0.5 font-mono text-[8px] tracking-[0.08em] text-slate-600">
            {status}
          </p>
        </div>
      </div>

      <span
        className={`ml-2 shrink-0 font-mono text-[8px] ${
          planned ? "text-emerald-400" : "text-slate-600"
        }`}
      >
        {state}
      </span>
    </div>
  );
}

/* =========================================================
   SEQUENCE NODE
========================================================= */

function SequenceNode({
  label,
}: {
  label: string;
}) {
  return (
    <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.05] px-2.5 py-1.5 font-mono text-[8px] tracking-[0.08em] text-cyan-300">
      {label}
    </span>
  );
}

/* =========================================================
   SEQUENCE ARROW
========================================================= */

function SequenceArrow() {
  return (
    <span className="font-mono text-[9px] text-slate-600">
      →
    </span>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-cyan-400/5 bg-[#061522] px-3 py-2">
      <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-[10px] text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-[12px] text-slate-200">
        {value}
      </p>
    </div>
  );
}