'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { PERSONS, PROJECTS, TASKS, ACTIVITY_LOGS, DEPT_TASK_DISTRIBUTION, MONTHLY_WORKLOAD, DEPARTMENT_COLORS } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import {
  FileText, Search, Filter, Download, Eye, X, MessageSquare,
  ChevronRight, Archive, BarChart3, Send, Sparkles, TrendingUp, Users, AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FileItem {
  id: string;
  name: string;
  sender: string;
  senderId: string;
  projectId: string;
  taskId: string;
  type: 'pdf' | 'xls' | 'img' | 'dwg' | 'zip' | 'docx';
  date: string;
  size: string;
}

interface MessageItem {
  id: string;
  fromId: string;
  toId: string;
  summary: string;
  date: string;
  projectId: string;
  taskId: string;
  hasFile: boolean;
  fileName?: string;
}

interface AIResult {
  query: string;
  type: 'persons' | 'chart' | 'text';
  title: string;
  data?: { name: string; value: number; color: string; link?: string }[];
  text?: string;
  persons?: { id: string; name: string; dept: string; value: number; label: string; color: string }[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: '#ef4444',
  xls: '#22c55e',
  img: '#3b7dd8',
  dwg: '#f97316',
  zip: '#eab308',
  docx: '#8b5cf6',
};

const LOG_ACTION_COLORS: Record<string, string> = {
  'Görev Güncellendi': '#3b7dd8',
  'Görev Tamamlandı': '#22c55e',
  'Görev Eklendi': '#8b5cf6',
  'Görev Gecikti': '#ef4444',
  'Dosya Eklendi': '#f97316',
  'Risk Açıldı': '#ef4444',
  'Risk Güncellendi': '#eab308',
  'Mesaj Gönderildi': '#06b6d4',
};

const FILES: FileItem[] = [
  { id: 'f-001', name: 'test_apr_v12.pdf', sender: 'Aytem Çelik', senderId: 'p-017', projectId: 'prj-003', taskId: 'tsk-003', type: 'pdf', date: '13.04.2026', size: '2.4 MB' },
  { id: 'f-002', name: 'testdata_rev2.xls', sender: 'Elif Kaya', senderId: 'p-039', projectId: 'prj-002', taskId: 'tsk-002', type: 'xls', date: '14.05.2026', size: '1.1 MB' },
  { id: 'f-003', name: 'hmi_export.png', sender: 'Zeynep Erdek', senderId: 'p-019', projectId: 'prj-004', taskId: 'tsk-005', type: 'img', date: '11.06.2026', size: '3.8 MB' },
  { id: 'f-004', name: 'pcb_layout_rev4.dwg', sender: 'Ahmet Yılmaz', senderId: 'p-002', projectId: 'prj-008', taskId: 'tsk-001', type: 'dwg', date: '05.03.2026', size: '8.2 MB' },
  { id: 'f-005', name: 'firmware_v24_src.zip', sender: 'Burak Kaya', senderId: 'p-020', projectId: 'prj-001', taskId: 'tsk-006', type: 'zip', date: '20.04.2026', size: '15.6 MB' },
  { id: 'f-006', name: 'enerji_sapma_raporu.pdf', sender: 'Temen Yıldız', senderId: 'p-005', projectId: 'prj-002', taskId: 'tsk-010', type: 'pdf', date: '02.05.2026', size: '1.8 MB' },
  { id: 'f-007', name: 'scada_guncelleme.docx', sender: 'Seda Arman', senderId: 'p-018', projectId: 'prj-003', taskId: 'tsk-013', type: 'docx', date: '01.05.2026', size: '0.9 MB' },
  { id: 'f-008', name: 'termal_sim_v3.pdf', sender: 'Melih Şahin', senderId: 'p-031', projectId: 'prj-006', taskId: 'tsk-008', type: 'pdf', date: '10.04.2026', size: '4.2 MB' },
  { id: 'f-009', name: 'iot_protokol_spec.pdf', sender: 'Uğur Arslan', senderId: 'p-055', projectId: 'prj-007', taskId: 'tsk-009', type: 'pdf', date: '16.05.2026', size: '2.1 MB' },
  { id: 'f-010', name: 'guc_analiz_raporu.xls', sender: 'Turan Özcan', senderId: 'p-014', projectId: 'prj-009', taskId: 'tsk-007', type: 'xls', date: '05.04.2026', size: '0.7 MB' },
  { id: 'f-011', name: 'mekanik_3d_model.dwg', sender: 'Arda Kılıç', senderId: 'p-032', projectId: 'prj-006', taskId: 'tsk-008', type: 'dwg', date: '12.04.2026', size: '22.4 MB' },
  { id: 'f-012', name: 'test_raporu_donanim.pdf', sender: 'Mehmet Tan', senderId: 'p-040', projectId: 'prj-005', taskId: 'tsk-004', type: 'pdf', date: '12.04.2026', size: '3.1 MB' },
  { id: 'f-013', name: 'mobil_debug_log.zip', sender: 'Zeynep Erdek', senderId: 'p-019', projectId: 'prj-004', taskId: 'tsk-005', type: 'zip', date: '04.05.2026', size: '5.3 MB' },
  { id: 'f-014', name: 'lojistik_modul_tasarim.docx', sender: 'Hande Koç', senderId: 'p-076', projectId: 'prj-010', taskId: 'tsk-011', type: 'docx', date: '03.05.2026', size: '1.4 MB' },
  { id: 'f-015', name: 'pcb_stok_listesi.xls', sender: 'Fatih Yıldız', senderId: 'p-003', projectId: 'prj-001', taskId: 'tsk-012', type: 'xls', date: '21.04.2026', size: '0.5 MB' },
];

const MESSAGES: MessageItem[] = [
  { id: 'm-001', fromId: 'p-002', toId: 'p-020', summary: '"Testte hata tespit edildi, PCB stok durumu kritik, tedarikçi görüşmesi lazım"', date: '12.05.2026', projectId: 'prj-001', taskId: 'tsk-001', hasFile: true, fileName: 'test_results.pdf' },
  { id: 'm-002', fromId: 'p-003', toId: 'p-017', summary: '"Güncel versiyon yüklendi, SCADA modülü test edilebilir"', date: '13.05.2026', projectId: 'prj-002', taskId: 'tsk-010', hasFile: true, fileName: 'cost_report.xls' },
  { id: 'm-003', fromId: 'p-039', toId: 'p-040', summary: '"Termal simülasyon sonuçları beklenenden %8 sapıyor, revizyon gerekiyor"', date: '10.05.2026', projectId: 'prj-002', taskId: 'tsk-002', hasFile: false },
  { id: 'm-004', fromId: 'p-017', toId: 'p-018', summary: '"SCADA arayüz tasarımı için yeni gereksinimler eklendi, plan dışı görev açıldı"', date: '01.05.2026', projectId: 'prj-003', taskId: 'tsk-013', hasFile: false },
  { id: 'm-005', fromId: 'p-031', toId: 'p-001', summary: '"Mekanik 3D model revizyonu tamamlandı, onay bekleniyor"', date: '15.04.2026', projectId: 'prj-006', taskId: 'tsk-008', hasFile: true, fileName: 'model_rev2.dwg' },
  { id: 'm-006', fromId: 'p-019', toId: 'p-039', summary: '"Mobil uygulama GPS hatası kritik seviyede, deadline geçildi"', date: '11.05.2026', projectId: 'prj-004', taskId: 'tsk-005', hasFile: true, fileName: 'debug_log.zip' },
  { id: 'm-007', fromId: 'p-055', toId: 'p-049', summary: '"IoT protokol entegrasyonu için tedarikçi onayı alındı"', date: '17.05.2026', projectId: 'prj-007', taskId: 'tsk-009', hasFile: false },
  { id: 'm-008', fromId: 'p-014', toId: 'p-001', summary: '"Güç analiz raporu hazır, incelemenizi bekliyorum"', date: '06.04.2026', projectId: 'prj-009', taskId: 'tsk-007', hasFile: true, fileName: 'guc_analiz.xls' },
];

const PRESET_QUERIES = [
  { label: "Haziran\'da en yoğun 5 kişi", query: "Haziran\'da en çok iş yükü olan ilk 5 kişi kim?" },
  { label: 'Plan dışı işler', query: 'Son yıl plan dışı açılan işlerin oranı nedir?' },
  { label: 'Departman dosya dağılımı', query: 'En fazla dosya paylaşan departman hangisi?' },
  { label: 'Gecikmiş görevler', query: 'Gecikmiş görevler ve sorumluları kimler?' },
  { label: 'Kritik riskler', query: 'Yazılım departmanında en çok risk açanlar?' },
];

// ─── AI Response Generator ────────────────────────────────────────────────────

function generateAIResponse(query: string): AIResult {
  const q = query.toLowerCase();

  if (q.includes('yoğun') || q.includes('yük') || q.includes('5 kişi')) {
    const top5 = [...PERSONS].sort((a, b) => b.activeTasks - a.activeTasks).slice(0, 5);
    return {
      query, type: 'persons', title: 'En Yoğun 5 Mühendis (Aktif Görev)',
      persons: top5.map(p => ({ id: p.id, name: p.name, dept: p.department, value: p.activeTasks, label: 'aktif görev', color: DEPARTMENT_COLORS[p.department] || '#94a3b8' })),
    };
  }
  if (q.includes('plan dışı') || q.includes('oran')) {
    const planDisi = TASKS.filter(t => t.status === 'Plan Dışı');
    return {
      query, type: 'persons', title: `Plan Dışı İşler: ${planDisi.length} görev (%${Math.round((planDisi.length / TASKS.length) * 100)} oran)`,
      persons: planDisi.map(t => { const p = PERSONS.find(per => per.id === t.assigneeId); return { id: t.id, name: p?.name || 'Bilinmeyen', dept: p?.department || 'Bilinmeyen', value: 1, label: t.name, color: '#a78bfa' }; }),
    };
  }
  if (q.includes('dosya') || q.includes('departman')) {
    return {
      query, type: 'chart', title: 'Departman Bazında Dosya Dağılımı',
      data: [
        { name: 'Yazılım', value: 1130, color: '#8b5cf6' }, { name: 'Elektronik', value: 980, color: '#3b7dd8' },
        { name: 'Test', value: 670, color: '#f97316' }, { name: 'Mekanik', value: 520, color: '#22c55e' },
        { name: 'Otomasyon', value: 410, color: '#06b6d4' }, { name: 'Donanım', value: 340, color: '#eab308' },
        { name: 'Saha', value: 250, color: '#ec4899' },
      ],
    };
  }
  if (q.includes('gecikmiş') || q.includes('gecikme')) {
    const delayed = TASKS.filter(t => t.status === 'Gecikmiş');
    return {
      query, type: 'persons', title: `Gecikmiş Görevler: ${delayed.length} görev`,
      persons: delayed.map(t => { const p = PERSONS.find(per => per.id === t.assigneeId); return { id: t.id, name: p?.name || 'Bilinmeyen', dept: p?.department || 'Bilinmeyen', value: Math.abs(t.remainingDays), label: `${t.name} (${t.remainingDays} gün)`, color: '#ef4444' }; }),
    };
  }
  if (q.includes('risk') || q.includes('yazılım')) {
    const yazilimPersons = PERSONS.filter(p => p.department === 'Yazılım').slice(0, 5);
    return {
      query, type: 'persons', title: 'Yazılım Departmanı — Risk & Yük Analizi',
      persons: yazilimPersons.map(p => ({ id: p.id, name: p.name, dept: p.department, value: p.activeTasks, label: `${p.activeTasks} aktif görev`, color: '#8b5cf6' })),
    };
  }
  return {
    query, type: 'text', title: 'AI Analiz Sonucu',
    text: `"${query}" sorgusu için analiz tamamlandı. Sistemde ${PERSONS.length} personel, ${PROJECTS.length} proje ve ${TASKS.length} görev bulunmaktadır. Daha spesifik bir sorgu için yukarıdaki hazır sorguları kullanabilirsiniz.`,
  };
}

// ─── File Modal ───────────────────────────────────────────────────────────────

interface FileModalProps { file: FileItem; onClose: () => void; }

function FileModal({ file, onClose }: FileModalProps) {
  const sender = PERSONS.find(p => p.id === file.senderId);
  const project = PROJECTS.find(p => p.id === file.projectId);
  const task = TASKS.find(t => t.id === file.taskId);
  const typeColor = FILE_TYPE_COLORS[file.type] || '#94a3b8';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: typeColor }}>
              {file.type.toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">{file.name}</h2>
              <p className="text-xs text-muted-foreground">{file.size} · {file.date}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Gönderen</p>
              <p className="text-sm font-semibold text-foreground">{sender?.name}</p>
              <p className="text-xs text-muted-foreground">{sender?.department}</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Tür</p>
              <span className="text-sm font-bold uppercase" style={{ color: typeColor }}>.{file.type}</span>
            </div>
          </div>
          {project && (
            <Link href="/projects" onClick={onClose} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border transition-all cursor-pointer">
              <div><p className="text-xs text-muted-foreground mb-0.5">Proje</p><p className="text-sm font-semibold text-foreground">{project.name}</p></div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </Link>
          )}
          {task && (
            <Link href="/task-kanban-panel" onClick={onClose} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border transition-all cursor-pointer">
              <div><p className="text-xs text-muted-foreground mb-0.5">İlgili Görev</p><p className="text-sm font-semibold text-foreground">{task.name}</p></div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </Link>
          )}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-semibold">
              <Eye size={14} /> Önizle
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/40 text-foreground border border-border hover:bg-muted transition-colors text-sm font-semibold">
              <Download size={14} /> İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = 'files' | 'messages' | 'logs' | 'analytics';

export default function FilesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('files');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Tümü');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [queryInput, setQueryInput] = useState('');
  const [aiResults, setAiResults] = useState<AIResult[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const fileTypes = ['Tümü', 'pdf', 'xls', 'img', 'dwg', 'zip', 'docx'];

  const filteredFiles = FILES.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.sender.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'Tümü' || f.type === typeFilter;
    return matchSearch && matchType;
  });

  const filteredMessages = MESSAGES.filter(m => {
    const from = PERSONS.find(p => p.id === m.fromId);
    const to = PERSONS.find(p => p.id === m.toId);
    return m.summary.toLowerCase().includes(search.toLowerCase()) ||
      from?.name.toLowerCase().includes(search.toLowerCase()) ||
      to?.name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredLogs = ACTIVITY_LOGS.filter(log => {
    const user = PERSONS.find(p => p.id === log.userId);
    return log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.detail.toLowerCase().includes(search.toLowerCase()) ||
      user?.name.toLowerCase().includes(search.toLowerCase());
  });

  const typeDist = fileTypes.slice(1).map(t => ({
    type: t, count: FILES.filter(f => f.type === t).length, color: FILE_TYPE_COLORS[t],
  }));

  const handleAIQuery = (q?: string) => {
    const query = q || queryInput;
    if (!query.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiResults(prev => [generateAIResponse(query), ...prev]);
      setQueryInput('');
      setAiLoading(false);
    }, 800);
  };

  const TABS = [
    { id: 'files' as TabId, label: `Dosyalar (${FILES.length})`, icon: FileText },
    { id: 'messages' as TabId, label: `Mesajlar (${MESSAGES.length})`, icon: MessageSquare },
    { id: 'logs' as TabId, label: `Loglar (${ACTIVITY_LOGS.length})`, icon: Archive },
    { id: 'analytics' as TabId, label: 'Analytics / AI', icon: BarChart3 },
  ];

  return (
    <AppLayout currentPath="/files">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dosya, Mesaj & Raporlar</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {FILES.length} dosya · {MESSAGES.length} mesaj · {ACTIVITY_LOGS.length} log kaydı · AI analiz
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm flex items-center gap-2"><Filter size={14} /> Filtrele</button>
            <button className="btn-primary text-sm flex items-center gap-2"><Download size={14} /> Toplu İndir</button>
          </div>
        </div>

        {/* File type distribution — only shown on files tab */}
        {activeTab === 'files' && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {typeDist.map(({ type, count, color }) => (
              <button
                key={type}
                onClick={() => setTypeFilter(typeFilter === type ? 'Tümü' : type)}
                className={`p-3 rounded-xl border text-center transition-all duration-150 hover:scale-[1.02] ${typeFilter === type ? 'border-current shadow-lg' : 'border-border bg-card hover:bg-muted/30'}`}
                style={typeFilter === type ? { borderColor: color, backgroundColor: `${color}15` } : {}}
              >
                <p className="text-lg font-bold tabular-nums" style={{ color }}>{count}</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold">.{type}</p>
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl w-fit flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearch(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search bar — shown for files, messages, logs */}
        {activeTab !== 'analytics' && (
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={activeTab === 'files' ? 'Dosya veya gönderen ara...' : activeTab === 'messages' ? 'Mesaj veya kişi ara...' : 'Log veya kişi ara...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            {activeTab === 'files' && (
              <div className="flex items-center gap-1 flex-wrap">
                {fileTypes.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${typeFilter === t ? 'bg-primary text-primary-foreground' : 'bg-muted/40 text-muted-foreground hover:bg-muted'}`}>
                    {t === 'Tümü' ? 'Tümü' : `.${t}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Dosyalar ── */}
        {activeTab === 'files' && (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Dosya Adı</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Gönderen</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Proje</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Görev</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Tür</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Tarih</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredFiles.map(file => {
                    const project = PROJECTS.find(p => p.id === file.projectId);
                    const task = TASKS.find(t => t.id === file.taskId);
                    const typeColor = FILE_TYPE_COLORS[file.type] || '#94a3b8';
                    return (
                      <tr key={file.id} onClick={() => setSelectedFile(file)} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: typeColor }}>
                              {file.type.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-foreground">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-foreground">{file.sender}</span></td>
                        <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-muted-foreground">{project?.name}</span></td>
                        <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs text-muted-foreground truncate max-w-[120px] block">{task?.name}</span></td>
                        <td className="px-4 py-3"><span className="text-xs font-bold uppercase" style={{ color: typeColor }}>.{file.type}</span></td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-muted-foreground font-mono">{file.date}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={e => { e.stopPropagation(); setSelectedFile(file); }} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"><Eye size={12} /></button>
                            <button onClick={e => e.stopPropagation()} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"><Download size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Mesajlar ── */}
        {activeTab === 'messages' && (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Gönderen</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Alıcı</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Mesaj Özeti</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Proje/Görev</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Tarih</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Dosya/Ek</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMessages.map(msg => {
                    const from = PERSONS.find(p => p.id === msg.fromId);
                    const to = PERSONS.find(p => p.id === msg.toId);
                    const project = PROJECTS.find(p => p.id === msg.projectId);
                    const task = TASKS.find(t => t.id === msg.taskId);
                    return (
                      <tr key={msg.id} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">{from?.avatar.slice(0, 2)}</div>
                            <span className="text-xs font-semibold text-foreground">{from?.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-muted-foreground">{to?.name}</span></td>
                        <td className="px-4 py-3"><p className="text-xs text-muted-foreground truncate max-w-[200px]">{msg.summary}</p></td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div><p className="text-xs text-foreground truncate">{project?.name}</p><p className="text-xs text-muted-foreground truncate">{task?.name}</p></div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-muted-foreground font-mono">{msg.date}</span></td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {msg.hasFile && (
                            <div className="flex items-center gap-1 text-cyan-400"><FileText size={12} /><span className="text-xs">{msg.fileName}</span></div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Loglar ── */}
        {activeTab === 'logs' && (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Eylem</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Kullanıcı</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Detay</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Proje</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Sonuç</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLogs.map(log => {
                    const user = PERSONS.find(p => p.id === log.userId);
                    const project = PROJECTS.find(p => p.id === log.projectId);
                    const actionColor = LOG_ACTION_COLORS[log.action] || '#94a3b8';
                    return (
                      <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ color: actionColor, backgroundColor: `${actionColor}18` }}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-muted text-xs font-bold flex items-center justify-center shrink-0" style={{ color: actionColor }}>
                              {user?.avatar?.slice(0, 2) ?? '??'}
                            </div>
                            <span className="text-xs text-foreground">{user?.name ?? 'Bilinmeyen'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3"><p className="text-xs text-muted-foreground truncate max-w-[220px]">{log.detail}</p></td>
                        <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-muted-foreground">{project?.name}</span></td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs font-mono" style={{ color: log.result?.startsWith('+') ? '#22c55e' : log.result === 'Gecikmiş' ? '#ef4444' : '#94a3b8' }}>
                            {log.result}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs text-muted-foreground font-mono">{log.date}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Analytics / AI ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* AI Query Bar */}
            <div className="card-base p-5 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">AI Sorgu Asistanı</span>
                <span className="text-xs text-muted-foreground">— Doğal dilde soru sorun</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={e => setQueryInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAIQuery()}
                  placeholder="Örn: Haziran'da en çok iş yükü olan ilk 5 kişi kim?"
                  className="flex-1 px-4 py-3 bg-muted/40 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/60 transition-all"
                />
                <button
                  onClick={() => handleAIQuery()}
                  disabled={aiLoading || !queryInput.trim()}
                  className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {aiLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Send size={14} />}
                  Sorgula
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {PRESET_QUERIES.map(pq => (
                  <button key={pq.label} onClick={() => handleAIQuery(pq.query)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-all">
                    {pq.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Results */}
            {aiResults.map((result, idx) => (
              <div key={idx} className="card-base p-5 border border-border">
                <div className="flex items-start gap-2 mb-4">
                  <Sparkles size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sorgu: &quot;{result.query}&quot;</p>
                    <h3 className="text-sm font-bold text-foreground">{result.title}</h3>
                  </div>
                </div>
                {result.type === 'persons' && result.persons && (
                  <div className="space-y-2">
                    {result.persons.map((p, i) => (
                      <Link key={`${p.id}-${i}`} href={p.id.startsWith('p-') ? '/team' : '/task-kanban-panel'}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all cursor-pointer group">
                        <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">{i + 1}</span>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: p.color }}>{p.name.slice(0, 2)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.dept} · {p.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold tabular-nums" style={{ color: p.color }}>{p.value}</span>
                          <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {result.type === 'chart' && result.data && (
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} labelStyle={{ color: '#f1f5f9' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {result.data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {result.type === 'text' && result.text && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.text}</p>
                )}
              </div>
            ))}

            {/* Default Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-base p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Aylık Görev Yoğunluğu 2026</h3>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MONTHLY_WORKLOAD} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="ay" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="plan" fill="#3b7dd8" radius={[2, 2, 0, 0]} name="Plan" />
                      <Bar dataKey="yapiliyor" fill="#06b6d4" radius={[2, 2, 0, 0]} name="Yapılıyor" />
                      <Bar dataKey="tamamlandi" fill="#22c55e" radius={[2, 2, 0, 0]} name="Tamamlandı" />
                      <Bar dataKey="gecikme" fill="#ef4444" radius={[2, 2, 0, 0]} name="Gecikme" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card-base p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Departman Görev Dağılımı</h3>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DEPT_TASK_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                        {DEPT_TASK_DISTRIBUTION.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} />
                      <Legend formatter={(value) => <span style={{ fontSize: '10px', color: '#94a3b8' }}>{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick insights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: AlertTriangle, color: '#f97316', title: 'Yük Uyarısı', text: 'Temmuz-Ağustos döneminde Elektronik ve Yazılım departmanlarında aşırı yük tespit edildi.', link: '/workspace', linkText: 'Ekibi Görüntüle' },
                { icon: TrendingUp, color: '#ef4444', title: 'Gecikme Trendi', text: 'Son 60 günde 12 görev gecikti. Ortak neden: donanım stok problemi.', link: '/workspace', linkText: 'Görevlere Git' },
                { icon: BarChart3, color: '#22c55e', title: 'Tamamlanma Oranı', text: 'Bu ay %13 tamamlanma oranı ile hedefin altında. Mayıs sonu için 82 görev hedefleniyor.', link: '/workspace', linkText: 'Projelere Git' },
              ].map(insight => (
                <div key={insight.title} className="card-base p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <insight.icon size={14} style={{ color: insight.color }} />
                    <span className="text-xs font-semibold" style={{ color: insight.color }}>{insight.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.text}</p>
                  <Link href={insight.link} className="text-xs text-primary hover:underline flex items-center gap-1">
                    {insight.linkText} <ChevronRight size={10} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedFile && <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
    </AppLayout>
  );
}
