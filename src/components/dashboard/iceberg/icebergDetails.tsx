import type { TrackedIceberg } from "../../../types/iceberg";

interface IcebergDetailsProps {
  iceberg: TrackedIceberg;
}

export default function IcebergDetails({
  iceberg,
}: IcebergDetailsProps) {
  const riskColor =
    iceberg.risk === "HIGH"
      ? "text-red-400 border-red-400/30 bg-red-400/10"
      : iceberg.risk === "MODERATE"
        ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
        : "text-cyan-300 border-cyan-400/30 bg-cyan-400/10";

  return (
    <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[25px] font-medium tracking-tight text-white">
            {iceberg.name}
          </h2>

          <p className="mt-1 font-mono text-[11px] text-slate-500">
            Calved: {iceberg.calvedFrom} • Detected: SAR
          </p>
        </div>

        <span
          className={`rounded-lg border px-3 py-1.5 font-mono text-[10px] font-bold ${riskColor}`}
        >
          {iceberg.risk}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            LATITUDE
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.latitude.toFixed(2)}°S
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            LONGITUDE
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.longitude.toFixed(2)}°E
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            DIMENSIONS
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.size}
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            MASS
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.mass}
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            SPEED
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.speed}
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <p className="font-mono text-[10px] text-slate-500">
            DIRECTION
          </p>

          <p className="mt-2 text-[15px] font-medium text-slate-200">
            {iceberg.direction}
          </p>
        </div>
      </div>
    </section>
  );
}