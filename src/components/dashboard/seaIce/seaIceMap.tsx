import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface SeaIceMapProps {
  timeRange?: string;
  mode?: string;
}

/* ============================================================
   SEA-ICE DEMO DATA

   These are placeholder intelligence zones for the UI.
   Later these can be replaced by real NSIDC / satellite data.
============================================================ */

const seaIceZones = {
  type: "FeatureCollection" as const,

  features: [
    {
      type: "Feature" as const,

      properties: {
        name: "Weddell Approach",
        concentration: 68,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [-70, -60],
          [-20, -60],
          [-10, -69],
          [-35, -76],
          [-60, -72],
          [-70, -60],
        ]],
      },
    },

    {
      type: "Feature" as const,

      properties: {
        name: "Eastern Corridor",
        concentration: 71,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [25, -61],
          [80, -61],
          [95, -68],
          [70, -75],
          [40, -73],
          [25, -61],
        ]],
      },
    },

    {
      type: "Feature" as const,

      properties: {
        name: "Ross Sea",
        concentration: 83,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [130, -61],
          [180, -61],
          [180, -72],
          [155, -75],
          [140, -70],
          [130, -61],
        ]],
      },
    },

    {
      type: "Feature" as const,

      properties: {
        name: "West Antarctic Sector",
        concentration: 54,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [-180, -61],
          [-140, -61],
          [-135, -68],
          [-155, -74],
          [-180, -72],
          [-180, -61],
        ]],
      },
    },

    {
      type: "Feature" as const,

      properties: {
        name: "Amundsen Sector",
        concentration: 47,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [-140, -61],
          [-90, -61],
          [-78, -68],
          [-105, -75],
          [-135, -72],
          [-140, -61],
        ]],
      },
    },

    {
      type: "Feature" as const,

      properties: {
        name: "Eastern Shelf",
        concentration: 76,
      },

      geometry: {
        type: "Polygon" as const,

        coordinates: [[
          [80, -61],
          [130, -61],
          [145, -68],
          [120, -73],
          [95, -71],
          [80, -61],
        ]],
      },
    },
  ],
};

/* ============================================================
   ANTARCTIC STATIONS
============================================================ */

const stations = [
  {
    name: "BHARATI",
    coordinates: [76.18, -69.41] as [number, number],
  },

  {
    name: "MAITRI",
    coordinates: [11.73, -70.77] as [number, number],
  },

  {
    name: "CASEY",
    coordinates: [110.53, -66.28] as [number, number],
  },
];

/* ============================================================
   VESSEL
============================================================ */

const vesselCoordinates: [number, number] = [
  76.8,
  -68.2,
];

/* ============================================================
   ROUTE
============================================================ */

const routeData = {
  type: "Feature" as const,

  properties: {},

  geometry: {
    type: "LineString" as const,

    coordinates: [
      [76.8, -68.2],
      [76.18, -69.41],
      [84, -68.5],
      [94, -67.4],
      [106, -66.7],
    ],
  },
};

/* ============================================================
   RISK ZONE
============================================================ */

const riskZone = {
  type: "Feature" as const,

  properties: {},

  geometry: {
    type: "Polygon" as const,

    coordinates: [[
      [78, -63.5],
      [112, -63.5],
      [118, -68],
      [105, -70],
      [82, -69],
      [78, -63.5],
    ]],
  },
};

