'use client';
import React from 'react';
import Link from 'next/link';
import KPIBentoGrid from './KPIBentoGrid';
import AIQueryBar from './AIQueryBar';
import WorkloadChartSection from './WorkloadChartSection';
import RiskAlertList from './RiskAlertList';
import ActivityFeed from './ActivityFeed';
import TopEngineersWorkload from './TopEngineersWorkload';
import { useRole } from '@/context/RoleContext';
import { type PersonnelRoleKey } from '@/data/mockData';

// Role-specific quick access links shown in the welcome banner
const ROLE_QUICK_LINKS: Record<PersonnelRoleKey, { label: string; href: string; emoji: string }[]> = {
  'arge-personeli': [
    { label: 'Görevlerim', href: '/task-kanban-panel', emoji: '📋' },
    { label: 'Ekip', href: '/team', emoji: '👥' },
    { label: 'Dosyalar', href: '/files', emoji: '📁' },
  ],
  'proje-lideri': [
    { label: 'Projeler', href: '/projects', emoji: '🗂️' },
    { label: 'Riskler', href: '/risks', emoji: '⚠️' },
    { label: 'Ekip Takvimi', href: '/team', emoji: '📅' },
    { label: 'Log & Raporlar', href: '/logs', emoji: '📊' },
  ],
  'departman-lideri': [
    { label: 'Projeler', href: '/projects', emoji: '🗂️' },
    { label: 'Ekip & Personel', href: '/team', emoji: '👥' },
    { label: 'Analytics', href: '/analytics', emoji: '📈' },
    { label: 'Riskler', href: '/risks', emoji: '⚠️' },
  ],
  'urun-yoneticisi': [
    { label: 'Projeler', href: '/projects', emoji: '🗂️' },
    { label: 'Analytics / AI', href: '/analytics', emoji: '🤖' },
    { label: 'Riskler', href: '/risks', emoji: '⚠️' },
    { label: 'Log & Raporlar', href: '/logs', emoji: '📊' },
  ],
  'arge-temsilcisi': [
    { label: 'Log & Raporlar', href: '/logs', emoji: '📊' },
    { label: 'Analytics', href: '/analytics', emoji: '📈' },
    { label: 'Projeler', href: '/projects', emoji: '🗂️' },
    { label: 'Riskler', href: '/risks', emoji: '⚠️' },
  ],
  'arge-yoneticisi': [
    { label: 'Projeler', href: '/projects', emoji: '🗂️' },
    { label: 'Analytics / AI', href: '/analytics', emoji: '🤖' },
    { label: 'Log & Raporlar', href: '/logs', emoji: '📊' },
    { label: 'Riskler', href: '/risks', emoji: '⚠️' },
    { label: 'Ekip', href: '/team', emoji: '👥' },
  ],
};

function RoleWelcomeBanner() {
  const { currentRole, roleDefinition } = useRole();
  if (!currentRole || !roleDefinition) return null;

  const quickLinks = ROLE_QUICK_LINKS[currentRole.roleKey] ?? [];

  return (
    <div
      className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        background: roleDefinition.bgColor,
        border: `1px solid ${roleDefinition.color}30`,
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-3xl shrink-0">{roleDefinition.icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-bold" style={{ color: roleDefinition.color }}>
            Hoş geldiniz, {currentRole.name}
          </p>
          <p className="text-xs mt-0.5 truncate" style={{ color: '#3a3a3c' }}>
            {roleDefinition.title} · {roleDefinition.subtitle}
          </p>
        </div>
      </div>
      {quickLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.7)',
                color: roleDefinition.color,
                border: `1px solid ${roleDefinition.color}25`,
              }}
            >
              <span>{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Role welcome banner */}
      <RoleWelcomeBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Genel Bakış</h1>
          <p className="text-muted-foreground text-sm mt-1">
            05 Mayıs 2026 · Tüm departmanlar · 2026 Aktif Dönemi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/analytics" className="btn-ghost text-sm flex items-center gap-2">
            <span>📅</span> Dönem Seç
          </Link>
          <Link href="/analytics" className="btn-primary text-sm flex items-center gap-2">
            <span>📊</span> Rapor Al
          </Link>
        </div>
      </div>

      {/* AI Query Bar */}
      <AIQueryBar />

      {/* KPI Bento Grid */}
      <KPIBentoGrid />

      {/* Charts row */}
      <WorkloadChartSection />

      {/* Bottom row: Risk alerts + Activity + Top engineers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <RiskAlertList />
        <ActivityFeed />
        <TopEngineersWorkload />
      </div>
    </div>
  );
}