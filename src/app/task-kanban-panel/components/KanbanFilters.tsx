'use client';
import React from 'react';
import { Search, X } from 'lucide-react';
import { PERSONS, PROJECTS, type Department } from '@/data/mockData';

const DEPARTMENTS: (Department | 'Tümü')[] = [
  'Tümü', 'Elektronik', 'Yazılım', 'Mekanik', 'Test', 'Otomasyon', 'Donanım', 'Saha', 'Ürün', 'Lojistik', 'Destek',
];

const PRIORITIES = ['Tümü', 'Kritik', 'Yüksek', 'Orta', 'Düşük'];

interface Filters {
  department: string;
  project: string;
  person: string;
  search: string;
  priority: string;
}

interface Props {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
}

export default function KanbanFilters({ filters, onFiltersChange }: Props) {
  const update = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.department !== 'Tümü' ||
    filters.project !== 'Tümü' ||
    filters.person !== 'Tümü' ||
    filters.priority !== 'Tümü' ||
    filters.search !== '';

  return (
    <div className="card-base p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Görev adı ara..."
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className="input-base pl-9 text-sm py-2"
          />
          {filters.search && (
            <button
              onClick={() => update('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Department filter */}
        <select
          value={filters.department}
          onChange={(e) => update('department', e.target.value)}
          className="input-base text-sm py-2 w-auto min-w-36"
        >
          {DEPARTMENTS.map((d) => (
            <option key={`dept-filter-${d}`} value={d}>{d}</option>
          ))}
        </select>

        {/* Project filter */}
        <select
          value={filters.project}
          onChange={(e) => update('project', e.target.value)}
          className="input-base text-sm py-2 w-auto min-w-44"
        >
          <option value="Tümü">Tüm Projeler</option>
          {PROJECTS.map((p) => (
            <option key={`proj-filter-${p.id}`} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Person filter */}
        <select
          value={filters.person}
          onChange={(e) => update('person', e.target.value)}
          className="input-base text-sm py-2 w-auto min-w-44"
        >
          <option value="Tümü">Tüm Personel</option>
          {PERSONS.slice(0, 30).map((p) => (
            <option key={`person-filter-${p.id}`} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Priority filter */}
        <select
          value={filters.priority}
          onChange={(e) => update('priority', e.target.value)}
          className="input-base text-sm py-2 w-auto min-w-32"
        >
          {PRIORITIES.map((pr) => (
            <option key={`prio-filter-${pr}`} value={pr}>{pr}</option>
          ))}
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={() => onFiltersChange({ department: 'Tümü', project: 'Tümü', person: 'Tümü', search: '', priority: 'Tümü' })}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-2 rounded-lg transition-all duration-150"
          >
            <X size={13} />
            Filtreleri Temizle
          </button>
        )}
      </div>
    </div>
  );
}