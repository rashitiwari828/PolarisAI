import LoginForm from "../components/auth/loginForm";

interface LoginProps {
  onLoginSuccess: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function Login({
  onLoginSuccess,
  onSignup,
  onBack,
}: LoginProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020913] px-5 text-slate-100">
      {/* Background grid */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-40
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative w-full max-w-[440px]">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="
            mb-6
            font-mono
            text-[10px]
            tracking-[0.16em]
            text-slate-600
            transition
            hover:text-cyan-300
          "
        >
          ← BACK TO POLARIS
        </button>

        {/* Card */}
        <div
          className="
            rounded-2xl
            border
            border-cyan-400/15
            bg-[#04111d]
            p-7
            shadow-[0_0_50px_rgba(0,180,255,0.05)]
          "
        >
          {/* Header */}
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

              <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-emerald-400">
                SYSTEM ONLINE
              </span>
            </div>

            <h1 className="font-mono text-[25px] tracking-[0.12em] text-slate-100">
              POLARIS
            </h1>

            <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-slate-500">
              MISSION CONTROL ACCESS
            </p>
          </div>

          <div className="mb-6 h-px bg-cyan-400/10" />

          <div className="mb-6">
            <h2 className="font-mono text-[14px] tracking-[0.12em] text-slate-200">
              OPERATOR LOGIN
            </h2>

            <p className="mt-2 font-mono text-[10px] leading-5 text-slate-600">
              Authenticate to access Antarctic navigation intelligence.
            </p>
          </div>

          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onSignup={onSignup}
          />
        </div>

        <p className="mt-5 text-center font-mono text-[8px] tracking-[0.16em] text-slate-700">
          POLARIS • SIH 2026 PROTOTYPE
        </p>
      </div>
    </div>
  );
}