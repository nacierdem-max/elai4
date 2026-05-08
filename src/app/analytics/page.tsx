'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { PERSONS, PROJECTS, TASKS, DEPT_TASK_DISTRIBUTION, MONTHLY_WORKLOAD, DEPARTMENT_COLORS } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart3, Send, Sparkles, TrendingUp, Users, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AIResult {
  query: string;
  type: 'persons' | 'chart' | 'text';
  title: string;
  data?: { name: string; value: number; color: string; link?: string }[];
  text?: string;
  persons?: { id: string; name: string; dept: string; value: number; label: string; color: string }[];
}

const PRESET_QUERIES = [
  { label: 'Haziran\'da en yoğun 5 kişi', query: 'Haziran\'da en çok iş yükü olan ilk 5 kişi kim?' },
  { label: 'Plan dışı işler', query: 'Son yıl plan dışı açılan işlerin oranı nedir?' },
  { label: 'Departman dosya dağılımı', query: 'En fazla dosya paylaşan departman hangisi?' },
  { label: 'Gecikmiş görevler', query: 'Gecikmiş görevler ve sorumluları kimler?' },
  { label: 'Kritik riskler', query: 'Yazılım departmanında en çok risk açanlar?' },
];

function generateAIResponse(query: string): AIResult {
  const q = query.toLowerCase();

  if (q.includes('yoğun') || q.includes('yük') || q.includes('5 kişi')) {
    const top5 = PERSONS.sort((a, b) => b.activeTasks - a.activeTasks).slice(0, 5);
    return {
      query,
      type: 'persons',
      title: 'En Yoğun 5 Mühendis (Aktif Görev)',
      persons: top5.map(p => ({
        id: p.id,
        name: p.name,
        dept: p.department,
        value: p.activeTasks,
        label: 'aktif görev',
        color: DEPARTMENT_COLORS[p.department] || '#94a3b8',
      })),
    };
  }

  if (q.includes('plan dışı') || q.includes('oran')) {
    const planDisi = TASKS.filter(t => t.status === 'Plan Dışı');
    return {
      query,
      type: 'persons',
      title: `Plan Dışı İşler: ${planDisi.length} görev (%${Math.round((planDisi.length / TASKS.length) * 100)} oran)`,
      persons: planDisi.map(t => {
        const p = PERSONS.find(per => per.id === t.assigneeId);
        return {
          id: t.id,
          name: p?.name || 'Bilinmeyen',
          dept: p?.department || 'Bilinmeyen',
          value: 1,
          label: t.name,
          color: '#a78bfa',
        };
      }),
    };
  }

  if (q.includes('dosya') || q.includes('departman')) {
    return {
      query,
      type: 'chart',
      title: 'Departman Bazında Dosya Dağılımı',
      data: [
        { name: 'Yazılım', value: 1130, color: '#8b5cf6' },
        { name: 'Elektronik', value: 980, color: '#3b7dd8' },
        { name: 'Test', value: 670, color: '#f97316' },
        { name: 'Mekanik', value: 520, color: '#22c55e' },
        { name: 'Otomasyon', value: 410, color: '#06b6d4' },
        { name: 'Donanım', value: 340, color: '#eab308' },
        { name: 'Saha', value: 250, color: '#ec4899' },
      ],
    };
  }

  if (q.includes('gecikmiş') || q.includes('gecikme')) {
    const delayed = TASKS.filter(t => t.status === 'Gecikmiş');
    return {
      query,
      type: 'persons',
      title: `Gecikmiş Görevler: ${delayed.length} görev`,
      persons: delayed.map(t => {
        const p = PERSONS.find(per => per.id === t.assigneeId);
        return {
          id: t.id,
          name: p?.name || 'Bilinmeyen',
          dept: p?.department || 'Bilinmeyen',
          value: Math.abs(t.remainingDays),
          label: `${t.name} (${t.remainingDays} gün)`,
          color: '#ef4444',
        };
      }),
    };
  }

  if (q.includes('risk') || q.includes('yazılım')) {
    const yazilimPersons = PERSONS.filter(p => p.department === 'Yazılım').slice(0, 5);
    return {
      query,
      type: 'persons',
      title: 'Yazılım Departmanı — Risk & Yük Analizi',
      persons: yazilimPersons.map(p => ({
        id: p.id,
        name: p.name,
        dept: p.department,
        value: p.activeTasks,
        label: `${p.activeTasks} aktif görev`,
        color: '#8b5cf6',
      })),
    };
  }

  return {
    query,
    type: 'text',
    title: 'AI Analiz Sonucu',
    text: `"${query}" sorgusu için analiz tamamlandı. Sistemde ${PERSONS.length} personel, ${PROJECTS.length} proje ve ${TASKS.length} görev bulunmaktadır. Daha spesifik bir sorgu için yukarıdaki hazır sorguları kullanabilirsiniz.`,
  };
}

