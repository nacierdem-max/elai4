import React from 'react';
import Link from 'next/link';
import { BarChart2, ExternalLink } from 'lucide-react';
import { PERSONS, DEPARTMENT_COLORS } from '@/data/mockData';
import AvatarBubble from '@/components/ui/AvatarBubble';

const TOP_ENGINEERS = PERSONS?.filter(p => p?.activeTasks > 0)?.sort((a, b) => b?.activeTasks - a?.activeTasks)?.slice(0, 8);

const MAX_TASKS = Math.max(...TOP_ENGINEERS?.map(p => p?.activeTasks));

export default function TopEngineersWorkload() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <BarChart2 size={16} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">En Yoğun Mühendisler</h3>
            <p className="text-xs text-muted-foreground">Aktif görev sayısına göre</p>
          </div>
        </div>
        <Link href="/team" className="text-xs text-primary hover:underline flex items-center gap-1">
          Tümü <ExternalLink size={11} />
        </Link>
      </div>
      <div className="space-y-3">
        {TOP_ENGINEERS?.map((person, idx) => {
          const deptColor = DEPARTMENT_COLORS?.[person?.department] || '#94a3b8';
          const barWidth = (person?.activeTasks / MAX_TASKS) * 100;
          const isOverloaded = person?.activeTasks >= 7;

          return (
            <div key={`topeng-${person?.id}`} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-xs font-mono text-muted-foreground w-4 shrink-0 tabular-nums">
                {idx + 1}
              </span>
              <AvatarBubble
                initials={person?.avatar}
                department={person?.department}
                size="sm"
                name={person?.name}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-foreground truncate">{person?.name}</p>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {isOverloaded && (
                      <span className="text-xs text-orange-400 font-semibold">⚠</span>
                    )}
                    <span className="text-xs font-bold tabular-nums" style={{ color: deptColor }}>
                      {person?.activeTasks}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: isOverloaded ? '#f97316' : deptColor,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{person?.department}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          <span className="text-orange-400 font-semibold">⚠ Aşırı yük:</span> 7+ aktif görev
        </p>
      </div>
    </div>
  );
}