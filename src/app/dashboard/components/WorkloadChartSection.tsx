'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MONTHLY_WORKLOAD, DEPT_TASK_DISTRIBUTION } from '@/data/mockData';

const WorkloadBarChart = dynamic(() => import('./WorkloadBarChart'), { ssr: false });
const DeptPieChart = dynamic(() => import('./DeptPieChart'), { ssr: false });

export default function WorkloadChartSection() {
  const [activeTab, setActiveTab] = useState<'bar' | 'pie'>('bar');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {/* Monthly workload bar chart */}
      <div className="card-base p-5 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Aylık Görev Yoğunluğu</h3>
            <p className="text-xs text-muted-foreground mt-0.5">2026 yılı — plan, yapılıyor, tamamlandı, gecikme dağılımı</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-3 text-xs">
              {[
                { label: 'Plan', color: '#3b7dd8' },
                { label: 'Yapılıyor', color: '#06b6d4' },
                { label: 'Tamamlandı', color: '#22c55e' },
                { label: 'Gecikme', color: '#ef4444' },
              ]?.map((l) => (
                <div key={`legend-bar-${l?.label}`} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l?.color }} />
                  <span className="text-muted-foreground">{l?.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WorkloadBarChart data={MONTHLY_WORKLOAD} />
      </div>
      {/* Department pie chart */}
      <div className="card-base p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground">Departman Görev Dağılımı</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Toplam 1.082 görev · 10 departman</p>
        </div>
        <DeptPieChart data={DEPT_TASK_DISTRIBUTION} />
        <div className="mt-3 space-y-1.5">
          {DEPT_TASK_DISTRIBUTION?.slice(0, 5)?.map((d) => (
            <Link
              key={`dept-legend-${d?.name}`}
              href="/team"
              className="flex items-center gap-2 hover:bg-muted/30 rounded-lg px-1 py-0.5 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d?.color }} />
              <span className="text-xs text-muted-foreground flex-1">{d?.name}</span>
              <span className="text-xs font-semibold tabular-nums text-foreground">{d?.value}</span>
              <div className="w-16 bg-muted rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${(d?.value / 218) * 100}%`, backgroundColor: d?.color }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}