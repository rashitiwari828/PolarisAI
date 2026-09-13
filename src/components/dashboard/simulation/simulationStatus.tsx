import type { SimulationPhase } from "../../../data/simulationData";

interface SimulationStatusProps {
  phase: SimulationPhase;
  simHours: number;
}

interface StepProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function Step({
  number,
  label,
  active,
  completed,
}: StepProps) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-lg
        border
        px-3
        py-2.5
        transition-all
        ${
          active
            ? "border-cyan-400/40 bg-cyan-400/[0.06]"
            : "border-transparent"
        }
      `}
    >
      <div
        className={`
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          font-mono
          text-[9px]
          ${
            completed
              ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
              : active
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                : "border-slate-700 text-slate-600"
          }
        `}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={`
          font-mono
          text-[10px]
          ${
            completed
              ? "text-emerald-400"
              : active
                ? "text-cyan-300"
                : "text-slate-600"
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}

export default function SimulationStatus({
  phase,
  simHours,
}: SimulationStatusProps) {
  const running = phase !== "idle";

  const observationReceived =
    phase === "obstruction" ||
    phase === "analyzing" ||
    phase === "rerouting" ||
    phase === "accepted";

  const missionImpacted =
    phase === "obstruction" ||
    phase === "analyzing" ||
    phase === "rerouting" ||
    phase === "accepted";

  const reEvaluating =
    phase === "analyzing" ||
    phase === "rerouting" ||
    phase === "accepted";

  const planUpdated =
    phase === "rerouting" ||
    phase === "accepted";

  const accepted = phase === "accepted";

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
            MISSION STATUS
          </h2>

          <p className="mt-1 font-mono text-[8px] tracking-[0.12em] text-slate-600">
            ADAPTIVE MISSION-AWARE NAVIGATION
          </p>
        </div>

        <span
          className={`
            h-2
            w-2
            rounded-full
            ${
              running
                ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                : "bg-slate-600"
            }
          `}
        />
      </div>

      <div className="mt-4 space-y-1">
        <Step
          number={1}
          label="Mission Running"
          active={running && !missionImpacted}
          completed={running}
        />

        <Step
          number={2}
          label="Sentinel-1 Observation Received"
          active={phase === "obstruction"}
          completed={observationReceived}
        />

        <Step
          number={3}
          label="Mission Impact Detected"
          active={
            phase === "obstruction" ||
            phase === "analyzing"
          }
          completed={missionImpacted}
        />

        <Step
          number={4}
          label="Mission Feasibility Re-evaluated"
          active={phase === "analyzing"}
          completed={reEvaluating}
        />

        <Step
          number={5}
          label="Mission Plan Updated"
          active={phase === "rerouting"}
          completed={planUpdated}
        />

        <Step
          number={6}
          label="New Mission Plan Accepted"
          active={accepted}
          completed={accepted}
        />
      </div>

      <div className="mt-5 border-t border-cyan-400/10 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-slate-600">
            Sim time
          </span>

          <span className="font-mono text-[11px] text-cyan-300">
            T+
            {String(Math.floor(simHours)).padStart(2, "0")}
            :00
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] text-slate-600">
            Mission feasibility
          </span>

          <span
            className={`
              font-mono
              text-[10px]
              ${
                accepted
                  ? "text-emerald-400"
                  : missionImpacted
                    ? "text-amber-300"
                    : "text-cyan-300"
              }
            `}
          >
            {accepted
              ? "FEASIBLE"
              : missionImpacted
                ? "AT RISK"
                : "FEASIBLE"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] text-slate-600">
            Mission response
          </span>

          <span
            className={`
              font-mono
              text-[10px]
              ${
                accepted
                  ? "text-emerald-400"
                  : phase === "rerouting"
                    ? "text-cyan-300"
                    : phase === "analyzing"
                      ? "text-amber-300"
                      : "text-slate-500"
              }
            `}
          >
            {accepted
              ? "PLAN ACCEPTED"
              : phase === "rerouting"
                ? "PLAN UPDATED"
                : phase === "analyzing"
                  ? "RE-EVALUATING"
                  : missionImpacted
                    ? "MISSION IMPACTED"
                    : "MONITORING"}
          </span>
        </div>
      </div>
    </section>
  );
}