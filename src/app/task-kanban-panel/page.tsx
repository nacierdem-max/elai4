import React from 'react';
import AppLayout from '@/components/AppLayout';
import TaskKanbanContent from './components/TaskKanbanContent';

export default function TaskKanbanPage() {
  return (
    <AppLayout currentPath="/task-kanban-panel">
      <TaskKanbanContent />
    </AppLayout>
  );
}