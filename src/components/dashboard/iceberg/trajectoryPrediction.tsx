import type { TrackedIceberg } from "../../../types/iceberg";

interface TrajectoryPredictionProps {
  iceberg: TrackedIceberg;
}

export default function TrajectoryPrediction({
  iceberg,
}: TrajectoryPredictionProps) {
  const maxLat = Math.max(
    ...iceberg.trajectory.map((point) => point.latitude),
  );

  const minLat = Math.min(
    ...iceberg.trajectory.map((point) => point.latitude),
  );

  const range = Math.max(0.01, maxLat - minLat);

  const points = iceberg.trajectory
    .map((point, index) => {
      const x = 30 + index * 72;
      const y =
        105 - ((point.latitude - minLat) / range) * 65;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="rounded-2xl border border-cyan-400/15 bg-[#04111d] p-5">
      <h2 className="font-mono text-[14px] font-semibold tracking-[0.08em] text-slate-200">
        TRAJECTORY PREDICTION
      </h2>

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#020b15] p-3">
        <svg
          viewBox="0 0 330 130"
          className="h-[145px] w-full"
        >
          <line
            x1="15"
            y1="90"
            x2="315"
            y2="90"
            stroke="#1d647a"
            strokeDasharray="4 5"
            opacity="0.7"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#f87171"
            strokeWidth="3"
          />

          {iceberg.trajectory.map((point, index) => {
            const x = 30 + index * 72;
            const y =
              105 -
              ((point.latitude - minLat) / range) * 65;

            return (
              <g key={point.hours}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#f87171"
                />

                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#f87171"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {point.hours === 0
                    ? "NOW"
                    : `+${point.hours}H`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        {iceberg.trajectory.map((point) => (
          <div
            key={point.hours}
            className="grid grid-cols-[55px_1fr_1fr_70px] items-center rounded-lg bg-[#061522] px-3 py-2.5 font-mono text-[11px]"
          >
            <span className="text-slate-500">
              {point.hours === 0
                ? "NOW"
                : `+${point.hours}H`}
            </span>

            <span className="text-slate-300">
              {point.latitude.toFixed(2)}°S
            </span>

            <span className="text-slate-300">
              {point.longitude.toFixed(2)}°E
            </span>

            <span className="text-right text-slate-500">
              {point.hours === 0
                ? "CURRENT"
                : "PREDICTED"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}