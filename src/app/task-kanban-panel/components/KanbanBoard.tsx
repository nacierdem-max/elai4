'use client';
import React, { useState } from 'react';
import { type Task, type TaskStatus, STATUS_COLORS, PERSONS, PROJECTS } from '@/data/mockData';
import type { ViewMode } from './TaskKanbanContent';
import StatusBadge from '@/components/ui/StatusBadge';
import DepartmentBadge from '@/components/ui/DepartmentBadge';
import AvatarBubble from '@/components/ui/AvatarBubble';
import { FileText, MessageSquare, AlertTriangle, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';

const KANBAN_COLUMNS: { status: TaskStatus; label: string; emoji: string }[] = [
  { status: 'Plan', label: 'Plan', emoji: '📋' },
  { status: 'Yapılıyor', label: 'Yapılıyor', emoji: '⚡' },
  { status: 'Test', label: 'Test', emoji: '🔬' },
  { status: 'Tamamlandı', label: 'Tamamlandı', emoji: '✅' },
  { status: 'Gecikmiş', label: 'Gecikmiş', emoji: '🔴' },
  { status: 'Riskli', label: 'Riskli', emoji: '⚠️' },
];

interface Props {
  tasks: Task[];
  viewMode: ViewMode;
  onTaskClick: (task: Task) => void;
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const assignee = PERSONS.find(p => p.id === task.assigneeId);
  const project = PROJECTS.find(p => p.id === task.projectId);
  const statusColor = STATUS_COLORS[task.status] || '#94a3b8';
  const isOverdue = task.remainingDays < 0;
  const isUrgent = task.remainingDays >= 0 && task.remainingDays <= 7;

  const priorityColors: Record<string, string> = {
    Kritik: '#ef4444',
    Yüksek: '#f97316',
    Orta: '#eab308',
    Düşük: '#22c55e',
  };

  return (
    <div
      onClick={onClick}
      className="card-base p-3.5 cursor-pointer hover:border-primary/40 hover:shadow-elevated transition-all duration-150 group"
      style={{ borderLeft: `3px solid ${statusColor}` }}
    >
      {/* Priority + status */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: `${priorityColors[task.priority]}20`,
            color: priorityColors[task.priority],
          }}
        >
          {task.priority}
        </span>
        {task.status === 'Plan Dışı' && (
          <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded">
            Plan Dışı
          </span>
        )}
      </div>

      {/* Task name */}
      <p className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
        {task.name}
      </p>

      {/* Project */}
      {project && (
        <p className="text-xs text-muted-foreground mb-2 truncate">
          📁 {project.name}
        </p>
      )}

      {/* Department badge */}
      <div className="mb-2">
        <DepartmentBadge department={task.department} size="sm" />
      </div>

      {/* Timeline bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span className="font-mono text-xs">{task.startDate}</span>
          <span
            className={`font-semibold tabular-nums ${isOverdue ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-muted-foreground'}`}
          >
            {isOverdue ? `${Math.abs(task.remainingDays)} gün gecikmiş` : `${task.remainingDays} gün kaldı`}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: isOverdue ? '100%' : `${Math.max(5, 100 - (task.remainingDays / 90) * 100)}%`,
              backgroundColor: isOverdue ? '#ef4444' : isUrgent ? '#f97316' : statusColor,
            }}
          />
        </div>
      </div>

      {/* Footer: assignee + badges */}
      <div className="flex items-center justify-between">
        {assignee ? (
          <div className="flex items-center gap-2">
            <AvatarBubble initials={assignee.avatar} department={assignee.department} size="xs" name={assignee.name} />
            <span className="text-xs text-muted-foreground truncate max-w-20">{assignee.name.split(' ')[0]}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Atanmamış</span>
        )}

        <div className="flex items-center gap-2">
          {task.subTaskCount > 0 && (
            <div className="flex items-center gap-0.5 text-muted-foreground" title={`${task.subTaskCount} alt görev`}>
              <GitBranch size={11} />
              <span className="text-xs tabular-nums">{task.subTaskCount}</span>
            </div>
          )}
          {task.fileCount > 0 && (
            <div className="flex items-center gap-0.5 text-muted-foreground" title={`${task.fileCount} dosya`}>
              <FileText size={11} />
              <span className="text-xs tabular-nums">{task.fileCount}</span>
            </div>
          )}
          {task.messageCount > 0 && (
            <div className="flex items-center gap-0.5 text-muted-foreground" title={`${task.messageCount} mesaj`}>
              <MessageSquare size={11} />
              <span className="text-xs tabular-nums">{task.messageCount}</span>
            </div>
          )}
          {task.riskCount > 0 && (
            <div className="flex items-center gap-0.5 text-orange-400" title={`${task.riskCount} risk`}>
              <AlertTriangle size={11} />
              <span className="text-xs tabular-nums">{task.riskCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskListRow({ task, onClick }: { task: Task; onClick: () => void }) {
  const assignee = PERSONS.find(p => p.id === task.assigneeId);
  const project = PROJECTS.find(p => p.id === task.projectId);
  const isOverdue = task.remainingDays < 0;

  return (
    <tr
      onClick={onClick}
      className="border-b border-border hover:bg-muted/40 transition-all duration-100 cursor-pointer group"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-8 rounded-full shrink-0"
            style={{ backgroundColor: STATUS_COLORS[task.status] }}
          />
          <div>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {task.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono">{task.id}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <p className="text-xs text-muted-foreground truncate max-w-36">{project?.name || '—'}</p>
      </td>
      <td className="py-3 px-4">
        {assignee ? (
          <div className="flex items-center gap-2">
            <AvatarBubble initials={assignee.avatar} department={assignee.department} size="xs" />
            <span className="text-xs text-foreground">{assignee.name}</span>
          </div>
        ) : <span className="text-xs text-muted-foreground">—</span>}
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={task.status} size="sm" />
      </td>
      <td className="py-3 px-4">
        <DepartmentBadge department={task.department} size="sm" />
      </td>
      <td className="py-3 px-4">
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: task.priority === 'Kritik' ? '#ef444420' : task.priority === 'Yüksek' ? '#f9731620' : '#eab30820',
            color: task.priority === 'Kritik' ? '#ef4444' : task.priority === 'Yüksek' ? '#f97316' : '#eab308',
          }}
        >
          {task.priority}
        </span>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{task.startDate}</p>
          <p className="text-xs font-mono text-muted-foreground">{task.endDate}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs font-semibold tabular-nums ${isOverdue ? 'text-red-400' : 'text-muted-foreground'}`}>
          {isOverdue ? `-${Math.abs(task.remainingDays)}g` : `+${task.remainingDays}g`}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          {task.subTaskCount > 0 && <span className="flex items-center gap-0.5 text-xs"><GitBranch size={11} />{task.subTaskCount}</span>}
          {task.fileCount > 0 && <span className="flex items-center gap-0.5 text-xs"><FileText size={11} />{task.fileCount}</span>}
          {task.riskCount > 0 && <span className="flex items-center gap-0.5 text-xs text-orange-400"><AlertTriangle size={11} />{task.riskCount}</span>}
        </div>
      </td>
    </tr>
  );
}

export default function KanbanBoard({ tasks, viewMode, onTaskClick }: Props) {
  const [collapsedCols, setCollapsedCols] = useState<Set<TaskStatus>>(new Set());

  const toggleCol = (status: TaskStatus) => {
    setCollapsedCols(prev => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Görev Adı', 'Proje', 'Atanan', 'Durum', 'Departman', 'Öncelik', 'Tarihler', 'Kalan', 'Bağlantılar'].map((h) => (
                  <th key={`th-${h}`} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-muted-foreground text-sm">
                    Filtre kriterlerine uyan görev bulunamadı
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskListRow key={`listrow-${task.id}`} task={task} onClick={() => onTaskClick(task)} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {tasks.length > 0 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{tasks.length} görev gösteriliyor</p>
            <div className="flex items-center gap-2">
              <button className="btn-ghost text-xs px-3 py-1.5">← Önceki</button>
              <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-3 py-1.5 rounded">1</span>
              <button className="btn-ghost text-xs px-3 py-1.5">Sonraki →</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Kanban view
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((col) => {
        const colTasks = tasks.filter(t => t.status === col.status);
        const isCollapsed = collapsedCols.has(col.status);
        const statusColor = STATUS_COLORS[col.status];

        return (
          <div
            key={`kanban-col-${col.status}`}
            className={`flex flex-col shrink-0 transition-all duration-300 ${isCollapsed ? 'w-14' : 'w-72'}`}
          >
            {/* Column header */}
            <div
              className="flex items-center justify-between px-3 py-2.5 rounded-t-xl border border-border mb-2"
              style={{ backgroundColor: `${statusColor}15`, borderColor: `${statusColor}30` }}
            >
              {!isCollapsed && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{col.emoji}</span>
                    <span className="text-sm font-semibold text-foreground">{col.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-xs font-bold tabular-nums px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${statusColor}25`, color: statusColor }}
                    >
                      {colTasks.length}
                    </span>
                    <button
                      onClick={() => toggleCol(col.status)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronUp size={14} />
                    </button>
                  </div>
                </>
              )}
              {isCollapsed && (
                <button
                  onClick={() => toggleCol(col.status)}
                  className="flex flex-col items-center gap-1 w-full"
                >
                  <ChevronDown size={14} className="text-muted-foreground" />
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: statusColor }}
                  >
                    {colTasks.length}
                  </span>
                </button>
              )}
            </div>

            {/* Cards */}
            {!isCollapsed && (
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-380px)] pr-1">
                {colTasks.length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <p className="text-xs text-muted-foreground">{col.label} durumunda görev yok</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard key={`card-${task.id}`} task={task} onClick={() => onTaskClick(task)} />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}