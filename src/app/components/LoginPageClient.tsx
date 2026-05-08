'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { PERSONNEL_ROLES, type PersonnelRoleKey } from '@/data/mockData';
import { useRole } from '@/context/RoleContext';

// Default display names per role
const ROLE_DEFAULT_NAMES: Record<PersonnelRoleKey, { name: string; initials: string }> = {
  'arge-personeli': { name: 'Ar-Ge Personeli', initials: 'AP' },
  'proje-lideri': { name: 'Proje Lideri', initials: 'PL' },
  'departman-lideri': { name: 'Departman Lideri', initials: 'DL' },
  'urun-yoneticisi': { name: 'Ürün Yöneticisi', initials: 'ÜY' },
  'arge-temsilcisi': { name: 'Pınar Tüzün', initials: 'PT' },
  'arge-yoneticisi': { name: 'Ar-Ge Merkezi Yöneticisi', initials: 'AY' },
};

export default function LoginPageClient() {
  const router = useRouter();
  const { setRole } = useRole();
  const [selectedRoleKey, setSelectedRoleKey] = useState<PersonnelRoleKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = async () => {
    if (!selectedRoleKey) return;
    setIsLoading(true);
    const defaults = ROLE_DEFAULT_NAMES[selectedRoleKey];
    setRole({ roleKey: selectedRoleKey, name: defaults.name, initials: defaults.initials });
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d2247 55%, #0a3060 100%)' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse, #0071e3 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8 text-center">
          <AppLogo size={52} />
          <h1 className="text-2xl font-bold text-white mt-3 tracking-tight">EliarArGe</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Eliar Elektrik A.Ş. — Akıllı Ar-Ge Yönetim Platformu
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-white mb-1">Rolünüzü Seçin</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Demo ortamı — giriş yapmak istediğiniz rolü seçin
            </p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {PERSONNEL_ROLES.map((role) => {
              const isSelected = selectedRoleKey === role.key;
              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setSelectedRoleKey(role.key)}
                  className="relative flex items-start gap-3 rounded-2xl p-4 text-left transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: isSelected ? role.bgColor : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${isSelected ? role.color : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isSelected ? `0 0 0 4px ${role.color}22` : 'none',
                  }}
                >
                  {/* Selected check */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 size={16} style={{ color: role.color }} />
                    </div>
                  )}
                  <span className="text-2xl shrink-0 mt-0.5">{role.icon}</span>
                  <div className="min-w-0 flex-1 pr-4">
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{ color: isSelected ? role.color : '#ffffff' }}
                    >
                      {role.title}
                    </p>
                    <p
                      className="text-xs mt-0.5 leading-snug"
                      style={{ color: isSelected ? '#3a3a3c' : 'rgba(255,255,255,0.45)' }}
                    >
                      {role.subtitle}
                    </p>
                    {isSelected && (
                      <p
                        className="text-xs mt-2 leading-relaxed"
                        style={{ color: '#3a3a3c' }}
                      >
                        {role.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Enter Button */}
          <button
            type="button"
            onClick={handleEnter}
            disabled={isLoading || !selectedRoleKey}
            className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: selectedRoleKey
                ? (PERSONNEL_ROLES.find(r => r.key === selectedRoleKey)?.color ?? '#0071e3')
                : 'rgba(255,255,255,0.15)',
              boxShadow: selectedRoleKey ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
              minHeight: '52px',
            }}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Giriş yapılıyor...</span>
              </>
            ) : (
              <>
                <span>{selectedRoleKey ? 'Platforma Giriş Yap' : 'Bir rol seçin'}</span>
                {selectedRoleKey && <ArrowRight size={16} />}
              </>
            )}
          </button>

          <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Bu bir demo ortamıdır — kimlik doğrulama gerekmez.
          </p>
        </div>
      </div>
    </div>
  );
}