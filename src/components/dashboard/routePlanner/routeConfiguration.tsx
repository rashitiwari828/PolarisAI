import { useState } from "react";

interface MissionConfiguration {
  startPoint: {
    name: string;
    location: string;
  };
  destination: {
    name: string;
    location: string;
  };
  waypoints: Waypoint[];
  missionPriority: string;
  optimizationPreference: string;
}

interface RouteConfigurationProps {
  onGenerate: () => void;
  generating: boolean;
  onMissionChange?: (mission: MissionConfiguration) => void;
}

interface Waypoint {
  id: number;
  name: string;
  location: string;
  type: "MANDATORY" | "OPTIONAL";
}

export default function RouteConfiguration({
  onGenerate,
  generating,
  onMissionChange,
}: RouteConfigurationProps) {
  const [startPoint, setStartPoint] = useState({
    name: "Bharati Research Station",
    location: "69.4°S 76.2°E",
  });

  const [destination, setDestination] = useState({
    name: "Maitri Research Station",
    location: "70.8°S 11.7°E",
  });

  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    {
      id: 1,
      name: "Ice Core Survey",
      location: "72.1°S 24.6°E",
      type: "MANDATORY",
    },
    {
      id: 2,
      name: "Oceanographic Sampling",
      location: "71.4°S 18.2°E",
      type: "MANDATORY",
    },
    {
      id: 3,
      name: "Marine Ecosystem Survey",
      location: "70.9°S 14.8°E",
      type: "OPTIONAL",
    },
  ]);

  const [selectedOptimization, setSelectedOptimization] =
    useState("Mission Balanced");

  const [selectedPriority, setSelectedPriority] =
    useState("Mission Completion");

  const emitMissionChange = (
    nextStartPoint = startPoint,
    nextDestination = destination,
    nextWaypoints = waypoints,
    nextPriority = selectedPriority,
    nextOptimization = selectedOptimization,
  ) => {
    onMissionChange?.({
      startPoint: nextStartPoint,
      destination: nextDestination,
      waypoints: nextWaypoints,
      missionPriority: nextPriority,
      optimizationPreference: nextOptimization,
    });
  };

  const addWaypoint = () => {
    const newId =
      waypoints.length > 0
        ? Math.max(...waypoints.map((waypoint) => waypoint.id)) + 1
        : 1;

    const nextWaypoints = [
      ...waypoints,
      {
        id: newId,
        name: `Scientific Survey ${newId}`,
        location: "00.0°S 00.0°E",
        type: "OPTIONAL" as const,
      },
    ];

    setWaypoints(nextWaypoints);

    emitMissionChange(
      startPoint,
      destination,
      nextWaypoints,
      selectedPriority,
      selectedOptimization,
    );
  };

  const removeWaypoint = (id: number) => {
    const nextWaypoints = waypoints.filter(
      (waypoint) => waypoint.id !== id,
    );

    setWaypoints(nextWaypoints);

    emitMissionChange(
      startPoint,
      destination,
      nextWaypoints,
      selectedPriority,
      selectedOptimization,
    );
  };

  const updateWaypoint = (
    id: number,
    field: keyof Waypoint,
    value: string,
  ) => {
    const nextWaypoints = waypoints.map((waypoint) =>
      waypoint.id === id
        ? {
            ...waypoint,
            [field]: value,
          }
        : waypoint,
    );

    setWaypoints(nextWaypoints);

    emitMissionChange(
      startPoint,
      destination,
      nextWaypoints,
      selectedPriority,
      selectedOptimization,
    );
  };

  const updateStartPoint = (
    field: "name" | "location",
    value: string,
  ) => {
    const nextStartPoint = {
      ...startPoint,
      [field]: value,
    };

    setStartPoint(nextStartPoint);

    emitMissionChange(
      nextStartPoint,
      destination,
      waypoints,
      selectedPriority,
      selectedOptimization,
    );
  };

  const updateDestination = (
    field: "name" | "location",
    value: string,
  ) => {
    const nextDestination = {
      ...destination,
      [field]: value,
    };

    setDestination(nextDestination);

    emitMissionChange(
      startPoint,
      nextDestination,
      waypoints,
      selectedPriority,
      selectedOptimization,
    );
  };

  const updatePriority = (option: string) => {
    setSelectedPriority(option);

    emitMissionChange(
      startPoint,
      destination,
      waypoints,
      option,
      selectedOptimization,
    );
  };

  const updateOptimization = (option: string) => {
    setSelectedOptimization(option);

    emitMissionChange(
      startPoint,
      destination,
      waypoints,
      selectedPriority,
      option,
    );
  };

  const handleGenerate = () => {
    emitMissionChange();
    onGenerate();
  };

  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <div className="mb-5">
        <h2 className="font-mono text-[15px] tracking-[0.08em] text-slate-200">
          MISSION CONFIGURATION
        </h2>

        <p className="mt-1 font-mono text-[9px] tracking-[0.08em] text-slate-500">
          ADAPTIVE SCIENTIFIC MISSION PLANNING
        </p>
      </div>

      <div className="space-y-4">
        {/* START */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            START
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <input
              value={startPoint.name}
              onChange={(event) =>
                updateStartPoint("name", event.target.value)
              }
              disabled={generating}
              className="w-full bg-transparent text-[14px] text-slate-200 outline-none placeholder:text-slate-600"
            />

            <input
              value={startPoint.location}
              onChange={(event) =>
                updateStartPoint("location", event.target.value)
              }
              disabled={generating}
              className="mt-1 w-full bg-transparent font-mono text-[10px] text-slate-500 outline-none placeholder:text-slate-700"
              placeholder="Latitude / Longitude"
            />
          </div>
        </div>

        {/* SCIENTIFIC OBJECTIVES */}

        <div>
          <div className="flex items-center justify-between">
            <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
              SCIENTIFIC OBJECTIVES
            </label>

            <span className="font-mono text-[9px] text-cyan-400">
              {waypoints.length}{" "}
              {waypoints.length === 1 ? "WAYPOINT" : "WAYPOINTS"}
            </span>
          </div>

          <div className="mt-2 space-y-2">
            {waypoints.map((waypoint, index) => (
              <div
                key={waypoint.id}
                className="rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-cyan-400">
                        WP-{String(index + 1).padStart(2, "0")}
                      </span>

                      <input
                        value={waypoint.name}
                        onChange={(event) =>
                          updateWaypoint(
                            waypoint.id,
                            "name",
                            event.target.value,
                          )
                        }
                        disabled={generating}
                        className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-200 outline-none placeholder:text-slate-600"
                        placeholder="Objective name"
                      />
                    </div>

                    <input
                      value={waypoint.location}
                      onChange={(event) =>
                        updateWaypoint(
                          waypoint.id,
                          "location",
                          event.target.value,
                        )
                      }
                      disabled={generating}
                      className="mt-1 w-full bg-transparent font-mono text-[10px] text-slate-500 outline-none placeholder:text-slate-700"
                      placeholder="Latitude / Longitude"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeWaypoint(waypoint.id)}
                    disabled={generating}
                    className="font-mono text-[9px] text-slate-600 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    REMOVE
                  </button>
                </div>

                <div className="mt-3 flex gap-2">
                  {(["MANDATORY", "OPTIONAL"] as const).map((type) => {
                    const selected = waypoint.type === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          updateWaypoint(
                            waypoint.id,
                            "type",
                            type,
                          )
                        }
                        disabled={generating}
                        className={`rounded-md border px-2 py-1 font-mono text-[8px] tracking-[0.08em] transition-all ${
                          selected
                            ? type === "MANDATORY"
                              ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-300"
                              : "border-slate-500/40 bg-slate-700/20 text-slate-300"
                            : "border-slate-700/40 bg-transparent text-slate-600"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ADD WAYPOINT */}

          <button
            type="button"
            onClick={addWaypoint}
            disabled={generating}
            className="mt-3 w-full rounded-xl border border-dashed border-cyan-400/20 bg-cyan-400/[0.02] px-4 py-3 font-mono text-[10px] tracking-[0.08em] text-cyan-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
          >
            + ADD SCIENTIFIC WAYPOINT
          </button>
        </div>

        {/* DESTINATION */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            DESTINATION
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <input
              value={destination.name}
              onChange={(event) =>
                updateDestination("name", event.target.value)
              }
              disabled={generating}
              className="w-full bg-transparent text-[14px] text-slate-200 outline-none placeholder:text-slate-600"
            />

            <input
              value={destination.location}
              onChange={(event) =>
                updateDestination(
                  "location",
                  event.target.value,
                )
              }
              disabled={generating}
              className="mt-1 w-full bg-transparent font-mono text-[10px] text-slate-500 outline-none placeholder:text-slate-700"
              placeholder="Latitude / Longitude"
            />
          </div>
        </div>

        {/* MISSION PRIORITY */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            MISSION PRIORITY
          </label>

          <div className="mt-3 space-y-3">
            {[
              "Mission Completion",
              "Safety First",
              "Scientific Coverage",
            ].map((option) => {
              const selected = selectedPriority === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updatePriority(option)}
                  disabled={generating}
                  className="flex w-full cursor-pointer items-center gap-3 text-left text-[14px] text-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? "border-cyan-400"
                        : "border-slate-600"
                    }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    )}
                  </span>

                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* ARRIVAL WINDOW */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            MISSION ARRIVAL WINDOW
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="font-mono text-[12px] text-slate-300">
              18 SEP 2026 • 06:00–18:00 UTC
            </p>

            <p className="mt-1 font-mono text-[9px] text-slate-600">
              TARGET COMPLETION WINDOW
            </p>
          </div>
        </div>

        {/* DEPARTURE */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            DEPARTURE
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="font-mono text-[12px] text-slate-300">
              10 SEP 2026 • 06:00 UTC
            </p>
          </div>
        </div>

        {/* VESSEL */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            VESSEL
          </label>

          <div className="mt-2 rounded-xl border border-cyan-400/10 bg-[#061522] px-4 py-3">
            <p className="text-[14px] text-slate-200">
              MV Sagar Kanya
            </p>
          </div>
        </div>

        {/* OPTIMIZATION */}

        <div>
          <label className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
            MISSION OPTIMIZATION
          </label>

          <div className="mt-3 space-y-3">
            {[
              "Safest Mission",
              "Fastest Mission",
              "Fuel Efficient",
              "Mission Balanced",
            ].map((option) => {
              const selected = selectedOptimization === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateOptimization(option)}
                  disabled={generating}
                  className="flex w-full cursor-pointer items-center gap-3 text-left text-[14px] text-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? "border-cyan-400"
                        : "border-slate-600"
                    }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    )}
                  </span>

                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* ADAPTIVE REPLANNING */}

        <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.03] p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

            <p className="font-mono text-[9px] tracking-[0.14em] text-cyan-300">
              ADAPTIVE REPLANNING ENABLED
            </p>
          </div>

          <p className="mt-2 text-[9px] leading-5 text-slate-500">
            New Sentinel-1 ice observations can trigger risk updates,
            mission-impact assessment and route replanning while the
            mission is underway.
          </p>
        </div>

        {/* GENERATE */}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-cyan-400/60
            bg-cyan-400/[0.12]
            px-4
            py-3.5
            font-mono
            text-[15px]
            tracking-[0.04em]
            text-cyan-200
            shadow-[0_0_25px_rgba(34,211,238,0.08)]
            transition-all
            hover:bg-cyan-400/[0.18]
            hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {generating
            ? "ANALYZING MISSION..."
            : "GENERATE MISSION PLAN"}
        </button>
      </div>
    </section>
  );
}