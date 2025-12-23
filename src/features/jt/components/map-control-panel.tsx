import type { ViewState } from 'react-map-gl/maplibre';

import type { LayerVisibility, Projection, VectorLayerType } from '../types';
import { DebugPanel } from './debug-panel';
import { LayerControls } from './layer-controls';
import { ProjectionControls } from './projection-controls';

interface MapControlPanelProps {
  viewState: ViewState;
  onProjectionChange: (projection: Projection) => void;
  layerVisibility: LayerVisibility;
  onLayerToggle: (layerType: VectorLayerType) => void;
}

export function MapControlPanel({
  viewState,
  onProjectionChange,
  layerVisibility,
  onLayerToggle,
}: MapControlPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        minWidth: 100,
        top: 10,
        right: 10,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#faf9f5',
      }}
    >
      <ProjectionControls onProjectionChange={onProjectionChange} />
      <LayerControls visibility={layerVisibility} onToggle={onLayerToggle} />
      <DebugPanel viewState={viewState} />
    </div>
  );
}
