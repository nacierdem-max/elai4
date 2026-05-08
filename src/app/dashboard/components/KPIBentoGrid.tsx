'use client';
import React from 'react';
import Link from 'next/link';
import { ClipboardList, AlertTriangle, Users, FileText, TrendingDown, Zap } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Bento plan: 6 cards → grid-cols-4 → hero (span-2) + 4 regular in row1 + 1 spanning in row2
// Row 1: [Aktif Görev — 2col hero] [Gecikmiş — 1col] [Açık Risk — 1col]
// Row 2: [Plan Dışı — 1col] [Toplam Personel — 1col] [Dosya/Mesaj — 2col]

const KPI_CARDS = [
  {
    id: 'kpi-aktif-gorev',
    label: 'Aktif Görev',
    value: '920',
    sub: '+16 plan dışı',
    subColor: 'text-purple-400',
    trend: '+8% bu ay',
    trendUp: false,
    icon: ClipboardList,
    iconColor: '#3b7dd8',
    bg: 'from-primary/10 to-transparent',
    border: 'border-primary/30',
    href: '/task-kanban-panel',
    hero: true,
    breakdown: [
      { label: 'Yapılıyor', value: 350, color: '#06b6d4' },
      { label: 'Plan', value: 240, color: '#3b7dd8' },
      { label: 'Test', value: 131, color: '#eab308' },
      { label: 'Gecikmiş', value: 39, color: '#ef4444' },
      { label: 'Tamamlandı', value: 120, color: '#22c55e' },
      { label: 'Riskli', value: 24, color: '#f97316' },
    ],
  },
  {
    id: 'kpi-gecikme',
    label: 'Gecikmiş Görev',
    value: '39',
    sub: '12 kritik öncelikli',
    subColor: 'text-red-400',
    trend: '+5 bu hafta',
    trendUp: false,
    icon: TrendingDown,
    iconColor: '#ef4444',
    bg: 'from-red-500/10 to-transparent',
    border: 'border-red-500/30',
    href: '/task-kanban-panel',
    hero: false,
    alert: true,
  },
  {
    id: 'kpi-risk',
    label: 'Açık Risk',
    value: '29',
    sub: '18 kritik · 12 kapalı',
    subColor: 'text-orange-400',
    trend: '+3 bu hafta',
    trendUp: false,
    icon: AlertTriangle,
    iconColor: '#f97316',
    bg: 'from-orange-500/10 to-transparent',
    border: 'border-orange-500/30',
    href: '/risks',
    hero: false,
    alert: true,
  },
  {
    id: 'kpi-plandisi',
    label: 'Plan Dışı İş',
    value: '16',
    sub: '+4 bu ay',
    subColor: 'text-purple-400',
    trend: '+4 bu ay',
    trendUp: false,
    icon: Zap,
    iconColor: '#a78bfa',
    bg: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/30',
    href: '/task-kanban-panel',
    hero: false,
  },
  {
    id: 'kpi-personel',
    label: 'Toplam Personel',
    value: '100',
    sub: '10 departman',
    subColor: 'text-green-400',
    trend: 'Tam kadro',
    trendUp: true,
    icon: Users,
    iconColor: '#22c55e',
    bg: 'from-green-500/10 to-transparent',
    border: 'border-green-500/30',
    href: '/team',
    hero: false,
  },
  {
    id: 'kpi-dosya',
    label: 'Dosya & Mesaj',
    value: '5.650',
    sub: '4.300 dosya · 1.350 mesaj',
    subColor: 'text-cyan-400',
    trend: '+127 bu hafta',
    trendUp: true,
    icon: FileText,
    iconColor: '#06b6d4',
    bg: 'from-cyan-500/10 to-transparent',
    border: 'border-cyan-500/30',
    href: '/files',
    hero: false,
    wide: true,
  },
];

export default function KPIBentoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {KPI_CARDS?.map((card) => {
        const Icon = card?.icon;
        return (
          <Link
            key={card?.id}
            href={card?.href}
            className={`card-base bg-gradient-to-br ${card?.bg} border ${card?.border}
              rounded-xl p-5 hover:scale-[1.02] hover:shadow-elevated transition-all duration-200 cursor-pointer
              ${card?.hero ? 'col-span-2 row-span-1' : ''}
              ${card?.wide ? 'col-span-2' : ''}
              ${card?.alert ? 'glow-danger' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card?.iconColor}20` }}
              >
                <Icon size={18} style={{ color: card?.iconColor }} />
              </div>
              {card?.alert && (
                <span className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full animate-pulse">
                  Dikkat
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              {card?.label}
            </p>
            <div className={`flex items-end gap-3 ${card?.hero ? 'mb-4' : 'mb-2'}`}>
              <span className={`font-bold tabular-nums text-foreground leading-none ${card?.hero ? 'text-5xl' : 'text-3xl'}`}>
                {card?.value}
              </span>
            </div>
            <p className={`text-xs font-medium ${card?.subColor} mb-1`}>{card?.sub}</p>
            <p className={`text-xs ${card?.trendUp ? 'text-green-400' : 'text-red-400'}`}>
              {card?.trend}
            </p>
            {/* Hero breakdown bars */}
            {card?.hero && card?.breakdown && (
              <div className="mt-4 space-y-2">
                <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                  {card?.breakdown?.map((b) => (
                    <div
                      key={`breakdown-${card?.id}-${b?.label}`}
                      style={{
                        backgroundColor: b?.color,
                        width: `${(b?.value / 920) * 100}%`,
                        minWidth: '4px',
                      }}
                      title={`${b?.label}: ${b?.value}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {card?.breakdown?.map((b) => (
                    <div key={`legend-${card?.id}-${b?.label}`} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b?.color }} />
                      <span className="text-xs text-muted-foreground">{b?.label}</span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: b?.color }}>{b?.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}