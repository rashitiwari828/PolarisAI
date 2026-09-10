import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { modelImprovementData } from "../../../data/modelPerformance";

export default function ModelImprovementChart() {
  return (
    <section className="h-[430px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="text-[14px] font-medium tracking-wide text-slate-100">
        MODEL IMPROVEMENT OVER TIME
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Mar–Sep 2026 training iterations
      </p>

      <div className="mt-5 h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={modelImprovementData}
            margin={{
              top: 10,
              right: 15,
              left: 5,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#123047"
              strokeDasharray="2 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              yAxisId="left"
              domain={[5, 11]}
              ticks={[5, 7, 9, 11]}
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[78, 92]}
              ticks={[78, 82, 86, 90, 92]}
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#061522",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: 8,
                fontSize: 11,
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={25}
              iconType="line"
              wrapperStyle={{
                fontSize: 9,
                fontFamily: "monospace",
                color: "#64748b",
              }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="iceMae"
              name="Ice MAE (lower=better)"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#22d3ee",
                strokeWidth: 0,
              }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="icebergAccuracy"
              name="Iceberg Accuracy"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#a78bfa",
                strokeWidth: 0,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}