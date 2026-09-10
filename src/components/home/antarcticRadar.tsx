import { useState } from "react";
import {
  Activity,
  Navigation,
  Satellite,
  Waves,
} from "lucide-react";

export default function AntarcticRadar() {
  const [hovered, setHovered] = useState<
    "vessel" | "iceberg" | null
  >(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({
      x: x * 8,
      y: y * 8,
    });
  };

  const resetMouse = () => {
    setMousePosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <div
      className="satellite-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      {/* =====================================================
          SATELLITE IMAGE
      ====================================================== */}

      <div
        className="satellite-image-wrapper"
        style={{
          transform: `
            translate(${mousePosition.x * 0.35}px,
            ${mousePosition.y * 0.35}px)
            scale(1.08)
          `,
        }}
      >
        <img
          src="/images/antarctic-sar.jpg"
          alt="Antarctic satellite radar view"
          className="satellite-image"
        />
      </div>

      {/* Dark overlay */}
      <div className="satellite-dark-overlay" />

      {/* Cyan atmospheric tint */}
      <div className="satellite-cyan-overlay" />

      {/* Vignette */}
      <div className="satellite-vignette" />

      {/* =====================================================
          GRID
      ====================================================== */}

      <div className="satellite-grid" />

      {/* =====================================================
          RADAR SWEEP
      ====================================================== */}

      <div className="radar-sweep">
        <div className="radar-beam" />
      </div>

      {/* =====================================================
          TOP LEFT — LIVE FEED
      ====================================================== */}

      <div className="live-feed">
        <span className="live-dot">
          <span />
        </span>

        <span>LIVE SATELLITE FEED</span>
      </div>

      {/* =====================================================
          TOP RIGHT — LAYERS
      ====================================================== */}

      <div className="map-layers">
        <button className="layer-button active">
          SAT
        </button>

        <button className="layer-button">
          RISK
        </button>

        <button className="layer-button">
          ICE
        </button>
      </div>

      {/* =====================================================
          CENTER CROSSHAIR
      ====================================================== */}

      <div className="crosshair">
        <div className="crosshair-horizontal" />
        <div className="crosshair-vertical" />

        <div className="crosshair-center" />
      </div>

      {/* =====================================================
          ROUTE
      ====================================================== */}

      <svg
        className="route-layer"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="routeGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0.15"
            />

            <stop
              offset="50%"
              stopColor="#22d3ee"
              stopOpacity="1"
            />

            <stop
              offset="100%"
              stopColor="#a5f3fc"
              stopOpacity="0.8"
            />
          </linearGradient>
        </defs>

        <polyline
          className="animated-route"
          points="
            8,84
            18,77
            29,70
            40,62
            50,54
            61,47
            72,38
            84,30
          "
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="0.55"
          strokeDasharray="2 1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* =====================================================
          ROUTE WAYPOINTS
      ====================================================== */}

      <span
        className="route-point"
        style={{ left: "18%", top: "77%" }}
      />

      <span
        className="route-point"
        style={{ left: "29%", top: "70%" }}
      />

      <span
        className="route-point"
        style={{ left: "40%", top: "62%" }}
      />

      <span
        className="route-point"
        style={{ left: "50%", top: "54%" }}
      />

      <span
        className="route-point"
        style={{ left: "61%", top: "47%" }}
      />

      {/* =====================================================
          VESSEL
      ====================================================== */}

      <button
        className="vessel-marker"
        style={{
          left: "72%",
          top: "38%",
        }}
        onMouseEnter={() => setHovered("vessel")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="vessel-pulse" />

        <div className="vessel-icon">
          <Navigation
            size={14}
            className="rotate-45"
          />
        </div>

        <div className="vessel-label">
          <strong>MV SAGAR KANYA</strong>

          <span>VESSEL POSITION</span>

          <small>58°24′S 30°12′E</small>
        </div>

        {/* Vessel hover card */}
        {hovered === "vessel" && (
          <div className="hover-card vessel-card">
            <div className="hover-card-title">
              VESSEL TELEMETRY
            </div>

            <div className="telemetry-row">
              <span>SPEED</span>
              <strong>12.4 KN</strong>
            </div>

            <div className="telemetry-row">
              <span>HEADING</span>
              <strong>041°</strong>
            </div>

            <div className="telemetry-row">
              <span>FUEL</span>
              <strong className="green-text">
                78%
              </strong>
            </div>
          </div>
        )}
      </button>

      {/* =====================================================
          ICEBERG
      ====================================================== */}

      <button
        className="iceberg-marker"
        style={{
          left: "47%",
          top: "51%",
        }}
        onMouseEnter={() => setHovered("iceberg")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="iceberg-pulse" />

        <div className="iceberg-dot" />

        <div className="iceberg-label">
          ICEBERG A23
        </div>

        {hovered === "iceberg" && (
          <div className="hover-card iceberg-card">
            <div className="risk-title">
              HIGH RISK
            </div>

            <p>
              Predicted trajectory intersects
              current route corridor.
            </p>
          </div>
        )}
      </button>

      {/* =====================================================
          ICE CONCENTRATION
      ====================================================== */}

      <div
        className="ice-info"
        style={{
          left: "27%",
          top: "67%",
        }}
      >
        <Waves size={11} />

        <span>ICE 64%</span>
      </div>

      {/* =====================================================
          BOTTOM LEFT — SATELLITE INFO
      ====================================================== */}

      <div className="satellite-info">
        <div className="satellite-info-heading">
          <Satellite size={12} />

          <span>SAR MONITORING</span>
        </div>

        <strong>ANTARCTIC PENINSULA</strong>

        <small>
          SENTINEL-1 • ACTIVE PASS
        </small>
      </div>

      {/* =====================================================
          BOTTOM RIGHT — LIVE STATUS
      ====================================================== */}

      <div className="live-status">
        <Activity size={11} />

        <span>LIVE</span>

        <strong>00:04:21</strong>
      </div>

      {/* =====================================================
          SCANNING LINE
      ====================================================== */}

      <div className="scan-line" />

      {/* =====================================================
          CORNERS
      ====================================================== */}

      <div className="corner top-left" />
      <div className="corner bottom-right" />
    </div>
  );
}