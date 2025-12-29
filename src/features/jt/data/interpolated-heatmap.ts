/**
 * 보간된 히트맵 데이터 생성기
 *
 * IDW (Inverse Distance Weighting) 알고리즘을 사용하여
 * 대한민국 지도의 모든 영역에 연속적인 히트맵 데이터를 생성합니다.
 */

import type { FeatureCollection, Point } from 'geojson';

import { generateGrid, generateSamplePoints } from '../utils/grid-generator';
import { interpolateIDW } from '../utils/interpolation';

/**
 * IDW 보간을 사용하여 히트맵 데이터 생성
 *
 * 샘플 포인트로부터 그리드 각 셀의 값을 보간하여
 * GeoJSON FeatureCollection 형식의 히트맵 데이터를 생성합니다.
 *
 * @param gridRows - 그리드 행 개수 (default: 50)
 * @param gridCols - 그리드 열 개수 (default: 50)
 * @param sampleCount - 샘플 포인트 개수 (default: 500)
 * @returns GeoJSON FeatureCollection with Point features
 *
 * @example
 * ```typescript
 * // 기본 50x50 그리드 생성
 * const heatmap = generateInterpolatedHeatmap();
 * console.log(heatmap.features.length); // 2500
 *
 * // 커스텀 그리드 생성
 * const customHeatmap = generateInterpolatedHeatmap(100, 100, 1000);
 * console.log(customHeatmap.features.length); // 10000
 * ```
 *
 * @remarks
 * - 그리드 각 셀의 중심점에 보간된 값을 할당합니다
 * - 샘플 포인트가 많을수록 더 정확한 보간 결과를 얻을 수 있습니다
 * - 성능: 50x50 그리드 + 500 샘플 = 약 1초 미만
 */
export function generateInterpolatedHeatmap(
  gridRows: number = 50,
  gridCols: number = 50,
  sampleCount: number = 500
): FeatureCollection<Point> {
  // 1. 샘플 포인트 생성
  const samples = generateSamplePoints(sampleCount);

  // 2. 그리드 생성
  const grid = generateGrid(gridRows, gridCols);

  // 3. 각 그리드 셀에 대해 IDW 보간 적용
  const features = grid.map((cell) => {
    // 그리드 셀 중심점에서 샘플들로부터 보간
    const interpolatedValue = interpolateIDW(cell.lng, cell.lat, samples);

    // GeoJSON Feature 생성
    return {
      type: 'Feature' as const,
      properties: {
        weight: interpolatedValue,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [cell.lng, cell.lat],
      },
    };
  });

  // 4. FeatureCollection 반환
  return {
    type: 'FeatureCollection',
    features,
  };
}

/**
 * 미리 생성된 보간 히트맵 데이터
 *
 * 앱 시작 시 한 번만 생성하여 성능을 최적화합니다.
 * 50x50 그리드와 500개 샘플 포인트를 사용합니다.
 *
 * @remarks
 * - 이 상수는 앱 초기화 시 한 번만 계산됩니다
 * - 런타임에 다시 계산할 필요가 없어 성능이 향상됩니다
 * - 개발 모드에서 hot reload 시에도 재계산되지 않습니다
 */
export const INTERPOLATED_HEATMAP_DATA: FeatureCollection<Point> =
  generateInterpolatedHeatmap();
