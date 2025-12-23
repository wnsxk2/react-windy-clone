import { Layer, Source } from 'react-map-gl/maplibre';

import {
  LINE_DATA,
  MULTI_POLYGON_DATA,
  POINT_DATA,
  POLYGON_DATA,
} from '../data/sample-geojson';
import type { LayerVisibility } from '../types';

interface VectorLayersProps {
  visibility: LayerVisibility;
}

export function VectorLayers({ visibility }: VectorLayersProps) {
  return (
    <>
      {visibility['multi-polygon'] && (
        <Source id="multi-polygon-source" type="geojson" data={MULTI_POLYGON_DATA}>
          <Layer
            id="multi-polygon-fill"
            type="fill"
            paint={{
              'fill-color': '#9333ea',
              'fill-opacity': 0.3,
            }}
          />
          <Layer
            id="multi-polygon-outline"
            type="line"
            paint={{
              'line-color': '#9333ea',
              'line-width': 2,
            }}
          />
        </Source>
      )}

      {visibility.polygon && (
        <Source id="polygon-source" type="geojson" data={POLYGON_DATA}>
          <Layer
            id="polygon-fill"
            type="fill"
            paint={{
              'fill-color': '#22c55e',
              'fill-opacity': 0.4,
            }}
          />
          <Layer
            id="polygon-outline"
            type="line"
            paint={{
              'line-color': '#16a34a',
              'line-width': 2,
            }}
          />
        </Source>
      )}

      {visibility.line && (
        <Source id="line-source" type="geojson" data={LINE_DATA}>
          <Layer
            id="line-layer"
            type="line"
            paint={{
              'line-color': '#3b82f6',
              'line-width': 3,
              'line-opacity': 0.8,
            }}
          />
        </Source>
      )}

      {visibility.point && (
        <Source id="point-source" type="geojson" data={POINT_DATA}>
          <Layer
            id="point-layer"
            type="circle"
            paint={{
              'circle-radius': 8,
              'circle-color': '#ef4444',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
            }}
          />
        </Source>
      )}
    </>
  );
}
