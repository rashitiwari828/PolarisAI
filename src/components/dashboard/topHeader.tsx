import { useEffect, useState } from "react";

interface TopHeaderProps {
  vesselName: string;
}

export default function TopHeader({
  vesselName,
}: TopHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const date = currentTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const time = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return (
    <header
      className="
        h-[66px]
        w-full
        border-b border-cyan-400/10
        bg-[#020b16]
        px-6
        flex
        items-center
        justify-between
      "
    >
      {/* LEFT — TITLE */}
      <div className="flex flex-col justify-center">
        <h1
          className="
            text-[14px]
            font-medium
            tracking-[0.18em]
            text-slate-100
          "
        >
          MISSION CONTROL
        </h1>

        <p
          className="
            mt-1
            font-mono
            text-[9px]
            tracking-[0.16em]
            text-slate-500
          "
        >
          Antarctic Navigation Intelligence
        </p>
      </div>

      {/* CENTER — LIVE SYSTEM */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          rounded-xl
          border border-emerald-400/15
          bg-emerald-400/[0.03]
          px-4
          py-2
        "
      >
        {/* Pulsing green indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="
              absolute
              inline-flex
              h-full
              w-full
              animate-ping
              rounded-full
              bg-emerald-400
              opacity-60
            "
          />

          <span
            className="
              relative
              inline-flex
              h-2.5
              w-2.5
              rounded-full
              bg-emerald-400
              shadow-[0_0_12px_rgba(52,211,153,0.9)]
            "
          />
        </span>

        <span
          className="
            font-mono
            text-[10px]
            font-medium
            tracking-[0.16em]
            text-emerald-400
          "
        >
          LIVE SYSTEM
        </span>
      </div>

      {/* RIGHT — LIVE TIME + VESSEL */}
      <div className="flex items-center gap-8">

        {/* Time information */}
        <div className="flex flex-col items-end">
          <div
            className="
              font-mono
              text-[10px]
              tracking-[0.05em]
              text-slate-400
            "
          >
            Satellite updated:
            <span className="ml-2 text-cyan-300">
              {date} • {time} UTC
            </span>
          </div>

          <div
            className="
              mt-1
              font-mono
              text-[10px]
              text-slate-500
            "
          >
            Vessel:
            <span className="ml-2 font-semibold text-slate-300">
              {vesselName}
            </span>
          </div>
        </div>

        {/* Alert button */}
        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-400/20
            bg-cyan-400/[0.03]
            text-slate-400
            transition
            duration-200
            hover:border-cyan-400/50
            hover:bg-cyan-400/[0.08]
            hover:text-cyan-300
            hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]
          "
          title="Alerts"
        >
          <span className="text-sm">△</span>
        </button>

        {/* User / operator */}
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-cyan-400/30
            bg-cyan-400/8
            font-mono
            text-[11px]
            text-cyan-200
            shadow-[inset_0_0_12px_rgba(34,211,238,0.08)]
          "
        >
          SK
        </div>
      </div>
    </header>
  );
}