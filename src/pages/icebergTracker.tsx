import { useMemo, useState } from "react";

import IcebergMap from "../components/dashboard/iceberg/icebergMap";
import TrackedIcebergs from "../components/dashboard/iceberg/trackedIcebergs";
import IcebergDetails from "../components/dashboard/iceberg/icebergDetails";
import TrajectoryPrediction from "../components/dashboard/iceberg/trajectoryPrediction";
import CollisionRisk from "../components/dashboard/iceberg/collisionRisk";
import DetectionInfo from "../components/dashboard/iceberg/detectionInfo";

import { icebergTrackerData } from "../data/icebergTrackerData";

interface IcebergTrackerProps {
  onNavigate: (section: "route") => void;
}

export default function IcebergTracker({
  onNavigate,
}: IcebergTrackerProps) {
  const [selectedId, setSelectedId] = useState("A23");

  const [selectedHorizon, setSelectedHorizon] =
    useState<6 | 12 | 24 | 48>(24);

  const selectedIceberg = useMemo(
    () =>
      icebergTrackerData.find(
        (iceberg) => iceberg.id === selectedId,
      ) ?? icebergTrackerData[0],
    [selectedId],
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913]">
      {/* PAGE HEADER */}

      <header className="shrink-0 border-b border-cyan-400/10 bg-[#020913] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[21px] font-medium tracking-[0.08em] text-white">
                ICEBERG INTELLIGENCE
              </h1>

              <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-cyan-300">
                SENTINEL-1 SAR
              </span>
            </div>

            <p className="mt-1 font-mono text-[11px] tracking-wide text-slate-500">
              Detection → Trajectory Prediction → Collision Risk
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

              <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-emerald-400">
                LIVE SYSTEM
              </span>
            </div>

            <div className="text-right">
              <p className="font-mono text-[10px] text-slate-500">
                Sentinel-1 updated:
                <span className="ml-2 text-cyan-300">
                  10 SEP 2026 • 16:42 UTC
                </span>
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-500">
                Vessel:
                <span className="ml-2 text-slate-300">
                  MV SAGAR KANYA
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* MAP */}

        <section className="relative min-w-0 flex-1 overflow-hidden p-4">
          <IcebergMap
            selectedId={selectedId}
            onSelect={setSelectedId}
            selectedHorizon={selectedHorizon}
          />

          {/* TRACKED LIST */}

          <div className="absolute left-7 top-7 w-[245px]">
            <TrackedIcebergs
              icebergs={icebergTrackerData}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* MISSION INTELLIGENCE PIPELINE */}

          <div className="absolute bottom-7 left-7 right-7 pointer-events-none">
            <div className="max-w-[760px] rounded-xl border border-cyan-400/15 bg-[#020913]/90 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-cyan-300">
                  ADAPTIVE NAVIGATION INTELLIGENCE
                </span>

                <span className="font-mono text-[9px] tracking-[0.12em] text-emerald-400">
                  MISSION AWARE
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-hidden">
                <PipelineStep label="SENTINEL-1 SAR" active />

                <PipelineArrow />

                <PipelineStep label="ICE DETECTION" active />

                <PipelineArrow />

                <PipelineStep
                  label="TRAJECTORY"
                  active
                />

                <PipelineArrow />

                <PipelineStep
                  label="COLLISION RISK"
                  active
                />

                <PipelineArrow />

                <PipelineStep
                  label="MISSION IMPACT"
                  active
                />

                <PipelineArrow />

                <PipelineStep
                  label="REPLANNING"
                  active
                />
              </div>

              <p className="mt-2 font-mono text-[9px] leading-relaxed text-slate-500">
                New Sentinel-1 observations update iceberg risk, which feeds
                mission feasibility and adaptive route replanning.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT INTELLIGENCE PANEL */}

        <aside className="h-full w-[365px] shrink-0 overflow-y-auto border-l border-cyan-400/10 bg-[#020b16] p-4">
          <div className="space-y-4">
            <IcebergDetails iceberg={selectedIceberg} />

            <TrajectoryPrediction
              iceberg={selectedIceberg}
              selectedHorizon={selectedHorizon}
              onHorizonChange={setSelectedHorizon}
            />

            <CollisionRisk
              iceberg={selectedIceberg}
              onAvoidIceberg={() => onNavigate("route")}
            />

            <DetectionInfo iceberg={selectedIceberg} />

            {/* MISSION IMPACT */}

            <div className="rounded-xl border border-cyan-400/15 bg-[#03111d] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] font-semibold tracking-[0.16em] text-cyan-300">
                    MISSION IMPACT
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-white">
                    Iceberg intelligence feeds navigation
                  </p>
                </div>

                <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1">
                  <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-emerald-400">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <MissionImpactRow
                  label="Iceberg detected"
                  value={selectedIceberg.id}
                />

                <MissionImpactRow
                  label="Trajectory horizon"
                  value={`${selectedHorizon}H`}
                />

                <MissionImpactRow
                  label="Collision probability"
                  value={`${selectedIceberg.collisionProbability}%`}
                />

                <MissionImpactRow
                  label="Mission response"
                  value={
                    selectedIceberg.risk === "HIGH"
                      ? "REPLAN"
                      : selectedIceberg.risk === "MODERATE"
                        ? "MONITOR"
                        : "CONTINUE"
                  }
                  emphasis={
                    selectedIceberg.risk === "HIGH"
                      ? "danger"
                      : selectedIceberg.risk === "MODERATE"
                        ? "warning"
                        : "safe"
                  }
                />
              </div>

              <div className="mt-3 border-t border-cyan-400/10 pt-3">
                <p className="font-mono text-[9px] leading-relaxed text-slate-500">
                  Risk changes can trigger mission feasibility evaluation and
                  adaptive replanning without changing the scientific
                  objectives unnecessarily.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUPPORTING UI                                                              */
/* -------------------------------------------------------------------------- */

function PipelineStep({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "shrink-0 rounded-md border px-2.5 py-1.5",
        active
          ? "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300"
          : "border-slate-700/40 bg-slate-900/30 text-slate-500",
      ].join(" ")}
    >
      <span className="font-mono text-[8px] font-semibold tracking-[0.1em]">
        {label}
      </span>
    </div>
  );
}

function PipelineArrow() {
  return (
    <span className="shrink-0 font-mono text-[10px] text-slate-700">
      →
    </span>
  );
}

function MissionImpactRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: "safe" | "warning" | "danger";
}) {
  const valueClass =
    emphasis === "danger"
      ? "text-red-400"
      : emphasis === "warning"
        ? "text-amber-400"
        : emphasis === "safe"
          ? "text-emerald-400"
          : "text-cyan-300";

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-[#020913] px-3 py-2">
      <span className="font-mono text-[9px] tracking-wide text-slate-500">
        {label}
      </span>

      <span
        className={`font-mono text-[9px] font-semibold tracking-[0.08em] ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}