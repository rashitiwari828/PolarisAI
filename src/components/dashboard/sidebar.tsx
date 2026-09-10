import {
  Crosshair,
  Snowflake,
  Diamond,
  Route,
  Satellite,
  Waves,
  TriangleAlert,
  Play,
  BarChart3,
  Box,
} from "lucide-react";

import type { DashboardSection } from "../../types/dashboard";

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const navigation: {
  id: DashboardSection;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "mission",
    label: "Mission Control",
    icon: Crosshair,
  },
  {
    id: "sea-ice",
    label: "Sea-Ice Intelligence",
    icon: Snowflake,
  },
  {
    id: "icebergs",
    label: "Iceberg Tracker",
    icon: Diamond,
  },
  {
    id: "route",
    label: "Route Planner",
    icon: Route,
  },
  {
    id: "satellite",
    label: "Satellite Monitor",
    icon: Satellite,
  },
  {
    id: "weather",
    label: "Weather & Ocean",
    icon: Waves,
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: TriangleAlert,
  },
  {
    id: "simulation",
    label: "Live Simulation",
    icon: Play,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "model",
    label: "Model Performance",
    icon: Box,
  },
];

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-[266px] shrink-0 flex-col border-r border-cyan-400/10 bg-[#020b16]">

      {/* LOGO */}
      <div className="border-b border-cyan-400/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <Crosshair size={19} strokeWidth={1.5} />
          </div>

          <div>
            <h1 className="font-mono text-[18px] tracking-[0.22em] text-white">
              POLARIS
            </h1>

            <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-cyan-400">
              NAV INTELLIGENCE
            </p>
          </div>
        </div>

        {/* ONLINE */}
        <div className="mt-7 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          SYSTEM ONLINE
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  group relative flex w-full items-center gap-4 rounded-xl
                  px-4 py-3.5 text-left
                  font-mono text-[12px] tracking-wide
                  transition-all duration-200

                  ${
                    active
                      ? "border border-cyan-400/40 bg-cyan-400/[0.10] text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                      : "border border-transparent text-slate-400 hover:border-cyan-400/10 hover:bg-cyan-400/[0.04] hover:text-cyan-200"
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
                )}

                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className={
                    active
                      ? "text-cyan-300"
                      : "text-slate-500 group-hover:text-cyan-300"
                  }
                />

                <span className="flex-1">{item.label}</span>

                {item.id === "alerts" && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-red-400/40 bg-red-400/10 px-1.5 text-[9px] text-red-400">
                    3
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* FOOTER */}
      <div className="border-t border-cyan-400/10 px-6 py-5">
        <p className="font-mono text-[9px] tracking-[0.14em] text-slate-600">
          POLARIS v2.4.1
        </p>

        <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-slate-600">
          SIH 2026
        </p>
      </div>
    </aside>
  );
}