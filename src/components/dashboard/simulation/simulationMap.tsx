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

function coordinatesToGeoJSON(
  coordinates: Coordinate[],
): GeoJSON.Feature<GeoJSON.LineString> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates.map((point) => [
        point.lon,
        point.lat,
      ]),
    },
  };
}

function pointToGeoJSON(
  point: Coordinate,
): GeoJSON.Feature<GeoJSON.Point> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [point.lon, point.lat],
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<maplibregl.Map | null>(null);

  const vesselMarkerRef =
    useRef<maplibregl.Marker | null>(null);

  const obstructionMarkerRef =
    useRef<maplibregl.Marker | null>(null);

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
              '&copy; OpenStreetMap contributors &copy; CARTO',
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
       * NORMAL ROUTE
       */
      map.addSource("normal-route", {
        type: "geojson",
        data: coordinatesToGeoJSON(normalRoute),
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
       * ALTERNATIVE ROUTE
       */
      map.addSource("alternative-route", {
        type: "geojson",
        data: coordinatesToGeoJSON(alternativeRoute),
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
        data: pointToGeoJSON(vesselPosition),
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
       * OBSTRUCTION
       */
      map.addSource("obstruction", {
        type: "geojson",
        data: pointToGeoJSON(obstruction),
      });

      map.addLayer({
        id: "obstruction-zone",
        type: "circle",
        source: "obstruction",
        paint: {
          "circle-radius": 28,
          "circle-color": "#ef4444",
          "circle-opacity": 0.10,
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
       * VESSEL LABEL
       */
      map.addLayer({
        id: "vessel-label",
        type: "symbol",
        source: "vessel",
        layout: {
          "text-field": "MV SAGAR KANYA",
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
          "text-field": "BHARATI STATION",
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

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();

      vesselMarkerRef.current?.remove();
      obstructionMarkerRef.current?.remove();

      map.remove();

      mapRef.current = null;
    };
  }, []);

  /*
   * Update vessel position.
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

    source.setData(pointToGeoJSON(vesselPosition));

    /*
     * Keep vessel in view without constantly zooming.
     */
    const center = map.getCenter();

    const distance =
      Math.abs(center.lng - vesselPosition.lon) +
      Math.abs(center.lat - vesselPosition.lat);

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
   * Show obstruction when detected.
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

    if (map.getLayer("obstruction-zone")) {
      map.setLayoutProperty(
        "obstruction-zone",
        "visibility",
        visibility,
      );
    }

    if (map.getLayer("obstruction-point")) {
      map.setLayoutProperty(
        "obstruction-point",
        "visibility",
        visibility,
      );
    }
  }, [phase]);

  /*
   * Switch between normal and alternative route.
   */
  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.isStyleLoaded()) {
      return;
    }

    const alternativeVisible =
      phase === "rerouting" ||
      phase === "accepted";

    if (map.getLayer("alternative-route-line")) {
      map.setLayoutProperty(
        "alternative-route-line",
        "visibility",
        alternativeVisible
          ? "visible"
          : "none",
      );
    }

    if (map.getLayer("normal-route-line")) {
      map.setPaintProperty(
        "normal-route-line",
        "line-opacity",
        alternativeVisible ? 0.12 : 0.45,
      );
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
    >
      {/* MAP STATUS */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-lg border border-cyan-400/20 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

          <span className="font-mono text-[9px] tracking-[0.08em] text-slate-300">
            LIVE GEOINT MAP
          </span>
        </div>

        <p className="mt-1 font-mono text-[8px] text-slate-600">
          Antarctic Navigation Zone
        </p>
      </div>

      {/* COORDINATE DISPLAY */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-lg border border-cyan-400/15 bg-[#020913]/90 px-3 py-2 backdrop-blur-md">
        <p className="font-mono text-[9px] text-cyan-300">
          {Math.abs(vesselPosition.lat).toFixed(2)}°
          {vesselPosition.lat < 0 ? "S" : "N"}{" "}
          {Math.abs(vesselPosition.lon).toFixed(2)}°
          {vesselPosition.lon < 0 ? "W" : "E"}
        </p>
      </div>
    </div>
  );
}