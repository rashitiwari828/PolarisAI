import { routeOptions } from "../../../data/routePlannerData";

interface RouteResultsProps {
  onExplain: () => void;
}

export default function RouteResults({
  onExplain,
}: RouteResultsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-4 shrink-0">
        <p className="font-mono text-[10px] tracking-[0.14em] text-cyan-400">
          ROUTE ANALYSIS COMPLETE
        </p>

        <h2 className="mt-1 text-[18px] tracking-wide text-slate-100">
          OPTIMIZED ROUTE OPTIONS
        </h2>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
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

              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                <Metric label="Distance" value={route.distance} />
                <Metric label="ETA" value={route.eta} />
                <Metric label="Fuel" value={route.fuel} />
                <Metric
                  label="Ice Exp."
                  value={route.iceExposure}
                />
              </div>

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

              <p className="mt-4 text-[11px] leading-5 text-slate-500">
                {route.description}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onExplain}
        className="
          mt-4
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
        WHY THIS ROUTE →
      </button>
    </div>
  );
}

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