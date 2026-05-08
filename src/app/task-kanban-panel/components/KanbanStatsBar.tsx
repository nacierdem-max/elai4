import React from 'react';
import { type Task, STATUS_COLORS, type TaskStatus } from '@/data/mockData';

interface Props {
  tasks: Task[];
}

const STATUS_LIST: TaskStatus[] = ['Plan', 'Yapılıyor', 'Test', 'Tamamlandı', 'Gecikmiş', 'Riskli', 'Plan Dışı'];

export default function KanbanStatsBar({ tasks }: Props) {
  const total = tasks.length;

  const counts = STATUS_LIST.reduce((acc, s) => {
    acc[s] = tasks.filter(t => t.status === s).length;
    return acc;
  }, {} as Record<TaskStatus, number>);

  return (
    <div className="card-base p-4">
      <div className="flex items-center gap-1 mb-3">
        <div className="flex-1 flex h-2 rounded-full overflow-hidden gap-0.5">
          {STATUS_LIST.map((s) => {
            const pct = total > 0 ? (counts[s] / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={`statbar-${s}`}
                style={{ width: `${pct}%`, backgroundColor: STATUS_COLORS[s] }}
                title={`${s}: ${counts[s]}`}
              />
            );
          })}
        </div>
        <span className="text-xs text-muted-foreground ml-3 tabular-nums shrink-0">{total} görev</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {STATUS_LIST.map((s) => (
          <div key={`statscount-${s}`} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[s] }} />
            <span className="text-xs text-muted-foreground">{s}</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: STATUS_COLORS[s] }}>{counts[s]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}