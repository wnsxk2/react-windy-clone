/**
 * 대한민국 영역 그리드 생성기
 *
 * 이 모듈은 대한민국 지도 영역을 그리드로 분할하고,
 * 히트맵을 위한 샘플 포인트를 생성합니다.
 */

import type { SamplePoint } from './interpolation';

/**
 * 그리드 셀 인터페이스
 */
export interface GridCell {
  lng: number; // 경도 (셀의 중심점)
  lat: number; // 위도 (셀의 중심점)
  row: number; // 행 인덱스 (0부터 시작)
  col: number; // 열 인덱스 (0부터 시작)
}

/**
 * 대한민국 경계 인터페이스
 */
export interface KoreaBounds {
  minLng: number; // 최소 경도
  maxLng: number; // 최대 경도
  minLat: number; // 최소 위도
  maxLat: number; // 최대 위도
}

/**
 * 대한민국 경계 좌표
 *
 * @remarks
 * 이 경계는 대한민국 본토와 제주도를 포함하는 사각 영역입니다.
 * 실제 국경선과는 다를 수 있습니다.
 */
export const KOREA_BOUNDS: KoreaBounds = {
  minLng: 124.5, // 서쪽 경계
  maxLng: 132.0, // 동쪽 경계
  minLat: 33.0, // 남쪽 경계 (제주도 포함)
  maxLat: 38.5, // 북쪽 경계
};

/**
 * 대한민국 영역에 그리드 생성
 *
 * 지정된 행과 열 개수로 대한민국 영역을 균등하게 분할하고,
 * 각 셀의 중심점 좌표를 계산합니다.
 *
 * @param rows - 그리드 행 개수
 * @param cols - 그리드 열 개수
 * @returns 그리드 셀 배열
 *
 * @example
 * ```typescript
 * const grid = generateGrid(50, 50);
 * console.log(grid.length); // 2500
 * console.log(grid[0]); // { lng: 124.575, lat: 33.055, row: 0, col: 0 }
 * ```
 */
export function generateGrid(rows: number, cols: number): GridCell[] {
  const cells: GridCell[] = [];

  // 경도/위도 범위 계산
  const lngRange = KOREA_BOUNDS.maxLng - KOREA_BOUNDS.minLng;
  const latRange = KOREA_BOUNDS.maxLat - KOREA_BOUNDS.minLat;

  // 각 셀의 크기 계산
  const cellWidth = lngRange / cols;
  const cellHeight = latRange / rows;

  // 각 행과 열에 대해 셀 생성
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 셀의 중심점 계산
      const lng = KOREA_BOUNDS.minLng + cellWidth * col + cellWidth / 2;
      const lat = KOREA_BOUNDS.minLat + cellHeight * row + cellHeight / 2;

      cells.push({
        lng,
        lat,
        row,
        col,
      });
    }
  }

  return cells;
}

/**
 * 주요 도시 클러스터 정의
 */
interface CityCluster {
  name: string; // 도시 이름
  center: [number, number]; // [경도, 위도]
  weight: number; // 기본 가중치 (0-1)
  radius: number; // 클러스터 반경 (도 단위)
  count: number; // 이 클러스터에서 생성할 포인트 개수
}

/**
 * 주요 도시 클러스터 데이터
 */
const CITY_CLUSTERS: CityCluster[] = [
  // 서울 (가장 높은 밀도)
  {
    name: '서울',
    center: [126.978, 37.5665],
    weight: 1.0,
    radius: 0.15,
    count: 0.15, // 전체의 15%
  },
  {
    name: '서울-강남',
    center: [127.027, 37.498],
    weight: 0.95,
    radius: 0.1,
    count: 0.1,
  },
  {
    name: '서울-강북',
    center: [126.93, 37.52],
    weight: 0.85,
    radius: 0.08,
    count: 0.05,
  },
  // 부산
  {
    name: '부산',
    center: [129.0756, 35.1796],
    weight: 0.8,
    radius: 0.12,
    count: 0.1,
  },
  {
    name: '부산-해운대',
    center: [129.12, 35.15],
    weight: 0.7,
    radius: 0.08,
    count: 0.05,
  },
  // 인천
  {
    name: '인천',
    center: [126.7052, 37.4563],
    weight: 0.75,
    radius: 0.1,
    count: 0.1,
  },
  // 대구
  {
    name: '대구',
    center: [128.6014, 35.8714],
    weight: 0.7,
    radius: 0.1,
    count: 0.08,
  },
  // 대전
  {
    name: '대전',
    center: [127.3845, 36.3504],
    weight: 0.65,
    radius: 0.08,
    count: 0.07,
  },
  // 광주
  {
    name: '광주',
    center: [126.8526, 35.1595],
    weight: 0.6,
    radius: 0.08,
    count: 0.06,
  },
  // 울산
  {
    name: '울산',
    center: [129.3114, 35.5384],
    weight: 0.55,
    radius: 0.08,
    count: 0.04,
  },
  // 수원
  {
    name: '수원',
    center: [127.0286, 37.2636],
    weight: 0.5,
    radius: 0.06,
    count: 0.04,
  },
  // 창원
  {
    name: '창원',
    center: [128.6811, 35.2281],
    weight: 0.45,
    radius: 0.06,
    count: 0.03,
  },
  // 전주
  {
    name: '전주',
    center: [127.148, 35.8242],
    weight: 0.4,
    radius: 0.06,
    count: 0.03,
  },
  // 청주
  {
    name: '청주',
    center: [127.489, 36.6424],
    weight: 0.35,
    radius: 0.05,
    count: 0.02,
  },
  // 제주
  {
    name: '제주',
    center: [126.5312, 33.4996],
    weight: 0.5,
    radius: 0.1,
    count: 0.02,
  },
];

