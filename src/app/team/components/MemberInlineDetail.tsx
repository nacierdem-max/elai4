'use client';
import React, { useState } from 'react';
import { Briefcase, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, FileText, MessageSquare, AlertCircle, Calendar, X } from 'lucide-react';
import { TASKS, PROJECTS, DEPARTMENT_COLORS, STATUS_COLORS, type Person, type Task } from '@/data/mockData';

interface MemberInlineDetailProps {
  person: Person;
  onClose: () => void;
}

function parseDate(str: string): Date {
  const [d, m, y] = str.split('.').map(Number);
  return new Date(y, m - 1, d);
}

const GANTT_START = new Date(2026, 0, 1);
const GANTT_END = new Date(2026, 11, 31);
const TOTAL_MS = GANTT_END.getTime() - GANTT_START.getTime();

function pct(date: Date): number {
  const ms = date.getTime() - GANTT_START.getTime();
  return Math.max(0, Math.min(100, (ms / TOTAL_MS) * 100));
}

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const STATUS_ICONS: Record<string, string> = {
  'Yapılıyor': '🔵',
  'Plan': '📋',
  'Test': '🧪',
  'Tamamlandı': '✅',
  'Gecikmiş': '🔴',
  'Riskli': '⚠️',
  'Plan Dışı': '🟣',
};

