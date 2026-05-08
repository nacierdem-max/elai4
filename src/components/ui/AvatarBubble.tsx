import React from 'react';
import { DEPARTMENT_COLORS, type Department } from '@/data/mockData';

interface AvatarBubbleProps {
  initials: string;
  department: Department;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  name?: string;
}

const SIZE_CLASSES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-sm',
};

export default function AvatarBubble({ initials, department, size = 'md', name }: AvatarBubbleProps) {
  const color = DEPARTMENT_COLORS[department] || '#94a3b8';

  return (
    <div
      className={`rounded-full font-bold flex items-center justify-center shrink-0 ${SIZE_CLASSES[size]}`}
      style={{ backgroundColor: `${color}25`, color, border: `1.5px solid ${color}50` }}
      title={name}
    >
      {initials.slice(0, 2)}
    </div>
  );
}