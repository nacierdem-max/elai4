'use client';
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

interface DeptDataPoint {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: DeptDataPoint[];
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-modal text-xs">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground mt-1">
        <span className="font-bold tabular-nums text-foreground">{d.value}</span> görev
      </p>
    </div>
  );
}

export default function DeptPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={48}
          outerRadius={72}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-dept-${index}`} fill={entry.color} opacity={0.85} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}