/**
 * 시드 기반 난수 생성기
 *
 * @remarks
 * Linear Congruential Generator (LCG) 알고리즘 사용
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number = 12345) {
    this.seed = seed;
  }

  /**
   * 0과 1 사이의 난수 생성
   */
  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  /**
   * 가우시안 분포 난수 생성 (Box-Muller 변환)
   *
   * @param mean - 평균
   * @param stdDev - 표준 편차
   * @returns 가우시안 분포를 따르는 난수
   */
  gaussian(mean: number, stdDev: number): number {
    const u1 = this.next();
    const u2 = this.next();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
  }
}

/**
 * 대한민국 주요 도시 및 랜덤 지점 샘플 포인트 생성
 *
 * 주요 도시를 중심으로 가우시안 분포를 따르는 클러스터를 생성하고,
 * 나머지는 전역에 균등하게 분산시킵니다.
 *
 * @param count - 생성할 샘플 포인트 개수 (default: 500)
 * @returns 샘플 포인트 배열
 *
 * @example
 * ```typescript
 * const samples = generateSamplePoints(1000);
 * console.log(samples.length); // 1000
 * console.log(samples[0]); // { lng: 126.98, lat: 37.56, value: 0.95 }
 * ```
 *
 * @remarks
 * - 시드를 고정하여 매번 동일한 결과를 생성합니다
 * - 주요 도시 근처에 높은 밀도의 포인트를 생성합니다
 * - 거리에 따라 가중치가 감소합니다
 */
export function generateSamplePoints(count: number = 500): SamplePoint[] {
  const samples: SamplePoint[] = [];
  const random = new SeededRandom(12345);

  // 클러스터별 포인트 생성
  CITY_CLUSTERS.forEach((cluster) => {
    const clusterCount = Math.floor(count * cluster.count);

    for (let i = 0; i < clusterCount; i++) {
      // 가우시안 분포로 클러스터 중심 주변에 포인트 생성
      const lng = random.gaussian(cluster.center[0], cluster.radius * 0.4);
      const lat = random.gaussian(cluster.center[1], cluster.radius * 0.4);

      // 클러스터 중심으로부터의 거리 계산
      const distance = Math.sqrt(
        Math.pow(lng - cluster.center[0], 2) + Math.pow(lat - cluster.center[1], 2)
      );

      // 거리에 따라 가중치 감소
      const distanceFactor = Math.max(0, 1 - distance / cluster.radius);
      const value = cluster.weight * distanceFactor * (0.7 + random.next() * 0.3);

      // 대한민국 경계 내로 제한
      const clampedLng = Math.max(
        KOREA_BOUNDS.minLng,
        Math.min(KOREA_BOUNDS.maxLng, lng)
      );
      const clampedLat = Math.max(
        KOREA_BOUNDS.minLat,
        Math.min(KOREA_BOUNDS.maxLat, lat)
      );

      samples.push({
        lng: Math.round(clampedLng * 10000) / 10000,
        lat: Math.round(clampedLat * 10000) / 10000,
        value: Math.round(Math.max(0, Math.min(1, value)) * 100) / 100,
      });
    }
  });

  // 나머지 포인트는 전역에 균등 분산
  const remainingCount = count - samples.length;
  for (let i = 0; i < remainingCount; i++) {
    const lng = KOREA_BOUNDS.minLng + random.next() * (KOREA_BOUNDS.maxLng - KOREA_BOUNDS.minLng);
    const lat = KOREA_BOUNDS.minLat + random.next() * (KOREA_BOUNDS.maxLat - KOREA_BOUNDS.minLat);

    samples.push({
      lng: Math.round(lng * 10000) / 10000,
      lat: Math.round(lat * 10000) / 10000,
      value: Math.round((0.1 + random.next() * 0.3) * 100) / 100,
    });
  }

  return samples;
}