function TaskRow({ task, deptColor }: { task: Task; deptColor: string }) {
  const [expanded, setExpanded] = useState(false);
  const project = PROJECTS.find(p => p.id === task.projectId);
  const isLate = task.status === 'Gecikmiş' || task.status === 'Riskli';
  const isDone = task.status === 'Tamamlandı';
  const statusColor = STATUS_COLORS[task.status] || '#94a3b8';

  const subtasks = Array.from({ length: task.subTaskCount }, (_, i) => ({
    id: `${task.id}-sub-${i}`,
    name: ['Doküman hazırlama', 'Kod review', 'Test senaryosu', 'Onay alma', 'Tasarım inceleme', 'Prototip üretim', 'Kalibrasyon', 'Raporlama'][i % 8],
    done: i < Math.ceil(task.subTaskCount / 2),
  }));

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => task.subTaskCount > 0 && setExpanded(!expanded)}
      >
        <span className="text-base shrink-0">{STATUS_ICONS[task.status] || '⬜'}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {task.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            {project && <span className="text-xs text-primary font-medium truncate max-w-[160px]">{project.name}</span>}
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${statusColor}18`, color: statusColor }}>{task.status}</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${deptColor}15`, color: deptColor }}>{task.priority}</span>
          </div>
        </div>
        <div className="text-right shrink-0 hidden sm:block">
          <p className="text-xs text-muted-foreground">Bitiş</p>
          <p className="text-xs font-semibold text-foreground">{task.endDate}</p>
        </div>
        <div className="text-right shrink-0 w-20">
          {isDone ? (
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 justify-end"><CheckCircle size={12} /> Bitti</span>
          ) : isLate ? (
            <span className="text-xs font-semibold text-red-500 flex items-center gap-1 justify-end"><AlertTriangle size={12} /> {Math.abs(task.remainingDays)}g geç</span>
          ) : (
            <span className="text-xs font-semibold text-foreground">{task.remainingDays}g kaldı</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 text-muted-foreground">
          {task.fileCount > 0 && <span className="flex items-center gap-0.5 text-xs"><FileText size={11} /> {task.fileCount}</span>}
          {task.messageCount > 0 && <span className="flex items-center gap-0.5 text-xs"><MessageSquare size={11} /> {task.messageCount}</span>}
          {task.riskCount > 0 && <span className="flex items-center gap-0.5 text-xs text-red-400"><AlertCircle size={11} /> {task.riskCount}</span>}
          {task.subTaskCount > 0 && (expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
        </div>
      </div>
      {expanded && subtasks.length > 0 && (
        <div className="border-t border-border bg-muted/20 px-4 py-2 space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Alt Görevler ({subtasks.length})</p>
          {subtasks.map(sub => (
            <div key={sub.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${sub.done ? 'border-emerald-400 bg-emerald-400/20' : 'border-border bg-card'}`}>
                {sub.done && <CheckCircle size={10} className="text-emerald-500" />}
              </div>
              <span className={`text-xs ${sub.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{sub.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GanttChart({ tasks, deptColor }: { tasks: Task[]; deptColor: string }) {
  const validTasks = tasks.filter(t => t.startDate && t.endDate);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="flex mb-2">
          <div className="w-36 shrink-0" />
          <div className="flex-1 grid grid-cols-12">
            {MONTHS.map(m => (
              <div key={m} className="text-center text-xs text-muted-foreground font-medium py-1 border-l border-border/40 first:border-l-0">{m}</div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {validTasks.map(task => {
            const start = parseDate(task.startDate);
            const end = parseDate(task.endDate);
            const left = pct(start);
            const width = Math.max(1, pct(end) - left);
            const isDone = task.status === 'Tamamlandı';
            const isLate = task.status === 'Gecikmiş' || task.status === 'Riskli';
            const barColor = isDone ? '#22c55e' : isLate ? '#ef4444' : task.status === 'Plan' ? '#94a3b8' : deptColor;
            return (
              <div key={task.id} className="flex items-center gap-2">
                <div className="w-36 shrink-0 text-xs text-foreground font-medium truncate pr-2" title={task.name}>{task.name}</div>
                <div className="flex-1 relative h-6 bg-muted/30 rounded overflow-hidden border border-border/30">
                  <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                    {MONTHS.map((_, i) => <div key={i} className="border-l border-border/20 first:border-l-0 h-full" />)}
                  </div>
                  <div
                    className="absolute top-1 bottom-1 rounded-full flex items-center px-2 overflow-hidden"
                    style={{ left: `${left}%`, width: `${width}%`, backgroundColor: barColor, opacity: isDone ? 0.7 : 1 }}
                    title={`${task.name}: ${task.startDate} → ${task.endDate}`}
                  >
                    <span className="text-white font-semibold truncate whitespace-nowrap" style={{ fontSize: '10px' }}>{task.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MemberInlineDetail({ person, onClose }: MemberInlineDetailProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'timeline'>('tasks');
  const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
  const personTasks = TASKS.filter(t => t.assigneeId === person.id);

  const activeTasks = personTasks.filter(t => ['Yapılıyor', 'Test', 'Riskli', 'Gecikmiş'].includes(t.status));
  const plannedTasks = personTasks.filter(t => ['Plan', 'Plan Dışı'].includes(t.status));
  const doneTasks = personTasks.filter(t => t.status === 'Tamamlandı');

  return (
    <div
      className="col-span-full mt-1 mb-2 rounded-2xl border border-border bg-card shadow-elevated overflow-hidden animate-in slide-in-from-top-2 duration-200"
      style={{ borderLeftColor: deptColor, borderLeftWidth: '3px' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-border bg-muted/10">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0"
            style={{ backgroundColor: deptColor }}
          >
            {person.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-foreground">{person.name}</h3>
              {(person.title === 'Departman Lideri' || person.title === 'Ar-Ge Direktörü') && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  ⭐ {person.title === 'Ar-Ge Direktörü' ? 'Direktör' : 'Takım Lideri'}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{person.title}</p>
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1" style={{ backgroundColor: `${deptColor}20`, color: deptColor }}>
              {person.department}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-center">
            <div><p className="text-lg font-bold tabular-nums text-cyan-500">{activeTasks.length}</p><p className="text-xs text-muted-foreground">Devam</p></div>
            <div><p className="text-lg font-bold tabular-nums text-blue-500">{plannedTasks.length}</p><p className="text-xs text-muted-foreground">Plan</p></div>
            <div><p className="text-lg font-bold tabular-nums text-emerald-500">{doneTasks.length}</p><p className="text-xs text-muted-foreground">Bitti</p></div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-5 pt-3 shrink-0">
        {[
          { key: 'tasks', label: '📋 Görevler', count: personTasks.length },
          { key: 'timeline', label: '📅 Zaman Çizelgesi', count: null },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'tasks' | 'timeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key ? 'text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
            style={activeTab === tab.key ? { backgroundColor: deptColor } : {}}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-3 max-h-[480px] overflow-y-auto">
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {activeTasks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <h4 className="text-sm font-bold text-foreground">Devam Eden Görevler</h4>
                  <span className="text-xs bg-cyan-500/15 text-cyan-600 font-semibold px-2 py-0.5 rounded-full">{activeTasks.length}</span>
                </div>
                <div className="space-y-2">{activeTasks.map(t => <TaskRow key={t.id} task={t} deptColor={deptColor} />)}</div>
              </section>
            )}
            {plannedTasks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <h4 className="text-sm font-bold text-foreground">Planlanan Görevler</h4>
                  <span className="text-xs bg-blue-400/15 text-blue-500 font-semibold px-2 py-0.5 rounded-full">{plannedTasks.length}</span>
                </div>
                <div className="space-y-2">{plannedTasks.map(t => <TaskRow key={t.id} task={t} deptColor={deptColor} />)}</div>
              </section>
            )}
            {doneTasks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-sm font-bold text-foreground">Tamamlanan Görevler</h4>
                  <span className="text-xs bg-emerald-500/15 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">{doneTasks.length}</span>
                </div>
                <div className="space-y-2">{doneTasks.map(t => <TaskRow key={t.id} task={t} deptColor={deptColor} />)}</div>
              </section>
            )}
            {personTasks.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Bu personele atanmış görev bulunamadı.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: deptColor }} />
              <h4 className="text-sm font-bold text-foreground">2026 Görev Zaman Çizelgesi</h4>
            </div>
            <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
              {[{ color: deptColor, label: 'Devam Ediyor' }, { color: '#22c55e', label: 'Tamamlandı' }, { color: '#ef4444', label: 'Gecikmiş / Riskli' }, { color: '#94a3b8', label: 'Planlanan' }].map(l => (
                <span key={l.label} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
            {personTasks.length > 0 ? (
              <div className="bg-muted/20 rounded-xl p-4 border border-border">
                <GanttChart tasks={personTasks} deptColor={deptColor} />
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Zaman çizelgesi için görev bulunamadı.</p>
              </div>
            )}
            {/* Monthly breakdown */}
            <div>
              <h5 className="text-sm font-bold text-foreground mb-3">Aylık Görev Dağılımı</h5>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                {MONTHS.map((month, idx) => {
                  const monthDate = new Date(2026, idx, 1);
                  const monthEnd = new Date(2026, idx + 1, 0);
                  const tasksInMonth = personTasks.filter(t => {
                    if (!t.startDate || !t.endDate) return false;
                    const s = parseDate(t.startDate);
                    const e = parseDate(t.endDate);
                    return s <= monthEnd && e >= monthDate;
                  });
                  const hasLate = tasksInMonth.some(t => t.status === 'Gecikmiş' || t.status === 'Riskli');
                  const barH = Math.max(4, Math.min(40, tasksInMonth.length * 12));
                  return (
                    <div key={month} className="flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center h-10">
                        <div className="w-full rounded-t transition-all duration-300" style={{ height: `${barH}px`, backgroundColor: tasksInMonth.length === 0 ? '#e2e8f0' : hasLate ? '#ef4444' : deptColor, opacity: tasksInMonth.length === 0 ? 0.3 : 1 }} title={`${month}: ${tasksInMonth.length} görev`} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{month}</span>
                      <span className="text-xs font-bold tabular-nums" style={{ color: tasksInMonth.length === 0 ? '#94a3b8' : hasLate ? '#ef4444' : deptColor }}>{tasksInMonth.length}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
