import { useState } from 'react';
import type { ViewState } from 'react-map-gl/maplibre';

import { INITIAL_VIEW_STATE } from '../constants';
import type { Projection } from '../types';

export function useMapState() {
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
