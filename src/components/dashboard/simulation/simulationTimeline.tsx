import type { SimulationPhase } from "../../../data/simulationData";

interface SimulationTimelineProps {
  phase: SimulationPhase;
}

const events = [
  {
    time: "T+00:00",
    label: "Mission departed Bharati Station",
    key: "running",
  },
  {
    time: "T+04:00",
    label: "Scientific survey objectives in progress",
    key: "running",
  },
  {
    time: "T+08:00",
    label: "New Sentinel-1 observation received",
    key: "observation",
  },
  {
    time: "T+09:00",
    label: "Ice change detected near WP-02",
    key: "obstruction",
  },
  {
    time: "T+12:00",
    label: "Mission feasibility re-evaluated",
    key: "analyzing",
  },
  {
    time: "T+15:00",
    label: "Optional WP-03 skipped",
    key: "rerouting",
  },
  {
    time: "T+18:00",
    label: "New mission plan accepted",
    key: "accepted",
  },
];

const phaseOrder: SimulationPhase[] = [
  "idle",
  "running",
  "obstruction",
  "analyzing",
  "rerouting",
  "accepted",
];

function isReached(
  phase: SimulationPhase,
  key: string,
) {
  const currentIndex =
    phaseOrder.indexOf(phase);

  if (key === "running") {
    return currentIndex >= 1;
  }

  if (key === "observation") {
    return currentIndex >= 2;
  }

  if (key === "obstruction") {
    return currentIndex >= 2;
  }

  if (key === "analyzing") {
    return currentIndex >= 3;
  }

  if (key === "rerouting") {
    return currentIndex >= 4;
  }

  if (key === "accepted") {
    return currentIndex >= 5;
  }

  return false;
}

export default function SimulationTimeline({
  phase,
}: SimulationTimelineProps) {
  const currentIndex =
    phaseOrder.indexOf(phase);

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
            MISSION TIMELINE
          </h2>

          <p className="mt-1 font-mono text-[8px] tracking-[0.08em] text-slate-600">
            ADAPTIVE MISSION RESPONSE
          </p>
        </div>

        <span className="rounded border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 font-mono text-[8px] tracking-[0.12em] text-cyan-300">
          ADAPTIVE
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {events.map((event, index) => {
          const reached = isReached(
            phase,
            event.key,
          );

          const isCurrent =
            event.key ===
              "observation" &&
            phase === "obstruction"
              ? true
              : event.key === phase;

          return (
            <div
              key={`${event.time}-${event.label}`}
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    transition-all
                    ${
                      isCurrent
                        ? "bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                        : reached
                          ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                          : "bg-slate-800"
                    }
                  `}
                />

                {index <
                  events.length - 1 && (
                  <span
                    className={`
                      mt-1
                      h-full
                      w-px
                      ${
                        reached
                          ? "bg-cyan-400/20"
                          : "bg-slate-800"
                      }
                    `}
                  />
                )}
              </div>

              <div className="min-w-0">
                <p
                  className={`
                    font-mono
                    text-[9px]
                    ${
                      isCurrent
                        ? "text-amber-300"
                        : reached
                          ? "text-cyan-300"
                          : "text-slate-700"
                    }
                  `}
                >
                  {event.time}
                </p>

                <p
                  className={`
                    mt-0.5
                    text-[11px]
                    ${
                      isCurrent
                        ? "text-amber-200"
                        : reached
                          ? "text-slate-300"
                          : "text-slate-700"
                    }
                  `}
                >
                  {event.label}
                </p>

                {isCurrent && (
                  <p className="mt-1 font-mono text-[7px] tracking-[0.08em] text-amber-400/70">
                    CURRENT MISSION EVENT
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-cyan-400/[0.08] pt-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] tracking-[0.08em] text-slate-600">
            MISSION STATE
          </span>

          <span className="font-mono text-[8px] text-cyan-400/80">
            {currentIndex >= 5
              ? "FEASIBLE"
              : currentIndex >= 3
                ? "RE-EVALUATING"
                : "IN PROGRESS"}
          </span>
        </div>
      </div>
    </section>
  );
}