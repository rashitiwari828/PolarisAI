import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { icebergDetectionData } from "../../../data/analyticsData";

export default function IcebergDetectionChart() {
  return (
    <section className="h-[330px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="font-sans text-[14px] font-medium tracking-wide text-slate-100">
        ICEBERG DETECTION
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Detected vs AI-confirmed icebergs per day
      </p>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={icebergDetectionData}
            margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
            barGap={4}
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
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
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

            <Bar
              dataKey="detected"
              name="Detected"
              fill="#62549a"
              radius={[3, 3, 0, 0]}
              barSize={30}
            />

            <Bar
              dataKey="confirmed"
              name="AI-confirmed"
              fill="#249eb4"
              radius={[3, 3, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}