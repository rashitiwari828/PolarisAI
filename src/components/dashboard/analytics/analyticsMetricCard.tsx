interface AnalyticsMetricCardProps {
  value: string;
  label: string;
  subLabel: string;
  icon: string;
  tone: "cyan" | "green" | "purple";
}

export default function AnalyticsMetricCard({
  value,
  label,
  subLabel,
  icon,
  tone,
}: AnalyticsMetricCardProps) {
  const styles = {
    cyan: {
      icon:
        "border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-300",
      value: "text-cyan-300",
    },
    green: {
      icon:
        "border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300",
      value: "text-emerald-400",
    },
    purple: {
      icon:
        "border-violet-400/25 bg-violet-400/[0.06] text-violet-300",
      value: "text-violet-400",
    },
  };

  const style = styles[tone];

  return (
    <article className="flex min-h-[95px] items-center rounded-xl border border-cyan-400/15 bg-[#04111d] px-6 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-[20px] ${style.icon}`}
      >
        {icon}
      </div>

      <div className="ml-5 min-w-0">
        <p
          className={`font-mono text-[34px] font-light leading-none ${style.value}`}
        >
          {value}
        </p>

        <p className="mt-2 text-[14px] font-medium text-slate-200">
          {label}
        </p>

        <p className="mt-1 font-mono text-[9px] tracking-wide text-slate-600">
          {subLabel}
        </p>
      </div>
    </article>
  );
}