export default function SeaIceMap({
  timeRange = "72H",
  mode = "current",
}: SeaIceMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [satelliteVisible, setSatelliteVisible] = useState(true);
  const [iceVisible, setIceVisible] = useState(true);
  const [riskVisible, setRiskVisible] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  /* ==========================================================
     INITIALIZE MAP
  ========================================================== */

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainer.current,

      /*
       * We create the style locally.
       * This prevents the blank/black map caused by
       * an external style.json failing to load.
       */

      style: {
        version: 8,

        sources: {
          satellite: {
            type: "raster",

            tiles: [
              "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
            ],

            tileSize: 256,
            maxzoom: 12,
          },

          seaIce: {
            type: "geojson",
            data: seaIceZones as any,
          },

          route: {
            type: "geojson",
            data: routeData as any,
          },

          risk: {
            type: "geojson",
            data: riskZone as any,
          },
        },

        layers: [
          /* BASE */

          {
            id: "background",

            type: "background",

            paint: {
              "background-color": "#06131f",
            },
          },

          /* SATELLITE */

          {
            id: "satellite",

            type: "raster",

            source: "satellite",

            paint: {
              "raster-opacity": 0.62,
              "raster-saturation": -0.35,
              "raster-contrast": 0.15,
              "raster-brightness-min": 0.05,
              "raster-brightness-max": 0.85,
            },
          },

          /* SEA ICE */

          {
            id: "sea-ice-fill",

            type: "fill",

            source: "seaIce",

            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "concentration"],

                0,
                "#071722",

                20,
                "#0b354b",

                40,
                "#08718c",

                60,
                "#10a9c4",

                80,
                "#72ddeb",

                100,
                "#d7fbff",
              ],

              "fill-opacity": 0.58,
            },
          },

          /* SEA ICE BORDER */

          {
            id: "sea-ice-outline",

            type: "line",

            source: "seaIce",

            paint: {
              "line-color": "#8eeeff",
              "line-width": 1,
              "line-opacity": 0.42,
            },
          },

          /* ROUTE */

          {
            id: "route",

            type: "line",

            source: "route",

            paint: {
              "line-color": "#37e6ff",
              "line-width": 3,
              "line-opacity": 0.9,
              "line-dasharray": [2, 1],
            },
          },

          /* RISK AREA */

          {
            id: "risk-zone",

            type: "fill",

            source: "risk",

            layout: {
              visibility: "none",
            },

            paint: {
              "fill-color": "#f59e0b",
              "fill-opacity": 0.16,
            },
          },

          {
            id: "risk-zone-outline",

            type: "line",

            source: "risk",

            layout: {
              visibility: "none",
            },

            paint: {
              "line-color": "#f59e0b",
              "line-width": 2,
              "line-opacity": 0.8,
              "line-dasharray": [2, 2],
            },
          },
        ],
      },

      center: [76, -70],

      zoom: 2.65,

      minZoom: 2,

      maxZoom: 8,

      attributionControl: false,
    });

    mapRef.current = map;

    /* ========================================================
       ATTRIBUTION
    ======================================================== */

    map.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution: "Satellite: EOX",
      }),
      "bottom-right",
    );

    /* ========================================================
       MAP LOADED
    ======================================================== */

    map.on("load", () => {
      map.setCenter([76, -70]);
      map.setZoom(2.65);

      /* ======================================================
         VESSEL MARKER
      ====================================================== */

      const vesselElement = document.createElement("div");

      vesselElement.innerHTML = `
        <div style="
          width:18px;
          height:18px;
          border:2px solid #67e8f9;
          border-radius:50%;
          background:#071923;
          box-shadow:
            0 0 0 5px rgba(34,211,238,.12),
            0 0 18px rgba(34,211,238,.95);
          position:relative;
        ">
          <div style="
            width:5px;
            height:5px;
            background:#67e8f9;
            border-radius:50%;
            position:absolute;
            left:4.5px;
            top:4.5px;
          "></div>
        </div>
      `;

      new maplibregl.Marker({
        element: vesselElement,
        anchor: "center",
      })
        .setLngLat(vesselCoordinates)
        .setPopup(
          new maplibregl.Popup({
            offset: 14,
            closeButton: false,
          }).setHTML(`
            <div style="
              font-family:monospace;
              color:#dffaff;
              background:#06131f;
              padding:10px;
              border-radius:6px;
              min-width:180px;
            ">
              <strong>MV SAGAR KANYA</strong><br/><br/>
              SPEED 12.4 kn<br/>
              HEADING 074° NE
            </div>
          `),
        )
        .addTo(map);

      /* ======================================================
         STATION MARKERS
      ====================================================== */

      stations.forEach((station) => {
        const element = document.createElement("div");

        element.innerHTML = `
          <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:4px;
          ">

            <div style="
              width:10px;
              height:10px;
              border-radius:50%;
              background:#f8fafc;
              border:2px solid #22d3ee;
              box-shadow:0 0 12px rgba(34,211,238,.85);
            "></div>

            <span style="
              color:#dffaff;
              font-family:monospace;
              font-size:11px;
              font-weight:700;
              letter-spacing:1.5px;
              text-shadow:0 1px 5px #000;
              white-space:nowrap;
            ">
              ${station.name}
            </span>

          </div>
        `;

        new maplibregl.Marker({
          element,
          anchor: "bottom",
        })
          .setLngLat(station.coordinates)
          .addTo(map);
      });

      /* ======================================================
         SEA ICE CLICK
      ====================================================== */

      map.on("click", "sea-ice-fill", (event) => {
        const feature = event.features?.[0];

        if (!feature) {
          return;
        }

        const concentration =
          feature.properties?.concentration ?? "--";

        const name =
          feature.properties?.name ?? "Sea-Ice Zone";

        new maplibregl.Popup({
          closeButton: true,
          offset: 10,
        })
          .setLngLat(event.lngLat)
          .setHTML(`
            <div style="
              min-width:180px;
              font-family:monospace;
              color:#e6fbff;
              background:#06131f;
              padding:12px;
            ">

              <div style="
                font-size:10px;
                color:#67e8f9;
                letter-spacing:1px;
              ">
                SEA-ICE ZONE
              </div>

              <div style="
                margin-top:6px;
                font-size:14px;
                font-weight:700;
              ">
                ${name}
              </div>

              <div style="
                margin-top:8px;
                font-size:22px;
                color:#ffffff;
              ">
                ${concentration}%
              </div>

              <div style="
                margin-top:2px;
                font-size:10px;
                color:#94a3b8;
              ">
                concentration
              </div>

            </div>
          `)
          .addTo(map);
      });

      map.on("mouseenter", "sea-ice-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "sea-ice-fill", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* ==========================================================
     SATELLITE TOGGLE
  ========================================================== */

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.getLayer("satellite")) {
      return;
    }

    map.setPaintProperty(
      "satellite",
      "raster-opacity",
      satelliteVisible ? 0.62 : 0,
    );
  }, [satelliteVisible]);

  /* ==========================================================
     ICE TOGGLE
  ========================================================== */

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.getLayer("sea-ice-fill")) {
      return;
    }

    map.setPaintProperty(
      "sea-ice-fill",
      "fill-opacity",
      iceVisible
        ? mode === "difference"
          ? 0.72
          : mode === "predicted"
            ? 0.65
            : 0.58
        : 0,
    );

    map.setPaintProperty(
      "sea-ice-outline",
      "line-opacity",
      iceVisible ? 0.42 : 0,
    );
  }, [iceVisible, mode]);

  /* ==========================================================
     RISK TOGGLE
  ========================================================== */

  useEffect(() => {
    const map = mapRef.current;

    if (
      !map ||
      !map.getLayer("risk-zone") ||
      !map.getLayer("risk-zone-outline")
    ) {
      return;
    }

    map.setLayoutProperty(
      "risk-zone",
      "visibility",
      riskVisible ? "visible" : "none",
    );

    map.setLayoutProperty(
      "risk-zone-outline",
      "visibility",
      riskVisible ? "visible" : "none",
    );
  }, [riskVisible]);

  /* ==========================================================
     ZOOM
  ========================================================== */

  const zoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const zoomOut = () => {
    mapRef.current?.zoomOut();
  };

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#06131f]">

      {/* MAP */}

      <div
        ref={mapContainer}
        className="absolute inset-0"
      />

      {/* SENSOR BADGE */}

      <div
        className="
          absolute
          left-5
          top-5
          z-10
          flex
          items-center
          gap-3
          rounded-lg
          border
          border-cyan-400/25
          bg-[#03111c]/90
          px-4
          py-3
          shadow-[0_0_25px_rgba(0,220,255,0.08)]
          backdrop-blur-md
        "
      >
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />

        <div>
          <div className="font-mono text-[12px] font-bold tracking-[0.16em] text-cyan-100">
            SENTINEL-1
          </div>

          <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-400">
            DEMO FEED • 18:42 UTC
          </div>
        </div>
      </div>

      {/* MAP MODE */}

      <div
        className="
          absolute
          left-5
          top-[88px]
          z-10
          rounded-md
          border
          border-cyan-400/15
          bg-[#03111c]/90
          px-4
          py-2.5
          backdrop-blur
        "
      >
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
          {mode === "current"
            ? "CURRENT ICE"
            : mode === "predicted"
              ? "72H FORECAST"
              : "ICE DIFFERENCE"}
        </span>

        <span className="ml-3 font-mono text-[10px] text-slate-500">
          {timeRange}
        </span>
      </div>

      {/* RIGHT CONTROLS */}

      <div
        className="
          absolute
          right-5
          top-5
          z-10
          flex
          flex-col
          gap-2
        "
      >
        <button
          onClick={zoomIn}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            border
            border-cyan-400/25
            bg-[#03111c]/90
            font-mono
            text-xl
            text-cyan-200
            backdrop-blur
            hover:border-cyan-300/60
            hover:bg-cyan-400/10
          "
        >
          +
        </button>

        <button
          onClick={zoomOut}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            border
            border-cyan-400/25
            bg-[#03111c]/90
            font-mono
            text-xl
            text-cyan-200
            backdrop-blur
            hover:border-cyan-300/60
            hover:bg-cyan-400/10
          "
        >
          −
        </button>

        <button
          onClick={() => setShowLegend((value) => !value)}
          className="
            mt-1
            h-11
            rounded-lg
            border
            border-cyan-400/25
            bg-[#03111c]/90
            px-3
            font-mono
            text-[11px]
            font-bold
            tracking-[0.12em]
            text-slate-200
            backdrop-blur
            hover:border-cyan-300/60
          "
        >
          LAYERS
        </button>

        <button
          onClick={() =>
            setSatelliteVisible((value) => !value)
          }
          className={`
            h-11
            rounded-lg
            border
            px-3
            font-mono
            text-[11px]
            font-bold
            tracking-[0.12em]
            backdrop-blur
            ${
              satelliteVisible
                ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-200"
                : "border-cyan-400/20 bg-[#03111c]/90 text-slate-500"
            }
          `}
        >
          SAT
        </button>

        <button
          onClick={() =>
            setRiskVisible((value) => !value)
          }
          className={`
            h-11
            rounded-lg
            border
            px-3
            font-mono
            text-[11px]
            font-bold
            tracking-[0.12em]
            ${
              riskVisible
                ? "border-amber-400/60 bg-amber-400/15 text-amber-300"
                : "border-cyan-400/20 bg-[#03111c]/90 text-slate-500"
            }
          `}
        >
          RISK
        </button>

        <button
          onClick={() =>
            setIceVisible((value) => !value)
          }
          className={`
            h-11
            rounded-lg
            border
            px-3
            font-mono
            text-[11px]
            font-bold
            tracking-[0.12em]
            ${
              iceVisible
                ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-200"
                : "border-cyan-400/20 bg-[#03111c]/90 text-slate-500"
            }
          `}
        >
          ICE
        </button>
      </div>

      {/* BOTTOM LEFT */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-10
          rounded-lg
          border
          border-cyan-400/20
          bg-[#03111c]/90
          px-4
          py-3
          backdrop-blur-md
        "
      >
        <div className="font-mono text-[12px] font-bold tracking-[0.14em] text-cyan-200">
          66°24′S 76°11′E
        </div>

        <div className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-400">
          BHARATI • MV SAGAR KANYA
        </div>
      </div>

      {/* LEGEND */}

      {showLegend && (
        <div
          className="
            absolute
            bottom-5
            right-5
            z-10
            w-[230px]
            rounded-lg
            border
            border-cyan-400/20
            bg-[#03111c]/90
            p-4
            backdrop-blur-md
          "
        >
          <div className="font-mono text-[11px] font-bold tracking-[0.15em] text-cyan-200">
            ICE CONCENTRATION
          </div>

          <div className="mt-3 h-3 rounded-full bg-linear-to-r from-[#071722] via-[#10a9c4] to-[#d7fbff]" />

          <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-500">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      )}

    </div>
  );
}