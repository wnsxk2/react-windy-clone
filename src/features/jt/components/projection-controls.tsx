import { Button } from '@/components/ui/button';

import type { Projection } from '../types';

interface ProjectionControlsProps {
  onProjectionChange: (projection: Projection) => void;
}

export function ProjectionControls({
  onProjectionChange,
}: ProjectionControlsProps) {
  return (
    <>
      <Button onClick={() => onProjectionChange('mercator')}>2D</Button>
      <Button onClick={() => onProjectionChange('globe')}>3D</Button>
    </>
  );
}
