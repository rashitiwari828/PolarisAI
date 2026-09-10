import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { seaIceTrendData } from "../../../data/analyticsData";

export default function SeaIceTrendChart() {
  return (
    <section className="h-[330px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="font-sans text-[14px] font-medium tracking-wide text-slate-100">
        SEA-ICE CONCENTRATION TREND
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Observed vs AI-predicted (%)
      </p>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={seaIceTrendData}
            margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#123047"
              strokeDasharray="2 5"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748b",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[50, 75]}
              ticks={[50, 57, 64, 75]}
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

            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#a78bfa"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="observed"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#22d3ee",
                strokeWidth: 0,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}