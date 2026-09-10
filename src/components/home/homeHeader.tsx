export default function HomeHeader() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

        <span
          className="
            font-mono
            text-xs
            font-semibold
            tracking-[0.18em]
            text-emerald-400
          "
        >
          SYSTEM ONLINE
        </span>
      </div>

      <span
        className="
          font-mono
          text-[10px]
          tracking-[0.12em]
          text-slate-600
        "
      >
        SIH 2026 PROTOTYPE
      </span>
    </div>
  );
}