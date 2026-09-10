interface AlertSummaryCardsProps {
  critical: number;
  warning: number;
  info: number;
  total: number;
}

export default function AlertSummaryCards({
  critical,
  warning,
  info,
  total,
}: AlertSummaryCardsProps) {
  const cards = [
    {
      label: "CRITICAL",
      subLabel: "ALERTS",
      value: critical,
      valueClass: "text-red-400",
    },
    {
      label: "WARNING",
      subLabel: "ALERTS",
      value: warning,
      valueClass: "text-amber-400",
    },
    {
      label: "INFO",
      subLabel: "ALERTS",
      value: info,
      valueClass: "text-cyan-300",
    },
    {
      label: "TOTAL ACTIVE",
      subLabel: "ALERTS",
      value: total,
      valueClass: "text-slate-200",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="
            flex
            min-h-[84px]
            items-center
            rounded-xl
            border
            border-cyan-400/15
            bg-[#04111d]
            px-5
            shadow-[0_0_30px_rgba(0,180,255,0.03)]
          "
        >
          <div
            className={`
              mr-4
              font-mono
              text-[36px]
              font-light
              leading-none
              ${card.valueClass}
            `}
          >
            {card.value}
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.08em] text-slate-500">
              {card.label}
            </p>

            <p className="font-mono text-[10px] tracking-[0.08em] text-slate-500">
              {card.subLabel}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}