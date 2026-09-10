interface MapControlsProps {
  showSeaIce: boolean;
  showIcebergs: boolean;
  showRoute: boolean;

  onSeaIceChange: (
    value: boolean
  ) => void;

  onIcebergsChange: (
    value: boolean
  ) => void;

  onRouteChange: (
    value: boolean
  ) => void;
}

export default function MapControls({
  showSeaIce,
  showIcebergs,
  showRoute,
  onSeaIceChange,
  onIcebergsChange,
  onRouteChange,
}: MapControlsProps) {
  return (
    <div className="map-layer-panel">

      <div className="map-layer-title">
        MAP LAYERS
      </div>

      <LayerToggle
        label="Sea Ice"
        active={showSeaIce}
        onClick={() =>
          onSeaIceChange(
            !showSeaIce
          )
        }
      />

      <LayerToggle
        label="Icebergs"
        active={showIcebergs}
        onClick={() =>
          onIcebergsChange(
            !showIcebergs
          )
        }
      />

      <LayerToggle
        label="Route"
        active={showRoute}
        onClick={() =>
          onRouteChange(
            !showRoute
          )
        }
      />

    </div>
  );
}

function LayerToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="layer-toggle"
      onClick={onClick}
    >

      <span>
        {label}
      </span>

      <span
        className={`layer-switch ${
          active
            ? "layer-switch-active"
            : ""
        }`}
      />

    </button>
  );
}