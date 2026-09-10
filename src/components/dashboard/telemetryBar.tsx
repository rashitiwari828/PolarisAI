interface TelemetryBarProps {
  telemetry: any;
}

const cards = [
  {
    key: "speed",
    label: "SPEED",
    icon: "▰",
    getValue: (t: any) => `${t.speed ?? "12.4"} kn`,
  },
  {
    key: "fuel",
    label: "FUEL",
    icon: "ϟ",
    getValue: (t: any) => `${t.fuel ?? "68"}%`,
    getSub: (t: any) => `${t.fuelLiters ?? "46,200"} L`,
  },
  {
    key: "heading",
    label: "HEADING",
    icon: "◉",
    getValue: (t: any) => t.heading ?? "074° NE",
  },
  {
    key: "temperature",
    label: "TEMP",
    icon: "♨",
    getValue: (t: any) => `${t.temperature ?? "-14"}°C`,
    getSub: (t: any) =>
      `Sea: ${t.seaTemperature ?? "-1.8"}°C`,
  },
  {
    key: "wind",
    label: "WIND",
    icon: "☁",
    getValue: (t: any) => t.wind ?? "24 kn NE",
    getSub: (t: any) =>
      `Sea Ht: ${t.seaHeight ?? "2.8"}m`,
  },
  {
    key: "visibility",
    label: "VISIBILITY",
    icon: "◉",
    getValue: (t: any) =>
      `${t.visibility ?? "8.4"} km`,
    getSub: (t: any) =>
      t.visibilityStatus ?? "Good",
  },
];

export default function TelemetryBar({
  telemetry,
}: TelemetryBarProps) {
  return (
    <section className="grid shrink-0 grid-cols-6 gap-3 border-b border-cyan-400/10 bg-[#020b16] px-5 py-3">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-cyan-400/10 bg-[#061321] px-4 py-3 transition hover:border-cyan-400/25"
        >
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-cyan-300">
              {card.icon}
            </span>

            <span className="font-mono text-[8px] tracking-[0.16em] text-slate-500">
              {card.label}
            </span>
          </div>

          <div className="mt-1 font-mono text-[16px] text-slate-100">
            {card.getValue(telemetry)}
          </div>

          {card.getSub && (
            <div className="mt-1 font-mono text-[9px] text-slate-500">
              {card.getSub(telemetry)}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}