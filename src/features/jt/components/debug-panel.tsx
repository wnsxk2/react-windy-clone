import type { ViewState } from 'react-map-gl/maplibre';

interface DebugPanelProps {
  viewState: ViewState;
}

export function DebugPanel({ viewState }: DebugPanelProps) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: 8,
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'monospace',
      }}
    >
      <div>lng: {viewState.longitude.toFixed(4)}</div>
      <div>lat: {viewState.latitude.toFixed(4)}</div>
      <div>zoom: {viewState.zoom.toFixed(2)}</div>
    </div>
  );
}
