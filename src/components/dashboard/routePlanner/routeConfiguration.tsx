import { useState } from "react";

interface RouteConfigurationProps {
  onGenerate: () => void;
  generating: boolean;
}

export default function RouteConfiguration({
  onGenerate,
  generating,
}: RouteConfigurationProps) {
  const [selectedOptimization, setSelectedOptimization] =
    useState("Fuel Efficient");

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div className="mb-5">
        <h2 className="font-mono text-[15px] tracking-[0.08em] text-slate-200">
          ROUTE CONFIGURATION
        </h2>
      </div>

      <div className="space-y-4">
        {/* START */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            START
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="text-[14px] text-slate-200">
              Bharati Research Station
            </p>

            <p className="mt-1 font-mono text-[10px] text-slate-500">
              69.4°S 76.2°E
            </p>
          </div>
        </div>

        {/* DESTINATION */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            DESTINATION
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="text-[14px] text-slate-200">
              Maitri Research Station
            </p>

            <p className="mt-1 font-mono text-[10px] text-slate-500">
              70.8°S 11.7°E
            </p>
          </div>
        </div>

        {/* DEPARTURE */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            DEPARTURE
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="font-mono text-[12px] text-slate-300">
              10 SEP 2026 • 06:00 UTC
            </p>
          </div>
        </div>

        {/* VESSEL */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            VESSEL
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="text-[14px] text-slate-200">
              MV Sagar Kanya
            </p>
          </div>
        </div>

        {/* OPTIMIZATION */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            OPTIMIZATION
          </label>

          <div className="mt-3 space-y-3">
            {[
              "Safest",
              "Fastest",
              "Fuel Efficient",
              "Balanced",
            ].map((option) => {
              const selected = selectedOptimization === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedOptimization(option)}
                  disabled={generating}
                  className="flex w-full cursor-pointer items-center gap-3 text-left text-[14px] text-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? "border-cyan-400"
                        : "border-slate-600"
                    }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    )}
                  </span>

                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* GENERATE */}
        <button
          onClick={onGenerate}
          disabled={generating}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-cyan-400/60
            bg-cyan-400/[0.12]
            px-4
            py-3.5
            font-mono
            text-[15px]
            tracking-[0.04em]
            text-cyan-200
            shadow-[0_0_25px_rgba(34,211,238,0.08)]
            transition-all
            hover:bg-cyan-400/[0.18]
            hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {generating
            ? "ANALYZING ROUTE..."
            : "GENERATE OPTIMAL ROUTE"}
        </button>
      </div>
    </section>
  );
}