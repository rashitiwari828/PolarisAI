const oceanData = [
  ["Sea surface temp", "-1.8°C"],
  ["Salinity", "34.2 PSU"],
  ["Current (surface)", "1.2 kn E"],
  ["Current (50m)", "0.8 kn ENE"],
  ["Water density", "1027.4 kg/m³"],
  ["Mixed layer depth", "42 m"],
];

export default function OceanographicPanel() {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5">
      <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
        OCEANOGRAPHIC
      </h2>

      <div className="mt-4 divide-y divide-cyan-400/[0.07]">
        {oceanData.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="font-mono text-[9px] text-slate-500">
              {label}
            </span>

            <span className="text-right font-mono text-[11px] text-slate-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}