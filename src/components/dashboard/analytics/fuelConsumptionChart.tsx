import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { fuelConsumptionData } from "../../../data/analyticsData";

export default function FuelConsumptionChart() {
  return (
    <section className="h-[330px] rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="font-sans text-[14px] font-medium tracking-wide text-slate-100">
        FUEL CONSUMPTION
      </h2>

      <p className="mt-2 font-mono text-[9px] tracking-wide text-slate-600">
        Daily usage L/day • POLARIS vs baseline
      </p>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={fuelConsumptionData}
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
              domain={[1500, 2600]}
              ticks={[1500, 1800, 2100, 2400, 2600]}
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
              dataKey="polaris"
              name="POLARIS"
              fill="#1aa1b8"
              radius={[3, 3, 0, 0]}
              barSize={30}
            />

            <Bar
              dataKey="baseline"
              name="Baseline"
              fill="#26374a"
              radius={[3, 3, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}