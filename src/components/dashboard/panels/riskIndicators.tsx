interface RiskIndicatorsProps {
  indicators: any;
}

const fallbackIndicators = [
  {
    name: "SEA ICE",
    value: 42,
    status: "MODERATE",
  },
  {
    name: "ICEBERG",
    value: 18,
    status: "LOW",
  },
  {
    name: "WEATHER",
    value: 21,
    status: "LOW",
  },
];

export default function RiskIndicators({
  indicators,
}: RiskIndicatorsProps) {
  const data =
    Array.isArray(indicators) && indicators.length
      ? indicators
      : fallbackIndicators;

  return (
    <div className="rounded-2xl border border-cyan-400/15 bg-[#061321] p-5">
      
      <h3 className="font-mono text-[11px] tracking-[0.14em] text-slate-200">
        RISK INDICATORS
      </h3>

      <div className="mt-6 space-y-6">
        {data.map((item: any, index: number) => {
          const name =
            item.name ??
            item.label ??
            fallbackIndicators[index]?.name ??
            "RISK";

          const value = Number(
            item.value ??
              item.percentage ??
              fallbackIndicators[index]?.value ??
              0
          );

          const status =
            item.status ??
            fallbackIndicators[index]?.status ??
            "LOW";

          return (
            <div key={name}>
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-400">
                  {String(name).toUpperCase()}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] text-cyan-300">
                    {value}%
                  </span>

                  <span
                    className={`
                      rounded-md
                      border
                      px-2
                      py-1
                      font-mono
                      text-[7px]
                      tracking-wider
                      ${
                        status === "MODERATE"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                      }
                    `}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`
                    h-full rounded-full
                    ${
                      status === "MODERATE"
                        ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                        : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    }
                  `}
                  style={{
                    width: `${Math.min(value, 100)}%`,
                  }}
                />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}