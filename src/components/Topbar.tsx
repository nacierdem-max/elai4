'use client';
import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Zap, RefreshCw } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export default function Topbar() {
  const [searchVal, setSearchVal] = useState('');
  const { currentRole, roleDefinition } = useRole();

  const displayName = currentRole?.name ?? 'Kullanıcı';
  const displayInitials = currentRole?.initials ?? '??';
  const roleColor = roleDefinition?.color ?? '#0071e3';
  const roleBg = roleDefinition?.bgColor ?? '#e8f0fb';

  return (
    <header
      className="h-14 flex items-center gap-4 px-6 shrink-0"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #d2d2d7',
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6e6e73' }} />
        <input
          type="text"
          placeholder="Proje, görev, kişi ara... (⌘K)"
          value={searchVal}
          onChange={(e) => setSearchVal(e?.target?.value)}
          className="w-full rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none transition-all duration-150"
          style={{
            background: '#f5f5f7',
            border: '1px solid #d2d2d7',
            color: '#1d1d1f',
          }}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {/* Last updated */}
        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl" style={{ background: '#f5f5f7', color: '#6e6e73', border: '1px solid #e8e8ed' }}>
          <RefreshCw size={12} className="text-green-500" />
          <span>Son güncelleme: 05.05.2026 14:21</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Canlı
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl transition-all duration-150"
          style={{ color: '#6e6e73' }}
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* AI quick */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150"
          style={{ background: '#e8f0fb', color: '#0071e3' }}
        >
          <Zap size={14} />
          AI Asistan
        </button>

        {/* Role badge */}
        {roleDefinition && (
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold"
            style={{ background: roleBg, color: roleColor, border: `1px solid ${roleColor}30` }}
          >
            <span>{roleDefinition?.icon}</span>
            <span className="hidden lg:inline">{roleDefinition?.title}</span>
          </div>
        )}

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-150 hover:bg-gray-100">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: roleBg, color: roleColor }}
          >
            {displayInitials}
          </div>
          <span className="text-sm font-medium hidden md:block" style={{ color: '#1d1d1f' }}>{displayName}</span>
          <ChevronDown size={14} className="hidden md:block" style={{ color: '#6e6e73' }} />
        </button>
      </div>
    </header>
  );
}