import {
  corridorData,
} from "../../../data/seaIceIntelligenceData";

export default function CorridorAnalysis() {
  return (
    <section className="sea-ice-panel">
      <div className="sea-ice-panel-title">
        CORRIDOR ANALYSIS
      </div>

      <div className="corridor-list">
        {corridorData.map((corridor) => (
          <div
            key={corridor.name}
            className="corridor-item"
          >
            <div className="corridor-top">
              <span>
                {corridor.name}
              </span>

              <strong>
                {corridor.value}%
              </strong>

              <small>
                {corridor.change}
              </small>
            </div>

            <div className="corridor-bar">
              <div
                className={`corridor-fill ${corridor.level.toLowerCase()}`}
                style={{
                  width: `${corridor.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}