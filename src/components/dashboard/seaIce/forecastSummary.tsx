import { seaIceSummary } from "../../../data/seaIceIntelligenceData";

export default function ForecastSummary() {
  return (
    <section className="sea-ice-panel">
      <div className="sea-ice-panel-title">
        FORECAST SUMMARY
      </div>

      <div className="summary-grid">
        <SummaryCard
          label="CURRENT"
          value={`${seaIceSummary.current}%`}
          status="MODERATE"
        />

        <SummaryCard
          label="72H PREDICTED"
          value={`${seaIceSummary.predicted}%`}
          status="INCREASING"
        />

        <SummaryCard
          label="CHANGE"
          value={`+${seaIceSummary.change}%`}
          status=""
        />

        <SummaryCard
          label="CONFIDENCE"
          value={`${seaIceSummary.confidence}%`}
          status=""
        />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: string;
}) {
  return (
    <div className="summary-card">
      <div className="summary-label">
        {label}
      </div>

      <div className="summary-value">
        {value}
      </div>

      {status && (
        <div className="summary-status">
          {status}
        </div>
      )}
    </div>
  );
}