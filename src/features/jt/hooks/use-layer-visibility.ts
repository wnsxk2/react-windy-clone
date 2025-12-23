import { useCallback, useState } from 'react';

import type { LayerVisibility, VectorLayerType } from '../types';

const INITIAL_VISIBILITY: LayerVisibility = {
  point: true,
  line: true,
  polygon: true,
  'multi-polygon': true,
};

export function useLayerVisibility() {
  const [visibility, setVisibility] = useState<LayerVisibility>(INITIAL_VISIBILITY);

  const toggleLayer = useCallback((layerType: VectorLayerType) => {
    setVisibility((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));
  }, []);

  return { visibility, toggleLayer };
}
