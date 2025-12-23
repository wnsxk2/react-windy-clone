import type { FeatureCollection, Geometry } from 'geojson';

export type Projection = 'mercator' | 'globe';

export type VectorLayerType = 'point' | 'line' | 'polygon' | 'multi-polygon';

export interface VectorLayerConfig {
  id: string;
  type: VectorLayerType;
  label: string;
  color: string;
  visible: boolean;
  data: FeatureCollection<Geometry>;
}

export interface LayerVisibility {
  point: boolean;
  line: boolean;
  polygon: boolean;
  'multi-polygon': boolean;
}
