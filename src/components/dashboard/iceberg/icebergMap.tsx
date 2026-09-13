import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { icebergTrackerData } from "../../../data/icebergTrackerData";

interface IcebergMapProps {
  selectedId: string;
  onSelect: (id: string) => void;
  selectedHorizon: 6 | 12 | 24 | 48;
}

export default function IcebergMap({
  selectedId,
  onSelect,
  selectedHorizon,
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
            coordinates: [
              [
                [-180, -55],
                [-180, -90],
                [180, -90],
                [180, -55],
                [-180, -55],
              ],
            ],
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

        el.style.boxShadow = isSelected
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
        // Iceberg label
        // ---------------------------------------------------

        const label = document.createElement("div");

        label.textContent = iceberg.id;

        label.style.position = "absolute";
        label.style.left = "22px";
        label.style.top = "-8px";
        label.style.padding = "3px 7px";
        label.style.border =
          "1px solid rgba(34,211,238,0.25)";
        label.style.borderRadius = "5px";
        label.style.background = "rgba(2,9,19,0.88)";
        label.style.color = "#cbd5e1";
        label.style.fontFamily = "monospace";
        label.style.fontSize = "11px";
        label.style.letterSpacing = "0.08em";
        label.style.whiteSpace = "nowrap";
        label.style.pointerEvents = "none";

        el.appendChild(label);

        void marker;
      });

      // -----------------------------------------------------
      // Selected iceberg trajectory
      // -----------------------------------------------------

      const selectedIceberg = icebergTrackerData.find(
        (iceberg) => iceberg.id === selectedId,
      );

      if (
        selectedIceberg &&
        selectedIceberg.trajectory.length > 0
      ) {
        /*
         * MapLibre expects GeoJSON coordinates as:
         * [longitude, latitude]
         *
         * These coordinates come directly from the trajectory
         * prediction data. The frontend does not calculate them.
         */

        const trajectoryCoordinates: [number, number][] = [];

        // Current iceberg position

        trajectoryCoordinates.push([
          selectedIceberg.longitude,
          selectedIceberg.latitude,
        ]);

        // Backend prediction positions

        selectedIceberg.trajectory.forEach((prediction) => {
          trajectoryCoordinates.push([
            prediction.predicted_longitude,
            prediction.predicted_latitude,
          ]);
        });

        // ---------------------------------------------------
        // Trajectory line
        // ---------------------------------------------------

        map.addSource("selected-iceberg-trajectory", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: trajectoryCoordinates,
            },
            properties: {
              iceberg_id: selectedIceberg.id,
            },
          },
        });

        map.addLayer({
          id: "selected-iceberg-trajectory-line",
          type: "line",
          source: "selected-iceberg-trajectory",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#f87171",
            "line-width": 3,
            "line-opacity": 0.85,
            "line-dasharray": [2, 2],
          },
        });

        // ---------------------------------------------------
        // Predicted positions
        // ---------------------------------------------------

        selectedIceberg.trajectory.forEach(
          (prediction) => {
            const isSelectedHorizon =
              prediction.horizon_hours === selectedHorizon;

            const pointElement =
              document.createElement("button");

            pointElement.type = "button";

            pointElement.style.width =
              isSelectedHorizon ? "22px" : "14px";

            pointElement.style.height =
              isSelectedHorizon ? "22px" : "14px";

            pointElement.style.borderRadius = "50%";

            pointElement.style.border =
              isSelectedHorizon
                ? "3px solid #020913"
                : "2px solid #020913";

            pointElement.style.background =
              isSelectedHorizon
                ? "#facc15"
                : "#f87171";

            pointElement.style.boxShadow =
              isSelectedHorizon
                ? "0 0 0 7px rgba(250,204,21,0.18), 0 0 25px rgba(250,204,21,0.95)"
                : "0 0 14px rgba(248,113,113,0.85)";

            pointElement.style.cursor = "pointer";

            pointElement.setAttribute(
              "aria-label",
              `${selectedIceberg.id} predicted position +${prediction.horizon_hours}H`,
            );

            const uncertaintyText =
              prediction.uncertainty_km === null
                ? "Not available"
                : `${prediction.uncertainty_km.toFixed(1)} km`;

            const popup =
              new maplibregl.Popup({
                offset: 12,
              }).setHTML(`
                <div style="
                  font-family: monospace;
                  font-size: 11px;
                  color: #0f172a;
                  min-width: 190px;
                  line-height: 1.6;
                ">
                  <strong>
                    ${selectedIceberg.id} · +${prediction.horizon_hours}H
                  </strong>

                  <br/>

                  LAT:
                  ${prediction.predicted_latitude.toFixed(2)}°S

                  <br/>

                  LON:
                  ${prediction.predicted_longitude.toFixed(2)}°E

                  <br/>

                  METHOD:
                  ${prediction.prediction_method}

                  <br/>

                  UNCERTAINTY:
                  ${uncertaintyText}

                  <br/>

                  TIME:
                  ${prediction.prediction_time}
                </div>
              `);

            new maplibregl.Marker({
              element: pointElement,
              anchor: "center",
            })
              .setLngLat([
                prediction.predicted_longitude,
                prediction.predicted_latitude,
              ])
              .setPopup(popup)
              .addTo(map);
          },
        );

        // ---------------------------------------------------
        // Current iceberg position
        // ---------------------------------------------------

        const currentElement =
          document.createElement("div");

        currentElement.style.width = "17px";
        currentElement.style.height = "17px";
        currentElement.style.borderRadius = "50%";
        currentElement.style.background = "#22d3ee";
        currentElement.style.border =
          "3px solid #020913";

        currentElement.style.boxShadow =
          "0 0 0 5px rgba(34,211,238,0.18), 0 0 20px rgba(34,211,238,0.9)";

        new maplibregl.Marker({
          element: currentElement,
          anchor: "center",
        })
          .setLngLat([
            selectedIceberg.longitude,
            selectedIceberg.latitude,
          ])
          .setPopup(
            new maplibregl.Popup({
              offset: 12,
            }).setHTML(`
              <div style="
                font-family: monospace;
                font-size: 11px;
                color: #0f172a;
                line-height: 1.6;
              ">
                <strong>
                  ${selectedIceberg.id} · CURRENT
                </strong>

                <br/>

                LAT:
                ${selectedIceberg.latitude.toFixed(2)}°S

                <br/>

                LON:
                ${selectedIceberg.longitude.toFixed(2)}°E
              </div>
            `),
          )
          .addTo(map);
      }

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
  }, [selectedId, selectedHorizon, onSelect]);

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

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            text-yellow-300
          "
        >
          SELECTED PREDICTION: +{selectedHorizon}H
        </p>
      </div>
    </div>
  );
}