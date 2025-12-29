import type {
  FeatureCollection,
  LineString,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

export interface HeatmapPoint {
  coordinates: [number, number];
  weight: number;
}

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

interface HeatmapCluster {
  center: [number, number];
  weight: number;
  radius: number;
  count: number;
}

function generateHeatmapData(totalPoints: number): FeatureCollection<Point> {
  const clusters: HeatmapCluster[] = [
    // 서울 (고밀도 - 30%)
    { center: [126.978, 37.5665], weight: 1.0, radius: 0.15, count: Math.floor(totalPoints * 0.15) },
    { center: [127.027, 37.498], weight: 0.95, radius: 0.1, count: Math.floor(totalPoints * 0.1) },
    { center: [126.93, 37.52], weight: 0.85, radius: 0.08, count: Math.floor(totalPoints * 0.05) },
    // 부산 (중밀도 - 15%)
    { center: [129.0756, 35.1796], weight: 0.8, radius: 0.12, count: Math.floor(totalPoints * 0.1) },
    { center: [129.12, 35.15], weight: 0.7, radius: 0.08, count: Math.floor(totalPoints * 0.05) },
    // 인천 (중밀도 - 10%)
    { center: [126.7052, 37.4563], weight: 0.75, radius: 0.1, count: Math.floor(totalPoints * 0.1) },
    // 대구 (중밀도 - 8%)
    { center: [128.6014, 35.8714], weight: 0.7, radius: 0.1, count: Math.floor(totalPoints * 0.08) },
    // 대전 (중밀도 - 7%)
    { center: [127.3845, 36.3504], weight: 0.65, radius: 0.08, count: Math.floor(totalPoints * 0.07) },
    // 광주 (중밀도 - 6%)
    { center: [126.8526, 35.1595], weight: 0.6, radius: 0.08, count: Math.floor(totalPoints * 0.06) },
    // 울산 (저밀도 - 4%)
    { center: [129.3114, 35.5384], weight: 0.55, radius: 0.08, count: Math.floor(totalPoints * 0.04) },
    // 수원 (저밀도 - 4%)
    { center: [127.0286, 37.2636], weight: 0.5, radius: 0.06, count: Math.floor(totalPoints * 0.04) },
    // 창원 (저밀도 - 3%)
    { center: [128.6811, 35.2281], weight: 0.45, radius: 0.06, count: Math.floor(totalPoints * 0.03) },
    // 전주 (저밀도 - 3%)
    { center: [127.1480, 35.8242], weight: 0.4, radius: 0.06, count: Math.floor(totalPoints * 0.03) },
    // 청주 (저밀도 - 2%)
    { center: [127.4890, 36.6424], weight: 0.35, radius: 0.05, count: Math.floor(totalPoints * 0.02) },
    // 제주 (저밀도 - 2%)
    { center: [126.5312, 33.4996], weight: 0.5, radius: 0.1, count: Math.floor(totalPoints * 0.02) },
  ];

  const features: FeatureCollection<Point>['features'] = [];

  let seed = 12345;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  // 가우시안 분포를 위한 Box-Muller 변환
  const gaussianRandom = (mean: number, stdDev: number): number => {
    const u1 = random();
    const u2 = random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
  };

  // 클러스터별 포인트 생성
  clusters.forEach((cluster) => {
    for (let i = 0; i < cluster.count; i++) {
      const lng = gaussianRandom(cluster.center[0], cluster.radius * 0.4);
      const lat = gaussianRandom(cluster.center[1], cluster.radius * 0.4);

      // 거리 기반 가중치 감소
      const distance = Math.sqrt(
        Math.pow(lng - cluster.center[0], 2) + Math.pow(lat - cluster.center[1], 2)
      );
      const distanceFactor = Math.max(0, 1 - distance / cluster.radius);
      const weight = cluster.weight * distanceFactor * (0.7 + random() * 0.3);

      features.push({
        type: 'Feature',
        properties: { weight: Math.round(weight * 100) / 100 },
        geometry: {
          type: 'Point',
          coordinates: [
            Math.round(lng * 10000) / 10000,
            Math.round(lat * 10000) / 10000,
          ],
        },
      });
    }
  });

  // 나머지 포인트는 한반도 전역에 분산
  const remainingCount = totalPoints - features.length;
  for (let i = 0; i < remainingCount; i++) {
    const lng = 125.5 + random() * 4.5; // 125.5 ~ 130
    const lat = 33.0 + random() * 5.5; // 33 ~ 38.5

    features.push({
      type: 'Feature',
      properties: { weight: Math.round((0.1 + random() * 0.3) * 100) / 100 },
      geometry: {
        type: 'Point',
        coordinates: [
          Math.round(lng * 10000) / 10000,
          Math.round(lat * 10000) / 10000,
        ],
      },
    });
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}

export const HEATMAP_DATA: FeatureCollection<Point> = generateHeatmapData(10000);
