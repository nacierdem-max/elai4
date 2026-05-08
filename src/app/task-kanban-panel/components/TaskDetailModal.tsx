'use client';
import React, { useState } from 'react';
import {
  X, ExternalLink, FileText, MessageSquare, AlertTriangle,
  GitBranch, Calendar, User, FolderKanban, Clock, ChevronRight
} from 'lucide-react';
import { type Task, PERSONS, PROJECTS, RISKS, STATUS_COLORS } from '@/data/mockData';
import StatusBadge from '@/components/ui/StatusBadge';
import DepartmentBadge from '@/components/ui/DepartmentBadge';
import AvatarBubble from '@/components/ui/AvatarBubble';
import RiskBadge from '@/components/ui/RiskBadge';
import type { RiskStatus } from '@/data/mockData';
import Icon from '@/components/ui/AppIcon';


interface Props {
  task: Task;
  onClose: () => void;
}

const MOCK_SUB_TASKS = [
  { id: 'sub-001', name: 'Gereksinimleri belgele', done: true },
  { id: 'sub-002', name: 'Tasarım revizyonu', done: false },
  { id: 'sub-003', name: 'Teknik inceleme', done: false },
];

const MOCK_FILES = [
  { id: 'mf-001', name: 'test_results_revC.pdf', type: 'pdf', date: '04.05.2026', size: '2.4 MB' },
  { id: 'mf-002', name: 'schematic_v4.dwg', type: 'dwg', date: '02.05.2026', size: '8.1 MB' },
  { id: 'mf-003', name: 'cost_analysis.xlsx', type: 'xls', date: '01.05.2026', size: '340 KB' },
];

const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: '#ef4444',
  dwg: '#06b6d4',
  xls: '#22c55e',
  xlsx: '#22c55e',
  img: '#f97316',
  zip: '#8b5cf6',
  docx: '#3b7dd8',
};

