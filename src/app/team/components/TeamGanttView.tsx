'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, X, Users, Briefcase, FileText, MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { TASKS, PROJECTS, DEPARTMENT_COLORS, STATUS_COLORS, type Person, type Task, type Project } from '@/data/mockData';

type ViewMode = 'weekly' | 'monthly';

function parseDate(str: string): Date {
  const [d, m, y] = str.split('.').map(Number);
  return new Date(y, m - 1, d);
}

const MONTH_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const DAY_NAMES = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

interface GanttColumn {
  label: string;
  subLabel?: string;
  start: Date;
  end: Date;
}

function getWeeklyColumns(anchorDate: Date): GanttColumn[] {
  const weekStart = startOfWeek(anchorDate);
  const cols: GanttColumn[] = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    cols.push({
      label: DAY_NAMES[day.getDay()],
      subLabel: `${day.getDate()} ${MONTH_SHORT[day.getMonth()]}`,
      start: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
      end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59),
    });
  }
  return cols;
}

function getMonthlyColumns(anchorDate: Date): GanttColumn[] {
  const year = anchorDate.getFullYear();
  const cols: GanttColumn[] = [];
  for (let m = 0; m < 12; m++) {
    cols.push({
      label: MONTH_SHORT[m],
      start: new Date(year, m, 1),
      end: new Date(year, m + 1, 0, 23, 59, 59),
    });
  }
  return cols;
}

// Project color palette — distinct colors per project
const PROJECT_COLORS: Record<string, string> = {
  'prj-001': '#3b7dd8',
  'prj-002': '#8b5cf6',
  'prj-003': '#06b6d4',
  'prj-004': '#ec4899',
  'prj-005': '#f97316',
  'prj-006': '#22c55e',
  'prj-007': '#eab308',
  'prj-008': '#ef4444',
  'prj-009': '#a78bfa',
  'prj-010': '#fb923c',
  'prj-011': '#14b8a6',
  'prj-012': '#64748b',
};

function getBarColor(task: Task): string {
  if (task.status === 'Tamamlandı') return '#22c55e';
  if (task.status === 'Gecikmiş') return '#ef4444';
  if (task.status === 'Riskli') return '#f97316';
  if (task.status === 'Plan Dışı') return '#a78bfa';
  return PROJECT_COLORS[task.projectId] || DEPARTMENT_COLORS[task.department] || '#94a3b8';
}

interface TaskBar {
  task: Task;
  left: number;
  width: number;
  row: number;
}

function computeTaskBars(tasks: Task[], columns: GanttColumn[], colWidth: number): TaskBar[] {
  const rangeStart = columns[0].start;
  const rangeEnd = columns[columns.length - 1].end;
  const totalMs = rangeEnd.getTime() - rangeStart.getTime();
  const totalPx = columns.length * colWidth;

  const bars: TaskBar[] = [];

  for (const task of tasks) {
    if (!task.startDate || !task.endDate) continue;
    const ts = parseDate(task.startDate);
    const te = parseDate(task.endDate);
    if (te < rangeStart || ts > rangeEnd) continue;

    const clampedStart = ts < rangeStart ? rangeStart : ts;
    const clampedEnd = te > rangeEnd ? rangeEnd : te;

    const leftFrac = (clampedStart.getTime() - rangeStart.getTime()) / totalMs;
    const rightFrac = (clampedEnd.getTime() - rangeStart.getTime()) / totalMs;
    const left = Math.max(0, leftFrac * totalPx);
    const width = Math.max(6, (rightFrac - leftFrac) * totalPx);

    bars.push({ task, left, width, row: 0 });
  }

  // Assign rows to avoid overlap
  const rowEnds: number[] = [];
  for (const bar of bars) {
    let placed = false;
    for (let r = 0; r < rowEnds.length; r++) {
      if (bar.left >= rowEnds[r] + 2) {
        bar.row = r;
        rowEnds[r] = bar.left + bar.width;
        placed = true;
        break;
      }
    }
    if (!placed) {
      bar.row = rowEnds.length;
      rowEnds.push(bar.left + bar.width);
    }
  }

  return bars;
}

