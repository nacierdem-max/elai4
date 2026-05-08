import React from 'react';
import { STATUS_COLORS, type TaskStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: TaskStatus | string;
  size?: 'sm' | 'md';
}

const STATUS_LABELS: Record<string, string> = {
  Plan: 'Plan',
  Yapılıyor: 'Yapılıyor',
  Test: 'Test',
  Tamamlandı: 'Tamamlandı',
  Gecikmiş: 'Gecikmiş',
  Riskli: 'Riskli',
  'Plan Dışı': 'Plan Dışı',
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const color = (STATUS_COLORS as Record<string, string>)[status] || '#94a3b8';
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
      {STATUS_LABELS[status] || status}
    </span>
  );
}