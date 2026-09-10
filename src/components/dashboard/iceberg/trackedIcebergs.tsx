import type { TrackedIceberg } from "../../../types/iceberg";

interface TrackedIcebergsProps {
  icebergs: TrackedIceberg[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function riskClass(risk: TrackedIceberg["risk"]) {
  if (risk === "HIGH") {
    return "text-red-400";
  }

  if (risk === "MODERATE") {
    return "text-amber-400";
  }

  return "text-cyan-300";
}

function dotClass(risk: TrackedIceberg["risk"]) {
  if (risk === "HIGH") {
    return "bg-red-400";
  }

  if (risk === "MODERATE") {
    return "bg-amber-300";
  }

  return "bg-cyan-300";
}

export default function TrackedIcebergs({
  icebergs,
  selectedId,
  onSelect,
}: TrackedIcebergsProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/15 bg-[#04111d]/95 p-4 shadow-[0_0_30px_rgba(0,180,255,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-[14px] font-semibold tracking-[0.08em] text-slate-200">
          TRACKED ICEBERGS
        </h2>

        <span className="font-mono text-[10px] text-slate-500">
          {icebergs.length} ACTIVE
        </span>
      </div>

      <div className="space-y-1.5">
        {icebergs.map((iceberg) => {
          const selected = iceberg.id === selectedId;

          return (
            <button
              key={iceberg.id}
              onClick={() => onSelect(iceberg.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
                selected
                  ? "border-red-400/40 bg-red-400/[0.08]"
                  : "border-transparent bg-transparent hover:border-cyan-400/10 hover:bg-cyan-400/[0.035]"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${dotClass(
                  iceberg.risk,
                )}`}
              />

              <span className="flex-1 font-mono text-[13px] font-semibold tracking-wide text-slate-200">
                {iceberg.id}
              </span>

              <span
                className={`font-mono text-[10px] font-semibold tracking-wide ${riskClass(
                  iceberg.risk,
                )}`}
              >
                {iceberg.risk}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 border-t border-cyan-400/10 pt-3 font-mono text-[10px] text-slate-500">
        {icebergs.length} tracked • Updated 18:42 UTC
      </div>
    </div>
  );
}