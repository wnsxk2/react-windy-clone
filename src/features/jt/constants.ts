import type { ViewState } from 'react-map-gl/maplibre';

export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
export const MIN_ZOOM = 2.67;

export const INITIAL_VIEW_STATE: ViewState = {
  longitude: 127,
  latitude: 37,
  zoom: 2,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};
