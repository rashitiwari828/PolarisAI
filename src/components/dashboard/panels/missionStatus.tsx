interface MissionStatusProps {
  telemetry: any;
}

export default function MissionStatus({
  telemetry,
}: MissionStatusProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/15 bg-[#061321] p-5">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[11px] tracking-[0.14em] text-slate-200">
          MISSION STATUS
        </h3>

        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      </div>

      {/* DATA */}
      <div className="mt-5 space-y-4">
        
        <StatusRow
          label="Vessel"
          value={telemetry.vesselName ?? "MV SAGAR KANYA"}
        />

        <StatusRow
          label="Destination"
          value={telemetry.destination ?? "BHARATI STATION"}
        />

        <StatusRow
          label="Distance"
          value={telemetry.distance ?? "1,248 km"}
        />

        <StatusRow
          label="ETA"
          value={telemetry.eta ?? "61h 24m"}
        />

        <StatusRow
          label="Departed"
          value={telemetry.departed ?? "06 SEP 2026"}
        />
      </div>

      {/* FUEL */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between font-mono text-[9px]">
          <span className="text-slate-500">
            Fuel Remaining
          </span>

          <span className="text-emerald-400">
            {telemetry.fuel ?? 68}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            style={{
              width: `${telemetry.fuel ?? 68}%`,
            }}
          />
        </div>
      </div>

      {/* OVERALL RISK */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-4">
        <span className="font-mono text-[9px] tracking-[0.1em] text-slate-400">
          OVERALL RISK
        </span>

        <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          LOW
        </span>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[9px] text-slate-500">
        {label}
      </span>

      <span className="text-right font-mono text-[10px] text-slate-200">
        {value}
      </span>
    </div>
  );
}