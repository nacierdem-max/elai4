'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

interface WorkloadDataPoint {
  ay: string;
  plan: number;
  yapiliyor: number;
  tamamlandi: number;
  gecikme: number;
}

interface Props {
  data: WorkloadDataPoint[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-modal text-xs">
      <p className="font-semibold text-foreground mb-2">{label} 2026</p>
      {payload.map((entry) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-semibold tabular-nums text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function WorkloadBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={8} barGap={2} barCategoryGap="30%">
        <defs>
          <linearGradient id="gradPlan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b7dd8" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3b7dd8" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="gradYapiliyor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="gradTamamlandi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="gradGecikme" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="ay"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
        <Bar dataKey="plan" name="Plan" fill="url(#gradPlan)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="yapiliyor" name="Yapılıyor" fill="url(#gradYapiliyor)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="tamamlandi" name="Tamamlandı" fill="url(#gradTamamlandi)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="gecikme" name="Gecikme" fill="url(#gradGecikme)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}