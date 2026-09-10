import { useState } from "react";

import Sidebar from "./sidebar";
import TopHeader from "./topHeader";
import TelemetryBar from "./telemetryBar";

import MissionMap from "./map/missionMap";
import MapControls from "./map/mapControls";

import MissionStatus from "./panels/missionStatus";
import RiskIndicators from "./panels/riskIndicators";

import SeaIceIntelligence from "../../pages/seaIceIntelligence";
import IcebergTracker from "../../pages/icebergTracker";
import RoutePlanner from "../../pages/routePlanner";
import SatelliteMonitor from "../../pages/satelliteMonitor";
import WeatherOcean from "../../pages/weatherOcean";
import Alerts from "../../pages/alerts";
import Analytics from "../../pages/analytics";
import ModelPerformance from "../../pages/modelPerformance";
import LiveSimulation from "../../pages/liveSimulation";

import {
  vesselTelemetry,
  riskIndicators,
} from "../../data/dashboardData";

import type { DashboardSection } from "../../types/dashboard";

export default function DashboardLayout() {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("mission");

  // ---------------------------------------------------------
  // Mission Control map layer state
  // ---------------------------------------------------------

  const [showSeaIce, setShowSeaIce] = useState(true);
  const [showIcebergs, setShowIcebergs] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  // ---------------------------------------------------------
  // Active dashboard section
  // ---------------------------------------------------------

  const isMissionControl = activeSection === "mission";
  const isSeaIceIntelligence = activeSection === "sea-ice";
  const isIcebergTracker = activeSection === "icebergs";
  const isRoutePlanner = activeSection === "route";
  const isSatelliteMonitor = activeSection === "satellite";
  const isWeatherOcean = activeSection === "weather";
  const isAlerts = activeSection === "alerts";
  const isAnalytics = activeSection === "analytics";
  const isModelPerformance = activeSection === "model";
  const isLiveSimulation = activeSection === "simulation";

  return (
    <div
      className="
        flex
        h-screen
        w-full
        overflow-hidden
        bg-[#020913]
        text-slate-100
      "
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className="
          h-full
          w-[266px]
          shrink-0
          border-r
          border-cyan-400/10
          bg-[#020b16]
        "
      >
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </aside>

      {/* =====================================================
          MAIN APPLICATION AREA
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden
          bg-[#020913]
        "
      >
        {/* ===================================================
            TOP HEADER
            Only Mission Control uses the global TopHeader.
        =================================================== */}

        {isMissionControl && (
          <div className="shrink-0">
            <TopHeader
              vesselName={vesselTelemetry.vesselName}
            />
          </div>
        )}

        {/* ===================================================
            TELEMETRY
            Only visible on Mission Control
        =================================================== */}

        {isMissionControl && (
          <div
            className="
              shrink-0
              border-b
              border-cyan-400/10
              bg-[#020913]
              px-4
              py-3
            "
          >
            <TelemetryBar
              telemetry={vesselTelemetry}
            />
          </div>
        )}

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main
          className="
            flex
            min-h-0
            flex-1
            overflow-hidden
          "
        >
          {/* =================================================
              SEA-ICE INTELLIGENCE
          ================================================= */}

          {isSeaIceIntelligence && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <SeaIceIntelligence />
            </section>
          )}

          {/* =================================================
              ICEBERG TRACKER
          ================================================= */}

          {isIcebergTracker && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <IcebergTracker
                onNavigate={() =>
                  setActiveSection("route")
                }
              />
            </section>
          )}

          {/* =================================================
              ROUTE PLANNER
          ================================================= */}

          {isRoutePlanner && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <RoutePlanner
                onNavigateToAlerts={() =>
                  setActiveSection("alerts")
                }
              />
            </section>
          )}

          {/* =================================================
              SATELLITE MONITOR
          ================================================= */}

          {isSatelliteMonitor && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <SatelliteMonitor />
            </section>
          )}

          {/* =================================================
              WEATHER & OCEAN
          ================================================= */}

          {isWeatherOcean && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <WeatherOcean />
            </section>
          )}

          {/* =================================================
              MISSION ALERTS
          ================================================= */}

          {isAlerts && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <Alerts
                onNavigate={(target) => {
                  setActiveSection(target);
                }}
              />
            </section>
          )}

          {/* =================================================
    LIVE MISSION SIMULATION
================================================= */}

{isLiveSimulation && (
  <section
    className="
      min-h-0
      min-w-0
      flex-1
      overflow-hidden
      bg-[#020913]
    "
  >
    <LiveSimulation />
  </section>
)}

          {/* =================================================
              ANALYTICS
          ================================================= */}

          {isAnalytics && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <Analytics
                onNavigateToModelPerformance={() =>
                  setActiveSection("model")
                }
              />
            </section>
          )}

          {/* =================================================
              MODEL PERFORMANCE
          ================================================= */}

          {isModelPerformance && (
            <section
              className="
                min-h-0
                min-w-0
                flex-1
                overflow-hidden
                bg-[#020913]
              "
            >
              <ModelPerformance />
            </section>
          )}

          {/* =================================================
              MISSION CONTROL
          ================================================= */}

          {isMissionControl && (
            <>
              {/* =============================================
                  MAP AREA
              ============================================= */}

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
                    bg-[#020b14]
                    shadow-[0_0_40px_rgba(0,200,255,0.05)]
                  "
                >
                  <MissionMap
                    showSeaIce={showSeaIce}
                    showIcebergs={showIcebergs}
                    showRoute={showRoute}
                  />

                  <MapControls
                    showSeaIce={showSeaIce}
                    showIcebergs={showIcebergs}
                    showRoute={showRoute}
                    onSeaIceChange={setShowSeaIce}
                    onIcebergsChange={setShowIcebergs}
                    onRouteChange={setShowRoute}
                  />
                </div>
              </section>

              {/* =============================================
                  RIGHT PANEL
              ============================================= */}

              <aside
                className="
                  h-full
                  w-[320px]
                  shrink-0
                  overflow-y-auto
                  border-l
                  border-cyan-400/10
                  bg-[#020b16]
                  p-3
                "
              >
                {/* MISSION STATUS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-cyan-400/15
                    bg-[#04111d]
                    p-1
                    shadow-[0_0_30px_rgba(0,180,255,0.03)]
                  "
                >
                  <MissionStatus
                    telemetry={vesselTelemetry}
                  />
                </div>

                {/* RISK INDICATORS */}

                <div
                  className="
                    mt-3
                    rounded-xl
                    border
                    border-cyan-400/15
                    bg-[#04111d]
                    p-1
                    shadow-[0_0_30px_rgba(0,180,255,0.03)]
                  "
                >
                  <RiskIndicators
                    indicators={riskIndicators}
                  />
                </div>
              </aside>
            </>
          )}
        </main>
      </div>
    </div>
  );
}