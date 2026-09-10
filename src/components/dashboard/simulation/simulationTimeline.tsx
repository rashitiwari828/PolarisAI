import type { SimulationPhase } from "../../../data/simulationData";

interface SimulationTimelineProps {
  phase: SimulationPhase;
}

const events = [
  {
    time: "T+00:00",
    label: "Departed Bharati Station",
    key: "running",
  },
  {
    time: "T+04:00",
    label: "Cleared eastern ice field",
    key: "running",
  },
  {
    time: "T+08:00",
    label: "Iceberg obstruction detected",
    key: "obstruction",
  },
  {
    time: "T+12:00",
    label: "AI analyzing alternatives",
    key: "analyzing",
  },
  {
    time: "T+18:00",
    label: "New route accepted",
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
  const currentIndex = phaseOrder.indexOf(phase);

  if (key === "running") {
    return currentIndex >= 1;
  }

  if (key === "obstruction") {
    return currentIndex >= 2;
  }

  if (key === "analyzing") {
    return currentIndex >= 3;
  }

  if (key === "accepted") {
    return currentIndex >= 5;
  }

  return false;
}

export default function SimulationTimeline({
  phase,
}: SimulationTimelineProps) {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
        MISSION TIMELINE
      </h2>

      <div className="mt-5 space-y-4">
        {events.map((event) => {
          const reached = isReached(
            phase,
            event.key,
          );

          return (
            <div
              key={event.time}
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    ${
                      reached
                        ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                        : "bg-slate-800"
                    }
                  `}
                />

                {event !== events[events.length - 1] && (
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
                      reached
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
                      reached
                        ? "text-slate-300"
                        : "text-slate-700"
                    }
                  `}
                >
                  {event.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}