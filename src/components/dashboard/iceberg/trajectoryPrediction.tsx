import type { TrackedIceberg } from "../../../types/iceberg";

interface TrajectoryPredictionProps {
  iceberg: TrackedIceberg;
  selectedHorizon: 6 | 12 | 24 | 48;
  onHorizonChange: (horizon: 6 | 12 | 24 | 48) => void;
}

const HORIZONS = [6, 12, 24, 48] as const;

export default function TrajectoryPrediction({
  iceberg,
  selectedHorizon,
  onHorizonChange,
}: TrajectoryPredictionProps) {
  const prediction = iceberg.trajectory.find(
    (point) => point.horizon_hours === selectedHorizon,
  );

  const chartPoints = (() => {
    if (!iceberg.trajectory.length) return "";

    const latitudes = iceberg.trajectory.map(
      (point) => point.predicted_latitude,
    );

    const maxLat = Math.max(iceberg.latitude, ...latitudes);
    const minLat = Math.min(iceberg.latitude, ...latitudes);
    const range = Math.max(0.01, maxLat - minLat);

    const points = [
      {
        latitude: iceberg.latitude,
        longitude: iceberg.longitude,
      },
      ...iceberg.trajectory.map((point) => ({
        latitude: point.predicted_latitude,
        longitude: point.predicted_longitude,
      })),
    ];

    return points
      .map((point, index) => {
        const x = 25 + index * 75;
        const y =
          105 - ((point.latitude - minLat) / range) * 70;

        return `${x},${y}`;
      })
      .join(" ");
  })();

  const getChartPosition = (index: number) => {
    const latitudes = [
      iceberg.latitude,
      ...iceberg.trajectory.map(
        (point) => point.predicted_latitude,
      ),
    ];

    const maxLat = Math.max(...latitudes);
    const minLat = Math.min(...latitudes);
    const range = Math.max(0.01, maxLat - minLat);

    const point =
      index === 0
        ? {
            latitude: iceberg.latitude,
            longitude: iceberg.longitude,
          }
        : {
            latitude:
              iceberg.trajectory[index - 1].predicted_latitude,
            longitude:
              iceberg.trajectory[index - 1].predicted_longitude,
          };

    return {
      x: 25 + index * 75,
      y:
        105 -
        ((point.latitude - minLat) / range) * 70,
    };
  };

  return (
    <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-5">
      {/* HEADER */}

      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-[14px] font-semibold tracking-[0.08em] text-slate-200">
          TRAJECTORY PREDICTION
        </h2>

        <span className="rounded-md border border-cyan-400/15 bg-cyan-400/5 px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-cyan-300">
          {iceberg.id}
        </span>
      </div>

      {/* HORIZON SELECTOR */}

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {HORIZONS.map((horizon) => {
          const available = iceberg.trajectory.some(
            (point) => point.horizon_hours === horizon,
          );

          const active = selectedHorizon === horizon;

          return (
            <button
              key={horizon}
              type="button"
              disabled={!available}
              onClick={() => onHorizonChange(horizon)}
              className={`rounded-lg border px-2 py-2 font-mono text-[10px] transition ${
                active
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                  : available
                    ? "border-cyan-400/10 bg-[#061522] text-slate-400 hover:border-cyan-400/30 hover:text-slate-200"
                    : "cursor-not-allowed border-white/5 bg-[#061522] text-slate-700"
              }`}
            >
              {horizon}H
            </button>
          );
        })}
      </div>

      {/* TRAJECTORY CHART */}

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#020b15] p-3">
        {iceberg.trajectory.length > 0 ? (
          <svg
            viewBox="0 0 330 130"
            className="h-[145px] w-full"
          >
            <line
              x1="15"
              y1="105"
              x2="315"
              y2="105"
              stroke="#1d647a"
              strokeDasharray="4 5"
              opacity="0.7"
            />

            <polyline
              points={chartPoints}
              fill="none"
              stroke="#f87171"
              strokeWidth="2.5"
              opacity="0.8"
            />

            {/* CURRENT POSITION */}

            {(() => {
              const position = getChartPosition(0);

              return (
                <g>
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="6"
                    fill="#22d3ee"
                  />

                  <text
                    x={position.x}
                    y={position.y - 11}
                    textAnchor="middle"
                    fill="#22d3ee"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    NOW
                  </text>
                </g>
              );
            })()}

            {/* PREDICTION POINTS */}

            {iceberg.trajectory.map((point, index) => {
              const position = getChartPosition(index + 1);

              const selected =
                point.horizon_hours === selectedHorizon;

              return (
                <g
                  key={`${point.iceberg_id}-${point.horizon_hours}`}
                >
                  {selected && (
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r="9"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                  )}

                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={selected ? 5.5 : 4}
                    fill={
                      selected
                        ? "#facc15"
                        : "#f87171"
                    }
                  />

                  <text
                    x={position.x}
                    y={position.y - 10}
                    textAnchor="middle"
                    fill={
                      selected
                        ? "#facc15"
                        : "#f87171"
                    }
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    +{point.horizon_hours}H
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="flex h-[145px] items-center justify-center font-mono text-[11px] text-slate-500">
            NO TRAJECTORY PREDICTION AVAILABLE
          </div>
        )}
      </div>

      {/* SELECTED PREDICTION */}

      {prediction ? (
        <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#061522] p-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.12em] text-slate-500">
              SELECTED PREDICTION
            </span>

            <span className="font-mono text-[11px] font-semibold text-yellow-300">
              +{prediction.horizon_hours}H
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-mono text-[9px] text-slate-600">
                LATITUDE
              </p>

              <p className="mt-1 font-mono text-[12px] text-slate-200">
                {prediction.predicted_latitude.toFixed(2)}°S
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-slate-600">
                LONGITUDE
              </p>

              <p className="mt-1 font-mono text-[12px] text-slate-200">
                {prediction.predicted_longitude.toFixed(2)}°E
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-slate-600">
                PREDICTION TIME
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-300">
                {prediction.prediction_time}
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-slate-600">
                UNCERTAINTY
              </p>

              <p className="mt-1 font-mono text-[11px] text-slate-200">
                {prediction.uncertainty_km === null
                  ? "Not available"
                  : `${prediction.uncertainty_km.toFixed(1)} km`}
              </p>
            </div>
          </div>

          <div className="mt-3 border-t border-cyan-400/10 pt-3">
            <p className="font-mono text-[9px] text-slate-600">
              PREDICTION METHOD
            </p>

            <p className="mt-1 font-mono text-[11px] text-cyan-300">
              {prediction.prediction_method}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-yellow-400/10 bg-yellow-400/5 p-3 font-mono text-[10px] text-yellow-300">
          NO PREDICTION AVAILABLE FOR +{selectedHorizon}H
        </div>
      )}

      {/* PREDICTION TABLE */}

      <div className="mt-4 space-y-2">
        {iceberg.trajectory.map((point) => {
          const selected =
            point.horizon_hours === selectedHorizon;

          return (
            <button
              key={`${point.iceberg_id}-row-${point.horizon_hours}`}
              type="button"
              onClick={() =>
                onHorizonChange(point.horizon_hours)
              }
              className={`grid w-full grid-cols-[45px_1fr_1fr] gap-2 rounded-lg border px-3 py-2.5 text-left font-mono text-[10px] transition ${
                selected
                  ? "border-yellow-400/20 bg-yellow-400/5"
                  : "border-transparent bg-[#061522] hover:border-cyan-400/10"
              }`}
            >
              <span
                className={
                  selected
                    ? "text-yellow-300"
                    : "text-slate-500"
                }
              >
                +{point.horizon_hours}H
              </span>

              <span className="text-slate-300">
                {point.predicted_latitude.toFixed(2)}°S
              </span>

              <span className="text-slate-300">
                {point.predicted_longitude.toFixed(2)}°E
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}