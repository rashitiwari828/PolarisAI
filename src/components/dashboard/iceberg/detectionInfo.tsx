import type { TrackedIceberg } from "../../../types/iceberg";

interface DetectionInfoProps {
  iceberg: TrackedIceberg;
}

export default function DetectionInfo({
  iceberg,
}: DetectionInfoProps) {
  return (
    <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-5">
      <h2 className="font-mono text-[14px] font-semibold tracking-[0.08em] text-slate-200">
        DETECTION
      </h2>

      <div className="mt-4 divide-y divide-cyan-400/10">
        <div className="flex items-center justify-between py-3 font-mono text-[11px]">
          <span className="text-slate-500">Source</span>
          <span className="text-slate-300">
            {iceberg.detectedBy}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            First detected
          </span>
          <span className="text-slate-300">
            {iceberg.firstDetected}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            Last updated
          </span>
          <span className="text-slate-300">
            {iceberg.lastUpdated}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            Detection conf.
          </span>
          <span className="text-slate-300">
            {iceberg.detectionConfidence}%
          </span>
        </div>

        <div className="flex items-center justify-between py-3 font-mono text-[11px]">
          <span className="text-slate-500">
            AI model
          </span>
          <span className="text-slate-300">
            POLARIS-IceTraj v1.8
          </span>
        </div>
      </div>
    </section>
  );
}