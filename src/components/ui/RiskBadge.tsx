import React from 'react';
import type { RiskStatus } from '@/data/mockData';

const RISK_COLORS: Record<RiskStatus, { bg: string; text: string; border: string }> = {
  Açık: { bg: '#ef444420', text: '#ef4444', border: '#ef444440' },
  Riskli: { bg: '#f9731620', text: '#f97316', border: '#f9731640' },
  'Çözüm Aranıyor': { bg: '#eab30820', text: '#eab308', border: '#eab30840' },
  Kapatıldı: { bg: '#22c55e20', text: '#22c55e', border: '#22c55e40' },
};

interface RiskBadgeProps {
  status: RiskStatus;
}

export default function RiskBadge({ status }: RiskBadgeProps) {
  const colors = RISK_COLORS[status];
  return (
    <span
      className="inline-flex items-center text-xs px-2 py-0.5 rounded font-semibold"
      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {status}
    </span>
  );
}