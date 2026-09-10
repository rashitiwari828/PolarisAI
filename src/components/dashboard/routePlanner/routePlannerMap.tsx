import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface RoutePlannerMapProps {
  showRoutes: boolean;
  generating: boolean;
  resultsVisible: boolean;
}

const startPoint: [number, number] = [76.2, -69.4];
const destinationPoint: [number, number] = [11.7, -70.8];

const routeOptimal: [number, number][] = [
  startPoint,
  [69.0, -69.0],
  [58.0, -68.0],
  [47.0, -67.0],
  [36.0, -68.0],
  [25.0, -69.2],
  destinationPoint,
];

const routeFastest: [number, number][] = [
  startPoint,
  [62.0, -68.0],
  [48.0, -69.0],
  [34.0, -69.5],
  [20.0, -70.2],
  destinationPoint,
];

const routeSafest: [number, number][] = [
  startPoint,
  [70.0, -66.0],
  [60.0, -62.0],
  [48.0, -60.0],
  [35.0, -62.0],
  [22.0, -66.0],
  destinationPoint,
];

export default function RoutePlannerMap({
  showRoutes,
  generating,
  resultsVisible,
}: RoutePlannerMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    const style: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: [
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors",
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
          paint: {
            "raster-opacity": 0.72,
          },
        },
      ],
    };

    const instance = new maplibregl.Map({
      container: mapContainer.current,
      style,
      center: [43, -70],
      zoom: 1.85,
      minZoom: 1.2,
      maxZoom: 7,
      attributionControl: true,
    });

    map.current = instance;

    instance.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "top-right",
    );

    instance.on("load", () => {
      instance.addSource("optimal-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeOptimal,
          },
        },
      });

      instance.addSource("fastest-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeFastest,
          },
        },
      });

      instance.addSource("safest-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeSafest,
          },
        },
      });

      instance.addLayer({
        id: "safest-route",
        type: "line",
        source: "safest-route",
        paint: {
          "line-color": "#22c55e",
          "line-width": 3,
          "line-opacity": resultsVisible ? 0.9 : 0,
        },
      });

      instance.addLayer({
        id: "fastest-route",
        type: "line",
        source: "fastest-route",
        paint: {
          "line-color": "#ef4444",
          "line-width": 3,
          "line-opacity": resultsVisible ? 0.9 : 0,
        },
      });

      instance.addLayer({
        id: "optimal-route",
        type: "line",
        source: "optimal-route",
        paint: {
          "line-color": "#22d3ee",
          "line-width": 5,
          "line-opacity": showRoutes && resultsVisible ? 1 : 0,
          "line-blur": 0.3,
        },
      });

      instance.addSource("locations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                type: "start",
                name: "Bharati Research Station",
              },
              geometry: {
                type: "Point",
                coordinates: startPoint,
              },
            },
            {
              type: "Feature",
              properties: {
                type: "destination",
                name: "Maitri Research Station",
              },
              geometry: {
                type: "Point",
                coordinates: destinationPoint,
              },
            },
          ],
        },
      });

      instance.addLayer({
        id: "location-points",
        type: "circle",
        source: "locations",
        paint: {
          "circle-radius": 7,
          "circle-color": "#22d3ee",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      instance.addSource("icebergs", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                name: "A23",
                risk: "HIGH",
              },
              geometry: {
                type: "Point",
                coordinates: [54, -66.2],
              },
            },
            {
              type: "Feature",
              properties: {
                name: "B15",
                risk: "MODERATE",
              },
              geometry: {
                type: "Point",
                coordinates: [44, -67.5],
              },
            },
            {
              type: "Feature",
              properties: {
                name: "C07",
                risk: "LOW",
              },
              geometry: {
                type: "Point",
                coordinates: [31, -64],
              },
            },
          ],
        },
      });

      instance.addLayer({
        id: "iceberg-points",
        type: "circle",
        source: "icebergs",
        paint: {
          "circle-radius": 5,
          "circle-color": [
            "match",
            ["get", "risk"],
            "HIGH",
            "#ef4444",
            "MODERATE",
            "#facc15",
            "#22d3ee",
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#06131f",
        },
      });

      instance.on("click", "iceberg-points", (event) => {
        const feature = event.features?.[0];

        if (!feature || !feature.geometry) return;

        const coordinates = (
          feature.geometry as GeoJSON.Point
        ).coordinates as [number, number];

        new maplibregl.Popup({
          closeButton: true,
          closeOnClick: true,
        })
          .setLngLat(coordinates)
          .setHTML(
            `
              <div style="
                background:#04111d;
                color:#dbeafe;
                padding:10px;
                font-family:monospace;
                border:1px solid rgba(34,211,238,.3);
              ">
                <strong>${feature.properties?.name}</strong>
                <br/>
                <span>${feature.properties?.risk} RISK</span>
              </div>
            `,
          )
          .addTo(instance);
      });

      instance.on("mouseenter", "iceberg-points", () => {
        instance.getCanvas().style.cursor = "pointer";
      });

      instance.on("mouseleave", "iceberg-points", () => {
        instance.getCanvas().style.cursor = "";
      });
    });

    return () => {
      instance.remove();
      map.current = null;
    };
  }, [showRoutes, resultsVisible]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020b16]">
      <div
        ref={mapContainer}
        className={`h-full w-full transition-all duration-700 ${
          generating ? "scale-[1.01] blur-[5px]" : ""
        }`}
      />

      {/* SATELLITE STATUS */}
      <div className="absolute left-4 top-4 z-10 rounded-xl border border-cyan-400/15 bg-[#03111c]/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

          <span className="font-mono text-[10px] tracking-[0.08em] text-slate-400">
            SENTINEL-1 • 18:42 UTC
          </span>
        </div>
      </div>

      {/* ROUTE LEGEND */}
      {resultsVisible && !generating && (
        <div className="absolute right-16 top-4 z-10 rounded-xl border border-cyan-400/15 bg-[#03111c]/90 px-4 py-3 backdrop-blur-md">
          <div className="space-y-2 font-mono text-[9px]">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="h-[2px] w-7 bg-cyan-400" />
              POLARIS Optimal
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="h-[2px] w-7 bg-emerald-400" />
              Safest
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="h-[2px] w-7 bg-red-400" />
              Fastest
            </div>
          </div>
        </div>
      )}

      {/* ANALYSIS OVERLAY */}
      {generating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020913]/55 backdrop-blur-sm">
          <div className="w-[350px] rounded-2xl border border-cyan-400/20 bg-[#04111d]/95 p-8 text-center shadow-[0_0_60px_rgba(0,200,255,0.12)]">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-cyan-400/15 border-t-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]" />

            <h2 className="mt-7 font-mono text-[20px] tracking-[0.08em] text-slate-100">
              ANALYZING ROUTES
            </h2>

            <p className="mt-3 text-[13px] leading-6 text-slate-500">
              Processing satellite data, ice models & weather forecasts...
            </p>

            <div className="mt-6 space-y-3 text-left font-mono text-[11px]">
              <p className="text-emerald-400">
                Satellite imagery... ✓
              </p>

              <p className="text-emerald-400">
                Ice concentration... ✓
              </p>

              <p className="animate-pulse text-cyan-300">
                Iceberg trajectories...
              </p>

              <p className="animate-pulse text-slate-500">
                Weather models...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAP FOOTER */}
      <div className="absolute bottom-4 left-4 z-10 rounded-xl border border-cyan-400/15 bg-[#03111c]/90 px-4 py-3 backdrop-blur-md">
        <p className="font-mono text-[10px] tracking-[0.1em] text-cyan-300">
          66°24′S 76°11′E • BHARATI
        </p>
      </div>
    </div>
  );
}