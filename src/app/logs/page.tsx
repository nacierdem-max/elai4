'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import {
  CHANGE_LOG,
  DELAY_REPORTS,
  DELAY_AI_SUMMARY,
  PERSONS,
  PROJECTS,
  TASKS,
  type ChangeLogEntry,
} from '@/data/mockData';
import { Clock, AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Sparkles, Filter, RefreshCw } from 'lucide-react';

const ENTITY_COLORS: Record<string, string> = {
  Görev: '#3b7dd8',
  Proje: '#8b5cf6',
  Risk: '#ef4444',
  Personel: '#22c55e',
  Dosya: '#f97316',
};

function ChangeLogRow({ entry }: { entry: ChangeLogEntry }) {
  const person = PERSONS.find(p => p.id === entry.changedById);
  const project = entry.projectId ? PROJECTS.find(p => p.id === entry.projectId) : null;
  const color = ENTITY_COLORS[entry.entityType] || '#94a3b8';

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-muted/30"
      style={{ borderLeft: `3px solid ${entry.isImportant ? color : '#e8e8ed'}` }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
        style={{ background: `${color}15`, color }}
      >
        {entry.entityType === 'Görev' ? '📋' : entry.entityType === 'Proje' ? '📁' : entry.entityType === 'Risk' ? '⚠️' : entry.entityType === 'Dosya' ? '📎' : '👤'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${color}15`, color }}
              >
                {entry.entityType}
              </span>
              <span className="text-sm font-semibold text-foreground truncate">{entry.entityName}</span>
              {entry.isImportant && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: '#fef3c7', color: '#d97706' }}>
                  Önemli
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground flex-wrap">
              <span className="font-medium text-foreground">{entry.field}</span>
              <span>değişti:</span>
              <span className="line-through opacity-60">{entry.oldValue}</span>
              <span>→</span>
              <span className="font-semibold" style={{ color }}>{entry.newValue}</span>
            </div>
            {project && (
              <p className="text-xs text-muted-foreground mt-0.5">📁 {project.name}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">{entry.timestamp.split(' ')[1]}</p>
            <p className="text-xs text-muted-foreground">{entry.timestamp.split(' ')[0]}</p>
          </div>
        </div>
        {person && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#e8f0fb', color: '#0071e3', fontSize: '8px' }}>
              {person.avatar.slice(0, 2)}
            </div>
            <span className="text-xs text-muted-foreground">{person.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DelayReportPanel() {
  const [showAI, setShowAI] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* AI Summary Banner */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fb 100%)', borderColor: '#bfdbfe' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#0071e3' }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground">Yapay Zeka Özeti</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                  Mock AI
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {DELAY_AI_SUMMARY.totalReports} gecikme raporu analiz edildi · {DELAY_AI_SUMMARY.generatedAt}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: '#0071e3', color: 'white' }}
          >
            {showAI ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAI ? 'Gizle' : 'Özeti Gör'}
          </button>
        </div>

        {showAI && (
          <div className="mt-4 space-y-4">
            {/* Top Themes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Öne Çıkan Temalar</p>
              <div className="flex flex-wrap gap-2">
                {DELAY_AI_SUMMARY.topThemes.map((theme, i) => (
                  <div
                    key={`theme-${i}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: theme.severity === 'Yüksek' ? '#fee2e2' : '#fef3c7',
                      color: theme.severity === 'Yüksek' ? '#dc2626' : '#d97706',
                    }}
                  >
                    <span>{theme.theme}</span>
                    <span className="opacity-70">({theme.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary text */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.7)' }}>
              <p className="text-sm leading-relaxed text-foreground">{DELAY_AI_SUMMARY.summary}</p>
            </div>

            {/* Action items */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Önerilen Aksiyonlar</p>
              <ul className="space-y-2">
                {DELAY_AI_SUMMARY.actionItems.map((item, i) => (
                  <li key={`action-${i}`} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" style={{ background: '#0071e3', color: 'white' }}>
                      {i + 1}
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Individual Reports */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">Gecikme Raporları ({DELAY_REPORTS.length})</h3>
        {DELAY_REPORTS.map(report => {
          const reporter = PERSONS.find(p => p.id === report.reporterId);
          const task = TASKS.find(t => t.id === report.taskId);
          const project = PROJECTS.find(p => p.id === report.projectId);
          const isExpanded = expandedReport === report.id;

          return (
            <div
              key={`delay-${report.id}`}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: '#e8e8ed' }}
            >
              <button
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/20 transition-all"
                onClick={() => setExpandedReport(isExpanded ? null : report.id)}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fee2e2', color: '#dc2626' }}>
                  <AlertTriangle size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{task?.name}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: '#fee2e2', color: '#dc2626' }}>
                      +{report.delayDays} gün
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{project?.name} · {reporter?.name} · {report.date}</p>
                </div>
                {isExpanded ? <ChevronUp size={14} className="text-muted-foreground shrink-0 mt-1" /> : <ChevronDown size={14} className="text-muted-foreground shrink-0 mt-1" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: '#f0f0f0' }}>
                  <div className="pt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Gecikme Nedeni</p>
                    <p className="text-sm text-foreground leading-relaxed">{report.delayReason}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp size={12} style={{ color: '#16a34a' }} />
                      <p className="text-xs font-bold" style={{ color: '#16a34a' }}>İyileştirme Önerisi</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#166534' }}>{report.improvementSuggestion}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LogsPage() {
  const [activeTab, setActiveTab] = useState<'changelog' | 'delays'>('changelog');
  const [entityFilter, setEntityFilter] = useState<string>('Tümü');
  const [importantOnly, setImportantOnly] = useState(false);

  const entityTypes = ['Tümü', 'Görev', 'Proje', 'Risk', 'Personel'];

  const filteredLog = CHANGE_LOG.filter(entry => {
    if (entityFilter !== 'Tümü' && entry.entityType !== entityFilter) return false;
    if (importantOnly && !entry.isImportant) return false;
    return true;
  });

  const importantCount = CHANGE_LOG.filter(e => e.isImportant).length;

  return (
    <AppLayout currentPath="/logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Log & Raporlar</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Değişiklik kaydı ve gecikme raporları · Son 30 gün
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all" style={{ background: '#e8f0fb', color: '#0071e3' }}>
            <RefreshCw size={14} />
            Yenile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Toplam Değişiklik', value: CHANGE_LOG.length, color: '#3b7dd8', icon: '📝' },
            { label: 'Önemli Değişiklik', value: importantCount, color: '#ef4444', icon: '🔴' },
            { label: 'Gecikme Raporu', value: DELAY_REPORTS.length, color: '#f97316', icon: '⏰' },
            { label: 'AI Özet Teması', value: DELAY_AI_SUMMARY.topThemes.length, color: '#8b5cf6', icon: '🤖' },
          ].map(stat => (
            <div key={`log-stat-${stat.label}`} className="card-base p-4 flex items-center gap-3">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <p className="text-xl font-bold tabular-nums" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: '#f5f5f7', border: '1px solid #e8e8ed' }}>
          {[
            { key: 'changelog', label: '🔔 Değişiklik Logu' },
            { key: 'delays', label: '⏰ Gecikme Raporları' },
          ].map(tab => (
            <button
              key={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key as 'changelog' | 'delays')}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
              style={{
                background: activeTab === tab.key ? '#ffffff' : 'transparent',
                color: activeTab === tab.key ? '#1d1d1f' : '#6e6e73',
                boxShadow: activeTab === tab.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Change Log Tab */}
        {activeTab === 'changelog' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} className="text-muted-foreground" />
              {entityTypes.map(type => (
                <button
                  key={`entity-filter-${type}`}
                  onClick={() => setEntityFilter(type)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: entityFilter === type ? '#0071e3' : '#f5f5f7',
                    color: entityFilter === type ? 'white' : '#6e6e73',
                    border: `1px solid ${entityFilter === type ? '#0071e3' : '#e8e8ed'}`,
                  }}
                >
                  {type}
                  {type !== 'Tümü' && (
                    <span className="ml-1 opacity-70">
                      {CHANGE_LOG.filter(e => e.entityType === type).length}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={() => setImportantOnly(!importantOnly)}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: importantOnly ? '#fef3c7' : '#f5f5f7',
                  color: importantOnly ? '#d97706' : '#6e6e73',
                  border: `1px solid ${importantOnly ? '#fcd34d' : '#e8e8ed'}`,
                }}
              >
                <AlertTriangle size={12} />
                Sadece Önemli ({importantCount})
              </button>
            </div>

            {/* Log entries */}
            <div className="card-base p-4 space-y-1">
              {filteredLog.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">Filtre kriterlerine uygun kayıt bulunamadı.</p>
              ) : (
                filteredLog.map(entry => (
                  <ChangeLogRow key={`cl-row-${entry.id}`} entry={entry} />
                ))
              )}
            </div>

            {/* Year transition note */}
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: '#f0f7ff', border: '1px solid #bfdbfe' }}>
              <Clock size={16} style={{ color: '#0071e3' }} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1d4ed8' }}>Yıl Geçişi Takibi</p>
                <p className="text-xs mt-0.5" style={{ color: '#3b82f6' }}>
                  Aralık 2025&apos;ten Ocak 2026&apos;ya geçen projeler otomatik olarak yeni dönemde devam ediyor.
                  Log kaydında &quot;Yıl Geçişi&quot; etiketiyle işaretlenmiş kayıtları görebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Delay Reports Tab */}
        {activeTab === 'delays' && <DelayReportPanel />}
      </div>
    </AppLayout>
  );
}
