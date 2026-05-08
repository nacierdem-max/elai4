'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { RISKS, PERSONS, PROJECTS, TASKS, type Risk, type RiskStatus } from '@/data/mockData';
import { AlertTriangle, Search, Filter, X, ChevronRight, FileText, User, Calendar } from 'lucide-react';
import Link from 'next/link';

const RISK_STATUS_COLORS: Record<RiskStatus, string> = {
  'Açık': '#ef4444',
  'Riskli': '#f97316',
  'Çözüm Aranıyor': '#eab308',
  'Kapatıldı': '#22c55e',
};

interface RiskModalProps {
  risk: Risk;
  onClose: () => void;
}

function RiskModal({ risk, onClose }: RiskModalProps) {
  const assignee = PERSONS.find(p => p.id === risk.assigneeId);
  const project = PROJECTS.find(p => p.id === risk.projectId);
  const task = TASKS.find(t => t.id === risk.taskId);
  const statusColor = RISK_STATUS_COLORS[risk.status] || '#94a3b8';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <span
              className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
            >
              {risk.status}
            </span>
            <h2 className="text-lg font-bold text-foreground">{risk.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{risk.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><User size={11} /> Sorumlu</p>
              <p className="text-sm font-semibold text-foreground">{assignee?.name}</p>
              <p className="text-xs text-muted-foreground">{assignee?.department}</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Calendar size={11} /> Tarih</p>
              <p className="text-sm font-semibold text-foreground">{risk.date}</p>
            </div>
          </div>

          {project && (
            <Link
              href="/projects"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Proje</p>
                <p className="text-sm font-semibold text-foreground">{project.name}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </Link>
          )}

          {task && (
            <Link
              href="/task-kanban-panel"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">İlgili Görev</p>
                <p className="text-sm font-semibold text-foreground">{task.name}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </Link>
          )}

          {risk.fileCount > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border">
              <FileText size={14} className="text-cyan-400" />
              <span className="text-sm text-foreground">{risk.fileCount} ekli dosya</span>
              <Link href="/files" onClick={onClose} className="ml-auto text-xs text-primary hover:underline">Görüntüle</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RisksPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tümü');
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const statuses = ['Tümü', 'Açık', 'Riskli', 'Çözüm Aranıyor', 'Kapatıldı'];

  // Extended risk list with more demo data
  const allRisks: Risk[] = [
    ...RISKS,
    { id: 'rsk-009', title: 'Yazılım Lisans Süresi', projectId: 'prj-003', taskId: 'tsk-003', assigneeId: 'p-017', date: '10.05.2026', status: 'Açık', description: 'SCADA yazılım lisansı Haziran sonunda doluyor, yenileme süreci başlatılmalı.', fileCount: 1 },
    { id: 'rsk-010', title: 'Saha Ekipman Arızası', projectId: 'prj-004', taskId: 'tsk-014', assigneeId: 'p-039', date: '08.05.2026', status: 'Riskli', description: 'Saha test cihazlarından 2 tanesi kalibrasyon dışına çıktı.', fileCount: 0 },
    { id: 'rsk-011', title: 'Mekanik Tolerans Sapması', projectId: 'prj-006', taskId: 'tsk-008', assigneeId: 'p-031', date: '05.05.2026', status: 'Çözüm Aranıyor', description: 'Termal yönetim modülü mekanik parçalarında ±0.05mm tolerans aşımı.', fileCount: 2 },
    { id: 'rsk-012', title: 'Otomasyon PLC Uyumsuzluğu', projectId: 'prj-007', taskId: 'tsk-016', assigneeId: 'p-049', date: '03.05.2026', status: 'Açık', description: 'IoT Gateway ile mevcut PLC versiyonu arasında protokol uyumsuzluğu.', fileCount: 1 },
    { id: 'rsk-013', title: 'Donanım Entegrasyon Hatası', projectId: 'prj-005', taskId: 'tsk-015', assigneeId: 'p-059', date: '01.05.2026', status: 'Kapatıldı', description: 'Donanım test platformu entegrasyon hatası giderildi, yeniden test onaylandı.', fileCount: 3 },
    { id: 'rsk-014', title: 'Lojistik Gecikme Riski', projectId: 'prj-010', taskId: 'tsk-011', assigneeId: 'p-084', date: '28.04.2026', status: 'Açık', description: 'Lojistik takip sistemi için gerekli sunucu donanımı teslimatı gecikiyor.', fileCount: 0 },
    { id: 'rsk-015', title: 'Güç Kaynağı Aşırı Isınma', projectId: 'prj-009', taskId: 'tsk-007', assigneeId: 'p-014', date: '25.04.2026', status: 'Riskli', description: 'Güç kaynağı optimizasyon testlerinde 85°C üzeri sıcaklık ölçüldü.', fileCount: 2 },
  ];

  const filtered = allRisks.filter(r => {
    const assignee = PERSONS.find(p => p.id === r.assigneeId);
    const project = PROJECTS.find(p => p.id === r.projectId);
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      assignee?.name.toLowerCase().includes(search.toLowerCase()) ||
      project?.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'Tümü' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: allRisks.length,
    critical: allRisks.filter(r => r.status === 'Açık' || r.status === 'Riskli').length,
    open: allRisks.filter(r => r.status !== 'Kapatıldı').length,
    closed: allRisks.filter(r => r.status === 'Kapatıldı').length,
  };

  return (
    <AppLayout currentPath="/risks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Riskler & Notlar</h1>
            <p className="text-muted-foreground text-sm mt-1">{counts.total} toplam · {counts.critical} kritik · {counts.closed} kapatıldı</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm flex items-center gap-2">
              <Filter size={14} /> Filtrele
            </button>
            <button className="btn-primary text-sm flex items-center gap-2">
              📊 Rapor Al
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Toplam Risk', value: counts.total, color: '#94a3b8' },
            { label: 'Açık/Riskli', value: counts.open, color: '#ef4444' },
            { label: 'Kritik', value: counts.critical, color: '#f97316' },
            { label: 'Kapatıldı', value: counts.closed, color: '#22c55e' },
          ].map(s => (
            <div key={s.label} className="card-base p-4 text-center border border-border">
              <p className="text-3xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Risk ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all w-48"
            />
          </div>
        </div>

        {/* Risk Table */}
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Risk Başlığı</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Proje</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Sorumlu</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Tarih</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Durum</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Dosya</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(risk => {
                  const assignee = PERSONS.find(p => p.id === risk.assigneeId);
                  const project = PROJECTS.find(p => p.id === risk.projectId);
                  const statusColor = RISK_STATUS_COLORS[risk.status] || '#94a3b8';

                  return (
                    <tr
                      key={risk.id}
                      onClick={() => setSelectedRisk(risk)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: statusColor }} />
                          <span className="text-sm font-semibold text-foreground">{risk.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{project?.name}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs text-foreground">{assignee?.name}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-muted-foreground font-mono">{risk.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                        >
                          {risk.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {risk.fileCount > 0 && (
                          <div className="flex items-center gap-1 text-cyan-400">
                            <FileText size={12} />
                            <span className="text-xs">{risk.fileCount}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <AlertTriangle size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Risk bulunamadı</p>
            </div>
          )}
        </div>
      </div>

      {selectedRisk && (
        <RiskModal risk={selectedRisk} onClose={() => setSelectedRisk(null)} />
      )}
    </AppLayout>
  );
}
