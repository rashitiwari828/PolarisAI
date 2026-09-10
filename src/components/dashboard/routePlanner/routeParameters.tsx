export default function RouteParameters() {
  const parameters = [
    ["Ice avoidance", "≤60% concentration"],
    ["Weather limit", "≤35 kn wind"],
    ["Wave height", "≤5.0 m"],
    ["Iceberg buffer", "5 nm"],
    ["Fuel reserve", "15%"],
  ];

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5">
      <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
        PARAMETERS
      </h2>

      <div className="mt-5 space-y-0">
        {parameters.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-cyan-400/[0.07] py-3 last:border-b-0"
          >
            <span className="font-mono text-[11px] text-slate-500">
              {label}
            </span>

            <span className="font-mono text-[11px] font-semibold text-cyan-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}