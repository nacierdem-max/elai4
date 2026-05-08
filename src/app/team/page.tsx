'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { PERSONS, DEPARTMENT_COLORS, type Person, type Department } from '@/data/mockData';
import { Users, Search, Filter, X, ChevronRight, AlertTriangle, BarChart2 } from 'lucide-react';
import MemberInlineDetail from './components/MemberInlineDetail';
import TeamGanttView from './components/TeamGanttView';

const DEPARTMENTS: Department[] = ['Elektronik', 'Yazılım', 'Mekanik', 'Test', 'Otomasyon', 'Donanım', 'Saha', 'Ürün', 'Lojistik', 'Destek'];

type PageView = 'grid' | 'gantt';

export default function TeamPage() {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<Department | 'Tümü'>('Tümü');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [pageView, setPageView] = useState<PageView>('grid');

  const filtered = PERSONS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === 'Tümü' || p.department === selectedDept;
    return matchSearch && matchDept;
  });

  const deptGroups = DEPARTMENTS.map(dept => ({
    dept,
    count: PERSONS.filter(p => p.department === dept).length,
    color: DEPARTMENT_COLORS[dept],
  }));

  function handleCardClick(person: Person) {
    if (selectedPerson?.id === person.id) {
      setSelectedPerson(null);
    } else {
      setSelectedPerson(person);
    }
  }

  return (
    <AppLayout currentPath="/team">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ekip & Personel</h1>
            <p className="text-muted-foreground text-sm mt-1">100 personel · 10 departman · 2026 Aktif Dönemi</p>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center bg-muted rounded-xl p-1">
              <button
                onClick={() => setPageView('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  pageView === 'grid' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Users size={14} /> Personel
              </button>
              <button
                onClick={() => { setPageView('gantt'); setSelectedPerson(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  pageView === 'gantt' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <BarChart2 size={14} /> Gantt
              </button>
            </div>
            <button className="btn-ghost text-sm flex items-center gap-2">
              <Filter size={14} /> Filtrele
            </button>
            <button className="btn-primary text-sm flex items-center gap-2">
              📊 Rapor Al
            </button>
          </div>
        </div>

        {/* Department Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {deptGroups.map(({ dept, count, color }) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(selectedDept === dept ? 'Tümü' : dept)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 hover:scale-[1.02] ${
                selectedDept === dept ? 'border-current shadow-lg' : 'border-border bg-card hover:bg-muted/30'
              }`}
              style={selectedDept === dept ? { borderColor: color, backgroundColor: `${color}15` } : {}}
            >
              <div className="w-7 h-7 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Users size={14} style={{ color }} />
              </div>
              <p className="text-lg font-bold tabular-nums" style={{ color }}>{count}</p>
              <p className="text-xs text-muted-foreground truncate">{dept}</p>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="İsim veya unvan ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/60 transition-all"
            />
          </div>
          {selectedDept !== 'Tümü' && (
            <button
              onClick={() => setSelectedDept('Tümü')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {selectedDept} <X size={12} />
            </button>
          )}
          <span className="text-xs text-muted-foreground">{filtered.length} kişi</span>
        </div>

        {/* ── GANTT VIEW ── */}
        {pageView === 'gantt' && (
          <TeamGanttView filteredPersons={filtered} />
        )}

        {/* ── GRID VIEW ── */}
        {pageView === 'grid' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(person => {
                const deptColor = DEPARTMENT_COLORS[person.department] || '#94a3b8';
                const isOverloaded = person.activeTasks >= 7;
                const barWidth = (person.activeTasks / 12) * 100;
                const isSelected = selectedPerson?.id === person.id;

                return (
                  <React.Fragment key={person.id}>
                    <div
                      onClick={() => handleCardClick(person)}
                      className={`card-base p-4 cursor-pointer hover:scale-[1.02] hover:shadow-elevated transition-all duration-200 border hover:border-current group ${
                        isSelected ? 'shadow-elevated scale-[1.01]' : 'border-border'
                      }`}
                      style={isSelected ? { borderColor: deptColor, backgroundColor: `${deptColor}08` } : {}}
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                            style={{ backgroundColor: deptColor }}
                          >
                            {person.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{person.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {isOverloaded && <AlertTriangle size={14} className="text-orange-400 shrink-0 mt-0.5" />}
                          <ChevronRight
                            size={14}
                            className={`text-muted-foreground transition-all ${isSelected ? 'rotate-90 text-primary' : 'group-hover:text-primary'}`}
                          />
                        </div>
                      </div>

                      {/* Dept badge */}
                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                        style={{ backgroundColor: `${deptColor}20`, color: deptColor }}
                      >
                        {person.department}
                      </span>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: 'Proje', value: person.activeProjects, color: '#3b7dd8' },
                          { label: 'Görev', value: person.activeTasks, color: isOverloaded ? '#f97316' : deptColor },
                          { label: 'Bitti', value: person.completedTasks, color: '#22c55e' },
                        ].map(s => (
                          <div key={s.label} className="text-center bg-muted/30 rounded-lg py-1.5">
                            <p className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Workload bar */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Yük</span>
                          <span className="text-xs font-semibold" style={{ color: isOverloaded ? '#f97316' : deptColor }}>
                            {person.activeTasks} aktif
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(barWidth, 100)}%`, backgroundColor: isOverloaded ? '#f97316' : deptColor }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground truncate">{person.email}</span>
                      </div>
                    </div>

                    {/* Inline detail panel — rendered right after the selected card */}
                    {isSelected && (
                      <MemberInlineDetail
                        person={person}
                        onClose={() => setSelectedPerson(null)}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Sonuç bulunamadı</p>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
