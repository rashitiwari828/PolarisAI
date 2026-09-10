import { useState } from "react";

export default function SARImageAnalysis() {
  const [comparePosition, setComparePosition] = useState(50);

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="font-mono text-[14px] tracking-[0.08em] text-slate-200">
            SAR IMAGE ANALYSIS
          </h2>

          <p className="mt-2 font-mono text-[10px] text-slate-500">
            Drag to compare — Raw vs AI-processed segmentation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Metric
            label="Ice Detection Confidence"
            value="94.2%"
            cyan
          />

          <Metric
            label="Coverage"
            value="1,250 × 1,250 km"
          />

          <Metric
            label="Processing"
            value="✓ Complete"
            green
          />
        </div>
      </div>

      {/* =====================================================
          IMAGE COMPARISON
      ===================================================== */}
      <div className="relative mt-5 h-[420px] overflow-hidden rounded-xl border border-cyan-400/10 bg-[#020913]">
        {/* RAW SAR SIDE */}
        <div className="absolute inset-0 overflow-hidden">
          <RawSAR />
        </div>

        {/* AI PROCESSED SIDE */}
        <div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{
            width: `${100 - comparePosition}%`,
          }}
        >
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: `${(100 / (100 - comparePosition)) * 100}%`,
            }}
          >
            <AIProcessed />
          </div>
        </div>

        {/* RAW LABEL */}
        <div className="absolute left-3 top-3 z-20 rounded-full border border-cyan-400/10 bg-[#061522]/90 px-3 py-1.5 font-mono text-[9px] text-slate-400">
          RAW SAR
        </div>

        {/* AI LABEL */}
        <div className="absolute right-3 top-3 z-20 rounded-full border border-cyan-400/15 bg-[#061522]/90 px-3 py-1.5 font-mono text-[9px] text-cyan-300">
          AI PROCESSED
        </div>

        {/* COMPARISON HANDLE */}
        <div
          className="absolute inset-y-0 z-30 w-px bg-cyan-300 shadow-[0_0_12px_#22d3ee]"
          style={{
            left: `${comparePosition}%`,
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan-300 bg-[#020913] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            ↔
          </div>
        </div>

        {/* SLIDER */}
        <input
          type="range"
          min="5"
          max="95"
          value={comparePosition}
          onChange={(event) =>
            setComparePosition(Number(event.target.value))
          }
          className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Compare raw SAR and AI processed imagery"
        />

        {/* AI LEGEND */}
        <div className="absolute left-[28%] top-3 z-20 rounded-lg border border-cyan-400/10 bg-[#020913]/90 px-3 py-2.5">
          <p className="font-mono text-[9px] text-cyan-300">
            AI ICE SEGMENTATION
          </p>

          <p className="mt-1 font-mono text-[9px] text-sky-400">
            ▪ Sea Ice
          </p>

          <p className="font-mono text-[9px] text-blue-400">
            ▪ Open Water
          </p>

          <p className="font-mono text-[9px] text-orange-400">
            ▪ Iceberg
          </p>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-3 left-[28%] z-20 font-mono text-[9px] text-cyan-500">
          POLARIS-AI v2.4 • CONF: 94.2% • 1250×1250 km
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RAW SAR VISUAL
========================================================= */

function RawSAR() {
  return (
    <div className="relative h-full w-full bg-[#020b17]">
      {/* subtle radar texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35,91,125,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(35,91,125,0.12) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* ocean shapes */}
      <div className="absolute left-[28%] top-[48%] h-28 w-52 rounded-[50%] bg-[#12335e] opacity-80" />

      <div className="absolute left-[35%] top-[62%] h-20 w-36 rounded-[50%] bg-[#102e57] opacity-80" />

      <div className="absolute left-[48%] top-[28%] h-44 w-64 rotate-[-20deg] rounded-[45%] bg-[#193b68] opacity-80" />

      {/* iceberg */}
      <div className="absolute left-[49%] top-[20%] h-44 w-40 rotate-[8deg] rounded-[35%] bg-[#6e8ba0] opacity-60" />

      {/* iceberg highlight */}
      <div className="absolute left-[51%] top-[24%] h-32 w-24 rotate-[15deg] rounded-[40%] bg-[#a4b7c4] opacity-40" />

      {/* iceberg markers */}
      <div className="absolute left-[40%] top-[48%] flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-400">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      </div>

      <div className="absolute left-[46%] top-[72%] flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-400">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      </div>
    </div>
  );
}

/* =========================================================
   AI PROCESSED VISUAL
========================================================= */

function AIProcessed() {
  return (
    <div className="relative h-full w-full bg-[#091622]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,89,117,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(42,89,117,0.12) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* processed ice */}
      <div className="absolute left-[45%] top-[20%] h-44 w-40 rotate-[8deg] rounded-[35%] bg-slate-300/60" />

      {/* cyan segmentation */}
      <div className="absolute left-[43%] top-[20%] h-44 w-40 rotate-[8deg] rounded-[35%] border-2 border-cyan-300 bg-cyan-400/10" />

      {/* open water */}
      <div className="absolute left-[27%] top-[49%] h-28 w-52 rounded-[50%] bg-blue-400/20" />

      <div className="absolute left-[35%] top-[63%] h-20 w-36 rounded-[50%] bg-blue-400/20" />

      {/* iceberg markers */}
      <div className="absolute left-[40%] top-[48%] flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-400">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      </div>

      <div className="absolute left-[46%] top-[72%] flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-400">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      </div>

      {/* data lines */}
      <div className="absolute right-[20%] top-[20%] h-px w-32 bg-slate-500/20" />
      <div className="absolute right-[12%] top-[35%] h-px w-44 bg-slate-500/20" />
      <div className="absolute right-[25%] top-[50%] h-px w-24 bg-slate-500/20" />
      <div className="absolute right-[10%] top-[65%] h-px w-36 bg-slate-500/20" />
    </div>
  );
}

function Metric({
  label,
  value,
  cyan,
  green,
}: {
  label: string;
  value: string;
  cyan?: boolean;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-2.5">
      <p className="font-mono text-[9px] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 text-[15px] ${
          green
            ? "text-emerald-400"
            : cyan
              ? "text-cyan-300"
              : "text-slate-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}