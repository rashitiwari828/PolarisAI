interface SatelliteSourceCardProps {
  name: string;
  type: string;
  icon: "radar" | "optical" | "ai";
  latestObservation: string;
  orbit: string;
  coverage: string;
  resolution: string;
  passes: string;
  status: "ACTIVE" | "COMPLETE";
}

function SourceIcon({
  type,
}: {
  type: SatelliteSourceCardProps["icon"];
}) {
  if (type === "radar") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-200">
        <span className="text-[22px]">◎</span>
      </div>
    );
  }

  if (type === "optical") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-200">
        <span className="text-[22px]">◉</span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-200">
      <span className="text-[21px]">⬡</span>
    </div>
  );
}

export default function SatelliteSourceCard({
  name,
  type,
  icon,
  latestObservation,
  orbit,
  coverage,
  resolution,
  passes,
  status,
}: SatelliteSourceCardProps) {
  return (
    <article
      className="
        min-w-0
        rounded-xl
        border
        border-cyan-400/15
        bg-[#04111d]
        p-5
        shadow-[0_0_30px_rgba(0,180,255,0.03)]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <SourceIcon type={icon} />

          <div className="min-w-0">
            <h2 className="whitespace-nowrap font-mono text-[16px] text-slate-200">
              {name}
            </h2>

            <p className="mt-1 whitespace-nowrap font-mono text-[10px] text-slate-500">
              {type}
            </p>
          </div>
        </div>

        {/* STATUS */}

        <div
          className={`
            flex
            shrink-0
            items-center
            gap-2
            rounded-lg
            border
            px-3
            py-1.5
            font-mono
            text-[9px]
            whitespace-nowrap
            ${
              status === "ACTIVE"
                ? "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-400"
                : "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300"
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              ${
                status === "ACTIVE"
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              }
            `}
          />

          {status}
        </div>
      </div>

      {/* =====================================================
          DATA GRID
      ===================================================== */}

      <div className="mt-5 grid min-w-0 grid-cols-2 gap-2.5">
        <DataBox
          label="Latest observation"
          value={latestObservation}
        />

        <DataBox
          label="Orbit"
          value={orbit}
        />

        <DataBox
          label="Coverage"
          value={coverage}
        />

        <DataBox
          label="Resolution"
          value={resolution}
        />

        <DataBox
          label="Passes"
          value={passes}
        />
      </div>
    </article>
  );
}

function DataBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-cyan-400/10
        bg-[#061522]
        px-3
        py-2.5
      "
    >
      <p className="whitespace-nowrap font-mono text-[9px] tracking-[0.02em] text-slate-600">
        {label}
      </p>

      <p
        className="
          mt-1
          overflow-hidden
          whitespace-nowrap
          font-mono
          text-[11px]
          leading-4
          tracking-[-0.01em]
          text-slate-300
        "
      >
        {value}
      </p>
    </div>
  );
}