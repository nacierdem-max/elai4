'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, Users, FolderKanban, ClipboardList, AlertTriangle, FileText, BarChart3, Settings, ChevronLeft, ChevronRight, Archive, BookOpen, LogOut } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { type PersonnelRoleKey } from '@/data/mockData';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  badgeColor?: string;
  allowedRoles?: PersonnelRoleKey[]; // undefined = all roles
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'nav-team', label: 'Ekip & Personel', icon: Users, href: '/team', badge: 3, badgeColor: 'bg-blue-100 text-blue-600' },
  {
    id: 'nav-projects', label: 'Projeler', icon: FolderKanban, href: '/projects', badge: 22,
    allowedRoles: ['proje-lideri', 'departman-lideri', 'urun-yoneticisi', 'arge-temsilcisi', 'arge-yoneticisi'],
  },
  {
    id: 'nav-tasks', label: 'Görev / Kanban', icon: ClipboardList, href: '/task-kanban-panel', badge: 39, badgeColor: 'bg-red-100 text-red-500',
  },
  {
    id: 'nav-risks', label: 'Riskler', icon: AlertTriangle, href: '/risks', badge: 18, badgeColor: 'bg-orange-100 text-orange-500',
    allowedRoles: ['proje-lideri', 'departman-lideri', 'urun-yoneticisi', 'arge-temsilcisi', 'arge-yoneticisi'],
  },
  { id: 'nav-files', label: 'Dosya & Mesaj', icon: FileText, href: '/files' },
  {
    id: 'nav-analytics', label: 'Analytics / AI', icon: BarChart3, href: '/analytics',
    allowedRoles: ['departman-lideri', 'urun-yoneticisi', 'arge-temsilcisi', 'arge-yoneticisi'],
  },
  {
    id: 'nav-logs', label: 'Log & Raporlar', icon: Archive, href: '/logs', badge: 11, badgeColor: 'bg-yellow-100 text-yellow-600',
    allowedRoles: ['proje-lideri', 'departman-lideri', 'urun-yoneticisi', 'arge-temsilcisi', 'arge-yoneticisi'],
  },
  { id: 'nav-onboarding', label: 'Rol Tanımları', icon: BookOpen, href: '/onboarding' },
];

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = '/dashboard' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentRole, roleDefinition, clearRole } = useRole();
  const router = useRouter();

  const handleLogout = () => {
    clearRole();
    router.push('/');
  };

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.allowedRoles) return true;
    if (!currentRole) return true;
    return item.allowedRoles.includes(currentRole.roleKey);
  });

  const displayName = currentRole?.name ?? 'Kullanıcı';
  const displayInitials = currentRole?.initials ?? '??';
  const roleColor = roleDefinition?.color ?? '#0071e3';
  const roleBg = roleDefinition?.bgColor ?? '#e8f0fb';

  return (
    <aside
      className="flex flex-col shrink-0 z-20 transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? '64px' : '240px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid #d2d2d7',
      }}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-14 px-3 ${collapsed ? 'justify-center' : 'justify-between'}`}
        style={{ borderBottom: '1px solid #e8e8ed' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <AppLogo size={32} />
          {!collapsed && (
            <div className="min-w-0">
              <span className="font-bold text-sm tracking-tight block" style={{ color: '#1d1d1f' }}>EliarArGe</span>
              <span className="text-xs block leading-none" style={{ color: '#6e6e73' }}>Ar-Ge Yönetimi</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg transition-all duration-150"
            style={{ color: '#6e6e73' }}
            title="Daralt"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="flex justify-center py-2 transition-all duration-150"
          style={{ color: '#6e6e73' }}
          title="Genişlet"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {!collapsed && (
          <p className="text-xs font-semibold uppercase tracking-widest px-2 pb-2 pt-1" style={{ color: '#6e6e73' }}>
            Modüller
          </p>
        )}
        {visibleItems.map((item) => {
          const NavIcon = item.icon;
          const active = item.href === currentPath || (item.id === 'nav-dashboard' && currentPath === '/dashboard');

          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
                ${collapsed ? 'justify-center' : ''}
              `}
              style={{
                background: active ? '#e8f0fb' : 'transparent',
                color: active ? '#0071e3' : '#3a3a3c',
              }}
            >
              <NavIcon size={18} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${item.badgeColor || 'bg-gray-100 text-gray-500'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge !== undefined && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 space-y-0.5" style={{ borderTop: '1px solid #e8e8ed' }}>
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          style={{ color: '#6e6e73' }}
          title={collapsed ? 'Ayarlar' : undefined}
        >
          <Settings size={18} className="shrink-0" />
          {!collapsed && <span>Ayarlar</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:bg-red-50 ${collapsed ? 'justify-center' : ''}`}
          style={{ color: '#ef4444' }}
          title={collapsed ? 'Çıkış Yap' : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>

        {/* Current user/role */}
        <div className={`flex items-center gap-2 px-2 py-2 rounded-xl mt-1 ${collapsed ? 'justify-center' : ''}`} style={{ background: '#f5f5f7' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: roleBg, color: roleColor }}
          >
            {displayInitials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: '#1d1d1f' }}>{displayName}</p>
              <p className="text-xs truncate" style={{ color: roleColor }}>{roleDefinition?.title ?? 'Rol seçilmedi'}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}