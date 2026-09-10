interface SeaIceToolbarProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  mode: string;
  setMode: (value: string) => void;
}

const ranges = [
  "24H",
  "72H",
  "7D",
  "14D",
];

const modes = [
  {
    id: "current",
    label: "CURRENT",
  },
  {
    id: "predicted",
    label: "PREDICTED",
  },
  {
    id: "difference",
    label: "DIFFERENCE",
  },
];

export default function SeaIceToolbar({
  timeRange,
  setTimeRange,
  mode,
  setMode,
}: SeaIceToolbarProps) {
  return (
    <div
      className="
        flex
        min-h-[88px]
        shrink-0
        items-center
        justify-between
        gap-6
        border-b
        border-cyan-400/10
        bg-[#020b16]
        px-7
        py-4
      "
    >

      {/* =====================================================
          LEFT CONTROLS
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-4">

        {/* TIME RANGE */}

        <div
          className="
            flex
            overflow-hidden
            rounded-xl
            border
            border-cyan-400/15
            bg-[#041321]
          "
        >
          {ranges.map((range) => {
            const active = timeRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`
                  h-12
                  px-6
                  font-mono
                  text-[12px]
                  font-bold
                  tracking-[0.12em]
                  transition-all
                  duration-200
                  ${
                    active
                      ? `
                        bg-cyan-400/15
                        text-cyan-200
                        shadow-[inset_0_-2px_0_rgba(34,211,238,0.9)]
                      `
                      : `
                        text-slate-500
                        hover:bg-cyan-400/5
                        hover:text-slate-300
                      `
                  }
                `}
              >
                {range}
              </button>
            );
          })}
        </div>

        {/* DATE */}

        <div
          className="
            flex
            h-12
            items-center
            gap-3
            rounded-xl
            border
            border-cyan-400/15
            bg-[#041321]
            px-5
          "
        >
          <span className="text-[13px] text-cyan-300">
            ▣
          </span>

          <span
            className="
              font-mono
              text-[12px]
              font-bold
              tracking-widest
              text-slate-200
            "
          >
            {new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).toUpperCase()}
          </span>
        </div>

        {/* MODEL */}

        <div
          className="
            flex
            h-12
            items-center
            gap-4
            rounded-xl
            border
            border-cyan-400/15
            bg-[#041321]
            px-5
          "
        >
          <span
            className="
              font-mono
              text-[11px]
              font-bold
              tracking-[0.12em]
              text-cyan-300
            "
          >
            MODEL
          </span>

          <span
            className="
              font-mono
              text-[12px]
              font-bold
              tracking-[0.08em]
              text-slate-200
            "
          >
            POLARIS-AI v2.4
          </span>

          <span className="text-[14px] text-slate-500">
            ⌄
          </span>
        </div>
      </div>

      {/* =====================================================
          CURRENT / PREDICTED / DIFFERENCE
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          overflow-hidden
          rounded-xl
          border
          border-cyan-400/15
          bg-[#041321]
        "
      >
        {modes.map((item) => {
          const active = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`
                h-12
                px-7
                font-mono
                text-[11px]
                font-bold
                tracking-[0.13em]
                transition-all
                duration-200
                ${
                  active
                    ? `
                      bg-cyan-400/15
                      text-cyan-200
                      shadow-[inset_0_-2px_0_rgba(34,211,238,0.8)]
                    `
                    : `
                      text-slate-500
                      hover:bg-cyan-400/5
                      hover:text-slate-300
                    `
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}