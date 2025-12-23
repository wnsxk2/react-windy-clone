import Map from 'react-map-gl/maplibre';

import {
  MAP_STYLE_URL,
  MapControlPanel,
  MIN_ZOOM,
  useMapState,
} from '@/features/jt';

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
