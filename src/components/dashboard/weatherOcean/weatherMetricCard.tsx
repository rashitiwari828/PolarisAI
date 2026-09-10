interface WeatherMetricCardProps {
  icon: string;
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "green" | "amber" | "slate";
}

export default function WeatherMetricCard({
  icon,
  label,
  value,
  detail,
  tone = "cyan",
}: WeatherMetricCardProps) {
  const valueClass =
    tone === "green"
      ? "text-emerald-400"
      : tone === "amber"
        ? "text-amber-400"
        : tone === "slate"
          ? "text-slate-200"
          : "text-cyan-300";

  const borderClass =
    tone === "amber"
      ? "border-amber-400/30"
      : "border-cyan-400/10";

  return (
    <article
      className={`
        rounded-xl
        border
        ${borderClass}
        bg-[#061522]
        px-4
        py-3
        shadow-[0_0_25px_rgba(0,180,255,0.025)]
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-[15px]">{icon}</span>

        <span className="font-mono text-[9px] tracking-[0.12em] text-slate-500">
          {label}
        </span>

        {tone === "amber" && (
          <span className="ml-auto h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
        )}
      </div>

      <p
        className={`
          mt-3
          font-sans
          text-[20px]
          font-medium
          leading-none
          ${valueClass}
        `}
      >
        {value}
      </p>

      <p className="mt-2 font-mono text-[9px] tracking-[0.04em] text-slate-500">
        {detail}
      </p>
    </article>
  );
}