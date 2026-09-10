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
            <h1 className="text-[21px] font-medium tracking-[0.08em] text-white">
              ICEBERG INTELLIGENCE
            </h1>

            <p className="mt-1 font-mono text-[11px] tracking-wide text-slate-500">
              Real-Time Detection &amp; Trajectory Prediction
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
                Satellite updated:
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
            icebergs={icebergTrackerData}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {/* TRACKED LIST */}

          <div className="absolute left-7 top-7 w-[245px]">
            <TrackedIcebergs
              icebergs={icebergTrackerData}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        {/* RIGHT INTELLIGENCE PANEL */}

        <aside className="h-full w-[365px] shrink-0 overflow-y-auto border-l border-cyan-400/10 bg-[#020b16] p-4">
          <div className="space-y-4">
            <IcebergDetails iceberg={selectedIceberg} />

            <TrajectoryPrediction
              iceberg={selectedIceberg}
            />

            <CollisionRisk
              iceberg={selectedIceberg}
              onAvoidIceberg={() => onNavigate("route")}
            />

            <DetectionInfo iceberg={selectedIceberg} />
          </div>
        </aside>
      </div>
    </div>
  );
}