export default function TaskDetailModal({ task, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'risks' | 'subtasks'>('overview');

  const assignee = PERSONS.find(p => p.id === task.assigneeId);
  const project = PROJECTS.find(p => p.id === task.projectId);
  const relatedRisks = RISKS.filter(r => r.taskId === task.id);
  const statusColor = STATUS_COLORS[task.status] || '#94a3b8';
  const isOverdue = task.remainingDays < 0;

  const priorityColors: Record<string, string> = {
    Kritik: '#ef4444',
    Yüksek: '#f97316',
    Orta: '#eab308',
    Düşük: '#22c55e',
  };

  const TABS = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'subtasks', label: `Alt Görevler (${task.subTaskCount})` },
    { id: 'files', label: `Dosyalar (${task.fileCount})` },
    { id: 'risks', label: `Riskler (${task.riskCount})` },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-card border border-border rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-border"
          style={{ borderTop: `3px solid ${statusColor}` }}
        >
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <span className="hover:text-primary cursor-pointer transition-colors">Görevler</span>
              <ChevronRight size={12} />
              <span className="hover:text-primary cursor-pointer transition-colors">{project?.name || '—'}</span>
              <ChevronRight size={12} />
              <span className="text-foreground font-medium truncate">{task.name}</span>
            </div>

            <h2 className="text-lg font-bold text-foreground leading-snug mb-3">{task.name}</h2>

            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <DepartmentBadge department={task.department} />
              <span
                className="badge"
                style={{
                  backgroundColor: `${priorityColors[task.priority]}20`,
                  color: priorityColors[task.priority],
                  border: `1px solid ${priorityColors[task.priority]}40`,
                }}
              >
                {task.priority}
              </span>
              {task.status === 'Plan Dışı' && (
                <span className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20">Plan Dışı</span>
              )}
              <span className="badge text-xs" style={{ color: '#94a3b8', backgroundColor: '#94a3b815', border: '1px solid #94a3b830' }}>
                {task.id}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-6 overflow-x-auto shrink-0">
          {TABS.map((tab) => (
            <button
              key={`modal-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Açıklama</h4>
                <p className="text-sm text-foreground leading-relaxed bg-muted/30 rounded-lg p-3 border border-border">
                  {task.description}
                </p>
              </div>

              {/* Key info grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Assignee */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <User size={13} />
                    <span className="font-semibold uppercase tracking-wide">Atanan Kişi</span>
                  </div>
                  {assignee ? (
                    <div className="flex items-center gap-3">
                      <AvatarBubble initials={assignee.avatar} department={assignee.department} size="md" name={assignee.name} />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{assignee.name}</p>
                        <p className="text-xs text-muted-foreground">{assignee.title}</p>
                        <DepartmentBadge department={assignee.department} size="sm" />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Atanmamış</p>
                  )}
                </div>

                {/* Project */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <FolderKanban size={13} />
                    <span className="font-semibold uppercase tracking-wide">Proje</span>
                  </div>
                  {project ? (
                    <div>
                      <p className="text-sm font-semibold text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        %{project.completionPercent} tamamlandı
                      </p>
                      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${project.completionPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">—</p>
                  )}
                </div>

                {/* Timeline */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar size={13} />
                    <span className="font-semibold uppercase tracking-wide">Zaman Çizelgesi</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Başlangıç:</span>
                      <span className="font-mono font-semibold text-foreground">{task.startDate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Bitiş:</span>
                      <span className="font-mono font-semibold text-foreground">{task.endDate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Kalan:</span>
                      <span className={`font-semibold tabular-nums ${isOverdue ? 'text-red-400' : 'text-green-400'}`}>
                        {isOverdue ? `${Math.abs(task.remainingDays)} gün gecikmiş` : `${task.remainingDays} gün`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Clock size={13} />
                    <span className="font-semibold uppercase tracking-wide">Bağlantılar</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: GitBranch, label: 'Alt Görev', value: task.subTaskCount, color: '#3b7dd8' },
                      { icon: FileText, label: 'Dosya', value: task.fileCount, color: '#06b6d4' },
                      { icon: MessageSquare, label: 'Mesaj', value: task.messageCount, color: '#8b5cf6' },
                      { icon: AlertTriangle, label: 'Risk', value: task.riskCount, color: '#f97316' },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={`modal-stat-${stat.label}`} className="flex items-center gap-2">
                          <Icon size={13} style={{ color: stat.color }} />
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                          <span className="text-xs font-bold tabular-nums ml-auto" style={{ color: stat.color }}>
                            {stat.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subtasks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Bu göreve bağlı alt iş adımları</p>
                <button className="btn-ghost text-xs px-3 py-1.5">+ Alt Görev Ekle</button>
              </div>
              {task.subTaskCount === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <GitBranch size={32} className="text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-foreground mb-1">Alt görev yok</p>
                  <p className="text-xs text-muted-foreground">Bu göreve henüz alt iş adımı eklenmemiş.</p>
                </div>
              ) : (
                MOCK_SUB_TASKS.slice(0, task.subTaskCount).map((sub) => (
                  <div key={`subtask-${sub.id}`} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all duration-150">
                    <input
                      type="checkbox"
                      defaultChecked={sub.done}
                      className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary/30"
                    />
                    <span className={`text-sm ${sub.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {sub.name}
                    </span>
                    {sub.done && (
                      <span className="ml-auto text-xs text-green-400 font-semibold">Tamamlandı</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Bu görevle ilişkilendirilmiş dosyalar</p>
                <button className="btn-ghost text-xs px-3 py-1.5">📎 Dosya Ekle</button>
              </div>
              {task.fileCount === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <FileText size={32} className="text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-foreground mb-1">Dosya yok</p>
                  <p className="text-xs text-muted-foreground">Bu göreve henüz dosya eklenmemiş.</p>
                </div>
              ) : (
                MOCK_FILES.slice(0, task.fileCount).map((file) => (
                  <div key={`modal-file-${file.id}`} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all duration-150 cursor-pointer group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: `${FILE_TYPE_COLORS[file.type] || '#94a3b8'}20`,
                        color: FILE_TYPE_COLORS[file.type] || '#94a3b8',
                      }}
                    >
                      {file.type.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{file.date} · {file.size}</p>
                    </div>
                    <button className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Bu görevle bağlantılı riskler</p>
                <button className="btn-ghost text-xs px-3 py-1.5">⚠ Risk Ekle</button>
              </div>
              {relatedRisks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <AlertTriangle size={32} className="text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-foreground mb-1">Risk kaydı yok</p>
                  <p className="text-xs text-muted-foreground">Bu görevle ilişkili açık risk bulunmuyor.</p>
                </div>
              ) : (
                relatedRisks.map((risk) => {
                  const riskAssignee = PERSONS.find(p => p.id === risk.assigneeId);
                  return (
                    <div key={`modal-risk-${risk.id}`} className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-semibold text-foreground">{risk.title}</p>
                        <RiskBadge status={risk.status as RiskStatus} />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{risk.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {riskAssignee && (
                          <div className="flex items-center gap-1.5">
                            <AvatarBubble initials={riskAssignee.avatar} department={riskAssignee.department} size="xs" />
                            <span>{riskAssignee.name}</span>
                          </div>
                        )}
                        <span className="font-mono">{risk.date}</span>
                        {risk.fileCount > 0 && (
                          <span className="flex items-center gap-1">
                            <FileText size={11} />
                            {risk.fileCount} dosya
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
              <ExternalLink size={13} />
              Projeye Git
            </button>
            <button className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
              <User size={13} />
              Kişiye Git
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-ghost text-xs px-4 py-2">Kapat</button>
            <button className="btn-primary text-xs px-4 py-2">Görevi Düzenle</button>
          </div>
        </div>
      </div>
    </div>
  );
}