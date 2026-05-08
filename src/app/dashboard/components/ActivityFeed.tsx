import React from 'react';
import { Activity, ExternalLink } from 'lucide-react';
import { ACTIVITY_LOGS, PERSONS, PROJECTS, DEPARTMENT_COLORS } from '@/data/mockData';
import Link from 'next/link';

const ACTION_COLORS: Record<string, string> = {
  'Görev Güncellendi': '#3b7dd8',
  'Dosya Eklendi': '#06b6d4',
  'Risk Açıldı': '#f97316',
  'Görev Tamamlandı': '#22c55e',
  'Mesaj Gönderildi': '#8b5cf6',
  'Görev Eklendi': '#a78bfa',
  'Risk Güncellendi': '#eab308',
  'Görev Gecikti': '#ef4444',
};

// Featured project for "Katkı Veren Ekip" section
const FEATURED_PROJECT_ID = 'prj-002';

export default function ActivityFeed() {
  const featuredProject = PROJECTS.find(p => p.id === FEATURED_PROJECT_ID);
  const collaborators = featuredProject
    ? [featuredProject.leadId, ...(featuredProject.collaboratorIds || [])].slice(0, 5).map(id => PERSONS.find(p => p.id === id)).filter(Boolean)
    : [];

  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Son Aktivite</h3>
            <p className="text-xs text-muted-foreground">980+ toplam log kaydı</p>
          </div>
        </div>
        <Link href="/logs" className="text-xs text-primary hover:underline flex items-center gap-1">
          Tümü <ExternalLink size={11} />
        </Link>
      </div>

      {/* Featured project collaborators */}
      {featuredProject && collaborators.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-muted/30 border border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Katkı Veren Ekip — {featuredProject.name}</p>
          <div className="flex flex-wrap gap-2">
            {collaborators.map(person => {
              if (!person) return null;
              const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
              return (
                <div key={person.id} className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-card">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: deptColor }}
                  >
                    {person.avatar.slice(0, 2)}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{person.name.split(' ')[0]} {person.name.split(' ')[1]}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${deptColor}20`, color: deptColor }}
                  >
                    {person.department}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-1">
        {ACTIVITY_LOGS.slice(0, 10).map((log) => {
          const user = PERSONS.find(p => p.id === log.userId);
          const actionColor = ACTION_COLORS[log.action] || '#94a3b8';
          const deptColor = user ? DEPARTMENT_COLORS[user.department] || '#94a3b8' : '#94a3b8';
          const hasProgressDelta = log.progressDelta && log.progressDelta.startsWith('+');

          return (
            <div
              key={`log-${log.id}`}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-all duration-100 cursor-pointer group"
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white"
                style={{ backgroundColor: deptColor }}
              >
                {user?.avatar.slice(0, 2) || '?'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-foreground">{user?.name || 'Bilinmeyen'}</span>
                  {user && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${deptColor}20`, color: deptColor }}
                    >
                      {user.department}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{log.detail}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{log.date}</p>
              </div>

              {/* Progress delta or result badge */}
              {hasProgressDelta ? (
                <span className="text-xs font-bold text-emerald-500 shrink-0 mt-1 whitespace-nowrap">
                  {log.progressDelta}
                </span>
              ) : (
                <span
                  className="text-xs px-1.5 py-0.5 rounded shrink-0 mt-1 whitespace-nowrap"
                  style={{
                    backgroundColor: log.result === 'Başarılı' || log.result === 'Tamamlandı' ? '#22c55e20' : log.result === 'Gecikmiş' ? '#ef444420' : `${actionColor}20`,
                    color: log.result === 'Başarılı' || log.result === 'Tamamlandı' ? '#22c55e' : log.result === 'Gecikmiş' ? '#ef4444' : actionColor,
                  }}
                >
                  {log.result}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}