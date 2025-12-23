import { useState } from 'react';
import Map, { type ViewState } from 'react-map-gl/maplibre';

import { Button } from '../../components/ui/button';

// Constants
const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
const MIN_ZOOM = 2.67;

const INITIAL_VIEW_STATE: ViewState = {
  longitude: 127,
  latitude: 37,
  zoom: 2,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

// Types
type Projection = 'mercator' | 'globe';

// Hooks
function useMapState() {
  const [projection, setProjection] = useState<Projection>('globe');
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

  const handleProjectionChange = (newProjection: Projection) => {
    setProjection(newProjection);
  };

  const handleMove = (evt: { viewState: ViewState }) => {
    setViewState(evt.viewState);
  };

  return {
    projection,
    viewState,
    handleProjectionChange,
    handleMove,
  };
}

// Components
interface DebugPanelProps {
  viewState: ViewState;
}

function DebugPanel({ viewState }: DebugPanelProps) {
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

interface ProjectionControlsProps {
  onProjectionChange: (projection: Projection) => void;
}

function ProjectionControls({ onProjectionChange }: ProjectionControlsProps) {
  return (
    <>
      <Button onClick={() => onProjectionChange('mercator')}>2D</Button>
      <Button onClick={() => onProjectionChange('globe')}>3D</Button>
    </>
  );
}

interface MapControlPanelProps {
  viewState: ViewState;
  onProjectionChange: (projection: Projection) => void;
}

function MapControlPanel({
  viewState,
  onProjectionChange,
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
      <DebugPanel viewState={viewState} />
    </div>
  );
}

// Page Component
export default function Page() {
  const { projection, viewState, handleProjectionChange, handleMove } =
    useMapState();

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/galaxy.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <MapControlPanel
        viewState={viewState}
        onProjectionChange={handleProjectionChange}
      />
      <Map
        initialViewState={viewState}
        onMove={handleMove}
        projection={projection}
        minZoom={MIN_ZOOM}
        mapStyle={MAP_STYLE_URL}
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
