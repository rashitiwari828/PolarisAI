import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { actualPredictedData } from "../../../data/modelPerformance";

export default function ActualPredictedChart() {
  return (
    <section className="h-[430px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="text-[14px] font-medium tracking-wide text-slate-100">
        ACTUAL vs PREDICTED
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Sea-ice concentration (%) — 90-day validation set
      </p>

      <div className="mt-5 h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 10,
              right: 20,
              bottom: 20,
              left: 5,
            }}
          >
            <CartesianGrid
              stroke="#123047"
              strokeDasharray="2 5"
            />

            <XAxis
              type="number"
              dataKey="actual"
              domain={[50, 85]}
              ticks={[50, 59, 68, 77, 85]}
              name="Actual"
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="number"
              dataKey="predicted"
              domain={[50, 85]}
              ticks={[55, 63, 71, 79, 85]}
              name="Predicted"
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                background: "#061522",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: 8,
                fontSize: 11,
              }}
            />

            <Scatter
              name="Validation points"
              data={actualPredictedData}
              fill="#249eb4"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 font-mono text-[9px] text-slate-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-cyan-400/70" />
          Data points
        </span>

        <span className="flex items-center gap-2">
          <span className="h-px w-6 bg-cyan-400/40" />
          Perfect prediction
        </span>
      </div>
    </section>
  );
}