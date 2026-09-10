import type { AlertData } from "../../../data/alertsData";

interface AlertCardProps {
  alert: AlertData;
  onNavigate: (
    target: NonNullable<AlertData["actionTarget"]>,
  ) => void;
}

export default function AlertCard({
  alert,
  onNavigate,
}: AlertCardProps) {
  const styles = {
    CRITICAL: {
      border: "border-red-500",
      background: "bg-[#130d18]",
      dot: "bg-red-400 shadow-[0_0_14px_#fb7185]",
      badge:
        "border-red-500/40 bg-red-500/10 text-red-400",
      button:
        "border-red-500/30 bg-red-500/[0.05] text-red-400 hover:bg-red-500/10",
    },

    WARNING: {
      border: "border-amber-500",
      background: "bg-[#111117]",
      dot: "bg-orange-400 shadow-[0_0_14px_#fb923c]",
      badge:
        "border-amber-500/40 bg-amber-500/10 text-amber-400",
      button:
        "border-amber-500/30 bg-amber-500/[0.05] text-amber-400 hover:bg-amber-500/10",
    },

    INFO: {
      border: "border-cyan-400",
      background: "bg-[#031523]",
      dot: "bg-blue-400 shadow-[0_0_14px_#60a5fa]",
      badge:
        "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
      button:
        "border-cyan-400/30 bg-cyan-400/[0.05] text-cyan-300 hover:bg-cyan-400/10",
    },
  };

  const style = styles[alert.type];

  return (
    <article
      className={`
        overflow-hidden
        rounded-xl
        border-l-2
        ${style.border}
        ${style.background}
        px-6
        py-5
        shadow-[0_0_35px_rgba(0,180,255,0.025)]
      `}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-start gap-3">
          {/* STATUS DOT */}

          <span
            className={`
              mt-1
              h-[20px]
              w-[20px]
              shrink-0
              rounded-full
              ${style.dot}
            `}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-3">
              {/* ALERT TYPE */}

              <span
                className={`
                  rounded-md
                  border
                  px-2
                  py-0.5
                  font-mono
                  text-[9px]
                  font-medium
                  tracking-wide
                  ${style.badge}
                `}
              >
                {alert.type}
              </span>

              {/* TITLE */}

              <h2 className="font-sans text-[17px] font-medium text-slate-100">
                {alert.title}
              </h2>

              {/* CRITICAL INDICATOR */}

              {alert.type === "CRITICAL" && (
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              )}
            </div>

            {/* TIMESTAMP */}

            <p className="mt-1.5 font-mono text-[10px] tracking-wide text-slate-500">
              {alert.timestamp} • ID: {alert.id}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p className="mt-4 max-w-[1100px] text-[15px] leading-6 text-slate-200">
        {alert.description}
      </p>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="mt-5 flex items-center justify-between gap-5">
        {/* =================================================
            METRICS
        ================================================= */}

        <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
          {alert.metrics.map((metric) => (
            <div
              key={metric.label}
              className="min-w-[95px]"
            >
              <p className="font-mono text-[9px] tracking-wide text-slate-600">
                {metric.label}
              </p>

              <p className="mt-0.5 text-[13px] text-slate-200">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* =================================================
            ACTION BUTTON
        ================================================= */}

        {alert.actionLabel && alert.actionTarget && (
          <button
            type="button"
            onClick={() => onNavigate(alert.actionTarget!)}
            className={`
              shrink-0
              rounded-lg
              border
              px-5
              py-2.5
              font-mono
              text-[10px]
              tracking-wide
              transition
              ${style.button}
            `}
          >
            {alert.actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}