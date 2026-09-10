import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const stations = [
  {
    name: "BHARATI",
    latitude: -69.4,
    longitude: 76.2,
  },
  {
    name: "MAITRI",
    latitude: -70.76,
    longitude: 11.73,
  },
  {
    name: "MCMURDO",
    latitude: -77.84,
    longitude: 166.67,
  },
  {
    name: "CASEY",
    latitude: -66.28,
    longitude: 110.53,
  },
];

const windArrows = [
  { latitude: -66.8, longitude: 62, rotation: 40 },
  { latitude: -68.2, longitude: 68, rotation: 20 },
  { latitude: -69.3, longitude: 72, rotation: 55 },
  { latitude: -70.1, longitude: 79, rotation: 30 },
  { latitude: -67.6, longitude: 82, rotation: 65 },
  { latitude: -71.2, longitude: 87, rotation: 15 },
];

export default function WeatherOceanMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
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
              "raster-opacity": 0.12,
              "raster-brightness-max": 0.25,
              "raster-saturation": -1,
            },
          },
        ],
      },
      center: [75, -70],
      zoom: 2.2,
      minZoom: 1.5,
      maxZoom: 7,
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
        showZoom: true,
        visualizePitch: false,
      }),
      "top-right",
    );

    map.on("load", () => {
      /*
       * ------------------------------------------------------
       * ANTARCTIC SEA-ICE AREA
       * ------------------------------------------------------
       */

      map.addSource("sea-ice", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[
              [20, -64],
              [45, -66],
              [70, -65],
              [95, -67],
              [120, -65],
              [145, -67],
              [170, -70],
              [165, -74],
              [135, -76],
              [100, -75],
              [70, -76],
              [40, -73],
              [20, -64],
            ]],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: "sea-ice-fill",
        type: "fill",
        source: "sea-ice",
        paint: {
          "fill-color": "#42c6e8",
          "fill-opacity": 0.09,
        },
      });

      map.addLayer({
        id: "sea-ice-outline",
        type: "line",
        source: "sea-ice",
        paint: {
          "line-color": "#22d3ee",
          "line-opacity": 0.25,
          "line-width": 1,
        },
      });

      /*
       * ------------------------------------------------------
       * PRESSURE / WEATHER RISK ZONE
       * ------------------------------------------------------
       */

      map.addSource("pressure-zone", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [70, -66.5],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: "pressure-zone",
        type: "circle",
        source: "pressure-zone",
        paint: {
          "circle-radius": 90,
          "circle-color": "#f59e0b",
          "circle-opacity": 0.06,
          "circle-stroke-color": "#f59e0b",
          "circle-stroke-opacity": 0.18,
          "circle-stroke-width": 1,
        },
      });

      /*
       * ------------------------------------------------------
       * STATION MARKERS
       * ------------------------------------------------------
       */

      stations.forEach((station) => {
        const el = document.createElement("div");

        el.style.width = "11px";
        el.style.height = "11px";
        el.style.border = "2px solid #22d3ee";
        el.style.background = "#061522";
        el.style.transform = "rotate(45deg)";
        el.style.boxShadow = "0 0 10px rgba(34,211,238,0.55)";

        const popup = new maplibregl.Popup({
          offset: 12,
          closeButton: false,
        }).setHTML(`
          <div style="
            background:#04111d;
            color:#cbd5e1;
            padding:10px 12px;
            border:1px solid rgba(34,211,238,.25);
            font-family:monospace;
            font-size:11px;
          ">
            <strong style="color:#22d3ee">${station.name}</strong>
            <br/>
            <span>
              ${Math.abs(station.latitude).toFixed(1)}°S
              ${Math.abs(station.longitude).toFixed(1)}°E
            </span>
          </div>
        `);

        new maplibregl.Marker({
          element: el,
        })
          .setLngLat([station.longitude, station.latitude])
          .setPopup(popup)
          .addTo(map);

        const label = document.createElement("div");

        label.innerText = station.name;
        label.style.color = "#22d3ee";
        label.style.fontFamily = "monospace";
        label.style.fontSize = "8px";
        label.style.marginLeft = "12px";
        label.style.marginTop = "-3px";
        label.style.whiteSpace = "nowrap";

        new maplibregl.Marker({
          element: label,
          anchor: "left",
        })
          .setLngLat([station.longitude, station.latitude])
          .addTo(map);
      });

      /*
       * ------------------------------------------------------
       * VESSEL
       * ------------------------------------------------------
       */

      const vessel = document.createElement("div");

      vessel.innerHTML = `
        <div style="
          width:15px;
          height:15px;
          border-radius:50%;
          background:#22d3ee;
          border:2px solid #e0f2fe;
          box-shadow:
            0 0 0 5px rgba(34,211,238,.12),
            0 0 22px rgba(34,211,238,.9);
        "></div>
      `;

      new maplibregl.Marker({
        element: vessel,
      })
        .setLngLat([72.8, -68.2])
        .setPopup(
          new maplibregl.Popup({
            offset: 14,
            closeButton: false,
          }).setHTML(`
            <div style="
              background:#04111d;
              color:#cbd5e1;
              padding:10px 12px;
              border:1px solid rgba(34,211,238,.3);
              font-family:monospace;
              font-size:11px;
            ">
              <strong style="color:#22d3ee">
                MV SAGAR KANYA
              </strong>
              <br/>
              Wind: 24 kn NE
              <br/>
              Ocean Current: 1.2 kn E
            </div>
          `),
        )
        .addTo(map);

      /*
       * ------------------------------------------------------
       * WIND / CURRENT ARROWS
       * ------------------------------------------------------
       */

      windArrows.forEach((arrow) => {
        const el = document.createElement("div");

        el.innerHTML = `
          <div style="
            color:#22d3ee;
            font-size:17px;
            transform:rotate(${arrow.rotation}deg);
            opacity:.72;
            text-shadow:0 0 8px rgba(34,211,238,.55);
          ">
            ➜
          </div>
        `;

        new maplibregl.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([arrow.longitude, arrow.latitude])
          .addTo(map);
      });

      /*
       * ------------------------------------------------------
       * MAP LABEL
       * ------------------------------------------------------
       */

      const info = document.createElement("div");

      info.innerHTML = `
        <div style="
          background:rgba(4,17,29,.92);
          border:1px solid rgba(34,211,238,.18);
          border-radius:10px;
          padding:10px 12px;
          color:#64748b;
          font-family:monospace;
          font-size:9px;
          line-height:1.7;
        ">
          <div style="color:#22d3ee">
            WEATHER / OCEAN LAYERS
          </div>
          <div>◆ Research Station</div>
          <div>● Vessel</div>
          <div>➜ Wind / Current</div>
          <div style="color:#67e8f9">
            Sea-Ice Coverage
          </div>
        </div>
      `;

      info.style.position = "absolute";
      info.style.left = "18px";
      info.style.bottom = "18px";
      info.style.zIndex = "10";

      map.getContainer().appendChild(info);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020913]">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Polar grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.08]" />

        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.06]" />

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.05]" />

        <div className="absolute left-1/2 top-1/2 h-px w-[650px] -translate-x-1/2 bg-cyan-400/[0.06]" />

        <div className="absolute left-1/2 top-1/2 h-[650px] w-px -translate-y-1/2 bg-cyan-400/[0.06]" />
      </div>

      {/* Map title */}
      <div className="absolute left-5 top-5 z-20">
        <div className="rounded-lg border border-cyan-400/15 bg-[#04111d]/90 px-3 py-2 backdrop-blur">
          <p className="font-mono text-[9px] tracking-[0.15em] text-cyan-300">
            ANTARCTIC ENVIRONMENTAL MAP
          </p>
          <p className="mt-1 font-mono text-[8px] text-slate-600">
            WIND • CURRENT • ICE • PRESSURE
          </p>
        </div>
      </div>

      {/* Current conditions */}
      <div className="absolute bottom-5 right-5 z-20 rounded-lg border border-cyan-400/15 bg-[#04111d]/90 px-4 py-3 backdrop-blur">
        <p className="font-mono text-[8px] tracking-[0.12em] text-slate-600">
          VESSEL POSITION
        </p>

        <p className="mt-1 font-mono text-[11px] text-cyan-300">
          68°12′S 72°48′E
        </p>

        <p className="mt-1 font-mono text-[8px] text-slate-500">
          BHARATI ETA 61H
        </p>
      </div>
    </div>
  );
}