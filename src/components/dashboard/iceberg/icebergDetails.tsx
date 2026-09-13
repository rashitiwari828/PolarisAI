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
      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[25px] font-medium tracking-tight text-white">
              {iceberg.name}
            </h2>

            <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 font-mono text-[9px] font-semibold tracking-wider text-cyan-300">
              {iceberg.id}
            </span>
          </div>

          <p className="mt-1 font-mono text-[11px] text-slate-500">
            Calved: {iceberg.calvedFrom} • Detected: Sentinel-1 SAR
          </p>
        </div>

        <span
          className={`rounded-lg border px-3 py-1.5 font-mono text-[10px] font-bold ${riskColor}`}
        >
          {iceberg.risk}
        </span>
      </div>

      {/* CURRENT POSITION */}

      <div className="mt-5">
        <p className="mb-2 font-mono text-[10px] font-semibold tracking-[0.12em] text-cyan-400">
          CURRENT POSITION
        </p>

        <div className="grid grid-cols-2 gap-3">
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
        </div>
      </div>

      {/* DETECTION */}

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] text-slate-500">
              DETECTION TIME
            </p>

            <p className="mt-2 font-mono text-[12px] font-medium text-slate-200">
              {iceberg.lastUpdated}
            </p>
          </div>

          <div className="text-right">
            <p className="font-mono text-[10px] text-slate-500">
              CONFIDENCE
            </p>

            <p className="mt-2 font-mono text-[12px] font-medium text-cyan-300">
              {iceberg.detectionConfidence}%
            </p>
          </div>
        </div>
      </div>

      {/* PHYSICAL CHARACTERISTICS */}

      <div className="mt-4 grid grid-cols-2 gap-3">
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