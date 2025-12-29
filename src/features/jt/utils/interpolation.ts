/**
 * IDW (Inverse Distance Weighting) 보간 알고리즘 유틸리티
 *
 * 이 모듈은 지리 공간 데이터의 보간을 위한 IDW 알고리즘을 제공합니다.
 */

/**
 * 샘플 포인트 인터페이스
 */
export interface SamplePoint {
  lng: number; // 경도
  lat: number; // 위도
  value: number; // 샘플 값
}

/**
 * IDW 보간 옵션
 */
export interface InterpolationOptions {
  /**
   * IDW power parameter (default: 2)
   * 값이 클수록 가까운 샘플의 영향이 커짐
   */
  power?: number;

  /**
   * 최대 영향 거리 (optional)
   * 이 거리를 초과하는 샘플은 무시됨
   */
  maxDistance?: number;
}

/**
 * 두 지점 간 유클리디안 거리 계산
 *
 * @param lng1 - 첫 번째 지점 경도
 * @param lat1 - 첫 번째 지점 위도
 * @param lng2 - 두 번째 지점 경도
 * @param lat2 - 두 번째 지점 위도
 * @returns 거리 (단위: 도)
 *
 * @example
 * ```typescript
 * const distance = calculateDistance(126.978, 37.5665, 129.0756, 35.1796);
 * console.log(distance); // 약 3.16
 * ```
 */
export function calculateDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number {
  const dLng = lng2 - lng1;
  const dLat = lat2 - lat1;

  // 유클리디안 거리: sqrt((x2-x1)^2 + (y2-y1)^2)
  return Math.sqrt(dLng * dLng + dLat * dLat);
}

/**
 * IDW (Inverse Distance Weighting) 보간
 *
 * 주어진 샘플 포인트들로부터 타겟 지점의 값을 보간합니다.
 * 거리의 역수를 가중치로 사용하여 가까운 샘플일수록 더 큰 영향을 미칩니다.
 *
 * @param targetLng - 타겟 지점 경도
 * @param targetLat - 타겟 지점 위도
 * @param samples - 샘플 포인트 배열
 * @param options - 보간 옵션
 * @returns 보간된 값
 *
 * @example
 * ```typescript
 * const samples = [
 *   { lng: 127.0, lat: 37.5, value: 1.0 },
 *   { lng: 128.0, lat: 36.5, value: 0.5 },
 * ];
 *
 * const result = interpolateIDW(127.5, 37.0, samples);
 * console.log(result); // 보간된 값
 * ```
 *
 * @remarks
 * - 타겟 지점이 샘플 포인트와 정확히 일치하면 해당 샘플 값 반환
 * - 샘플이 하나만 있으면 해당 샘플 값 반환
 * - power 값이 클수록 가까운 샘플의 영향이 커짐 (기본값: 2)
 */
export function interpolateIDW(
  targetLng: number,
  targetLat: number,
  samples: SamplePoint[],
  options: InterpolationOptions = {}
): number {
  const { power = 2, maxDistance } = options;

  // 단일 샘플인 경우 해당 값 반환
  if (samples.length === 1) {
    return samples[0].value;
  }

  let weightSum = 0;
  let valueSum = 0;

  for (const sample of samples) {
    const distance = calculateDistance(targetLng, targetLat, sample.lng, sample.lat);

    // 거리가 0인 경우 (타겟이 샘플 위치와 정확히 일치)
    if (distance === 0) {
      return sample.value;
    }

    // maxDistance를 초과하는 샘플 무시
    if (maxDistance !== undefined && distance > maxDistance) {
      continue;
    }

    // IDW 가중치 계산: 1 / distance^power
    const weight = 1 / Math.pow(distance, power);

    weightSum += weight;
    valueSum += weight * sample.value;
  }

  // 가중 평균 계산
  if (weightSum === 0) {
    // 모든 샘플이 maxDistance를 초과하는 경우
    // 가장 가까운 샘플의 값 반환
    const closestSample = samples.reduce((closest, current) => {
      const currentDistance = calculateDistance(
        targetLng,
        targetLat,
        current.lng,
        current.lat
      );
      const closestDistance = calculateDistance(
        targetLng,
        targetLat,
        closest.lng,
        closest.lat
      );
      return currentDistance < closestDistance ? current : closest;
    });

    return closestSample.value;
  }

  return valueSum / weightSum;
}