export default function AnalyticsPage() {
  const [queryInput, setQueryInput] = useState('');
  const [results, setResults] = useState<AIResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = (q?: string) => {
    const query = q || queryInput;
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const result = generateAIResponse(query);
      setResults(prev => [result, ...prev]);
      setQueryInput('');
      setLoading(false);
    }, 800);
  };

  return (
    <AppLayout currentPath="/analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics & AI Asistan</h1>
            <p className="text-muted-foreground text-sm mt-1">Akıllı analiz, trend tespiti ve otomatik raporlama</p>
          </div>
          <button className="btn-primary text-sm flex items-center gap-2">
            📊 Rapor Al
          </button>
        </div>

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
              onKeyDown={e => e.key === 'Enter' && handleQuery()}
              placeholder="Örn: Haziran'da en çok iş yükü olan ilk 5 kişi kim?"
              className="flex-1 px-4 py-3 bg-muted/40 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/60 transition-all"
            />
            <button
              onClick={() => handleQuery()}
              disabled={loading || !queryInput.trim()}
              className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send size={14} />
              )}
              Sorgula
            </button>
          </div>

          {/* Preset queries */}
          <div className="flex flex-wrap gap-2 mt-3">
            {PRESET_QUERIES.map(pq => (
              <button
                key={pq.label}
                onClick={() => handleQuery(pq.query)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-all"
              >
                {pq.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Results */}
        {results.map((result, idx) => (
          <div key={idx} className="card-base p-5 border border-border">
            <div className="flex items-start gap-2 mb-4">
              <Sparkles size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Sorgu: "{result.query}"</p>
                <h3 className="text-sm font-bold text-foreground">{result.title}</h3>
              </div>
            </div>

            {result.type === 'persons' && result.persons && (
              <div className="space-y-2">
                {result.persons.map((p, i) => (
                  <Link
                    key={`${p.id}-${i}`}
                    href={p.id.startsWith('p-') ? '/team' : '/task-kanban-panel'}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">{i + 1}</span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.name.slice(0, 2)}
                    </div>
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
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {result.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
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
          {/* Monthly workload */}
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
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="plan" fill="#3b7dd8" radius={[2, 2, 0, 0]} name="Plan" />
                  <Bar dataKey="yapiliyor" fill="#06b6d4" radius={[2, 2, 0, 0]} name="Yapılıyor" />
                  <Bar dataKey="tamamlandi" fill="#22c55e" radius={[2, 2, 0, 0]} name="Tamamlandı" />
                  <Bar dataKey="gecikme" fill="#ef4444" radius={[2, 2, 0, 0]} name="Gecikme" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dept distribution */}
          <div className="card-base p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Departman Görev Dağılımı</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEPT_TASK_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {DEPT_TASK_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ fontSize: '10px', color: '#94a3b8' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: AlertTriangle,
              color: '#f97316',
              title: 'Yük Uyarısı',
              text: 'Temmuz-Ağustos döneminde Elektronik ve Yazılım departmanlarında aşırı yük tespit edildi.',
              link: '/team',
              linkText: 'Ekibi Görüntüle',
            },
            {
              icon: TrendingUp,
              color: '#ef4444',
              title: 'Gecikme Trendi',
              text: 'Son 60 günde 12 görev gecikti. Ortak neden: donanım stok problemi.',
              link: '/task-kanban-panel',
              linkText: 'Görevlere Git',
            },
            {
              icon: BarChart3,
              color: '#22c55e',
              title: 'Tamamlanma Oranı',
              text: 'Bu ay %13 tamamlanma oranı ile hedefin altında. Mayıs sonu için 82 görev hedefleniyor.',
              link: '/projects',
              linkText: 'Projelere Git',
            },
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
    </AppLayout>
  );
}
