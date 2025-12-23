import type { FeatureCollection, LineString, MultiPolygon, Point, Polygon } from 'geojson';

export const POINT_DATA: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '서울', population: 9700000 },
      geometry: { type: 'Point', coordinates: [126.978, 37.5665] },
    },
    {
      type: 'Feature',
      properties: { name: '부산', population: 3400000 },
      geometry: { type: 'Point', coordinates: [129.0756, 35.1796] },
    },
    {
      type: 'Feature',
      properties: { name: '인천', population: 2900000 },
      geometry: { type: 'Point', coordinates: [126.7052, 37.4563] },
    },
    {
      type: 'Feature',
      properties: { name: '대구', population: 2400000 },
      geometry: { type: 'Point', coordinates: [128.6014, 35.8714] },
    },
    {
      type: 'Feature',
      properties: { name: '대전', population: 1500000 },
      geometry: { type: 'Point', coordinates: [127.3845, 36.3504] },
    },
  ],
};

export const LINE_DATA: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '경부선', type: 'rail' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [126.978, 37.5665],
          [127.3845, 36.3504],
          [128.6014, 35.8714],
          [129.0756, 35.1796],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: '호남선', type: 'rail' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [126.978, 37.5665],
          [127.0, 36.5],
          [126.9, 35.8],
          [126.8545, 35.1595],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: '경인선', type: 'rail' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [126.978, 37.5665],
          [126.85, 37.52],
          [126.7052, 37.4563],
        ],
      },
    },
  ],
};

export const POLYGON_DATA: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '서울 중심부', area: 'central' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [126.9, 37.5],
            [127.05, 37.5],
            [127.05, 37.62],
            [126.9, 37.62],
            [126.9, 37.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: '부산 중심부', area: 'central' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [129.0, 35.1],
            [129.15, 35.1],
            [129.15, 35.25],
            [129.0, 35.25],
            [129.0, 35.1],
          ],
        ],
      },
    },
  ],
};

export const MULTI_POLYGON_DATA: FeatureCollection<MultiPolygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '수도권', region: 'metropolitan' },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [126.7, 37.3],
              [127.2, 37.3],
              [127.2, 37.7],
              [126.7, 37.7],
              [126.7, 37.3],
            ],
          ],
          [
            [
              [126.5, 37.35],
              [126.75, 37.35],
              [126.75, 37.55],
              [126.5, 37.55],
              [126.5, 37.35],
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: '영남권', region: 'yeongnam' },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [128.4, 35.7],
              [128.9, 35.7],
              [128.9, 36.1],
              [128.4, 36.1],
              [128.4, 35.7],
            ],
          ],
          [
            [
              [128.9, 35.0],
              [129.3, 35.0],
              [129.3, 35.4],
              [128.9, 35.4],
              [128.9, 35.0],
            ],
          ],
        ],
      },
    },
  ],
};
