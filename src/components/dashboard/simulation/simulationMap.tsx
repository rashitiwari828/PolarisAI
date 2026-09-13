import { useEffect, useRef } from "react";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import type {
  Coordinate,
  SimulationPhase,
} from "../../../data/simulationData";

interface SimulationMapProps {
  vesselPosition: Coordinate;
  normalRoute: Coordinate[];
  alternativeRoute: Coordinate[];
  obstruction: Coordinate;
  phase: SimulationPhase;
}

function coordinatesToGeoJSON(coordinates: Coordinate[]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: coordinates.map((point) => [
        point.lon,
        point.lat,
      ]),
    },
  };
}

function pointToGeoJSON(point: Coordinate) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "Point" as const,
      coordinates: [
        point.lon,
        point.lat,
      ],
    },
  };
}

export default function SimulationMap({
  vesselPosition,
  normalRoute,
  alternativeRoute,
  obstruction,
  phase,
}: SimulationMapProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,

      style: {
        version: 8,

        sources: {
          carto: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            ],
            tileSize: 256,
            attribution:
              "&copy; OpenStreetMap contributors &copy; CARTO",
          },
        },

        layers: [
          {
            id: "carto-base",
            type: "raster",
            source: "carto",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },

      center: [
        vesselPosition.lon,
        vesselPosition.lat,
      ],

      zoom: 4.3,
      minZoom: 2,
      maxZoom: 11,
    });

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false,
      }),
      "top-right",
    );

    map.on("load", () => {
      /*
       * NORMAL MISSION ROUTE
       */

      map.addSource("normal-route", {
        type: "geojson",
        data: coordinatesToGeoJSON(
          normalRoute,
        ),
      });

      map.addLayer({
        id: "normal-route-line",
        type: "line",
        source: "normal-route",
        paint: {
          "line-color": "#22d3ee",
          "line-width": 2,
          "line-opacity": 0.45,
          "line-dasharray": [2, 2],
        },
      });

      /*
       * UPDATED MISSION ROUTE
       */

      map.addSource("alternative-route", {
        type: "geojson",
        data: coordinatesToGeoJSON(
          alternativeRoute,
        ),
      });

      map.addLayer({
        id: "alternative-route-line",
        type: "line",
        source: "alternative-route",
        paint: {
          "line-color": "#34d399",
          "line-width": 4,
          "line-opacity": 0.9,
        },
        layout: {
          visibility: "none",
        },
      });

      /*
       * VESSEL
       */

      map.addSource("vessel", {
        type: "geojson",
        data: pointToGeoJSON(
          vesselPosition,
        ),
      });

      map.addLayer({
        id: "vessel-glow",
        type: "circle",
        source: "vessel",
        paint: {
          "circle-radius": 13,
          "circle-color": "#22d3ee",
          "circle-opacity": 0.12,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "vessel-point",
        type: "circle",
        source: "vessel",
        paint: {
          "circle-radius": 5,
          "circle-color": "#67e8f9",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5,
        },
      });

      /*
       * SENTINEL-1 ICE CHANGE LOCATION
       */

      map.addSource("obstruction", {
        type: "geojson",
        data: pointToGeoJSON(
          obstruction,
        ),
      });

      map.addLayer({
        id: "obstruction-zone",
        type: "circle",
        source: "obstruction",
        paint: {
          "circle-radius": 28,
          "circle-color": "#ef4444",
          "circle-opacity": 0.1,
          "circle-stroke-color": "#ef4444",
          "circle-stroke-width": 1.5,
          "circle-stroke-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      });

      map.addLayer({
        id: "obstruction-point",
        type: "circle",
        source: "obstruction",
        paint: {
          "circle-radius": 6,
          "circle-color": "#fb7185",
          "circle-stroke-color": "#fecdd3",
          "circle-stroke-width": 1,
        },
        layout: {
          visibility: "none",
        },
      });

      /*
       * ICE CHANGE LABEL
       */

      map.addLayer({
        id: "obstruction-label",
        type: "symbol",
        source: "obstruction",
        layout: {
          "text-field":
            "SENTINEL-1 ICE CHANGE",
          "text-size": 9,
          "text-offset": [0, -3],
          "text-anchor": "bottom",
          visibility: "none",
        },
        paint: {
          "text-color": "#fb7185",
          "text-halo-color": "#020913",
          "text-halo-width": 1.5,
        },
      });

      /*
       * VESSEL LABEL
       */

      map.addLayer({
        id: "vessel-label",
        type: "symbol",
        source: "vessel",
        layout: {
          "text-field":
            "MV SAGAR KANYA",
          "text-size": 10,
          "text-offset": [0, -2],
          "text-anchor": "bottom",
        },
        paint: {
          "text-color": "#67e8f9",
          "text-halo-color": "#020913",
          "text-halo-width": 1.5,
        },
      });

      /*
       * SCIENTIFIC WAYPOINT WP-02
       */

      map.addSource("wp02", {
        type: "geojson",
        data: pointToGeoJSON({
          lat: -67.15,
          lon: 76.9,
        }),
      });

      map.addLayer({
        id: "wp02-point",
        type: "circle",
        source: "wp02",
        paint: {
          "circle-radius": 5,
          "circle-color": "#fbbf24",
          "circle-stroke-color": "#fef3c7",
          "circle-stroke-width": 1,
        },
      });

      map.addLayer({
        id: "wp02-label",
        type: "symbol",
        source: "wp02",
        layout: {
          "text-field":
            "WP-02 • OCEANOGRAPHIC SURVEY",
          "text-size": 8,
          "text-offset": [0, 2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#fbbf24",
          "text-halo-color": "#020913",
          "text-halo-width": 1,
        },
      });

      /*
       * DESTINATION
       */

      map.addSource("destination", {
        type: "geojson",
        data: pointToGeoJSON({
          lat: -68.05,
          lon: 77.85,
        }),
      });

      map.addLayer({
        id: "destination-point",
        type: "circle",
        source: "destination",
        paint: {
          "circle-radius": 5,
          "circle-color": "#34d399",
          "circle-stroke-color": "#d1fae5",
          "circle-stroke-width": 1,
        },
      });

      map.addLayer({
        id: "destination-label",
        type: "symbol",
        source: "destination",
        layout: {
          "text-field":
            "BHARATI STATION",
          "text-size": 9,
          "text-offset": [0, 1.8],
        },
        paint: {
          "text-color": "#34d399",
          "text-halo-color": "#020913",
          "text-halo-width": 1,
        },
      });
    });

    mapRef.current = map;

    const resizeObserver =
      new ResizeObserver(() => {
        map.resize();
      });

    resizeObserver.observe(
      containerRef.current,
    );

    return () => {
      resizeObserver.disconnect();

      map.remove();

      mapRef.current = null;
    };
  }, []);

  /*
   * UPDATE VESSEL POSITION
   */

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.isStyleLoaded()) {
      return;
    }

    const source = map.getSource(
      "vessel",
    ) as maplibregl.GeoJSONSource | undefined;

    if (!source) {
      return;
    }

    source.setData(
      pointToGeoJSON(
        vesselPosition,
      ),
    );

    const center = map.getCenter();

    const distance =
      Math.abs(
        center.lng -
          vesselPosition.lon,
      ) +
      Math.abs(
        center.lat -
          vesselPosition.lat,
      );

    if (distance > 4) {
      map.easeTo({
        center: [
          vesselPosition.lon,
          vesselPosition.lat,
        ],
        duration: 900,
        essential: true,
      });
    }
  }, [vesselPosition]);

  /*
   * SENTINEL-1 ICE CHANGE VISIBILITY
   */

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.isStyleLoaded()) {
      return;
    }

    const visible =
      phase === "obstruction" ||
      phase === "analyzing" ||
      phase === "rerouting" ||
      phase === "accepted";

    const visibility = visible
      ? "visible"
      : "none";

    const layers = [
      "obstruction-zone",
      "obstruction-point",
      "obstruction-label",
    ];

    layers.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(
          layerId,
          "visibility",
          visibility,
        );
      }
    });
  }, [phase]);

  /*
   * ROUTE SWITCHING
   */

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.isStyleLoaded()) {
      return;
    }

    const alternativeVisible =
      phase === "rerouting" ||
      phase === "accepted";

    if (
      map.getLayer(
        "alternative-route-line",
      )
    ) {
      map.setLayoutProperty(
        "alternative-route-line",
        "visibility",
        alternativeVisible
          ? "visible"
          : "none",
      );
    }

    if (
      map.getLayer(
        "normal-route-line",
      )
    ) {
      map.setPaintProperty(
        "normal-route-line",
        "line-opacity",
        alternativeVisible
          ? 0.12
          : 0.45,
      );
    }
  }, [phase]);

  const missionStatus =
    phase === "accepted"
      ? "MISSION PLAN ACCEPTED"
      : phase === "rerouting"
        ? "NEW MISSION PLAN"
        : phase === "analyzing"
          ? "MISSION RE-EVALUATION"
          : phase === "obstruction"
            ? "MISSION IMPACT DETECTED"
            : "MISSION IN PROGRESS";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
    >
      {/* MAP STATUS */}

      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-lg border border-cyan-400/20 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              phase === "obstruction"
                ? "bg-rose-400 shadow-[0_0_10px_#fb7185]"
                : phase === "analyzing"
                  ? "bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                  : "bg-emerald-400 shadow-[0_0_10px_#34d399]"
            }`}
          />

          <span className="font-mono text-[9px] tracking-[0.08em] text-slate-300">
            LIVE GEOINT MAP
          </span>
        </div>

        <p className="mt-1 font-mono text-[8px] text-cyan-400/80">
          {missionStatus}
        </p>

        <p className="mt-0.5 font-mono text-[8px] text-slate-600">
          Sentinel-1 SAR • Antarctic
          Navigation Zone
        </p>
      </div>

      {/* CURRENT MISSION */}

      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-lg border border-cyan-400/15 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
        <p className="font-mono text-[8px] tracking-[0.1em] text-slate-600">
          CURRENT MISSION
        </p>

        <p className="mt-1 font-mono text-[10px] text-slate-300">
          ANTARCTIC SCIENTIFIC SURVEY
        </p>

        <div className="mt-2 flex gap-2">
          <span className="rounded border border-emerald-400/20 bg-emerald-400/[0.05] px-2 py-1 font-mono text-[8px] text-emerald-300">
            2 MANDATORY
          </span>

          <span
            className={`rounded border px-2 py-1 font-mono text-[8px] ${
              phase === "accepted"
                ? "border-slate-600 bg-slate-800/30 text-slate-500"
                : "border-amber-400/20 bg-amber-400/[0.05] text-amber-300"
            }`}
          >
            {phase === "accepted"
              ? "WP-03 SKIPPED"
              : "1 OPTIONAL"}
          </span>
        </div>
      </div>

      {/* COORDINATES */}

      <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-lg border border-cyan-400/15 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
        <p className="font-mono text-[9px] text-cyan-300">
          {Math.abs(
            vesselPosition.lat,
          ).toFixed(2)}
          °
          {vesselPosition.lat < 0
            ? "S"
            : "N"}{" "}
          {Math.abs(
            vesselPosition.lon,
          ).toFixed(2)}
          °
          {vesselPosition.lon < 0
            ? "W"
            : "E"}
        </p>
      </div>

      {/* SENTINEL-1 ALERT */}

      {(phase === "obstruction" ||
        phase === "analyzing" ||
        phase === "rerouting" ||
        phase === "accepted") && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-lg border border-rose-400/20 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
          <p className="font-mono text-[8px] tracking-[0.08em] text-rose-300">
            SENTINEL-1 ALERT
          </p>

          <p className="mt-1 font-mono text-[9px] text-slate-400">
            Ice change detected near
            WP-02
          </p>

          <p className="mt-1 font-mono text-[8px] text-slate-600">
            Mission impact assessment
            active
          </p>
        </div>
      )}
    </div>
  );
}