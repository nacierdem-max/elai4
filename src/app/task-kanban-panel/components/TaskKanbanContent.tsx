'use client';
import React, { useState } from 'react';
import KanbanFilters from './KanbanFilters';
import KanbanBoard from './KanbanBoard';
import TaskDetailModal from './TaskDetailModal';
import KanbanStatsBar from './KanbanStatsBar';
import { TASKS, type Task } from '@/data/mockData';

export type ViewMode = 'kanban' | 'list';

export default function TaskKanbanContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    department: 'Tümü',
    project: 'Tümü',
    person: 'Tümü',
    search: '',
    priority: 'Tümü',
  });

  const filteredTasks = TASKS.filter(task => {
    if (filters.department !== 'Tümü' && task.department !== filters.department) return false;
    if (filters.project !== 'Tümü' && task.projectId !== filters.project) return false;
    if (filters.person !== 'Tümü' && task.assigneeId !== filters.person) return false;
    if (filters.priority !== 'Tümü' && task.priority !== filters.priority) return false;
    if (filters.search && !task.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Görev / Kanban Panosu</h1>
          <p className="text-muted-foreground text-sm mt-1">
            920 görev · 22 proje · 100 personel · 2026 aktif dönem
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-muted border border-border rounded-lg p-1 gap-1">
            {(['kanban', 'list'] as ViewMode[]).map((mode) => (
              <button
                key={`view-${mode}`}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all duration-150 ${
                  viewMode === mode
                    ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === 'kanban' ? '⊞ Kanban' : '☰ Liste'}
              </button>
            ))}
          </div>
          <button className="btn-ghost text-sm flex items-center gap-2">
            📤 Dışa Aktar
          </button>
          <button className="btn-primary text-sm flex items-center gap-2">
            + Yeni Görev
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <KanbanStatsBar tasks={filteredTasks} />

      {/* Filters */}
      <KanbanFilters filters={filters} onFiltersChange={setFilters} />

      {/* Board or List */}
      <KanbanBoard
        tasks={filteredTasks}
        viewMode={viewMode}
        onTaskClick={setSelectedTask}
      />

      {/* Task detail modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}