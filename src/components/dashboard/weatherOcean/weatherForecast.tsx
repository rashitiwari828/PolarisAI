const forecast = [
  {
    time: "Now",
    wind: "24",
    wave: "2.8",
  },
  {
    time: "+12h",
    wind: "28",
    wave: "3.1",
  },
  {
    time: "+24h",
    wind: "34",
    wave: "4.1",
  },
  {
    time: "+48h",
    wind: "26",
    wave: "3.4",
  },
  {
    time: "+72h",
    wind: "20",
    wave: "2.6",
  },
];

export default function WeatherForecast() {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
          72H FORECAST
        </h2>

        <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.04] px-2 py-1 font-mono text-[8px] text-cyan-300">
          LIVE
        </span>
      </div>

      {/* Simple chart */}
      <div className="relative mt-5 h-[150px] overflow-hidden rounded-lg border border-cyan-400/[0.07] bg-[#061522]">
        <div className="absolute inset-x-4 top-5 h-px bg-cyan-400/[0.06]" />
        <div className="absolute inset-x-4 top-1/2 h-px bg-cyan-400/[0.06]" />
        <div className="absolute inset-x-4 bottom-5 h-px bg-cyan-400/[0.06]" />

        <div className="absolute left-3 top-4 font-mono text-[8px] text-slate-600">
          36
        </div>

        <div className="absolute left-3 top-[48%] font-mono text-[8px] text-slate-600">
          18
        </div>

        <div className="absolute bottom-4 left-3 font-mono text-[8px] text-slate-600">
          0
        </div>

        {/* Wind line */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 320 150"
          preserveAspectRatio="none"
        >
          <polyline
            points="38,76 96,63 150,43 195,29 230,57 270,83 305,94"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />

          <polyline
            points="38,125 96,122 150,119 195,120 230,126 270,128 305,130"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1">
        {forecast.map((item) => (
          <div key={item.time} className="text-center">
            <p className="font-mono text-[8px] text-slate-600">
              {item.time}
            </p>

            <p className="mt-2 font-mono text-[10px] text-cyan-300">
              {item.wind}
            </p>

            <p className="mt-1 font-mono text-[9px] text-slate-500">
              {item.wave}m
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-5 border-t border-cyan-400/[0.07] pt-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-cyan-300" />
          <span className="font-mono text-[8px] text-slate-500">
            WIND (kn)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-sky-400" />
          <span className="font-mono text-[8px] text-slate-500">
            WAVE (m)
          </span>
        </div>
      </div>
    </section>
  );
}