import type { SimulationPhase } from "../../../data/simulationData";

interface SimulationControlsProps {
  phase: SimulationPhase;
  running: boolean;
  onStartDemo: () => void;
  onTriggerObstruction: () => void;
  onAnalyzeAlternatives: () => void;
  onAcceptRoute: () => void;
  onReset: () => void;
}

export default function SimulationControls({
  phase,
  running,
  onStartDemo,
  onTriggerObstruction,
  onAnalyzeAlternatives,
  onAcceptRoute,
  onReset,
}: SimulationControlsProps) {
  const canTrigger =
    phase === "running";

  const canAnalyze =
    phase === "obstruction";

  const canAccept =
    phase === "rerouting";

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
        DEMO CONTROLS
      </h2>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={onStartDemo}
          disabled={running}
          className={`
            flex
            h-12
            w-full
            items-center
            justify-center
            rounded-xl
            border
            font-mono
            text-[10px]
            tracking-[0.08em]
            transition
            ${
              running
                ? "cursor-not-allowed border-cyan-400/10 bg-cyan-400/[0.03] text-cyan-700"
                : "border-cyan-400/40 bg-cyan-400/[0.08] text-cyan-300 hover:bg-cyan-400/[0.14]"
            }
          `}
        >
          {running
            ? "● DEMO RUNNING..."
            : "▶ START AUTO DEMO"}
        </button>

        <button
          type="button"
          onClick={onTriggerObstruction}
          disabled={!canTrigger}
          className={`
            flex
            h-11
            w-full
            items-center
            justify-center
            rounded-xl
            border
            font-mono
            text-[10px]
            transition
            ${
              canTrigger
                ? "border-cyan-400/20 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300"
                : "cursor-not-allowed border-slate-800 text-slate-700"
            }
          `}
        >
          ① TRIGGER OBSTRUCTION
        </button>

        <button
          type="button"
          onClick={onAnalyzeAlternatives}
          disabled={!canAnalyze}
          className={`
            flex
            h-11
            w-full
            items-center
            justify-center
            rounded-xl
            border
            font-mono
            text-[10px]
            transition
            ${
              canAnalyze
                ? "border-cyan-400/20 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300"
                : "cursor-not-allowed border-slate-800 text-slate-700"
            }
          `}
        >
          ② ANALYZE ALTERNATIVES
        </button>

        <button
          type="button"
          onClick={onAcceptRoute}
          disabled={!canAccept}
          className={`
            flex
            h-11
            w-full
            items-center
            justify-center
            rounded-xl
            border
            font-mono
            text-[10px]
            transition
            ${
              canAccept
                ? "border-emerald-400/40 bg-emerald-400/[0.06] text-emerald-300 hover:bg-emerald-400/[0.12]"
                : "cursor-not-allowed border-slate-800 text-slate-700"
            }
          `}
        >
          ③ ACCEPT NEW ROUTE
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-800 text-slate-500 transition hover:border-slate-600 hover:text-slate-300"
        >
          <span className="font-mono text-[10px]">
            ↻ RESET
          </span>
        </button>
      </div>
    </section>
  );
}