'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, ArrowRight } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { PERSONNEL_ROLES, type PersonnelRoleDefinition } from '@/data/mockData';

function RoleCard({ role, isSelected, onClick }: { role: PersonnelRoleDefinition; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderColor: isSelected ? role.color : '#e8e8ed',
        background: isSelected ? role.bgColor : '#ffffff',
        boxShadow: isSelected ? `0 0 0 3px ${role.color}20` : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: role.bgColor }}
        >
          {role.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base" style={{ color: '#1d1d1f' }}>{role.title}</h3>
            {isSelected && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: role.color }}>
                <Check size={12} color="white" />
              </div>
            )}
          </div>
          <p className="text-xs font-semibold mt-0.5" style={{ color: role.color }}>{role.subtitle}</p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#6e6e73' }}>{role.description}</p>
        </div>
      </div>
    </button>
  );
}

function RoleDetailView({ role }: { role: PersonnelRoleDefinition }) {
  return (
    <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: role.color, background: role.bgColor }}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#ffffff' }}>
          {role.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#1d1d1f' }}>{role.title}</h2>
          <p className="text-sm font-semibold" style={{ color: role.color }}>{role.subtitle}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#3a3a3c' }}>{role.description}</p>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6e6e73' }}>Sorumluluklar</h4>
        <ul className="space-y-2">
          {role.responsibilities.map((r, i) => (
            <li key={`resp-${i}`} className="flex items-start gap-2 text-sm" style={{ color: '#3a3a3c' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: role.color }}>
                <Check size={11} color="white" />
              </div>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedRoleKey, setSelectedRoleKey] = useState<string | null>(null);

  const selectedRole = PERSONNEL_ROLES.find(r => r.key === selectedRoleKey) ?? null;

  const steps = [
    { id: 'welcome', title: 'Hoş Geldiniz' },
    { id: 'roles', title: 'Rol Tanımları' },
    { id: 'detail', title: 'Rol Detayı' },
    { id: 'ready', title: 'Hazır' },
  ];

  const handleNext = () => {
    if (step === 1 && !selectedRoleKey) return;
    if (step < steps.length - 1) setStep(s => s + 1);
    else router.push('/dashboard');
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f5f7' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #e8e8ed' }}>
        <div className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-bold text-sm" style={{ color: '#1d1d1f' }}>EliarArGe</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div
                key={`step-dot-${s.id}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? '20px' : '8px',
                  height: '8px',
                  background: i <= step ? '#0071e3' : '#d2d2d7',
                }}
              />
            ))}
          </div>
          <button onClick={handleSkip} className="text-sm font-medium" style={{ color: '#6e6e73' }}>
            Atla
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-4xl" style={{ background: '#e8f0fb' }}>
                🚀
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-3" style={{ color: '#1d1d1f' }}>
                  EliarArGe Platformuna<br />Hoş Geldiniz
                </h1>
                <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: '#6e6e73' }}>
                  Bu kısa tanıtım, platformdaki 6 farklı personel rolünü ve her rolün sorumluluklarını açıklayacak.
                  Sadece 2 dakikanızı alacak.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {[
                  { icon: '👷', label: '6 Rol Tanımı' },
                  { icon: '📊', label: '12 Aktif Proje' },
                  { icon: '👥', label: '100 Personel' },
                ].map(item => (
                  <div key={`welcome-stat-${item.label}`} className="rounded-2xl p-4 text-center" style={{ background: '#ffffff', border: '1px solid #e8e8ed' }}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold" style={{ color: '#3a3a3c' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1d1d1f' }}>Ar-Ge Personel Rolleri</h2>
                <p className="text-sm" style={{ color: '#6e6e73' }}>Platformda 6 farklı rol tanımı bulunmaktadır. Detayını görmek istediğiniz rolü seçin.</p>
              </div>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {PERSONNEL_ROLES.map(role => (
                  <RoleCard
                    key={`role-card-${role.key}`}
                    role={role}
                    isSelected={selectedRoleKey === role.key}
                    onClick={() => setSelectedRoleKey(role.key)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Role Detail */}
          {step === 2 && selectedRole && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1d1d1f' }}>Rol Detayı</h2>
                <p className="text-sm" style={{ color: '#6e6e73' }}>Seçtiğiniz rolün sorumlulukları ve kapsamı</p>
              </div>
              <RoleDetailView role={selectedRole} />
              <div className="rounded-2xl p-4" style={{ background: '#ffffff', border: '1px solid #e8e8ed' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6e6e73' }}>Diğer Roller</p>
                <div className="flex flex-wrap gap-2">
                  {PERSONNEL_ROLES.filter(r => r.key !== selectedRole.key).map(r => (
                    <button
                      key={`other-role-${r.key}`}
                      onClick={() => setSelectedRoleKey(r.key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                      style={{ background: r.bgColor, color: r.color }}
                    >
                      <span>{r.icon}</span>
                      <span>{r.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ready */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-4xl" style={{ background: '#f0fdf4' }}>
                ✅
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3" style={{ color: '#1d1d1f' }}>Hazırsınız!</h2>
                <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: '#6e6e73' }}>
                  Platforma giriş yapabilirsiniz. Dashboard&apos;da tüm projeleri, görevleri ve ekip durumunu tek ekranda görebilirsiniz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {[
                  { icon: '📋', label: 'Görev Panosu', desc: 'Kanban & Liste görünümü' },
                  { icon: '📊', label: 'Analytics', desc: 'Performans metrikleri' },
                  { icon: '⚠️', label: 'Risk Takibi', desc: 'Açık riskler & uyarılar' },
                  { icon: '🔔', label: 'Değişiklik Logu', desc: 'Anlık kayıt izleme' },
                ].map(item => (
                  <div key={`ready-item-${item.label}`} className="rounded-2xl p-4 text-left" style={{ background: '#ffffff', border: '1px solid #e8e8ed' }}>
                    <div className="text-xl mb-1">{item.icon}</div>
                    <p className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: '#6e6e73' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white'}`}
              style={{ color: '#6e6e73' }}
            >
              <ChevronLeft size={16} />
              Geri
            </button>
            <button
              onClick={handleNext}
              disabled={step === 1 && !selectedRoleKey}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#0071e3', boxShadow: '0 2px 8px rgba(0,113,227,0.3)' }}
            >
              {step === steps.length - 1 ? (
                <>
                  <span>Platforma Gir</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <span>{step === 1 && !selectedRoleKey ? 'Bir rol seçin' : 'Devam'}</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
