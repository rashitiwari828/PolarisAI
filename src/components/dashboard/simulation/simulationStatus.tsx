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
  const running =
    phase !== "idle";

  const obstruction =
    phase === "obstruction" ||
    phase === "analyzing" ||
    phase === "rerouting" ||
    phase === "accepted";

  const analyzing =
    phase === "analyzing" ||
    phase === "rerouting" ||
    phase === "accepted";

  const accepted =
    phase === "accepted";

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
          SIMULATION STATUS
        </h2>

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
          active={running}
          completed={running}
        />

        <Step
          number={2}
          label="Obstruction Detected"
          active={phase === "obstruction"}
          completed={obstruction}
        />

        <Step
          number={3}
          label="Analyzing Alternatives"
          active={
            phase === "analyzing" ||
            phase === "rerouting"
          }
          completed={analyzing}
        />

        <Step
          number={4}
          label="New Route Accepted"
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
      </div>
    </section>
  );
}