function getTodayOffset(columns: GanttColumn[], colWidth: number): number | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rangeStart = columns[0].start;
  const rangeEnd = columns[columns.length - 1].end;
  if (today < rangeStart || today > rangeEnd) return null;
  const totalMs = rangeEnd.getTime() - rangeStart.getTime();
  const totalPx = columns.length * colWidth;
  return ((today.getTime() - rangeStart.getTime()) / totalMs) * totalPx;
}

// ── Task Detail Modal ──────────────────────────────────────────────────────────
interface TaskDetailModalProps {
  task: Task;
  project: Project | undefined;
  collaborators: Person[];
  onClose: () => void;
}

function TaskDetailModal({ task, project, collaborators, onClose }: TaskDetailModalProps) {
  const barColor = getBarColor(task);
  const statusColor = STATUS_COLORS[task.status] || '#94a3b8';
  const isDone = task.status === 'Tamamlandı';
  const isLate = task.status === 'Gecikmiş' || task.status === 'Riskli';

  const subtasks = Array.from({ length: task.subTaskCount }, (_, i) => ({
    id: `${task.id}-sub-${i}`,
    name: ['Doküman hazırlama', 'Kod review', 'Test senaryosu', 'Onay alma', 'Tasarım inceleme', 'Prototip üretim', 'Kalibrasyon', 'Raporlama'][i % 8],
    done: i < Math.ceil(task.subTaskCount / 2),
  }));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0 rounded-t-2xl"
          style={{ borderTopColor: barColor, borderTopWidth: '4px' }}
        >
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
              >
                {task.status}
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {task.priority}
              </span>
              <span className="text-xs text-muted-foreground">{task.department}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground leading-tight">{task.name}</h2>
            {project && (
              <p className="text-sm text-primary font-medium mt-0.5">{project.name}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
          )}

          {/* Date & Status row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Başlangıç</p>
              <p className="text-sm font-bold text-foreground">{task.startDate}</p>
            </div>
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Bitiş</p>
              <p className="text-sm font-bold text-foreground">{task.endDate}</p>
            </div>
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Kalan</p>
              {isDone ? (
                <p className="text-sm font-bold text-emerald-500">Tamamlandı</p>
              ) : isLate ? (
                <p className="text-sm font-bold text-red-500">{Math.abs(task.remainingDays)}g geç</p>
              ) : (
                <p className="text-sm font-bold text-foreground">{task.remainingDays}g</p>
              )}
            </div>
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Alt Görev</p>
              <p className="text-sm font-bold text-foreground">{task.subTaskCount}</p>
            </div>
          </div>

          {/* Meta icons */}
          <div className="flex items-center gap-4 flex-wrap">
            {task.fileCount > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FileText size={14} className="text-blue-400" /> {task.fileCount} dosya
              </span>
            )}
            {task.messageCount > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageSquare size={14} className="text-green-400" /> {task.messageCount} mesaj
              </span>
            )}
            {task.riskCount > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-red-500 font-semibold">
                <AlertCircle size={14} /> {task.riskCount} risk
              </span>
            )}
          </div>

          {/* Collaborators */}
          {collaborators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-muted-foreground" />
                <h4 className="text-sm font-bold text-foreground">Bu Projede Çalışanlar ({collaborators.length} kişi)</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {collaborators.map(p => {
                  const deptColor = DEPARTMENT_COLORS[p.department] || '#94a3b8';
                  return (
                    <div key={p.id} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: deptColor }}
                      >
                        {p.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.department}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Project info */}
          {project && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={14} className="text-muted-foreground" />
                <h4 className="text-sm font-bold text-foreground">Proje Bilgisi</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Proje Adı</p>
                  <p className="text-sm font-semibold text-foreground">{project.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Durum</p>
                  <p className="text-sm font-semibold text-foreground">{project.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Proje Tarihleri</p>
                  <p className="text-sm font-semibold text-foreground">{project.startDate} → {project.endDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tamamlanma</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${project.completionPercent}%`, backgroundColor: barColor }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground">%{project.completionPercent}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtasks */}
          {subtasks.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-2">Alt Görevler ({subtasks.length})</h4>
              <div className="space-y-1.5">
                {subtasks.map(sub => (
                  <div key={sub.id} className="flex items-center gap-2.5 py-1">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        sub.done ? 'border-emerald-400 bg-emerald-400/20' : 'border-border bg-card'
                      }`}
                    >
                      {sub.done && <CheckCircle size={10} className="text-emerald-500" />}
                    </div>
                    <span className={`text-sm ${sub.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Member Row ─────────────────────────────────────────────────────────────────
interface MemberRowProps {
  person: Person;
  tasks: Task[];
  columns: GanttColumn[];
  colWidth: number;
  onBarClick: (task: Task) => void;
}

const ROW_HEIGHT = 36;
const ROW_PADDING = 6;

function MemberRow({ person, tasks, columns, colWidth, onBarClick }: MemberRowProps) {
  const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
  const isOverloaded = person.activeTasks >= 7;
  const bars = useMemo(() => computeTaskBars(tasks, columns, colWidth), [tasks, columns, colWidth]);
  const totalWidth = columns.length * colWidth;
  const maxRow = bars.reduce((m, b) => Math.max(m, b.row), 0);
  const rowCount = bars.length > 0 ? maxRow + 1 : 1;
  const rowHeight = rowCount * ROW_HEIGHT + ROW_PADDING * 2;

  return (
    <div className="flex items-stretch border-b border-border/40 hover:bg-muted/10 transition-colors group">
      {/* Member info — sticky left */}
      <div
        className="w-48 shrink-0 flex items-start gap-2.5 px-3 py-3 border-r border-border/40 sticky left-0 bg-card z-10 group-hover:bg-muted/10"
        style={{ minHeight: `${rowHeight}px` }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
          style={{ backgroundColor: deptColor }}
        >
          {person.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate leading-tight">{person.name}</p>
          <p className="text-xs text-muted-foreground truncate" style={{ fontSize: '10px' }}>
            {isOverloaded ? (
              <span className="text-orange-500 font-semibold flex items-center gap-0.5">
                <AlertTriangle size={9} /> AŞIRI YÜK
              </span>
            ) : (
              person.title
            )}
          </p>
          <span
            className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded-full mt-1"
            style={{ backgroundColor: `${deptColor}20`, color: deptColor, fontSize: '9px' }}
          >
            {person.department}
          </span>
        </div>
      </div>

      {/* Gantt area */}
      <div
        className="relative overflow-hidden"
        style={{ minWidth: `${totalWidth}px`, width: `${totalWidth}px`, height: `${rowHeight}px` }}
      >
        {/* Column grid lines */}
        <div className="absolute inset-0 flex pointer-events-none">
          {columns.map((_, i) => (
            <div
              key={i}
              className="border-r border-border/20 h-full"
              style={{ width: `${colWidth}px`, flexShrink: 0 }}
            />
          ))}
        </div>

        {/* Task bars */}
        {bars.map(({ task, left, width, row }) => {
          const barColor = getBarColor(task);
          const topOffset = ROW_PADDING + row * ROW_HEIGHT;
          const barHeight = ROW_HEIGHT - 8;
          const project = PROJECTS.find(p => p.id === task.projectId);

          return (
            <div
              key={task.id}
              className="absolute rounded-lg flex items-center overflow-hidden cursor-pointer transition-all duration-150 hover:brightness-110 hover:shadow-lg hover:scale-y-105 group/bar"
              style={{
                left: `${left}px`,
                width: `${width}px`,
                top: `${topOffset}px`,
                height: `${barHeight}px`,
                backgroundColor: barColor,
                opacity: task.status === 'Tamamlandı' ? 0.75 : 1,
                boxShadow: `0 2px 8px ${barColor}40`,
              }}
              onClick={() => onBarClick(task)}
              title={`${task.name}\n${task.startDate} → ${task.endDate}\nDurum: ${task.status}${project ? `\nProje: ${project.name}` : ''}`}
            >
              {/* Left accent */}
              <div
                className="w-1 h-full shrink-0 rounded-l-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
              />
              {/* Label — centered in bar */}
              {width > 32 && (
                <span
                  className="flex-1 text-white font-bold truncate text-center px-2 select-none"
                  style={{ fontSize: '10px', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                >
                  {task.name}
                </span>
              )}
            </div>
          );
        })}

        {bars.length === 0 && (
          <div className="absolute inset-0 flex items-center px-4">
            <span className="text-xs text-muted-foreground/30">—</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Project Legend ─────────────────────────────────────────────────────────────
function ProjectLegend({ tasks }: { tasks: Task[] }) {
  const seen = new Set<string>();
  const items: { projectId: string; name: string; color: string }[] = [];
  for (const t of tasks) {
    if (!seen.has(t.projectId)) {
      seen.add(t.projectId);
      const proj = PROJECTS.find(p => p.id === t.projectId);
      if (proj) {
        items.push({ projectId: t.projectId, name: proj.name, color: PROJECT_COLORS[t.projectId] || '#94a3b8' });
      }
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ projectId, name, color }) => (
        <span key={projectId} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
          <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0" style={{ backgroundColor: color }} />
          {name}
        </span>
      ))}
      {/* Status legend */}
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
        <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0 bg-emerald-500" /> Tamamlandı
      </span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
        <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0 bg-red-500" /> Gecikmiş
      </span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
        <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0 bg-orange-500" /> Riskli
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
interface TeamGanttViewProps {
  filteredPersons: Person[];
}

export default function TeamGanttView({ filteredPersons }: TeamGanttViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [anchorDate, setAnchorDate] = useState<Date>(() => new Date(2026, 4, 12));
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(() => {
    return viewMode === 'weekly'
      ? getWeeklyColumns(anchorDate)
      : getMonthlyColumns(anchorDate);
  }, [viewMode, anchorDate]);

  const colWidth = viewMode === 'weekly' ? 130 : 80;
  const totalWidth = columns.length * colWidth;

  function navigate(dir: 1 | -1) {
    if (viewMode === 'weekly') {
      setAnchorDate(d => addDays(d, dir * 7));
    } else {
      setAnchorDate(d => new Date(d.getFullYear() + dir, d.getMonth(), 1));
    }
  }

  const periodLabel = useMemo(() => {
    if (viewMode === 'weekly') {
      const ws = startOfWeek(anchorDate);
      const we = addDays(ws, 6);
      return `${ws.getDate()} ${MONTH_SHORT[ws.getMonth()]} – ${we.getDate()} ${MONTH_SHORT[we.getMonth()]} ${we.getFullYear()}`;
    } else {
      return `${anchorDate.getFullYear()}`;
    }
  }, [viewMode, anchorDate]);

  const todayOffset = useMemo(() => getTodayOffset(columns, colWidth), [columns, colWidth]);

  // All tasks visible in this view
  const allVisibleTasks = useMemo(() => {
    const personIds = new Set(filteredPersons.map(p => p.id));
    return TASKS.filter(t => personIds.has(t.assigneeId));
  }, [filteredPersons]);

  // Summary stats
  const totalBusy = useMemo(() => filteredPersons.filter(p => p.activeTasks > 0).length, [filteredPersons]);
  const totalOverload = useMemo(() => filteredPersons.filter(p => p.activeTasks >= 7).length, [filteredPersons]);
  const totalAvailable = useMemo(() => filteredPersons.filter(p => p.activeTasks === 0).length, [filteredPersons]);

  // Selected task detail
  const selectedProject = selectedTask ? PROJECTS.find(p => p.id === selectedTask.projectId) : undefined;
  const collaborators = useMemo(() => {
    if (!selectedTask) return [];
    const projectPersonIds = new Set(
      TASKS.filter(t => t.projectId === selectedTask.projectId).map(t => t.assigneeId)
    );
    return filteredPersons.filter(p => projectPersonIds.has(p.id));
  }, [selectedTask, filteredPersons]);

  return (
    <>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="flex items-start justify-between px-4 py-3 border-b border-border bg-muted/20 gap-3 flex-wrap">
          {/* Legend */}
          <div className="flex-1 min-w-0">
            <ProjectLegend tasks={allVisibleTasks} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-muted rounded-lg p-0.5">
              {(['weekly', 'monthly'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    viewMode === mode
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {mode === 'weekly' ? 'Haftalık' : 'Yıllık'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-semibold text-foreground min-w-[130px] text-center">{periodLabel}</span>
              <button
                onClick={() => navigate(1)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Gantt table */}
        <div className="overflow-x-auto" ref={scrollRef}>
          <div style={{ minWidth: `${192 + totalWidth}px` }}>
            {/* Header row */}
            <div className="flex items-stretch border-b border-border bg-muted/30 sticky top-0 z-20">
              <div className="w-48 shrink-0 px-3 py-2.5 border-r border-border/40 sticky left-0 bg-muted/30 z-30">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Personel</span>
              </div>
              <div className="flex relative" style={{ minWidth: `${totalWidth}px` }}>
                {/* Today line in header */}
                {todayOffset !== null && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500/60 z-10 pointer-events-none"
                    style={{ left: `${todayOffset}px` }}
                  />
                )}
                {columns.map((col, i) => (
                  <div
                    key={i}
                    className="border-r border-border/30 text-center py-2 last:border-r-0 shrink-0"
                    style={{ width: `${colWidth}px` }}
                  >
                    <p className="text-xs font-bold text-foreground">{col.label}</p>
                    {col.subLabel && (
                      <p className="text-xs text-muted-foreground" style={{ fontSize: '10px' }}>{col.subLabel}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Member rows */}
            <div className="relative">
              {/* Today vertical line across all rows */}
              {todayOffset !== null && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500/30 z-10 pointer-events-none"
                  style={{ left: `${192 + todayOffset}px` }}
                />
              )}
              {filteredPersons.map(person => {
                const personTasks = TASKS.filter(t => t.assigneeId === person.id);
                return (
                  <MemberRow
                    key={person.id}
                    person={person}
                    tasks={personTasks}
                    columns={columns}
                    colWidth={colWidth}
                    onBarClick={setSelectedTask}
                  />
                );
              })}
            </div>

            {filteredPersons.length === 0 && (
              <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
                Gösterilecek personel bulunamadı
              </div>
            )}
          </div>
        </div>

        {/* Summary footer */}
        <div className="flex items-center gap-6 px-4 py-3 border-t border-border bg-muted/10 flex-wrap">
          <span className="text-sm text-muted-foreground">
            <span className="font-bold text-primary tabular-nums">{totalBusy}</span> Meşgul
          </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-bold text-emerald-500 tabular-nums">{totalAvailable}</span> Müsait
          </span>
          {totalOverload > 0 && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertTriangle size={12} className="text-orange-500" />
              <span className="font-bold text-orange-500 tabular-nums">{totalOverload}</span> Aşırı Yük
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <Clock size={11} /> Çubuğa tıklayarak detay görüntüleyin
          </span>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          project={selectedProject}
          collaborators={collaborators}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
}
