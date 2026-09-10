interface ModelMetric {
  label: string;
  value: string;
  description: string;
}

interface ModelMetricGroupProps {
  title: string;
  model: string;
  tone: "cyan" | "purple" | "green";
  metrics: ModelMetric[];
}

export default function ModelMetricGroup({
  title,
  model,
  tone,
  metrics,
}: ModelMetricGroupProps) {
  const styles = {
    cyan: {
      icon:
        "border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-200",
      value: "text-cyan-300",
    },

    purple: {
      icon:
        "border-violet-400/25 bg-violet-400/[0.06] text-violet-200",
      value: "text-cyan-300",
    },

    green: {
      icon:
        "border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200",
      value: "text-cyan-300",
    },
  };

  const style = styles[tone];

  return (
    <section
      className="
        rounded-xl
        border
        border-cyan-400/15
        bg-[#04111d]
        p-5
        shadow-[0_0_30px_rgba(0,180,255,0.03)]
      "
    >
      {/* =====================================================
          MODEL HEADER
      ===================================================== */}

      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${style.icon}
          `}
        >
          {tone === "cyan" && "❄"}
          {tone === "purple" && "◆"}
          {tone === "green" && "⬡"}
        </div>

        <div className="min-w-0">
          <h2 className="text-[14px] font-medium tracking-wide text-slate-200">
            {title}
          </h2>

          <p className="mt-1 font-mono text-[9px] tracking-wide text-slate-600">
            {model}
          </p>
        </div>
      </div>

      {/* =====================================================
          METRICS
      ===================================================== */}

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="
              min-h-[95px]
              rounded-xl
              border
              border-cyan-400/10
              bg-[#061522]
              p-3
            "
          >
            <p
              className="
                font-mono
                text-[8px]
                leading-3
                tracking-wide
                text-slate-600
              "
            >
              {metric.label}
            </p>

            <p
              className={`
                mt-3
                text-[24px]
                font-light
                leading-none
                ${style.value}
              `}
            >
              {metric.value}
            </p>

            <p
              className="
                mt-2
                font-mono
                text-[8px]
                leading-3
                text-slate-700
              "
            >
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}