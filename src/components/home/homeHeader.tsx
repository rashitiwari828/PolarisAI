export default function HomeHeader({ onLogin }) {
  return (
    <div className="flex w-full items-center justify-between">
      {/* Left side */}
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

      {/* Right side */}
      <button
        type="button"
        onClick={onLogin}
        className="
          rounded-md
          border
          border-cyan-400/30
          bg-cyan-400/[0.04]
          px-5
          py-2.5
          font-mono
          text-[10px]
          font-semibold
          tracking-[0.18em]
          text-cyan-300
          transition
          duration-200
          hover:border-cyan-300/60
          hover:bg-cyan-400/[0.08]
          hover:text-cyan-200
          hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]
        "
      >
        LOGIN
      </button>
    </div>
  );
}