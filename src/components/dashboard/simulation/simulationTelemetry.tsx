import type { SimulationTelemetry } from "../../../data/simulationData";

interface SimulationTelemetryProps {
  telemetry: SimulationTelemetry;
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-cyan-400/[0.06] py-2.5 last:border-b-0">
      <span className="font-mono text-[9px] text-slate-600">
        {label}
      </span>

      <span className="font-mono text-[10px] text-slate-300">
        {value}
      </span>
    </div>
  );
}

export default function SimulationTelemetry({
  telemetry,
}: SimulationTelemetryProps) {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-5 shadow-[0_0_30px_rgba(0,180,255,0.03)]">
      <h2 className="font-mono text-[13px] tracking-[0.08em] text-slate-200">
        LIVE TELEMETRY
      </h2>

      <div className="mt-4">
        <Row
          label="Vessel speed"
          value={`${telemetry.speed.toFixed(1)} kn`}
        />

        <Row
          label="Heading"
          value={`${String(Math.round(telemetry.heading)).padStart(3, "0")}° NE`}
        />

        <Row
          label="Fuel remaining"
          value={`${telemetry.fuel.toFixed(1)}%`}
        />

        <Row
          label="Wind"
          value={`${telemetry.windSpeed.toFixed(0)} kn`}
        />

        <Row
          label="Wave height"
          value={`${telemetry.waveHeight.toFixed(1)} m`}
        />

        <Row
          label="Visibility"
          value={`${telemetry.visibility.toFixed(1)} km`}
        />

        <Row
          label="Distance remaining"
          value={`${telemetry.distanceRemaining.toFixed(1)} km`}
        />

        <Row
          label="ETA"
          value={`${telemetry.etaHours.toFixed(1)} h`}
        />
      </div>
    </section>
  );
}