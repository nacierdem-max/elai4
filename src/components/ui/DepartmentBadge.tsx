import React from 'react';
import { DEPARTMENT_COLORS, type Department } from '@/data/mockData';

interface DepartmentBadgeProps {
  department: Department;
  size?: 'sm' | 'md';
}

export default function DepartmentBadge({ department, size = 'md' }: DepartmentBadgeProps) {
  const color = DEPARTMENT_COLORS[department] || '#94a3b8';
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span
      className={`inline-flex items-center rounded font-semibold tracking-wide ${sizeClass}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {department}
    </span>
  );
}