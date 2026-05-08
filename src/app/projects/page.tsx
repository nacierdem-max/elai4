'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { PROJECTS, PERSONS, TASKS, DEPARTMENT_COLORS, type Project, type Department } from '@/data/mockData';
import { FolderKanban, Search, Filter, ChevronRight, CheckCircle, AlertTriangle, Clock, X, BarChart2, Users } from 'lucide-react';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  Aktif: '#22c55e',
  Tamamlandı: '#3b7dd8',
  Beklemede: '#eab308',
  Kritik: '#ef4444',
};

const TASK_STATUS_COLORS: Record<string, string> = {
  Plan: '#3b7dd8',
  Yapılıyor: '#06b6d4',
  Test: '#eab308',
  Tamamlandı: '#22c55e',
  Gecikmiş: '#ef4444',
  Riskli: '#f97316',
  'Plan Dışı': '#a78bfa',
};

// ─── Date helpers ─────────────────────────────────────────────────────────────
function parseDate(str: string): Date {
  const parts = str.split('.');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
  return new Date(str);
}

function formatMonthLabel(date: Date): string {
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  return `${months[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`;
}

// ─── Project Modal ─────────────────────────────────────────────────────────────
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lead = PERSONS.find(p => p.id === project.leadId);
  const projectTasks = TASKS.filter(t => t.projectId === project.id);
  const statusColor = STATUS_COLORS[project.status] || '#94a3b8';

  // Collect all unique collaborators (from project.collaboratorIds + task assignees)
  const taskAssigneeIds = [...new Set(projectTasks.map(t => t.assigneeId))];
  const allCollabIds = [...new Set([project.leadId, ...(project.collaboratorIds || []), ...taskAssigneeIds])];
  const allCollabs = allCollabIds.map(id => PERSONS.find(p => p.id === id)).filter(Boolean);

  const phases = [
    { name: 'Planlama', start: 0, width: 20, color: '#3b7dd8', done: true },
    { name: 'Geliştirme', start: 20, width: 35, color: '#8b5cf6', done: project.completionPercent > 30 },
    { name: 'Test', start: 55, width: 25, color: '#f97316', done: project.completionPercent > 60 },
    { name: 'Teslim', start: 80, width: 20, color: '#22c55e', done: project.completionPercent > 85 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>{project.status}</span>
              {project.department.map(d => (
                <span key={d} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${DEPARTMENT_COLORS[d]}20`, color: DEPARTMENT_COLORS[d] }}>{d}</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-foreground">{project.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Lider: {lead?.name} · {project.startDate} → {project.endDate}</p>
            {project.description && <p className="text-xs text-muted-foreground mt-1">{project.description}</p>}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Genel İlerleme</span>
              <span className="text-lg font-bold" style={{ color: statusColor }}>{project.completionPercent}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${project.completionPercent}%`, backgroundColor: statusColor }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Aktif Görev', value: project.activeTaskCount, color: '#f97316' },
              { label: 'Tamamlanan', value: project.completedTaskCount, color: '#22c55e' },
              { label: 'Toplam', value: project.totalTaskCount, color: '#3b7dd8' },
            ].map(s => (
              <div key={s.label} className="bg-muted/30 rounded-xl p-4 text-center border border-border">
                <p className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Collaborators section */}
          {allCollabs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Katkı Veren Ekip ({allCollabs.length} kişi)</h3>
              <div className="flex flex-wrap gap-2">
                {allCollabs.map(person => {
                  if (!person) return null;
                  const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
                  const isLead = person.id === project.leadId;
                  return (
                    <div key={person.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-muted/20">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: deptColor }}
                      >
                        {person.avatar.slice(0, 2)}
                      </div>
                      <span className="text-xs font-semibold text-foreground">{person.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${deptColor}20`, color: deptColor }}>
                        {person.department}
                      </span>
                      {isLead && <span className="text-xs text-amber-500 font-bold">★</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Faz Planı (Gantt)</h3>
            <div className="space-y-2">
              {phases.map(phase => (
                <div key={phase.name} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 shrink-0">{phase.name}</span>
                  <div className="flex-1 h-6 bg-muted rounded relative overflow-hidden">
                    <div className="absolute h-full rounded flex items-center px-2 transition-all duration-500" style={{ left: `${phase.start}%`, width: `${phase.width}%`, backgroundColor: phase.done ? phase.color : `${phase.color}60` }}>
                      <span className="text-xs font-semibold text-white truncate">{phase.name}</span>
                    </div>
                  </div>
                  {phase.done ? <CheckCircle size={14} className="text-green-400 shrink-0" /> : <Clock size={14} className="text-muted-foreground shrink-0" />}
                </div>
              ))}
            </div>
          </div>
          {projectTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Görevler ({projectTasks.length})</h3>
              <div className="space-y-2">
                {projectTasks.map(task => {
                  const assignee = PERSONS.find(p => p.id === task.assigneeId);
                  const collabPersons = (task.collaboratorIds || []).map(id => PERSONS.find(p => p.id === id)).filter(Boolean);
                  return (
                    <Link key={task.id} href="/task-kanban-panel" className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all cursor-pointer" onClick={onClose}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: DEPARTMENT_COLORS[task.department] || '#94a3b8' }}>
                          {assignee?.avatar?.slice(0, 2) || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{task.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="text-xs text-muted-foreground">{assignee?.name}</p>
                            {collabPersons.length > 0 && (
                              <div className="flex items-center -space-x-1">
                                {collabPersons.slice(0, 3).map(cp => cp && (
                                  <div key={cp.id} className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white border border-card" style={{ backgroundColor: DEPARTMENT_COLORS[cp.department] || '#94a3b8' }} title={cp.name}>
                                    {cp.avatar.slice(0, 1)}
                                  </div>
                                ))}
                                {collabPersons.length > 3 && <span className="text-xs text-muted-foreground ml-1">+{collabPersons.length - 3}</span>}
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground">· {task.endDate}</p>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full ml-2 shrink-0" style={{ backgroundColor: `${TASK_STATUS_COLORS[task.status] || '#94a3b8'}20`, color: TASK_STATUS_COLORS[task.status] || '#94a3b8' }}>{task.status}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Gantt Chart (Project → Who) ──────────────────────────────────────────────
function ProjectGanttView({ projects, search, statusFilter, deptFilter }: {
  projects: Project[];
  search: string;
  statusFilter: string;
  deptFilter: string;
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'Tümü' || p.status === statusFilter;
    const matchDept = deptFilter === 'Tümü' || p.department.includes(deptFilter as Department);
    return matchSearch && matchStatus && matchDept;
  });

  // Compute timeline range
  const allDates = filtered.flatMap(p => [parseDate(p.startDate), parseDate(p.endDate)]);
  if (allDates.length === 0) return <div className="text-center py-16 text-muted-foreground"><FolderKanban size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm">Proje bulunamadı</p></div>;

  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  minDate.setDate(1);
  maxDate.setMonth(maxDate.getMonth() + 1, 1);
  const totalMs = maxDate.getTime() - minDate.getTime();

  // Build month labels
  const months: { label: string; left: number }[] = [];
  const cur = new Date(minDate);
  while (cur < maxDate) {
    months.push({ label: formatMonthLabel(cur), left: ((cur.getTime() - minDate.getTime()) / totalMs) * 100 });
    cur.setMonth(cur.getMonth() + 1);
  }

  const today = new Date();
  const todayLeft = Math.max(0, Math.min(100, ((today.getTime() - minDate.getTime()) / totalMs) * 100));

  function getBarStyle(project: Project) {
    const start = parseDate(project.startDate);
    const end = parseDate(project.endDate);
    const left = Math.max(0, ((start.getTime() - minDate.getTime()) / totalMs) * 100);
    const right = Math.min(100, ((end.getTime() - minDate.getTime()) / totalMs) * 100);
    const width = Math.max(right - left, 2);
    return { left: `${left}%`, width: `${width}%` };
  }

  return (
    <>
      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <BarChart2 size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Proje Zaman Çizelgesi (Gantt) — Proje → Kim Çalışıyor</span>
        </div>
        <div className="overflow-x-auto">
          <div style={{ minWidth: 900 }}>
            {/* Month header */}
            <div className="relative h-8 border-b border-border bg-muted/20 mx-4">
              {months.map((m, i) => (
                <div key={i} className="absolute top-0 h-full flex items-center" style={{ left: `${m.left}%` }}>
                  <div className="w-px h-full bg-border/50" />
                  <span className="text-xs text-muted-foreground ml-1.5 whitespace-nowrap">{m.label}</span>
                </div>
              ))}
              {/* Today line */}
              <div className="absolute top-0 h-full w-px bg-red-400/80 z-10" style={{ left: `${todayLeft}%` }}>
                <span className="absolute -top-0.5 left-1 text-xs text-red-400 font-semibold whitespace-nowrap">Bugün</span>
              </div>
            </div>

            {/* Project rows */}
            <div className="divide-y divide-border/30">
              {filtered.map(project => {
                const lead = PERSONS.find(p => p.id === project.leadId);
                const projectTasks = TASKS.filter(t => t.projectId === project.id);
                const statusColor = STATUS_COLORS[project.status] || '#94a3b8';
                const barStyle = getBarStyle(project);

                // Group tasks by assignee for this project
                const assigneeMap = new Map<string, typeof projectTasks>();
                projectTasks.forEach(task => {
                  const existing = assigneeMap.get(task.assigneeId) || [];
                  assigneeMap.set(task.assigneeId, [...existing, task]);
                });

                return (
                  <div key={project.id} className="hover:bg-muted/10 transition-colors">
                    {/* Project header row */}
                    <div className="flex items-center gap-0 px-4 py-2 cursor-pointer group" onClick={() => setSelectedProject(project)}>
                      <div className="w-48 shrink-0 flex items-center gap-2 pr-3">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: statusColor }} />
                        <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">{project.name}</span>
                      </div>
                      <div className="flex-1 relative h-8">
                        {/* Project bar */}
                        <div
                          className="absolute top-1 h-6 rounded-md flex items-center px-2 gap-1.5 cursor-pointer hover:brightness-110 transition-all shadow-sm"
                          style={{ ...barStyle, backgroundColor: `${statusColor}30`, border: `1.5px solid ${statusColor}60` }}
                        >
                          {/* Lead avatar */}
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: statusColor }}>
                            {lead?.avatar?.slice(0, 2) || '?'}
                          </div>
                          <span className="text-xs font-bold truncate" style={{ color: statusColor }}>{lead?.name?.split(' ')[0]}</span>
                          <span className="text-xs opacity-60 ml-auto shrink-0" style={{ color: statusColor }}>{project.completionPercent}%</span>
                        </div>
                        {/* Today line */}
                        <div className="absolute top-0 h-full w-px bg-red-400/60 z-10 pointer-events-none" style={{ left: `${todayLeft}%` }} />
                      </div>
                    </div>

                    {/* Task rows per assignee */}
                    {Array.from(assigneeMap.entries()).map(([assigneeId, tasks]) => {
                      const person = PERSONS.find(p => p.id === assigneeId);
                      if (!person) return null;
                      const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';

                      return (
                        <div key={assigneeId} className="flex items-center gap-0 px-4 py-1 bg-muted/5">
                          <div className="w-48 shrink-0 flex items-center gap-2 pr-3 pl-4">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: deptColor }}>
                              {person.avatar.slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{person.name.split(' ')[0]}</p>
                              <p className="text-xs text-muted-foreground truncate">{person.department}</p>
                            </div>
                          </div>
                          <div className="flex-1 relative" style={{ height: `${tasks.length * 28 + 4}px` }}>
                            {tasks.map((task, ti) => {
                              const tStart = parseDate(task.startDate);
                              const tEnd = parseDate(task.endDate);
                              const tLeft = Math.max(0, ((tStart.getTime() - minDate.getTime()) / totalMs) * 100);
                              const tRight = Math.min(100, ((tEnd.getTime() - minDate.getTime()) / totalMs) * 100);
                              const tWidth = Math.max(tRight - tLeft, 1.5);
                              const taskColor = TASK_STATUS_COLORS[task.status] || '#94a3b8';

                              return (
                                <div
                                  key={task.id}
                                  className="absolute rounded flex items-center px-2 gap-1.5 cursor-pointer hover:brightness-110 transition-all shadow-sm"
                                  style={{
                                    left: `${tLeft}%`,
                                    width: `${tWidth}%`,
                                    top: `${ti * 28 + 2}px`,
                                    height: '24px',
                                    backgroundColor: taskColor,
                                    minWidth: 60,
                                  }}
                                  title={`${task.name} — ${person.name} (${task.startDate} → ${task.endDate})`}
                                >
                                  {/* Person avatar on bar */}
                                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold bg-white/20 shrink-0">
                                    <span className="text-white text-xs leading-none">{person.avatar.slice(0, 1)}</span>
                                  </div>
                                  <span className="text-xs font-bold text-white truncate">{person.name.split(' ')[0]}</span>
                                  <span className="text-xs text-white/70 truncate hidden sm:block">· {task.name}</span>
                                </div>
                              );
                            })}
                            {/* Today line */}
                            <div className="absolute top-0 h-full w-px bg-red-400/60 z-10 pointer-events-none" style={{ left: `${todayLeft}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-4 py-3 border-t border-border flex-wrap">
              {Object.entries(TASK_STATUS_COLORS).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                  <span className="text-xs text-muted-foreground">{status}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-px h-4 bg-red-400" />
                <span className="text-xs text-muted-foreground">Bugün</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}

// ─── Person View (Person → What) ──────────────────────────────────────────────
function PersonTaskView() {
  const [selectedDept, setSelectedDept] = useState<string>('Tümü');
  const [search, setSearch] = useState('');
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  const departments = ['Tümü', 'Elektronik', 'Yazılım', 'Mekanik', 'Test', 'Otomasyon', 'Donanım', 'Saha', 'Ürün', 'Lojistik', 'Destek'];

  // Only show persons who have tasks
  const personsWithTasks = PERSONS.filter(person => {
    const tasks = TASKS.filter(t => t.assigneeId === person.id);
    if (tasks.length === 0) return false;
    const matchDept = selectedDept === 'Tümü' || person.department === selectedDept;
    const matchSearch = person.name.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  // Compute timeline range from all tasks
  const allDates = TASKS.flatMap(t => [parseDate(t.startDate), parseDate(t.endDate)]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  minDate.setDate(1);
  maxDate.setMonth(maxDate.getMonth() + 1, 1);
  const totalMs = maxDate.getTime() - minDate.getTime();

  const months: { label: string; left: number }[] = [];
  const cur = new Date(minDate);
  while (cur < maxDate) {
    months.push({ label: formatMonthLabel(cur), left: ((cur.getTime() - minDate.getTime()) / totalMs) * 100 });
    cur.setMonth(cur.getMonth() + 1);
  }

  const today = new Date();
  const todayLeft = Math.max(0, Math.min(100, ((today.getTime() - minDate.getTime()) / totalMs) * 100));

  return (
    <div className="space-y-4">
      {/* Dept filter + search */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground">Departman:</span>
        {departments.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDept(d)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{
              background: selectedDept === d ? (d === 'Tümü' ? '#0071e3' : DEPARTMENT_COLORS[d as Department] || '#0071e3') : undefined,
              color: selectedDept === d ? 'white' : undefined,
            }}
          >
            {d}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Personel ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all w-44"
          />
        </div>
      </div>

      {/* Person timeline cards */}
      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Users size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Personel Görev Zaman Çizelgesi — Kim → Ne Yapıyor</span>
          <span className="ml-auto text-xs text-muted-foreground">{personsWithTasks.length} personel</span>
        </div>

        <div className="overflow-x-auto">
          <div style={{ minWidth: 900 }}>
            {/* Month header */}
            <div className="relative h-8 border-b border-border bg-muted/20 mx-4">
              {months.map((m, i) => (
                <div key={i} className="absolute top-0 h-full flex items-center" style={{ left: `${m.left}%` }}>
                  <div className="w-px h-full bg-border/50" />
                  <span className="text-xs text-muted-foreground ml-1.5 whitespace-nowrap">{m.label}</span>
                </div>
              ))}
              <div className="absolute top-0 h-full w-px bg-red-400/80 z-10" style={{ left: `${todayLeft}%` }}>
                <span className="absolute -top-0.5 left-1 text-xs text-red-400 font-semibold whitespace-nowrap">Bugün</span>
              </div>
            </div>

            {/* Person rows */}
            <div className="divide-y divide-border/30">
              {personsWithTasks.map(person => {
                const tasks = TASKS.filter(t => t.assigneeId === person.id);
                const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
                const isExpanded = expandedPerson === person.id;

                // Categorize tasks
                const doneTasks = tasks.filter(t => t.status === 'Tamamlandı');
                const activeTasks = tasks.filter(t => ['Yapılıyor', 'Test', 'Riskli', 'Gecikmiş', 'Plan Dışı'].includes(t.status));
                const plannedTasks = tasks.filter(t => t.status === 'Plan');

                return (
                  <div key={person.id} className="hover:bg-muted/10 transition-colors">
                    {/* Person row */}
                    <div
                      className="flex items-center gap-0 px-4 py-2 cursor-pointer"
                      onClick={() => setExpandedPerson(isExpanded ? null : person.id)}
                    >
                      <div className="w-52 shrink-0 flex items-center gap-2.5 pr-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: deptColor }}>
                          {person.avatar.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{person.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{person.title} · {person.department}</p>
                        </div>
                      </div>

                      {/* Task bars on timeline */}
                      <div className="flex-1 relative" style={{ height: `${Math.max(tasks.length, 1) * 28 + 4}px` }}>
                        {tasks.map((task, ti) => {
                          const tStart = parseDate(task.startDate);
                          const tEnd = parseDate(task.endDate);
                          const tLeft = Math.max(0, ((tStart.getTime() - minDate.getTime()) / totalMs) * 100);
                          const tRight = Math.min(100, ((tEnd.getTime() - minDate.getTime()) / totalMs) * 100);
                          const tWidth = Math.max(tRight - tLeft, 1.5);
                          const taskColor = TASK_STATUS_COLORS[task.status] || '#94a3b8';
                          const project = PROJECTS.find(p => p.id === task.projectId);

                          return (
                            <div
                              key={task.id}
                              className="absolute rounded flex items-center px-2 gap-1.5 cursor-pointer hover:brightness-110 transition-all shadow-sm group/bar"
                              style={{
                                left: `${tLeft}%`,
                                width: `${tWidth}%`,
                                top: `${ti * 28 + 2}px`,
                                height: '24px',
                                backgroundColor: taskColor,
                                minWidth: 70,
                              }}
                              title={`${task.name} — ${project?.name || ''} (${task.startDate} → ${task.endDate})`}
                            >
                              {/* Avatar on bar */}
                              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/20 shrink-0">
                                <span className="text-white text-xs font-bold leading-none">{person.avatar.slice(0, 2)}</span>
                              </div>
                              <span className="text-xs font-bold text-white truncate">{person.name.split(' ')[0]}</span>
                              <span className="text-xs text-white/70 truncate hidden sm:block">· {task.name}</span>
                            </div>
                          );
                        })}
                        {/* Today line */}
                        <div className="absolute top-0 h-full w-px bg-red-400/60 z-10 pointer-events-none" style={{ left: `${todayLeft}%` }} />
                      </div>

                      {/* Summary badges */}
                      <div className="w-32 shrink-0 flex items-center gap-1 pl-2 flex-wrap">
                        {doneTasks.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold">{doneTasks.length} bitti</span>}
                        {activeTasks.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">{activeTasks.length} aktif</span>}
                        {plannedTasks.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">{plannedTasks.length} plan</span>}
                      </div>
                    </div>

                    {/* Expanded task list */}
                    {isExpanded && (
                      <div className="px-4 pb-3 bg-muted/10">
                        <div className="ml-52 space-y-1.5 pt-1">
                          {tasks.map(task => {
                            const project = PROJECTS.find(p => p.id === task.projectId);
                            const taskColor = TASK_STATUS_COLORS[task.status] || '#94a3b8';
                            return (
                              <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg bg-card border border-border/50">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: taskColor }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-foreground truncate">{task.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{project?.name} · {task.startDate} → {task.endDate}</p>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: `${taskColor}20`, color: taskColor }}>{task.status}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-4 py-3 border-t border-border flex-wrap">
              {Object.entries(TASK_STATUS_COLORS).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                  <span className="text-xs text-muted-foreground">{status}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-px h-4 bg-red-400" />
                <span className="text-xs text-muted-foreground">Bugün</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {personsWithTasks.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Personel bulunamadı</p>
        </div>
      )}
    </div>
  );
}

// ─── Project Cards View ────────────────────────────────────────────────────────
function ProjectCardsView({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map(project => {
          const lead = PERSONS.find(p => p.id === project.leadId);
          const statusColor = STATUS_COLORS[project.status] || '#94a3b8';
          const projectTasks = TASKS.filter(t => t.projectId === project.id);
          const delayed = projectTasks.filter(t => t.status === 'Gecikmiş').length;
          // Collect all unique people: lead + collaborators + task assignees
          const allPeopleIds = [...new Set([project.leadId, ...(project.collaboratorIds || []), ...projectTasks.map(t => t.assigneeId)])];
          const allPeople = allPeopleIds.map(id => PERSONS.find(p => p.id === id)).filter(Boolean);

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card-base p-5 cursor-pointer hover:scale-[1.01] hover:shadow-elevated transition-all duration-200 border border-border hover:border-primary/30 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>{project.status}</span>
                    {project.department.slice(0, 2).map(d => (
                      <span key={d} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${DEPARTMENT_COLORS[d]}20`, color: DEPARTMENT_COLORS[d] }}>{d}</span>
                    ))}
                    {project.department.length > 2 && <span className="text-xs text-muted-foreground">+{project.department.length - 2}</span>}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Lider: {lead?.name}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">İlerleme</span>
                  <span className="text-sm font-bold" style={{ color: statusColor }}>{project.completionPercent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${project.completionPercent}%`, backgroundColor: statusColor }} />
                </div>
              </div>

              {/* Collaborator avatars */}
              {allPeople.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground shrink-0">Ekip:</span>
                  <div className="flex items-center -space-x-1.5">
                    {allPeople.slice(0, 7).map(person => person && (
                      <div
                        key={person.id}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-card"
                        style={{ backgroundColor: DEPARTMENT_COLORS[person.department] || '#94a3b8' }}
                        title={`${person.name} (${person.department})`}
                      >
                        {person.avatar.slice(0, 1)}
                      </div>
                    ))}
                    {allPeople.length > 7 && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground bg-muted border-2 border-card">
                        +{allPeople.length - 7}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{allPeople.length} kişi</span>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: 'Aktif', value: project.activeTaskCount, color: '#f97316' },
                  { label: 'Bitti', value: project.completedTaskCount, color: '#22c55e' },
                  { label: 'Toplam', value: project.totalTaskCount, color: '#3b7dd8' },
                  { label: 'Gecikmiş', value: delayed, color: delayed > 0 ? '#ef4444' : '#94a3b8' },
                ].map(s => (
                  <div key={s.label} className="text-center bg-muted/30 rounded-lg py-2">
                    <p className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{project.startDate} → {project.endDate}</span>
                </div>
                {delayed > 0 && (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertTriangle size={12} />
                    <span className="text-xs font-semibold">{delayed} gecikmiş</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <FolderKanban size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Proje bulunamadı</p>
        </div>
      )}

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tümü');
  const [deptFilter, setDeptFilter] = useState<string>('Tümü');
  const [activeTab, setActiveTab] = useState<'cards' | 'gantt' | 'person'>('cards');

  const statuses = ['Tümü', 'Aktif', 'Kritik', 'Beklemede', 'Tamamlandı'];
  const departments: string[] = ['Tümü', 'Elektronik', 'Yazılım', 'Mekanik', 'Test', 'Otomasyon', 'Donanım', 'Saha', 'Ürün', 'Lojistik', 'Destek'];

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'Tümü' || p.status === statusFilter;
    const matchDept = deptFilter === 'Tümü' || p.department.includes(deptFilter as Department);
    return matchSearch && matchStatus && matchDept;
  });

  return (
    <AppLayout currentPath="/projects">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projeler</h1>
            <p className="text-muted-foreground text-sm mt-1">{PROJECTS.length} proje · 2025–2026 Dönemi</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm flex items-center gap-2"><Filter size={14} /> Filtrele</button>
            <button className="btn-primary text-sm flex items-center gap-2">📊 Rapor Al</button>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl w-fit">
          {[
            { key: 'cards', label: '📋 Kartlar', icon: FolderKanban },
            { key: 'gantt', label: '📊 Gantt (Proje → Kim)', icon: BarChart2 },
            { key: 'person', label: '👤 Personel → Ne Yapıyor', icon: Users },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters — shown for cards and gantt tabs */}
        {activeTab !== 'person' && (
          <>
            <div className="flex items-center gap-2 flex-wrap">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {s}
                  {s !== 'Tümü' && <span className="ml-1.5 opacity-70">{PROJECTS.filter(p => p.status === s).length}</span>}
                </button>
              ))}
              <div className="relative ml-auto">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Proje ara..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all w-48"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Departman:</span>
              {departments.map(d => (
                <button
                  key={`dept-filter-${d}`}
                  onClick={() => setDeptFilter(d)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                  style={{
                    background: deptFilter === d ? (d === 'Tümü' ? '#0071e3' : DEPARTMENT_COLORS[d as Department]) : '#f5f5f7',
                    color: deptFilter === d ? 'white' : '#6e6e73',
                    border: `1px solid ${deptFilter === d ? 'transparent' : '#e8e8ed'}`,
                  }}
                >
                  {d}
                  {d !== 'Tümü' && <span className="ml-1 opacity-80">{PROJECTS.filter(p => p.department.includes(d as Department)).length}</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Tab content */}
        {activeTab === 'cards' && <ProjectCardsView projects={filtered} />}
        {activeTab === 'gantt' && <ProjectGanttView projects={PROJECTS} search={search} statusFilter={statusFilter} deptFilter={deptFilter} />}
        {activeTab === 'person' && <PersonTaskView />}
      </div>
    </AppLayout>
  );
}
