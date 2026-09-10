const passes = [
  {
    satellite: "SENTINEL-1",
    countdown: "T+2h 14m",
    region: "Southern corridor",
  },
  {
    satellite: "MODIS/TERRA",
    countdown: "T+6h 52m",
    region: "Full Antarctica",
  },
  {
    satellite: "SENTINEL-1",
    countdown: "T+14h 02m",
    region: "Route corridor",
  },
  {
    satellite: "MODIS/AQUA",
    countdown: "T+18h 33m",
    region: "Antarctic Peninsula",
  },
  {
    satellite: "SENTINEL-1",
    countdown: "T+26h 18m",
    region: "Eastern sector",
  },
];

export default function UpcomingSatellitePasses() {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
        UPCOMING SATELLITE PASSES
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {passes.map((pass) => (
          <div
            key={`${pass.satellite}-${pass.countdown}`}
            className="rounded-xl border border-cyan-400/10 bg-[#061522] p-4 transition hover:border-cyan-400/25"
          >
            <p className="text-[13px] text-slate-200">
              {pass.satellite}
            </p>

            <p className="mt-2 font-mono text-[12px] text-cyan-300">
              {pass.countdown}
            </p>

            <p className="mt-2 font-mono text-[9px] text-slate-500">
              {pass.region}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/[0.04] px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_#22d3ee]" />

              <span className="font-mono text-[8px] tracking-[0.08em] text-cyan-300">
                SCHEDULED
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}