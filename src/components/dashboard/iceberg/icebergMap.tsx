import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { icebergTrackerData } from "../../../data/icebergTrackerData";

interface IcebergMapProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function IcebergMap({
  selectedId,
  onSelect,
}: IcebergMapProps) {
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
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },

      center: [20, -72],
      zoom: 2.25,

      minZoom: 1.3,
      maxZoom: 8,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false,
      }),
      "top-right",
    );

    map.on("load", () => {
      // -----------------------------------------------------
      // Antarctic operational region
      // -----------------------------------------------------

      map.addSource("antarctic-zone", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[
              [-180, -55],
              [-180, -90],
              [180, -90],
              [180, -55],
              [-180, -55],
            ]],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: "antarctic-zone-fill",
        type: "fill",
        source: "antarctic-zone",
        paint: {
          "fill-color": "#061c2b",
          "fill-opacity": 0.28,
        },
      });

      // -----------------------------------------------------
      // Iceberg markers
      // -----------------------------------------------------

      icebergTrackerData.forEach((iceberg) => {
        const el = document.createElement("button");

        el.type = "button";

        const isSelected = iceberg.id === selectedId;

        el.style.width = isSelected ? "34px" : "27px";
        el.style.height = isSelected ? "34px" : "27px";
        el.style.borderRadius = "50%";
        el.style.border = isSelected
          ? "2px solid #ffffff"
          : "2px solid #22d3ee";

        el.style.background =
          iceberg.risk === "HIGH"
            ? "rgba(239,68,68,0.85)"
            : iceberg.risk === "MODERATE"
              ? "rgba(250,204,21,0.85)"
              : "rgba(34,211,238,0.85)";

        el.style.boxShadow =
          iceberg.id === selectedId
            ? "0 0 0 7px rgba(34,211,238,0.18), 0 0 25px rgba(34,211,238,0.75)"
            : "0 0 16px rgba(34,211,238,0.45)";

        el.style.cursor = "pointer";

        el.setAttribute(
          "aria-label",
          `Track iceberg ${iceberg.id}`,
        );

        const marker = new maplibregl.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([
            iceberg.longitude,
            iceberg.latitude,
          ])
          .addTo(map);

        el.addEventListener("click", () => {
          onSelect(iceberg.id);

          map.flyTo({
            center: [
              iceberg.longitude,
              iceberg.latitude,
            ],
            zoom: 4.5,
            duration: 900,
          });
        });

        // ---------------------------------------------------
        // Label
        // ---------------------------------------------------

        const label = document.createElement("div");

        label.textContent = iceberg.id;

        label.style.position = "absolute";
        label.style.left = "22px";
        label.style.top = "-8px";
        label.style.padding = "3px 7px";
        label.style.border = "1px solid rgba(34,211,238,0.25)";
        label.style.borderRadius = "5px";
        label.style.background = "rgba(2,9,19,0.88)";
        label.style.color = "#cbd5e1";
        label.style.fontFamily = "monospace";
        label.style.fontSize = "11px";
        label.style.letterSpacing = "0.08em";
        label.style.whiteSpace = "nowrap";
        label.style.pointerEvents = "none";

        el.appendChild(label);

        // Prevent unused marker warning from becoming an issue
        void marker;
      });

      // -----------------------------------------------------
      // Vessel marker
      // -----------------------------------------------------

      const vessel = document.createElement("div");

      vessel.style.width = "18px";
      vessel.style.height = "18px";
      vessel.style.borderRadius = "50%";
      vessel.style.background = "#22d3ee";
      vessel.style.border = "3px solid #020913";
      vessel.style.boxShadow =
        "0 0 0 5px rgba(34,211,238,0.18), 0 0 20px rgba(34,211,238,0.9)";

      new maplibregl.Marker({
        element: vessel,
      })
        .setLngLat([20.81, -60.42])
        .setPopup(
          new maplibregl.Popup({
            offset: 12,
          }).setHTML(`
            <div style="
              font-family: monospace;
              font-size: 12px;
              color: #0f172a;
            ">
              <strong>MV SAGAR KANYA</strong><br/>
              Current vessel position
            </div>
          `),
        )
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [selectedId, onSelect]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainer}
        className="absolute inset-0"
      />

      {/* MAP STATUS */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-10
          rounded-lg
          border
          border-cyan-400/20
          bg-[#020913]/90
          px-4
          py-3
          backdrop-blur-md
        "
      >
        <p
          className="
            font-mono
            text-[11px]
            tracking-[0.12em]
            text-cyan-300
          "
        >
          ANTARCTIC ICEBERG TRACKING
        </p>

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            text-slate-500
          "
        >
          {icebergTrackerData.length} TRACKED OBJECTS
        </p>
      </div>
    </div>
  );
}