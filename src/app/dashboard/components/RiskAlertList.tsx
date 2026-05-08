import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { RISKS, PERSONS, PROJECTS } from '@/data/mockData';
import RiskBadge from '@/components/ui/RiskBadge';
import type { RiskStatus } from '@/data/mockData';

export default function RiskAlertList() {
  const openRisks = RISKS.filter(r => r.status !== 'Kapatıldı').slice(0, 6);

  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <AlertTriangle size={16} className="text-orange-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Açık Riskler</h3>
            <p className="text-xs text-muted-foreground">18 kritik · 29 toplam</p>
          </div>
        </div>
        <Link href="/risks" className="text-xs text-primary hover:underline flex items-center gap-1">
          Tümü <ExternalLink size={11} />
        </Link>
      </div>

      <div className="space-y-2">
        {openRisks.map((risk) => {
          const assignee = PERSONS.find(p => p.id === risk.assigneeId);
          const project = PROJECTS.find(p => p.id === risk.projectId);

          return (
            <div
              key={`risk-alert-${risk.id}`}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-all duration-150 cursor-pointer border border-transparent hover:border-border"
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{
                  backgroundColor: risk.status === 'Açık' ? '#ef4444' : risk.status === 'Riskli' ? '#f97316' : '#eab308',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{risk.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {project?.name} · {assignee?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{risk.date}</p>
              </div>
              <RiskBadge status={risk.status as RiskStatus} />
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Açık', value: 5, color: '#ef4444' },
          { label: 'Riskli', value: 2, color: '#f97316' },
          { label: 'Çözüm', value: 1, color: '#eab308' },
        ].map((s) => (
          <div key={`risk-sum-${s.label}`} className="bg-muted/30 rounded-lg py-2">
            <p className="text-lg font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}