import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { routeRiskData } from "../../../data/analyticsData";

export default function RouteRiskChart() {
  return (
    <section className="h-[330px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="font-sans text-[14px] font-medium tracking-wide text-slate-100">
        ROUTE RISK SCORE
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Daily composite risk (lower is better)
      </p>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={routeRiskData}
            margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="routeRiskFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.22}
                />
                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
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

            <Area
              type="monotone"
              dataKey="risk"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#routeRiskFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}