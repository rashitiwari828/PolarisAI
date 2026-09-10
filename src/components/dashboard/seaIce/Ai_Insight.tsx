import {
  seaIceInsight,
} from "../../../data/seaIceIntelligenceData";

export default function AIInsight() {
  return (
    <section className="sea-ice-panel">
      <div className="ai-insight-header">
        <span className="ai-icon">
          ◇
        </span>

        AI INSIGHT
      </div>

      <p className="ai-insight-text">
        "{seaIceInsight.text}"
      </p>

      <div className="ai-insight-footer">
        <span>
          Updated {seaIceInsight.updated}
        </span>

        <strong>
          Conf: {seaIceInsight.confidence}%
        </strong>
      </div>
    </section>
  );
}