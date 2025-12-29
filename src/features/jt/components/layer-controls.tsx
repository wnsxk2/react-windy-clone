import type { LayerVisibility, VectorLayerType } from '../types';

interface LayerControlsProps {
  visibility: LayerVisibility;
  onToggle: (layerType: VectorLayerType) => void;
}

const LAYER_CONFIG: { type: VectorLayerType; label: string; color: string }[] = [
  { type: 'point', label: 'Point', color: '#ef4444' },
  { type: 'line', label: 'Line', color: '#3b82f6' },
  { type: 'polygon', label: 'Polygon', color: '#22c55e' },
  { type: 'multi-polygon', label: 'MultiPolygon', color: '#9333ea' },
  { type: 'heatmap', label: 'Heatmap', color: '#f97316' },
];

export function LayerControls({ visibility, onToggle }: LayerControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#374151',
          marginBottom: '4px',
        }}
      >
        Vector Layers
      </div>
      {LAYER_CONFIG.map(({ type, label, color }) => (
        <label
          key={type}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          <input
            type="checkbox"
            checked={visibility[type]}
            onChange={() => onToggle(type)}
            style={{ cursor: 'pointer' }}
          />
          <span
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: color,
              borderRadius: type === 'point' ? '50%' : '2px',
              border: '1px solid rgba(0,0,0,0.2)',
            }}
          />
          <span style={{ color: '#374151' }}>{label}</span>
        </label>
      ))}
    </div>
  );
}
