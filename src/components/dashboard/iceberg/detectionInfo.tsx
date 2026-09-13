import type { TrackedIceberg } from "../../../types/iceberg";

interface DetectionInfoProps {
  iceberg: TrackedIceberg;
}

export default function DetectionInfo({
  iceberg,
}: DetectionInfoProps) {
  return (
    <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[14px] font-semibold tracking-[0.08em] text-slate-200">
          DETECTION
        </h2>

        <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 font-mono text-[9px] font-semibold tracking-wider text-cyan-300">
          SENTINEL-1
        </span>
      </div>

      <div className="mt-4 divide-y divide-cyan-400/10">
        <div className="flex items-center justify-between gap-4 py-3 font-mono text-[11px]">
          <span className="text-slate-500">Source</span>

          <span className="text-right text-slate-300">
            {iceberg.detectedBy}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            First detected
          </span>

          <span className="text-right text-slate-300">
            {iceberg.firstDetected}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            Last updated
          </span>

          <span className="text-right text-slate-300">
            {iceberg.lastUpdated}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            Detection conf.
          </span>

          <span className="text-right text-cyan-300">
            {iceberg.detectionConfidence}%
          </span>
        </div>
      </div>

      {/* DATA PIPELINE */}

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
        <p className="font-mono text-[9px] font-semibold tracking-[0.12em] text-slate-500">
          DETECTION PIPELINE
        </p>

        <div className="mt-3 flex items-center gap-2 font-mono text-[10px]">
          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-cyan-300">
            SAR
          </span>

          <span className="text-slate-600">
            →
          </span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-slate-300">
            DETECTION
          </span>

          <span className="text-slate-600">
            →
          </span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-slate-300">
            TRAJECTORY
          </span>
        </div>
      </div>
    </section>
  );
}