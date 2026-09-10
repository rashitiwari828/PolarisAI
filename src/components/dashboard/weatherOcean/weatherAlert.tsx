export default function WeatherAlert() {
  return (
    <section className="rounded-xl border border-amber-400/25 bg-[#04111d] p-5">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />

        <h2 className="font-mono text-[13px] tracking-[0.08em] text-amber-400">
          WEATHER ALERT
        </h2>
      </div>

      <p className="mt-5 text-[13px] leading-6 text-slate-300">
        Low pressure system approaching from NW.
        Wind expected to exceed{" "}
        <span className="text-amber-400">30 kn</span>{" "}
        between T+12h and T+30h.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <AlertValue
          label="Max wind"
          value="34 kn"
        />

        <AlertValue
          label="Max wave"
          value="4.1 m"
        />

        <AlertValue
          label="Duration"
          value="~18 hours"
          normal
        />

        <AlertValue
          label="Onset"
          value="T+10h"
          normal
        />
      </div>
    </section>
  );
}

function AlertValue({
  label,
  value,
  normal = false,
}: {
  label: string;
  value: string;
  normal?: boolean;
}) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-[#061522] px-3 py-3">
      <p className="font-mono text-[8px] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 text-[14px] ${
          normal ? "text-slate-300" : "text-amber-400"
        }`}
      >
        {value}
      </p>
    </div>
  );
}