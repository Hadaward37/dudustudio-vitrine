'use client';

import { useState } from 'react';
import { FlavorMap as FlavorMapType } from '@/app/types';

interface FlavorMapProps {
  data: FlavorMapType;
}

export default function FlavorMap({ data }: FlavorMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const flavors = [
    { key: 'sweetness', label: 'Doçura', value: data.sweetness },
    { key: 'bitterness', label: 'Amargor', value: data.bitterness },
    { key: 'acidity', label: 'Acidez', value: data.acidity },
    { key: 'creaminess', label: 'Cremosidade', value: data.creaminess },
  ];

  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / flavors.length;

  const points = flavors.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  const dataPoints = flavors.map((f, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (f.value / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const pathD = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="#C4A77D"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}
        {/* Axes */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="#C4A77D"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}
        {/* Data area */}
        <path
          d={pathD}
          fill="#C4A77D"
          fillOpacity={0.3}
          stroke="#C4A77D"
          strokeWidth={2}
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#2C1810"
          />
        ))}
      </svg>
      <div className="space-y-2">
        {flavors.map((f) => (
          <div
            key={f.key}
            className="flex items-center gap-2"
            onMouseEnter={() => setHovered(f.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: hovered === f.key ? '#D4AF37' : '#C4A77D',
                transform: hovered === f.key ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            />
            <span className="text-sm text-[#8B7355]">{f.label}</span>
            <div className="w-24 h-1.5 bg-[#C4A77D]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C4A77D] rounded-full transition-all duration-500"
                style={{ width: `${f.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
