import { useEffect, useRef } from "react";

import {
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import { icebergData } from "../../../data/icebergData";
import { routeData } from "../../../data/routeData";
import { seaIceData } from "../../../data/seaIceData";

interface MissionMapProps {
  showIcebergs: boolean;
  showSeaIce: boolean;
  showRoute: boolean;
}

export default function MissionMap({
  showIcebergs,
  showSeaIce,
  showRoute,
}: MissionMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const vesselMarker = useRef<Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) {
      return;
    }

    /*
     * -------------------------------------------------------
     * MAPLIBRE MAP
     * -------------------------------------------------------
     */

    const map = new Map({
      container: mapContainer.current,

      style: {
        version: 8,

        sources: {
          satellite: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            attribution: "Esri World Imagery",
          },
        },

        layers: [
          {
            id: "satellite-layer",
            type: "raster",
            source: "satellite",

            paint: {
              "raster-opacity": 0.78,
              "raster-contrast": 0.12,
              "raster-saturation": -0.35,
              "raster-brightness-min": 0,
              "raster-brightness-max": 0.75,
            },
          },
        ],
      },

      /*
       * Antarctic operational view
       */
      center: [76.18, -66.4],

      zoom: 4.8,

      minZoom: 2,

      maxZoom: 12,
    });

    mapRef.current = map;

    /*
     * -------------------------------------------------------
     * MAP CONTROLS
     * -------------------------------------------------------
     */

    map.addControl(
      new NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "bottom-right"
    );

    /*
     * -------------------------------------------------------
     * MAP LOAD
     * -------------------------------------------------------
     */

    map.on("load", () => {
      /*
       * =====================================================
       * SEA ICE
       * =====================================================
       */

      if (!map.getSource("sea-ice")) {
        map.addSource("sea-ice", {
          type: "geojson",
          data: seaIceData as any,
        });
      }

      if (!map.getLayer("sea-ice-fill")) {
        map.addLayer({
          id: "sea-ice-fill",
          type: "fill",
          source: "sea-ice",

          layout: {
            visibility: showSeaIce ? "visible" : "none",
          },

          paint: {
            "fill-color": "#36d9ff",
            "fill-opacity": 0.16,
          },
        });
      }

      if (!map.getLayer("sea-ice-outline")) {
        map.addLayer({
          id: "sea-ice-outline",
          type: "line",
          source: "sea-ice",

          layout: {
            visibility: showSeaIce ? "visible" : "none",
          },

          paint: {
            "line-color": "#5ee7ff",
            "line-width": 1,
            "line-opacity": 0.5,
            "line-dasharray": [2, 2],
          },
        });
      }

      /*
       * =====================================================
       * ROUTE
       * =====================================================
       */

      if (!map.getSource("mission-route")) {
        map.addSource("mission-route", {
          type: "geojson",

          data: {
            type: "Feature",
            properties: {},

            geometry: {
              type: "LineString",

              coordinates: routeData.map((point) => [
                point.longitude,
                point.latitude,
              ]),
            },
          },
        });
      }

      /*
       * Route glow
       */

      if (!map.getLayer("route-glow")) {
        map.addLayer({
          id: "route-glow",
          type: "line",
          source: "mission-route",

          layout: {
            visibility: showRoute ? "visible" : "none",
          },

          paint: {
            "line-color": "#00e5ff",
            "line-width": 8,
            "line-opacity": 0.16,
            "line-blur": 3,
          },
        });
      }

      /*
       * Main route
       */

      if (!map.getLayer("route-line")) {
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "mission-route",

          layout: {
            visibility: showRoute ? "visible" : "none",
          },

          paint: {
            "line-color": "#00e5ff",
            "line-width": 2.5,
            "line-opacity": 0.95,
            "line-dasharray": [2, 2],
          },
        });
      }

      /*
       * =====================================================
       * ICEBERGS
       * =====================================================
       */

      if (!map.getSource("icebergs")) {
        map.addSource("icebergs", {
          type: "geojson",

          data: {
            type: "FeatureCollection",

            features: icebergData.map((iceberg) => ({
              type: "Feature",

              properties: {
                id: iceberg.id,
                size: iceberg.size,
                risk: iceberg.risk,
              },

              geometry: {
                type: "Point",

                coordinates: [
                  iceberg.longitude,
                  iceberg.latitude,
                ],
              },
            })),
          },
        });
      }

      /*
       * Iceberg glow
       */

      if (!map.getLayer("iceberg-glow")) {
        map.addLayer({
          id: "iceberg-glow",
          type: "circle",
          source: "icebergs",

          layout: {
            visibility: showIcebergs ? "visible" : "none",
          },

          paint: {
            "circle-radius": 14,

            "circle-color": [
              "match",
              ["get", "risk"],

              "HIGH",
              "#ff304f",

              "MODERATE",
              "#ff9d00",

              "#00d9ff",
            ],

            "circle-opacity": 0.2,
            "circle-blur": 0.8,
          },
        });
      }

      /*
       * Iceberg points
       */

      if (!map.getLayer("iceberg-points")) {
        map.addLayer({
          id: "iceberg-points",
          type: "circle",
          source: "icebergs",

          layout: {
            visibility: showIcebergs ? "visible" : "none",
          },

          paint: {
            "circle-radius": 5,

            "circle-color": [
              "match",
              ["get", "risk"],

              "HIGH",
              "#ff304f",

              "MODERATE",
              "#ff9d00",

              "#00d9ff",
            ],

            "circle-stroke-color": "#dffaff",

            "circle-stroke-width": 1,

            "circle-opacity": 0.95,
          },
        });
      }

      /*
       * =====================================================
       * ICEBERG POPUP
       * =====================================================
       */

      map.on(
        "click",
        "iceberg-points",
        (event) => {
          const feature = event.features?.[0];

          if (!feature) {
            return;
          }

          const geometry = feature.geometry as any;

          const coordinates = geometry.coordinates.slice();

          const properties = feature.properties;

          new Popup({
            closeButton: true,
            closeOnClick: true,
            className: "mission-popup",
          })
            .setLngLat(coordinates)
            .setHTML(`
              <div
                style="
                  padding: 10px;
                  min-width: 150px;
                  background: #06121d;
                  color: #dffaff;
                  font-family: monospace;
                "
              >
                <div
                  style="
                    color: #00e5ff;
                    font-weight: bold;
                    margin-bottom: 8px;
                  "
                >
                  ICEBERG ${properties?.id ?? ""}
                </div>

                <div style="margin-bottom: 5px;">
                  SIZE:
                  <strong>
                    ${properties?.size ?? "-"} km
                  </strong>
                </div>

                <div>
                  RISK:
                  <strong>
                    ${properties?.risk ?? "-"}
                  </strong>
                </div>
              </div>
            `)
            .addTo(map);
        }
      );

      map.on(
        "mouseenter",
        "iceberg-points",
        () => {
          map.getCanvas().style.cursor = "pointer";
        }
      );

      map.on(
        "mouseleave",
        "iceberg-points",
        () => {
          map.getCanvas().style.cursor = "";
        }
      );
    });

    /*
     * -------------------------------------------------------
     * VESSEL MARKER
     * -------------------------------------------------------
     */

    const vesselElement = document.createElement("div");

    vesselElement.className = "vessel-marker";

    vesselElement.innerHTML = `
      <div
        style="
          position: relative;
          width: 120px;
          height: 90px;
          pointer-events: none;
        "
      >

        <div
          style="
            position: absolute;
            left: 7px;
            top: 8px;
            width: 14px;
            height: 14px;
            border: 1px solid rgba(0,229,255,0.5);
            border-radius: 9999px;
            box-shadow:
              0 0 0 6px rgba(0,229,255,0.08),
              0 0 18px rgba(0,229,255,0.35);
          "
        ></div>

        <div
          style="
            position: absolute;
            left: 10px;
            top: 10px;
            color: white;
            font-size: 12px;
          "
        >
          ▲
        </div>

        <div
          style="
            position: absolute;
            left: 0;
            top: 32px;
            color: white;
            font-family: monospace;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            text-shadow: 0 1px 8px #000;
          "
        >
          MV SAGAR KANYA
        </div>

      </div>
    `;

    const marker = new Marker({
      element: vesselElement,
      anchor: "center",
    })
      .setLngLat([76.18, -66.4])
      .addTo(map);

    vesselMarker.current = marker;

    /*
     * -------------------------------------------------------
     * CLEANUP
     * -------------------------------------------------------
     */

    return () => {
      vesselMarker.current?.remove();

      vesselMarker.current = null;

      map.remove();

      mapRef.current = null;
    };
  }, []);

  /*
   * -------------------------------------------------------
   * TOGGLE MAP LAYERS
   * -------------------------------------------------------
   */

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const updateVisibility = (
      layerId: string,
      visible: boolean
    ) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(
          layerId,
          "visibility",
          visible ? "visible" : "none"
        );
      }
    };

    updateVisibility(
      "iceberg-points",
      showIcebergs
    );

    updateVisibility(
      "iceberg-glow",
      showIcebergs
    );

    updateVisibility(
      "sea-ice-fill",
      showSeaIce
    );

    updateVisibility(
      "sea-ice-outline",
      showSeaIce
    );

    updateVisibility(
      "route-line",
      showRoute
    );

    updateVisibility(
      "route-glow",
      showRoute
    );
  }, [
    showIcebergs,
    showSeaIce,
    showRoute,
  ]);

  /*
   * -------------------------------------------------------
   * UI
   *
   * IMPORTANT:
   * Only TWO overlays are intentionally displayed:
   * 1. Sentinel live badge
   * 2. Coordinates
   *
   * No duplicate satellite text.
   * No MAP LAYERS text.
   * No extra N text.
   * -------------------------------------------------------
   */

  return (
    <div
      className="
        relative
        h-full
        min-h-0
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-cyan-400/20
        bg-[#020b14]
      "
    >
      {/* MAP */}

      <div
        ref={mapContainer}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      {/* SENTINEL-1 LIVE BADGE */}

      <div
        className="
          absolute
          left-5
          top-5
          z-20
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-cyan-400/20
          bg-[#03121e]/90
          px-4
          py-2.5
          font-mono
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-cyan-300
          shadow-[0_0_20px_rgba(0,229,255,0.08)]
          backdrop-blur-md
        "
      >
        <span
          className="
            h-2
            w-2
            animate-pulse
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(16,185,129,0.9)]
          "
        />

        SENTINEL-1 • LIVE
      </div>

      {/* COORDINATES */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-20
          rounded-xl
          border
          border-cyan-400/20
          bg-[#03121e]/90
          px-4
          py-3
          font-mono
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-cyan-300
          shadow-[0_0_20px_rgba(0,229,255,0.08)]
          backdrop-blur-md
        "
      >
        66°24′S&nbsp;&nbsp;76°11′E
        <span className="mx-2 text-slate-600">
          •
        </span>
        BHARATI
        <span className="mx-2 text-slate-600">
          •
        </span>
        ETA 61h
      </div>
    </div>
  );
}