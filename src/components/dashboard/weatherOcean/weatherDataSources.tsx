const sources = [
  ["Atmospheric", "ECMWF ERA5"],
  ["Ocean model", "TOPAZ4 NEMO"],
  ["Wave model", "WAVEWATCH III"],
  ["Updated", "08 SEP 2026 18:00 UTC"],
];

export default function WeatherDataSources() {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5">
      <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
        DATA SOURCES
      </h2>

      <div className="mt-4 divide-y divide-cyan-400/[0.07]">
        {sources.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 py-3"
          >
            <span className="font-mono text-[9px] text-slate-500">
              {label}
            </span>

            <span className="text-right font-mono text-[9px] text-cyan-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}