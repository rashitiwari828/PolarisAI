import { useEffect, useRef, useState } from "react";
import {
  getCurrentUser,
  logoutUser,
} from "../utils/auth";

interface TopHeaderProps {
  vesselName: string;
}

export default function TopHeader({
  vesselName,
}: TopHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------
  // LIVE UTC CLOCK
  // -----------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // -----------------------------------------
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // -----------------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // -----------------------------------------
  // CURRENT USER
  // -----------------------------------------
  const user = getCurrentUser();

  // -----------------------------------------
  // USER INITIALS
  // -----------------------------------------
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const userInitials = user
    ? getInitials(user.name)
    : "OP";

  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------
  const handleLogout = () => {
    logoutUser();

    // Return to Home after logout.
    window.history.replaceState({}, "", "/");
    window.location.reload();
  };

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
        relative
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

      {/* RIGHT — LIVE TIME + VESSEL + USER */}
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
          type="button"
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

        {/* =========================================
            USER / OPERATOR PROFILE
        ========================================= */}
        <div
          ref={profileRef}
          className="relative"
        >
          {/* Profile button */}
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
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
              font-medium
              text-cyan-200
              shadow-[inset_0_0_12px_rgba(34,211,238,0.08)]
              transition
              duration-200
              hover:border-cyan-300/60
              hover:bg-cyan-400/[0.10]
              hover:text-cyan-100
              hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]
            "
            title="Operator profile"
          >
            {userInitials}
          </button>

          {/* Profile dropdown */}
          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-14
                z-50
                w-[290px]
                overflow-hidden
                rounded-xl
                border
                border-cyan-400/20
                bg-[#04111e]
                shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              "
            >
              {/* Profile header */}
              <div
                className="
                  border-b
                  border-cyan-400/10
                  px-5
                  py-5
                "
              >
                <div className="flex items-center gap-4">

                  {/* Large initials */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-cyan-400/[0.06]
                      font-mono
                      text-sm
                      font-semibold
                      text-cyan-200
                      shadow-[inset_0_0_16px_rgba(34,211,238,0.08)]
                    "
                  >
                    {userInitials}
                  </div>

                  {/* Name + email */}
                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        font-mono
                        text-[13px]
                        font-semibold
                        tracking-[0.04em]
                        text-slate-100
                      "
                    >
                      {user?.name || "Unknown Operator"}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        font-mono
                        text-[10px]
                        text-slate-500
                      "
                    >
                      {user?.email || "No email available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account information */}
              <div className="px-5 py-4">

                <p
                  className="
                    mb-3
                    font-mono
                    text-[9px]
                    font-semibold
                    tracking-[0.18em]
                    text-slate-600
                  "
                >
                  OPERATOR ACCOUNT
                </p>

                <div className="space-y-3">

                  {/* Account type */}
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-slate-500
                      "
                    >
                      Role
                    </span>

                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-slate-300
                      "
                    >
                      Operator
                    </span>
                  </div>

                  {/* Session */}
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-slate-500
                      "
                    >
                      Session
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        font-mono
                        text-[10px]
                        text-emerald-400
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      AUTHENTICATED
                    </span>
                  </div>

                </div>
              </div>

              {/* Logout */}
              <div className="border-t border-cyan-400/10 p-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-red-400/15
                    bg-red-400/[0.02]
                    px-4
                    py-2.5
                    text-left
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.14em]
                    text-red-300/80
                    transition
                    duration-200
                    hover:border-red-400/30
                    hover:bg-red-400/[0.06]
                    hover:text-red-300
                  "
                >
                  LOG OUT
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}