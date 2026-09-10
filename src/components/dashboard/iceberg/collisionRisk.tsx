import { ArrowRight, TriangleAlert } from "lucide-react";

import type { TrackedIceberg } from "../../../types/iceberg";

interface CollisionRiskProps {
  iceberg: TrackedIceberg;
  onAvoidIceberg: () => void;
}

export default function CollisionRisk({
  iceberg,
  onAvoidIceberg,
}: CollisionRiskProps) {
  const highRisk = iceberg.collisionProbability >= 60;

  return (
    <section
      className={`rounded-2xl border p-5 ${
        highRisk
          ? "border-red-400/30 bg-[#160b10]"
          : "border-cyan-400/15 bg-[#04111d]"
      }`}
    >
      <div className="flex items-center gap-2">
        <TriangleAlert
          size={17}
          className={
            highRisk ? "text-red-400" : "text-amber-400"
          }
        />

        <h2
          className={`font-mono text-[14px] font-semibold tracking-[0.08em] ${
            highRisk ? "text-red-400" : "text-slate-200"
          }`}
        >
          COLLISION RISK
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-4 text-center">
          <p className="font-mono text-[10px] text-slate-500">
            PROBABILITY
          </p>

          <p
            className={`mt-2 text-[27px] font-medium ${
              highRisk ? "text-red-400" : "text-amber-400"
            }`}
          >
            {iceberg.collisionProbability}%
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#061522] p-4 text-center">
          <p className="font-mono text-[10px] text-slate-500">
            DISTANCE
          </p>

          <p className="mt-2 text-[19px] font-medium text-slate-200">
            {iceberg.collisionDistance}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between font-mono text-[11px]">
          <span className="text-slate-500">
            72H Collision Probability
          </span>

          <span className="text-red-400">
            {iceberg.collisionProbability}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0b1b27]">
          <div
            className="h-full rounded-full bg-red-400 transition-all"
            style={{
              width: `${iceberg.collisionProbability}%`,
            }}
          />
        </div>
      </div>

      <button
        onClick={onAvoidIceberg}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-red-400/[0.08] px-4 py-3.5 text-[14px] font-medium tracking-wide text-red-300 transition-all hover:bg-red-400/[0.15] hover:text-red-200"
      >
        AVOID ICEBERG
        <ArrowRight size={17} />
      </button>
    </section>
  );
}