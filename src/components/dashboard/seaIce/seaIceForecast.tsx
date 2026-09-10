import {
  seaIceForecast,
} from "../../../data/seaIceIntelligenceData";

export default function SeaIceForecast() {
  const max = 90;
  const min = 45;

  const points = seaIceForecast
    .map((item, index) => {
      const x =
        (index /
          (seaIceForecast.length - 1)) *
        100;

      const y =
        100 -
        ((item.concentration - min) /
          (max - min)) *
          100;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="sea-ice-panel">
      <div className="sea-ice-panel-title">
        SEA-ICE CONCENTRATION FORECAST
      </div>

      <div className="forecast-chart">
        <div className="chart-y-axis">
          <span>90</span>
          <span>80</span>
          <span>70</span>
          <span>60</span>
          <span>50</span>
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="forecast-svg"
        >
          <polyline
            points={points}
            fill="none"
            stroke="#42ddf7"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
          />

          <polyline
            points="0,55 25,48 50,44 75,38 100,25"
            fill="none"
            stroke="#1a6478"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />

          <line
            x1="0"
            y1="44"
            x2="100"
            y2="44"
            stroke="#e9a923"
            strokeWidth="0.7"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="chart-x-axis">
        {seaIceForecast.map((item) => (
          <span key={item.label}>
            {item.label}
          </span>
        ))}
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-line cyan" />
          Predicted
        </span>

        <span>
          <i className="legend-line dashed" />
          Confidence
        </span>

        <span>
          <i className="legend-line historical" />
          Historical
        </span>
      </div>
    </section>
  );
}