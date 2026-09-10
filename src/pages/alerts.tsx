import AlertCard from "../components/dashboard/alerts/alertCard";
import AlertSummaryCards from "../components/dashboard/alerts/alertSummaryCard";

import {
  alerts,
  alertSummary,
  type AlertData,
} from "../data/alertsData";

interface AlertsProps {
  onNavigate: (
    target: NonNullable<AlertData["actionTarget"]>,
  ) => void;
}

export default function Alerts({ onNavigate }: AlertsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913] text-slate-100">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header
        className="
          flex
          min-h-[70px]
          shrink-0
          items-center
          justify-between
          border-b
          border-cyan-400/10
          bg-[#020b16]
          px-6
        "
      >
        <div>
          <h1 className="font-mono text-[17px] tracking-[0.12em] text-slate-100">
            MISSION ALERTS
          </h1>

          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-500">
            Active Notifications &amp; Risk Events
          </p>
        </div>

        <div className="flex items-center gap-8">
          {/* LIVE SYSTEM */}
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

            <span className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
              LIVE SYSTEM
            </span>
          </div>

          {/* UPDATE */}
          <div className="hidden text-right lg:block">
            <p className="font-mono text-[9px] text-slate-500">
              Satellite updated:
              <span className="ml-2 text-cyan-300">
                08 SEP 2026 • 18:42 UTC
              </span>
            </p>

            <p className="mt-1 font-mono text-[9px] text-slate-600">
              Vessel:
              <span className="ml-2 text-slate-400">
                MV SAGAR KANYA
              </span>
            </p>
          </div>

          {/* ALERT */}
          <button
            type="button"
            className="
              hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-400/15
              bg-[#061522]
              text-slate-400
              sm:flex
            "
          >
            △
          </button>

          {/* USER */}
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
              bg-cyan-400/[0.08]
              font-mono
              text-[10px]
              text-cyan-200
            "
          >
            SK
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {/* SUMMARY */}
          <AlertSummaryCards
            critical={alertSummary.critical}
            warning={alertSummary.warning}
            info={alertSummary.info}
            total={alertSummary.total}
          />

          {/* ALERT LIST */}
          <section className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onNavigate={onNavigate}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}