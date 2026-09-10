import { useState } from "react";

import SeaIceMap from "../components/dashboard/seaIce/seaIceMap";
import SeaIceToolbar from "../components/dashboard/seaIce/seaIceToolbar";

import ForecastSummary from "../components/dashboard/seaIce/forecastSummary";
import SeaIceForecast from "../components/dashboard/seaIce/seaIceForecast";
import AIInsight from "../components/dashboard/seaIce/Ai_Insight";
import CorridorAnalysis from "../components/dashboard/seaIce/corridorAnalysis";

export default function SeaIceIntelligence() {
  const [timeRange, setTimeRange] = useState<string>("72H");
  const [mode, setMode] = useState<string>("current");

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        bg-[#020913]
        text-slate-100
      "
    >
      {/* =====================================================
          SEA-ICE INTELLIGENCE HEADER
      ===================================================== */}

      <header
        className="
          flex
          h-[104px]
          shrink-0
          items-center
          justify-between
          border-b
          border-cyan-400/10
          bg-[#020913]
          px-7
        "
      >
        {/* LEFT */}

        <div>
          <h1
            className="
              font-mono
              text-[24px]
              font-medium
              tracking-[0.14em]
              text-slate-100
            "
          >
            SEA-ICE INTELLIGENCE
          </h1>

          <p
            className="
              mt-2
              font-mono
              text-[12px]
              tracking-[0.12em]
              text-slate-500
            "
          >
            AI-Powered Concentration Forecasting
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-7">

          {/* LIVE SYSTEM */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-400/[0.04]
              px-5
              py-3
              font-mono
              text-[11px]
              tracking-[0.12em]
              text-emerald-400
            "
          >
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_#34d399]
              "
            />

            LIVE SYSTEM
          </div>

          {/* SYSTEM INFO */}

          <div className="text-right">
            <p
              className="
                font-mono
                text-[11px]
                text-slate-500
              "
            >
              Satellite updated:
              <span className="ml-2 text-cyan-300">
                10 SEP 2026 • 16:42 UTC
              </span>
            </p>

            <p
              className="
                mt-2
                font-mono
                text-[11px]
                text-slate-500
              "
            >
              Vessel:
              <span className="ml-2 text-slate-300">
                MV SAGAR KANYA
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* =====================================================
          SEA-ICE TOOLBAR
      ===================================================== */}

      <div className="shrink-0">
        <SeaIceToolbar
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* =====================================================
          MAP + RIGHT INTELLIGENCE PANEL
      ===================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          overflow-hidden
        "
      >

        {/* ===================================================
            MAP
        =================================================== */}

        <section
          className="
            relative
            min-w-0
            flex-1
            overflow-hidden
            bg-[#020913]
            p-3
          "
        >
          <div
            className="
              relative
              h-full
              w-full
              overflow-hidden
              rounded-xl
              border
              border-cyan-400/15
              bg-[#06131f]
              shadow-[0_0_40px_rgba(0,200,255,0.05)]
            "
          >
            <SeaIceMap
              timeRange={timeRange}
              mode={mode}
            />
          </div>
        </section>

        {/* ===================================================
            RIGHT INTELLIGENCE PANEL
        =================================================== */}

        <aside
          className="
            h-full
            w-[380px]
            shrink-0
            overflow-y-auto
            border-l
            border-cyan-400/10
            bg-[#020b16]
            p-4
          "
        >
          {/* FORECAST SUMMARY */}

          <ForecastSummary />

          {/* SEA-ICE FORECAST */}

          <div className="mt-4">
            <SeaIceForecast />
          </div>

          {/* AI INSIGHT */}

          <div className="mt-4">
            <AIInsight />
          </div>

          {/* CORRIDOR ANALYSIS */}

          <div className="mt-4">
            <CorridorAnalysis />
          </div>
        </aside>
      </div>
    </div>
  );
}