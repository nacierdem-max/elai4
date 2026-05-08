export type Department =
  | 'Elektronik' |'Yazılım' |'Mekanik' |'Test' |'Otomasyon' |'Donanım' |'Saha' |'Ürün' |'Lojistik' |'Destek';

export type TaskStatus =
  | 'Plan' |'Yapılıyor' |'Test' |'Tamamlandı' |'Gecikmiş' |'Riskli' |'Plan Dışı';

export type RiskStatus = 'Açık' | 'Riskli' | 'Çözüm Aranıyor' | 'Kapatıldı';

export type UserRole =
  | 'Ar-Ge Direktörü' |'Departman Lideri' |'Proje Yöneticisi' |'Kıdemli Mühendis' |'Mühendis' |'Teknisyen' |'Uzman' |'Geliştirici' |'Test Mühendisi' |'Saha Mühendisi';

// ─── NEW: 6 Personnel Role Definitions ───────────────────────────────────────
export type PersonnelRoleKey =
  | 'arge-personeli' |'proje-lideri' |'departman-lideri' |'urun-yoneticisi' |'arge-temsilcisi' |'arge-yoneticisi';

export interface PersonnelRoleDefinition {
  key: PersonnelRoleKey;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  icon: string;
  color: string;
  bgColor: string;
}

export const PERSONNEL_ROLES: PersonnelRoleDefinition[] = [
  {
    key: 'arge-personeli',
    title: 'Ar-Ge Personeli',
    subtitle: 'Tüm Personel',
    description: 'Ar-Ge merkezi bünyesinde görev yapan tüm mühendis, teknisyen ve uzmanları kapsar. Proje ve görev bazında çalışır, departman liderine raporlar.',
    responsibilities: [
      'Atanan görevleri zamanında tamamlamak',
      'Gecikme durumunda neden ve öneri bildirmek',
      'Teknik dokümantasyon hazırlamak',
      'Risk ve sorunları raporlamak',
      'Departman içi bilgi paylaşımına katkı sağlamak',
    ],
    icon: '👷',
    color: '#3b7dd8',
    bgColor: '#e8f0fb',
  },
  {
    key: 'proje-lideri',
    title: 'Proje Lideri',
    subtitle: 'Çok Departmanlı Proje Koordinatörü',
    description: 'Birden fazla departmanı ilgilendiren projelerin koordinasyonundan sorumludur. Proje kapsamı, zaman çizelgesi ve kaynak yönetimini üstlenir.',
    responsibilities: [
      'Proje planı ve zaman çizelgesi oluşturmak',
      'Departmanlar arası koordinasyonu sağlamak',
      'Proje risklerini izlemek ve yönetmek',
      'Paydaşlara düzenli ilerleme raporu sunmak',
      'Kaynak tahsisi ve önceliklendirme yapmak',
    ],
    icon: '🎯',
    color: '#8b5cf6',
    bgColor: '#f3f0ff',
  },
  {
    key: 'departman-lideri',
    title: 'Departman Lideri',
    subtitle: 'Uzmanlık Alanı Lideri',
    description: 'Belirli bir uzmanlık alanının (örn. Elektronik Grubu) teknik ve operasyonel liderliğini üstlenir. Departman içi görev dağılımı ve kalite kontrolünden sorumludur.',
    responsibilities: [
      'Departman kaynaklarını yönetmek ve görev dağılımı yapmak',
      'Teknik standartları belirlemek ve uygulatmak',
      'Personel gelişimini desteklemek',
      'Departman performans metriklerini izlemek',
      'Çapraz departman projelerinde teknik temsil sağlamak',
    ],
    icon: '🏛️',
    color: '#22c55e',
    bgColor: '#f0fdf4',
  },
  {
    key: 'urun-yoneticisi',
    title: 'Ürün Yöneticisi',
    subtitle: 'Çok Departmanlı Ürün Gözetmeni',
    description: 'Birden fazla departmanı ilgilendiren ürünlerin tüm yaşam döngüsünü gözeten kişidir. Ürün vizyonunu belirler, önceliklendirme yapar ve pazar gereksinimlerini teknik ekibe aktarır.',
    responsibilities: [
      'Ürün yol haritasını oluşturmak ve güncel tutmak',
      'Müşteri ve pazar gereksinimlerini analiz etmek',
      'Departmanlar arası ürün önceliklendirmesi yapmak',
      'Ürün lansmanı ve teslimat süreçlerini koordine etmek',
      'Ürün performans metriklerini takip etmek',
    ],
    icon: '📦',
    color: '#f97316',
    bgColor: '#fff7ed',
  },
  {
    key: 'arge-temsilcisi',
    title: 'Ar-Ge Merkezi Temsilcisi',
    subtitle: 'Pınar Tüzün',
    description: 'Ar-Ge merkezinin resmi temsilcisidir. Dış paydaşlar, devlet kurumları ve teşvik programlarıyla ilişkileri yönetir. Ar-Ge faaliyetlerinin mevzuata uygunluğunu denetler.',
    responsibilities: [
      'Ar-Ge teşvik ve destek programlarını takip etmek',
      'Resmi raporlama ve denetim süreçlerini yönetmek',
      'Dış paydaşlarla ilişkileri koordine etmek',
      'Ar-Ge mevzuat uyumluluğunu sağlamak',
      'Ar-Ge merkezi akreditasyon süreçlerini yürütmek',
    ],
    icon: '🏢',
    color: '#06b6d4',
    bgColor: '#ecfeff',
  },
  {
    key: 'arge-yoneticisi',
    title: 'Ar-Ge Merkezi Yöneticisi',
    subtitle: 'Genel Yönetim',
    description: 'Ar-Ge merkezinin tüm stratejik ve operasyonel yönetiminden sorumludur. Tüm departman liderleri ve proje liderlerine üst yönetim olarak rehberlik eder.',
    responsibilities: [
      'Ar-Ge stratejisi ve bütçesini belirlemek',
      'Tüm departman ve proje liderlerini yönetmek',
      'Üst yönetime ve yönetim kuruluna raporlamak',
      'Ar-Ge merkezi büyüme ve yetenek stratejisini oluşturmak',
      'Kritik karar noktalarında nihai onay vermek',
    ],
    icon: '⭐',
    color: '#eab308',
    bgColor: '#fefce8',
  },
];

// ─── NEW: Delay Report ────────────────────────────────────────────────────────
export interface DelayReport {
  id: string;
  taskId: string;
  projectId: string;
  reporterId: string;
  date: string;
  delayReason: string;
  improvementSuggestion: string;
  delayDays: number;
}

export const DELAY_REPORTS: DelayReport[] = [
  {
    id: 'dr-001',
    taskId: 'tsk-005',
    projectId: 'prj-004',
    reporterId: 'p-019',
    date: '12.05.2026',
    delayReason: 'GPS modülünün offline modda veri senkronizasyonu beklenenden çok daha karmaşık çıktı. Üçüncü parti kütüphane dokümantasyonu yetersizdi ve ek araştırma gerekti.',
    improvementSuggestion: 'Proje başlangıcında üçüncü parti kütüphaneler için PoC (Proof of Concept) aşaması eklenmeli. Kütüphane seçimi daha erken yapılmalı.',
    delayDays: 25,
  },
  {
    id: 'dr-002',
    taskId: 'tsk-005',
    projectId: 'prj-004',
    reporterId: 'p-039',
    date: '13.05.2026',
    delayReason: 'Test ortamı kurulumu için gerekli cihazlar zamanında temin edilemedi. Saha test cihazları başka projede kullanımdaydı.',
    improvementSuggestion: 'Cihaz rezervasyon sistemi kurulmalı. Saha test ekipmanları için proje bazlı takvim oluşturulmalı.',
    delayDays: 25,
  },
  {
    id: 'dr-003',
    taskId: 'tsk-018',
    projectId: 'prj-003',
    reporterId: 'p-029',
    date: '30.04.2026',
    delayReason: 'Güvenlik protokolü güncellemesi için gerekli sertifika yenileme süreci beklenenden uzun sürdü. Tedarikçi yanıt süresi 3 haftayı aştı.',
    improvementSuggestion: 'Sertifika yenileme süreçleri için minimum 6 hafta önceden başlanmalı. Alternatif tedarikçi listesi hazırlanmalı.',
    delayDays: 10,
  },
  {
    id: 'dr-004',
    taskId: 'tsk-018',
    projectId: 'prj-003',
    reporterId: 'p-017',
    date: '01.05.2026',
    delayReason: 'Güvenlik gereksinimlerinin kapsamı proje ortasında genişletildi. Yeni düzenleyici gereksinimler ek iş yükü oluşturdu.',
    improvementSuggestion: 'Kapsam değişikliği yönetimi için resmi bir süreç tanımlanmalı. Kapsam değişikliği onay mekanizması oluşturulmalı.',
    delayDays: 10,
  },
  {
    id: 'dr-005',
    taskId: 'tsk-010',
    projectId: 'prj-002',
    reporterId: 'p-005',
    date: '05.05.2026',
    delayReason: 'Enerji sapma analizinde kullanılan ölçüm cihazlarının kalibrasyon tarihleri geçmişti. Yeniden kalibrasyon için dış servis gerekti.',
    improvementSuggestion: 'Ölçüm cihazları için periyodik kalibrasyon takvimi oluşturulmalı ve sistem tarafından otomatik hatırlatma yapılmalı.',
    delayDays: 4,
  },
  {
    id: 'dr-006',
    taskId: 'tsk-012',
    projectId: 'prj-001',
    reporterId: 'p-003',
    date: '03.05.2026',
    delayReason: 'Kritik IC bileşeni için tek tedarikçiye bağımlılık vardı. Tedarikçi stok sıkıntısı yaşadı ve alternatif bulunamadı.',
    improvementSuggestion: 'Kritik bileşenler için en az 2 onaylı tedarikçi listesi tutulmalı. Stok seviyesi için minimum eşik değerleri belirlenmeli.',
    delayDays: 5,
  },
];

// ─── NEW: Mock AI Summary for delay reports ───────────────────────────────────
export const DELAY_AI_SUMMARY = {
  generatedAt: '05.05.2026 15:30',
  totalReports: 6,
  topThemes: [
    { theme: 'Tedarik Zinciri Bağımlılığı', count: 2, severity: 'Yüksek' },
    { theme: 'Üçüncü Parti Kütüphane/Araç Riski', count: 1, severity: 'Orta' },
    { theme: 'Ekipman ve Kalibrasyon Yönetimi', count: 1, severity: 'Orta' },
    { theme: 'Kapsam Değişikliği Yönetimi', count: 1, severity: 'Yüksek' },
    { theme: 'Kaynak Çakışması', count: 1, severity: 'Orta' },
  ],
  summary: `Son 30 günde 6 gecikme raporu analiz edildi. Raporların %33'ü tedarik zinciri bağımlılığından kaynaklanıyor — kritik bileşenler için tek tedarikçiye bağımlılık en sık tekrarlayan tema. Kapsam değişikliği yönetimi eksikliği iki farklı projede gecikmeye yol açmış. Personel önerilerinin ortak paydası: erken PoC aşamaları, çoklu tedarikçi stratejisi ve otomatik kalibrasyon takvimleri. Bu üç önlem hayata geçirilirse mevcut gecikmelerin tahminen %60'ı önlenebilir.`,
  actionItems: [
    'Kritik bileşenler için ikincil tedarikçi onay süreci başlatılmalı',
    'Proje başlangıç şablonuna PoC aşaması eklenmeli',
    'Ölçüm ekipmanları için otomatik kalibrasyon hatırlatma sistemi kurulmalı',
    'Kapsam değişikliği için resmi onay mekanizması tanımlanmalı',
    'Saha test ekipmanları için proje bazlı rezervasyon takvimi oluşturulmalı',
  ],
};

// ─── NEW: Change Log Entry ────────────────────────────────────────────────────
export interface ChangeLogEntry {
  id: string;
  timestamp: string;
  entityType: 'Görev' | 'Proje' | 'Risk' | 'Personel' | 'Dosya';
  entityId: string;
  entityName: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedById: string;
  projectId?: string;
  isImportant: boolean;
}

export const CHANGE_LOG: ChangeLogEntry[] = [
  { id: 'cl-001', timestamp: '05.05.2026 14:18', entityType: 'Görev', entityId: 'tsk-001', entityName: 'PCB Rev4 Layout', field: 'Durum', oldValue: 'Plan', newValue: 'Yapılıyor', changedById: 'p-031', projectId: 'prj-008', isImportant: false },
  { id: 'cl-002', timestamp: '05.05.2026 13:55', entityType: 'Görev', entityId: 'tsk-010', entityName: 'Enerji Sapma Analizi', field: 'Durum', oldValue: 'Yapılıyor', newValue: 'Riskli', changedById: 'p-005', projectId: 'prj-002', isImportant: true },
  { id: 'cl-003', timestamp: '05.05.2026 13:30', entityType: 'Proje', entityId: 'prj-004', entityName: 'Saha Mobile App', field: 'Durum', oldValue: 'Aktif', newValue: 'Kritik', changedById: 'p-039', projectId: 'prj-004', isImportant: true },
  { id: 'cl-004', timestamp: '05.05.2026 12:45', entityType: 'Risk', entityId: 'rsk-005', entityName: 'Mobil Uygulama GPS Hatası', field: 'Durum', oldValue: 'Çözüm Aranıyor', newValue: 'Açık', changedById: 'p-019', projectId: 'prj-004', isImportant: true },
  { id: 'cl-005', timestamp: '05.05.2026 11:20', entityType: 'Görev', entityId: 'tsk-012', entityName: 'PCB Stok Yönetimi', field: 'Öncelik', oldValue: 'Yüksek', newValue: 'Kritik', changedById: 'p-002', projectId: 'prj-001', isImportant: true },
  { id: 'cl-006', timestamp: '05.05.2026 10:05', entityType: 'Görev', entityId: 'tsk-018', entityName: 'Güvenlik Protokolü Güncelleme', field: 'Bitiş Tarihi', oldValue: '25.04.2026', newValue: '15.05.2026', changedById: 'p-029', projectId: 'prj-003', isImportant: true },
  { id: 'cl-007', timestamp: '04.05.2026 17:40', entityType: 'Görev', entityId: 'tsk-006', entityName: 'Firmware Güncelleme v2.4', field: 'Durum', oldValue: 'Yapılıyor', newValue: 'Test', changedById: 'p-020', projectId: 'prj-001', isImportant: false },
  { id: 'cl-008', timestamp: '04.05.2026 16:30', entityType: 'Proje', entityId: 'prj-003', entityName: 'SCADA 2026', field: 'Tamamlanma %', oldValue: '%28', newValue: '%32', changedById: 'p-017', projectId: 'prj-003', isImportant: false },
  { id: 'cl-009', timestamp: '04.05.2026 15:10', entityType: 'Risk', entityId: 'rsk-002', entityName: 'PCB Stok Sıkıntısı', field: 'Durum', oldValue: 'Açık', newValue: 'Riskli', changedById: 'p-003', projectId: 'prj-001', isImportant: true },
  { id: 'cl-010', timestamp: '04.05.2026 14:00', entityType: 'Görev', entityId: 'tsk-005', entityName: 'Mobil App Hata Ayıklama', field: 'Durum', oldValue: 'Yapılıyor', newValue: 'Gecikmiş', changedById: 'p-019', projectId: 'prj-004', isImportant: true },
  { id: 'cl-011', timestamp: '04.05.2026 11:45', entityType: 'Görev', entityId: 'tsk-009', entityName: 'IoT Protokol Entegrasyonu', field: 'Öncelik', oldValue: 'Orta', newValue: 'Yüksek', changedById: 'p-055', projectId: 'prj-007', isImportant: false },
  { id: 'cl-012', timestamp: '03.05.2026 16:20', entityType: 'Proje', entityId: 'prj-002', entityName: 'Enerji İzleme Sistemi', field: 'Bitiş Tarihi', oldValue: '30.09.2026', newValue: '31.10.2026', changedById: 'p-017', projectId: 'prj-002', isImportant: true },
  { id: 'cl-013', timestamp: '03.05.2026 14:30', entityType: 'Görev', entityId: 'tsk-004', entityName: 'Test Raporu Donanım', field: 'Durum', oldValue: 'Test', newValue: 'Tamamlandı', changedById: 'p-040', projectId: 'prj-005', isImportant: false },
  { id: 'cl-014', timestamp: '03.05.2026 10:15', entityType: 'Risk', entityId: 'rsk-004', entityName: 'Firmware Kritik Hata', field: 'Durum', oldValue: 'Açık', newValue: 'Kapatıldı', changedById: 'p-040', projectId: 'prj-005', isImportant: false },
  { id: 'cl-015', timestamp: '02.05.2026 15:00', entityType: 'Görev', entityId: 'tsk-013', entityName: 'SCADA Arayüz Tasarımı', field: 'Durum', oldValue: 'Plan', newValue: 'Plan Dışı', changedById: 'p-018', projectId: 'prj-003', isImportant: true },
  { id: 'cl-016', timestamp: '02.05.2026 11:30', entityType: 'Proje', entityId: 'prj-008', entityName: 'PCB Revizyon 4.0', field: 'Durum', oldValue: 'Aktif', newValue: 'Kritik', changedById: 'p-002', projectId: 'prj-008', isImportant: true },
  { id: 'cl-017', timestamp: '01.05.2026 17:00', entityType: 'Görev', entityId: 'tsk-019', entityName: 'Batarya Yönetim Sistemi', field: 'Atanan Kişi', oldValue: 'Atanmamış', newValue: 'Berna Aydın', changedById: 'p-017', projectId: 'prj-002', isImportant: false },
  { id: 'cl-018', timestamp: '01.05.2026 14:20', entityType: 'Görev', entityId: 'tsk-020', entityName: 'API Entegrasyon Katmanı', field: 'Durum', oldValue: 'Plan', newValue: 'Yapılıyor', changedById: 'p-020', projectId: 'prj-010', isImportant: false },
  { id: 'cl-019', timestamp: '30.04.2026 16:45', entityType: 'Risk', entityId: 'rsk-007', entityName: 'SCADA Güvenlik Açığı', field: 'Durum', oldValue: 'Açık', newValue: 'Riskli', changedById: 'p-029', projectId: 'prj-003', isImportant: true },
  { id: 'cl-020', timestamp: '30.04.2026 10:00', entityType: 'Proje', entityId: 'prj-007', entityName: 'Endüstriyel IoT Gateway', field: 'Tamamlanma %', oldValue: '%15', newValue: '%21', changedById: 'p-049', projectId: 'prj-007', isImportant: false },
  { id: 'cl-021', timestamp: '31.12.2025 23:55', entityType: 'Proje', entityId: 'prj-002', entityName: 'Enerji İzleme Sistemi', field: 'Yıl Geçişi', oldValue: '2025 Dönemi', newValue: '2026 Dönemine Devredildi', changedById: 'p-001', projectId: 'prj-002', isImportant: true },
  { id: 'cl-022', timestamp: '02.01.2026 09:00', entityType: 'Proje', entityId: 'prj-002', entityName: 'Enerji İzleme Sistemi', field: 'Başlangıç (2026)', oldValue: '-', newValue: '10.01.2026 olarak güncellendi', changedById: 'p-017', projectId: 'prj-002', isImportant: true },
];

export interface Person {
  id: string;
  name: string;
  title: UserRole;
  department: Department;
  email: string;
  avatar: string;
  activeProjects: number;
  activeTasks: number;
  completedTasks: number;
}

export interface Project {
  id: string;
  name: string;
  leadId: string;
  collaboratorIds: string[];
  department: Department[];
  activeTaskCount: number;
  completedTaskCount: number;
  totalTaskCount: number;
  startDate: string;
  endDate: string;
  status: 'Aktif' | 'Tamamlandı' | 'Beklemede' | 'Kritik';
  completionPercent: number;
  description?: string;
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
  assigneeId: string;
  collaboratorIds?: string[];
  status: TaskStatus;
  startDate: string;
  endDate: string;
  remainingDays: number;
  subTaskCount: number;
  fileCount: number;
  messageCount: number;
  riskCount: number;
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  department: Department;
  description: string;
  progressPercent?: number;
}

export interface Risk {
  id: string;
  title: string;
  projectId: string;
  taskId: string;
  assigneeId: string;
  date: string;
  status: RiskStatus;
  description: string;
  fileCount: number;
}

export interface ActivityLog {
  id: string;
  date: string;
  action: string;
  userId: string;
  projectId: string;
  detail: string;
  result: string;
  progressDelta?: string;
}

export const DEPARTMENT_COLORS: Record<Department, string> = {
  Elektronik: '#3b7dd8',
  Yazılım: '#8b5cf6',
  Mekanik: '#22c55e',
  Test: '#f97316',
  Otomasyon: '#06b6d4',
  Donanım: '#eab308',
  Saha: '#ec4899',
  Ürün: '#a78bfa',
  Lojistik: '#fb923c',
  Destek: '#94a3b8',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  Plan: '#3b7dd8',
  Yapılıyor: '#06b6d4',
  Test: '#eab308',
  Tamamlandı: '#22c55e',
  Gecikmiş: '#ef4444',
  Riskli: '#f97316',
  'Plan Dışı': '#a78bfa',
};

export const PERSONS: Person[] = [
  { id: 'p-001', name: 'Derya Koç', title: 'Ar-Ge Direktörü', department: 'Elektronik', email: 'derya.koc@eliar.com.tr', avatar: 'DK', activeProjects: 8, activeTasks: 12, completedTasks: 47 },
  { id: 'p-002', name: 'Ahmet Yılmaz', title: 'Kıdemli Mühendis', department: 'Elektronik', email: 'ahmet.yilmaz@eliar.com.tr', avatar: 'AY', activeProjects: 3, activeTasks: 6, completedTasks: 32 },
  { id: 'p-003', name: 'Fatih Yıldız', title: 'Mühendis', department: 'Elektronik', email: 'fatih.yildiz@eliar.com.tr', avatar: 'FY', activeProjects: 2, activeTasks: 5, completedTasks: 19 },
  { id: 'p-004', name: 'Nesrin Tetik', title: 'Test Mühendisi', department: 'Elektronik', email: 'nesrin.tetik@eliar.com.tr', avatar: 'NT', activeProjects: 2, activeTasks: 5, completedTasks: 24 },
  { id: 'p-005', name: 'Temen Yıldız', title: 'Uzman', department: 'Elektronik', email: 'temen.yildiz@eliar.com.tr', avatar: 'TY', activeProjects: 3, activeTasks: 7, completedTasks: 28 },
  { id: 'p-006', name: 'Kemal Arslan', title: 'Teknisyen', department: 'Elektronik', email: 'kemal.arslan@eliar.com.tr', avatar: 'KA', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-007', name: 'Selin Öztürk', title: 'Mühendis', department: 'Elektronik', email: 'selin.ozturk@eliar.com.tr', avatar: 'SO', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-008', name: 'Murat Demir', title: 'Kıdemli Mühendis', department: 'Elektronik', email: 'murat.demir@eliar.com.tr', avatar: 'MD', activeProjects: 3, activeTasks: 6, completedTasks: 30 },
  { id: 'p-009', name: 'Hülya Çetin', title: 'Teknisyen', department: 'Elektronik', email: 'hulya.cetin@eliar.com.tr', avatar: 'HC', activeProjects: 1, activeTasks: 3, completedTasks: 12 },
  { id: 'p-010', name: 'Ozan Kılıç', title: 'Mühendis', department: 'Elektronik', email: 'ozan.kilic@eliar.com.tr', avatar: 'OK', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-011', name: 'Berna Aydın', title: 'Uzman', department: 'Elektronik', email: 'berna.aydin@eliar.com.tr', avatar: 'BA', activeProjects: 2, activeTasks: 5, completedTasks: 22 },
  { id: 'p-012', name: 'Cem Yılmaz', title: 'Teknisyen', department: 'Elektronik', email: 'cem.yilmaz@eliar.com.tr', avatar: 'CY', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-013', name: 'Pınar Şahin', title: 'Mühendis', department: 'Elektronik', email: 'pinar.sahin@eliar.com.tr', avatar: 'PS', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-014', name: 'Turan Özcan', title: 'Kıdemli Mühendis', department: 'Elektronik', email: 'turan.ozcan@eliar.com.tr', avatar: 'TO', activeProjects: 3, activeTasks: 5, completedTasks: 27 },
  { id: 'p-015', name: 'Gül Yıldırım', title: 'Teknisyen', department: 'Elektronik', email: 'gul.yildirim@eliar.com.tr', avatar: 'GY', activeProjects: 1, activeTasks: 3, completedTasks: 9 },
  { id: 'p-016', name: 'Alper Kaya', title: 'Mühendis', department: 'Elektronik', email: 'alper.kaya@eliar.com.tr', avatar: 'AK', activeProjects: 2, activeTasks: 4, completedTasks: 17 },
  { id: 'p-017', name: 'Aytem Çelik', title: 'Departman Lideri', department: 'Yazılım', email: 'aytem.celik@eliar.com.tr', avatar: 'AÇ', activeProjects: 4, activeTasks: 7, completedTasks: 38 },
  { id: 'p-018', name: 'Seda Arman', title: 'Geliştirici', department: 'Yazılım', email: 'seda.arman@eliar.com.tr', avatar: 'SA', activeProjects: 3, activeTasks: 6, completedTasks: 25 },
  { id: 'p-019', name: 'Zeynep Erdek', title: 'Geliştirici', department: 'Yazılım', email: 'zeynep.erdek@eliar.com.tr', avatar: 'ZE', activeProjects: 2, activeTasks: 5, completedTasks: 21 },
  { id: 'p-020', name: 'Burak Kaya', title: 'Kıdemli Mühendis', department: 'Yazılım', email: 'burak.kaya@eliar.com.tr', avatar: 'BK', activeProjects: 3, activeTasks: 6, completedTasks: 29 },
  { id: 'p-021', name: 'Emre Akın', title: 'Geliştirici', department: 'Yazılım', email: 'emre.akin@eliar.com.tr', avatar: 'EA', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-022', name: 'Cansu Yılmaz', title: 'Uzman', department: 'Yazılım', email: 'cansu.yilmaz@eliar.com.tr', avatar: 'CY', activeProjects: 2, activeTasks: 5, completedTasks: 20 },
  { id: 'p-023', name: 'Tolga Özer', title: 'Geliştirici', department: 'Yazılım', email: 'tolga.ozer@eliar.com.tr', avatar: 'TÖ', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-024', name: 'Dilan Kara', title: 'Test Mühendisi', department: 'Yazılım', email: 'dilan.kara@eliar.com.tr', avatar: 'DK', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-025', name: 'Onur Çelik', title: 'Geliştirici', department: 'Yazılım', email: 'onur.celik@eliar.com.tr', avatar: 'OÇ', activeProjects: 2, activeTasks: 3, completedTasks: 12 },
  { id: 'p-026', name: 'Merve Doğan', title: 'Uzman', department: 'Yazılım', email: 'merve.dogan@eliar.com.tr', avatar: 'MD', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-027', name: 'Kaan Arslan', title: 'Geliştirici', department: 'Yazılım', email: 'kaan.arslan@eliar.com.tr', avatar: 'KA', activeProjects: 1, activeTasks: 3, completedTasks: 11 },
  { id: 'p-028', name: 'Şule Aydın', title: 'Geliştirici', department: 'Yazılım', email: 'sule.aydin@eliar.com.tr', avatar: 'ŞA', activeProjects: 2, activeTasks: 4, completedTasks: 13 },
  { id: 'p-029', name: 'Barış Özdemir', title: 'Kıdemli Mühendis', department: 'Yazılım', email: 'baris.ozdemir@eliar.com.tr', avatar: 'BÖ', activeProjects: 3, activeTasks: 5, completedTasks: 23 },
  { id: 'p-030', name: 'İrem Yıldız', title: 'Geliştirici', department: 'Yazılım', email: 'irem.yildiz@eliar.com.tr', avatar: 'İY', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-031', name: 'Melih Şahin', title: 'Departman Lideri', department: 'Mekanik', email: 'melih.sahin@eliar.com.tr', avatar: 'MŞ', activeProjects: 3, activeTasks: 7, completedTasks: 35 },
  { id: 'p-032', name: 'Arda Kılıç', title: 'Mühendis', department: 'Mekanik', email: 'arda.kilic@eliar.com.tr', avatar: 'AK', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-033', name: 'Ceren Demir', title: 'Uzman', department: 'Mekanik', email: 'ceren.demir@eliar.com.tr', avatar: 'CD', activeProjects: 2, activeTasks: 5, completedTasks: 20 },
  { id: 'p-034', name: 'Hakan Öztürk', title: 'Mühendis', department: 'Mekanik', email: 'hakan.ozturk@eliar.com.tr', avatar: 'HÖ', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-035', name: 'Leyla Çetin', title: 'Teknisyen', department: 'Mekanik', email: 'leyla.cetin@eliar.com.tr', avatar: 'LÇ', activeProjects: 1, activeTasks: 3, completedTasks: 11 },
  { id: 'p-036', name: 'Serhat Yılmaz', title: 'Mühendis', department: 'Mekanik', email: 'serhat.yilmaz@eliar.com.tr', avatar: 'SY', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-037', name: 'Neslihan Koç', title: 'Uzman', department: 'Mekanik', email: 'neslihan.koc@eliar.com.tr', avatar: 'NK', activeProjects: 2, activeTasks: 4, completedTasks: 17 },
  { id: 'p-038', name: 'Volkan Arslan', title: 'Teknisyen', department: 'Mekanik', email: 'volkan.arslan@eliar.com.tr', avatar: 'VA', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-039', name: 'Elif Kaya', title: 'Departman Lideri', department: 'Test', email: 'elif.kaya@eliar.com.tr', avatar: 'EK', activeProjects: 3, activeTasks: 7, completedTasks: 41 },
  { id: 'p-040', name: 'Mehmet Tan', title: 'Test Mühendisi', department: 'Test', email: 'mehmet.tan@eliar.com.tr', avatar: 'MT', activeProjects: 2, activeTasks: 5, completedTasks: 22 },
  { id: 'p-041', name: 'Özge Yıldırım', title: 'Test Mühendisi', department: 'Test', email: 'ozge.yildirim@eliar.com.tr', avatar: 'ÖY', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-042', name: 'Selim Kara', title: 'Teknisyen', department: 'Test', email: 'selim.kara@eliar.com.tr', avatar: 'SK', activeProjects: 1, activeTasks: 3, completedTasks: 13 },
  { id: 'p-043', name: 'Yasemin Aydın', title: 'Test Mühendisi', department: 'Test', email: 'yasemin.aydin@eliar.com.tr', avatar: 'YA', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-044', name: 'Cenk Özer', title: 'Mühendis', department: 'Test', email: 'cenk.ozer@eliar.com.tr', avatar: 'CÖ', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-045', name: 'Aylin Doğan', title: 'Test Mühendisi', department: 'Test', email: 'aylin.dogan@eliar.com.tr', avatar: 'AD', activeProjects: 2, activeTasks: 3, completedTasks: 12 },
  { id: 'p-046', name: 'Tayfun Çelik', title: 'Teknisyen', department: 'Test', email: 'tayfun.celik@eliar.com.tr', avatar: 'TC', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-047', name: 'Nihal Arslan', title: 'Test Mühendisi', department: 'Test', email: 'nihal.arslan@eliar.com.tr', avatar: 'NA', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-048', name: 'Rıza Kılıç', title: 'Teknisyen', department: 'Test', email: 'riza.kilic@eliar.com.tr', avatar: 'RK', activeProjects: 1, activeTasks: 2, completedTasks: 8 },
  { id: 'p-049', name: 'Burak Yılmaz', title: 'Departman Lideri', department: 'Otomasyon', email: 'burak.yilmaz@eliar.com.tr', avatar: 'BY', activeProjects: 3, activeTasks: 6, completedTasks: 30 },
  { id: 'p-050', name: 'Serpil Öztürk', title: 'Mühendis', department: 'Otomasyon', email: 'serpil.ozturk@eliar.com.tr', avatar: 'SÖ', activeProjects: 2, activeTasks: 4, completedTasks: 17 },
  { id: 'p-051', name: 'Engin Demir', title: 'Uzman', department: 'Otomasyon', email: 'engin.demir@eliar.com.tr', avatar: 'ED', activeProjects: 2, activeTasks: 5, completedTasks: 20 },
  { id: 'p-052', name: 'Hatice Şahin', title: 'Mühendis', department: 'Otomasyon', email: 'hatice.sahin@eliar.com.tr', avatar: 'HŞ', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-053', name: 'Koray Yıldız', title: 'Teknisyen', department: 'Otomasyon', email: 'koray.yildiz@eliar.com.tr', avatar: 'KY', activeProjects: 1, activeTasks: 3, completedTasks: 11 },
  { id: 'p-054', name: 'Filiz Kaya', title: 'Mühendis', department: 'Otomasyon', email: 'filiz.kaya@eliar.com.tr', avatar: 'FK', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-055', name: 'Uğur Arslan', title: 'Kıdemli Mühendis', department: 'Otomasyon', email: 'ugur.arslan@eliar.com.tr', avatar: 'UA', activeProjects: 3, activeTasks: 5, completedTasks: 24 },
  { id: 'p-056', name: 'Perihan Çetin', title: 'Teknisyen', department: 'Otomasyon', email: 'perihan.cetin@eliar.com.tr', avatar: 'PC', activeProjects: 1, activeTasks: 3, completedTasks: 9 },
  { id: 'p-057', name: 'Levent Özer', title: 'Uzman', department: 'Otomasyon', email: 'levent.ozer@eliar.com.tr', avatar: 'LÖ', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-058', name: 'Sibel Doğan', title: 'Mühendis', department: 'Otomasyon', email: 'sibel.dogan@eliar.com.tr', avatar: 'SD', activeProjects: 2, activeTasks: 4, completedTasks: 13 },
  { id: 'p-059', name: 'Ferhat Koç', title: 'Departman Lideri', department: 'Donanım', email: 'ferhat.koc@eliar.com.tr', avatar: 'FK', activeProjects: 2, activeTasks: 5, completedTasks: 26 },
  { id: 'p-060', name: 'Gökhan Yılmaz', title: 'Mühendis', department: 'Donanım', email: 'gokhan.yilmaz@eliar.com.tr', avatar: 'GY', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-061', name: 'Tülin Kılıç', title: 'Uzman', department: 'Donanım', email: 'tulin.kilic@eliar.com.tr', avatar: 'TK', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-062', name: 'Mert Arslan', title: 'Mühendis', department: 'Donanım', email: 'mert.arslan@eliar.com.tr', avatar: 'MA', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-063', name: 'Reyhan Şahin', title: 'Teknisyen', department: 'Donanım', email: 'reyhan.sahin@eliar.com.tr', avatar: 'RŞ', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-064', name: 'Ömer Yıldız', title: 'Mühendis', department: 'Donanım', email: 'omer.yildiz@eliar.com.tr', avatar: 'ÖY', activeProjects: 2, activeTasks: 4, completedTasks: 13 },
  { id: 'p-065', name: 'Burcu Demir', title: 'Teknisyen', department: 'Donanım', email: 'burcu.demir@eliar.com.tr', avatar: 'BD', activeProjects: 1, activeTasks: 3, completedTasks: 8 },
  { id: 'p-066', name: 'Yiğit Çetin', title: 'Kıdemli Mühendis', department: 'Donanım', email: 'yigit.cetin@eliar.com.tr', avatar: 'YÇ', activeProjects: 2, activeTasks: 5, completedTasks: 21 },
  { id: 'p-067', name: 'Nurgül Öztürk', title: 'Saha Mühendisi', department: 'Saha', email: 'nurgul.ozturk@eliar.com.tr', avatar: 'NÖ', activeProjects: 2, activeTasks: 4, completedTasks: 19 },
  { id: 'p-068', name: 'Serdar Kaya', title: 'Saha Mühendisi', department: 'Saha', email: 'serdar.kaya@eliar.com.tr', avatar: 'SK', activeProjects: 2, activeTasks: 5, completedTasks: 22 },
  { id: 'p-069', name: 'Mehtap Arslan', title: 'Teknisyen', department: 'Saha', email: 'mehtap.arslan@eliar.com.tr', avatar: 'MA', activeProjects: 1, activeTasks: 3, completedTasks: 12 },
  { id: 'p-070', name: 'Caner Yılmaz', title: 'Saha Mühendisi', department: 'Saha', email: 'caner.yilmaz@eliar.com.tr', avatar: 'CY', activeProjects: 2, activeTasks: 4, completedTasks: 17 },
  { id: 'p-071', name: 'Esin Kılıç', title: 'Uzman', department: 'Saha', email: 'esin.kilic@eliar.com.tr', avatar: 'EK', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-072', name: 'Tolgahan Demir', title: 'Saha Mühendisi', department: 'Saha', email: 'tolgahan.demir@eliar.com.tr', avatar: 'TD', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-073', name: 'Aslı Şahin', title: 'Teknisyen', department: 'Saha', email: 'asli.sahin@eliar.com.tr', avatar: 'AŞ', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-074', name: 'Devrim Yıldız', title: 'Saha Mühendisi', department: 'Saha', email: 'devrim.yildiz@eliar.com.tr', avatar: 'DY', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-075', name: 'Gamze Özer', title: 'Saha Mühendisi', department: 'Saha', email: 'gamze.ozer@eliar.com.tr', avatar: 'GÖ', activeProjects: 1, activeTasks: 3, completedTasks: 11 },
  { id: 'p-076', name: 'Hande Koç', title: 'Proje Yöneticisi', department: 'Ürün', email: 'hande.koc@eliar.com.tr', avatar: 'HK', activeProjects: 4, activeTasks: 6, completedTasks: 33 },
  { id: 'p-077', name: 'İlker Arslan', title: 'Uzman', department: 'Ürün', email: 'ilker.arslan@eliar.com.tr', avatar: 'İA', activeProjects: 3, activeTasks: 5, completedTasks: 24 },
  { id: 'p-078', name: 'Jale Yılmaz', title: 'Mühendis', department: 'Ürün', email: 'jale.yilmaz@eliar.com.tr', avatar: 'JY', activeProjects: 2, activeTasks: 4, completedTasks: 18 },
  { id: 'p-079', name: 'Kamil Kılıç', title: 'Uzman', department: 'Ürün', email: 'kamil.kilic@eliar.com.tr', avatar: 'KK', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-080', name: 'Lale Demir', title: 'Mühendis', department: 'Ürün', email: 'lale.demir@eliar.com.tr', avatar: 'LD', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-081', name: 'Mete Şahin', title: 'Kıdemli Mühendis', department: 'Ürün', email: 'mete.sahin@eliar.com.tr', avatar: 'MŞ', activeProjects: 3, activeTasks: 5, completedTasks: 25 },
  { id: 'p-082', name: 'Nazan Yıldız', title: 'Uzman', department: 'Ürün', email: 'nazan.yildiz@eliar.com.tr', avatar: 'NY', activeProjects: 2, activeTasks: 4, completedTasks: 17 },
  { id: 'p-083', name: 'Orhan Öztürk', title: 'Mühendis', department: 'Ürün', email: 'orhan.ozturk@eliar.com.tr', avatar: 'OÖ', activeProjects: 2, activeTasks: 3, completedTasks: 12 },
  { id: 'p-084', name: 'Pakize Kaya', title: 'Proje Yöneticisi', department: 'Lojistik', email: 'pakize.kaya@eliar.com.tr', avatar: 'PK', activeProjects: 3, activeTasks: 5, completedTasks: 28 },
  { id: 'p-085', name: 'Rahmi Arslan', title: 'Uzman', department: 'Lojistik', email: 'rahmi.arslan@eliar.com.tr', avatar: 'RA', activeProjects: 2, activeTasks: 4, completedTasks: 20 },
  { id: 'p-086', name: 'Selda Yılmaz', title: 'Mühendis', department: 'Lojistik', email: 'selda.yilmaz@eliar.com.tr', avatar: 'SY', activeProjects: 2, activeTasks: 4, completedTasks: 16 },
  { id: 'p-087', name: 'Tarkan Kılıç', title: 'Uzman', department: 'Lojistik', email: 'tarkan.kilic@eliar.com.tr', avatar: 'TK', activeProjects: 2, activeTasks: 4, completedTasks: 15 },
  { id: 'p-088', name: 'Ufuk Demir', title: 'Teknisyen', department: 'Lojistik', email: 'ufuk.demir@eliar.com.tr', avatar: 'UD', activeProjects: 1, activeTasks: 3, completedTasks: 11 },
  { id: 'p-089', name: 'Vildan Şahin', title: 'Mühendis', department: 'Lojistik', email: 'vildan.sahin@eliar.com.tr', avatar: 'VS', activeProjects: 2, activeTasks: 4, completedTasks: 14 },
  { id: 'p-090', name: 'Yüksel Yıldız', title: 'Kıdemli Mühendis', department: 'Lojistik', email: 'yuksel.yildiz@eliar.com.tr', avatar: 'YY', activeProjects: 2, activeTasks: 4, completedTasks: 19 },
  { id: 'p-091', name: 'Zehra Öztürk', title: 'Uzman', department: 'Lojistik', email: 'zehra.ozturk@eliar.com.tr', avatar: 'ZÖ', activeProjects: 2, activeTasks: 3, completedTasks: 13 },
  { id: 'p-092', name: 'Altan Koç', title: 'Departman Lideri', department: 'Destek', email: 'altan.koc@eliar.com.tr', avatar: 'AK', activeProjects: 2, activeTasks: 4, completedTasks: 22 },
  { id: 'p-093', name: 'Bahar Arslan', title: 'Uzman', department: 'Destek', email: 'bahar.arslan@eliar.com.tr', avatar: 'BA', activeProjects: 2, activeTasks: 3, completedTasks: 14 },
  { id: 'p-094', name: 'Coşkun Yılmaz', title: 'Teknisyen', department: 'Destek', email: 'coskun.yilmaz@eliar.com.tr', avatar: 'CY', activeProjects: 1, activeTasks: 3, completedTasks: 10 },
  { id: 'p-095', name: 'Didem Kılıç', title: 'Uzman', department: 'Destek', email: 'didem.kilic@eliar.com.tr', avatar: 'DK', activeProjects: 2, activeTasks: 3, completedTasks: 12 },
  { id: 'p-096', name: 'Ercan Demir', title: 'Teknisyen', department: 'Destek', email: 'ercan.demir@eliar.com.tr', avatar: 'ED', activeProjects: 1, activeTasks: 2, completedTasks: 8 },
  { id: 'p-097', name: 'Figen Şahin', title: 'Uzman', department: 'Destek', email: 'figen.sahin@eliar.com.tr', avatar: 'FŞ', activeProjects: 2, activeTasks: 3, completedTasks: 11 },
  { id: 'p-098', name: 'Güven Yıldız', title: 'Teknisyen', department: 'Destek', email: 'guven.yildiz@eliar.com.tr', avatar: 'GY', activeProjects: 1, activeTasks: 2, completedTasks: 7 },
  { id: 'p-099', name: 'Hilal Öztürk', title: 'Mühendis', department: 'Destek', email: 'hilal.ozturk@eliar.com.tr', avatar: 'HÖ', activeProjects: 2, activeTasks: 3, completedTasks: 13 },
  { id: 'p-100', name: 'İbrahim Kaya', title: 'Uzman', department: 'Destek', email: 'ibrahim.kaya@eliar.com.tr', avatar: 'İK', activeProjects: 2, activeTasks: 3, completedTasks: 10 },
];

// ─── PROJECTS — rich collaborative data ──────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'prj-001',
    name: 'T9 PLC Ana Kart',
    leadId: 'p-002',
    collaboratorIds: ['p-003', 'p-005', 'p-008', 'p-020', 'p-040', 'p-059', 'p-031'],
    department: ['Elektronik', 'Donanım', 'Yazılım'],
    activeTaskCount: 24, completedTaskCount: 9, totalTaskCount: 33,
    startDate: '03.02.2026', endDate: '30.09.2026', status: 'Aktif', completionPercent: 27,
    description: 'Yeni nesil T9 serisi PLC ana kart tasarımı ve üretimi. Elektronik, Donanım ve Yazılım ekipleri ortak çalışıyor.',
  },
  {
    id: 'prj-002',
    name: 'Enerji İzleme Sistemi',
    leadId: 'p-017',
    collaboratorIds: ['p-005', 'p-011', 'p-018', 'p-020', 'p-039', 'p-040', 'p-049', 'p-055'],
    department: ['Yazılım', 'Elektronik', 'Test', 'Otomasyon'],
    activeTaskCount: 36, completedTaskCount: 25, totalTaskCount: 61,
    startDate: '10.01.2026', endDate: '31.10.2026', status: 'Kritik', completionPercent: 41,
    description: 'Fabrika geneli enerji tüketimini gerçek zamanlı izleyen ve raporlayan sistem. 4 departman birlikte geliştiriyor.',
  },
  {
    id: 'prj-003',
    name: 'SCADA 2026',
    leadId: 'p-017',
    collaboratorIds: ['p-018', 'p-019', 'p-022', 'p-029', 'p-049', 'p-051', 'p-055'],
    department: ['Yazılım', 'Otomasyon'],
    activeTaskCount: 28, completedTaskCount: 13, totalTaskCount: 41,
    startDate: '12.05.2026', endDate: '30.12.2026', status: 'Aktif', completionPercent: 32,
    description: 'SCADA platformunun 2026 sürümü. Yazılım ve Otomasyon ekipleri birlikte geliştiriyor.',
  },
  {
    id: 'prj-004',
    name: 'Saha Mobile App',
    leadId: 'p-039',
    collaboratorIds: ['p-019', 'p-021', 'p-023', 'p-067', 'p-068', 'p-070', 'p-040', 'p-041'],
    department: ['Yazılım', 'Saha', 'Test'],
    activeTaskCount: 19, completedTaskCount: 3, totalTaskCount: 22,
    startDate: '15.03.2026', endDate: '30.06.2026', status: 'Kritik', completionPercent: 14,
    description: 'Saha mühendisleri için mobil uygulama. Yazılım, Saha ve Test ekipleri ortak çalışıyor.',
  },
  {
    id: 'prj-005',
    name: 'Donanım Test Platformu',
    leadId: 'p-059',
    collaboratorIds: ['p-040', 'p-041', 'p-060', 'p-061', 'p-066', 'p-004'],
    department: ['Donanım', 'Test', 'Elektronik'],
    activeTaskCount: 15, completedTaskCount: 8, totalTaskCount: 23,
    startDate: '20.02.2026', endDate: '31.07.2026', status: 'Aktif', completionPercent: 35,
    description: 'Donanım bileşenlerinin otomatik test edilmesi için platform. Donanım, Test ve Elektronik ekipleri birlikte çalışıyor.',
  },
  {
    id: 'prj-006',
    name: 'Termal Yönetim Modülü',
    leadId: 'p-031',
    collaboratorIds: ['p-033', 'p-034', 'p-036', 'p-005', 'p-008', 'p-039'],
    department: ['Mekanik', 'Elektronik'],
    activeTaskCount: 12, completedTaskCount: 7, totalTaskCount: 19,
    startDate: '01.03.2026', endDate: '31.08.2026', status: 'Aktif', completionPercent: 37,
    description: 'Yüksek güç yoğunluklu sistemler için termal yönetim modülü. Mekanik ve Elektronik ekipleri ortak çalışıyor.',
  },
  {
    id: 'prj-007',
    name: 'Endüstriyel IoT Gateway',
    leadId: 'p-049',
    collaboratorIds: ['p-020', 'p-022', 'p-051', 'p-055', 'p-059', 'p-060', 'p-066'],
    department: ['Otomasyon', 'Yazılım', 'Donanım'],
    activeTaskCount: 22, completedTaskCount: 6, totalTaskCount: 28,
    startDate: '15.04.2026', endDate: '31.12.2026', status: 'Aktif', completionPercent: 21,
    description: 'Endüstriyel cihazları buluta bağlayan IoT gateway çözümü. Otomasyon, Yazılım ve Donanım ekipleri birlikte geliştiriyor.',
  },
  {
    id: 'prj-008',
    name: 'PCB Revizyon 4.0',
    leadId: 'p-002',
    collaboratorIds: ['p-003', 'p-007', 'p-008', 'p-031', 'p-032', 'p-040'],
    department: ['Elektronik', 'Mekanik'],
    activeTaskCount: 18, completedTaskCount: 12, totalTaskCount: 30,
    startDate: '04.03.2026', endDate: '30.05.2026', status: 'Kritik', completionPercent: 40,
    description: 'Ana kart PCB\'nin 4. revizyon tasarımı. Elektronik ve Mekanik ekipleri ortak çalışıyor.',
  },
  {
    id: 'prj-009',
    name: 'Güç Kaynağı Optimizasyonu',
    leadId: 'p-014',
    collaboratorIds: ['p-005', 'p-006', 'p-039', 'p-040', 'p-043'],
    department: ['Elektronik', 'Test'],
    activeTaskCount: 10, completedTaskCount: 5, totalTaskCount: 15,
    startDate: '01.04.2026', endDate: '30.06.2026', status: 'Aktif', completionPercent: 33,
    description: 'Güç kaynağı verimliliğinin artırılması ve enerji tasarrufu optimizasyonu.',
  },
  {
    id: 'prj-010',
    name: 'Lojistik Takip Sistemi',
    leadId: 'p-084',
    collaboratorIds: ['p-020', 'p-022', 'p-085', 'p-086', 'p-087', 'p-090'],
    department: ['Yazılım', 'Lojistik'],
    activeTaskCount: 14, completedTaskCount: 4, totalTaskCount: 18,
    startDate: '01.05.2026', endDate: '31.10.2026', status: 'Aktif', completionPercent: 22,
    description: 'Depo ve sevkiyat süreçlerini dijitalleştiren lojistik takip sistemi.',
  },
  {
    id: 'prj-011',
    name: 'Güvenlik Sertifikasyon 2025→2026',
    leadId: 'p-029',
    collaboratorIds: ['p-017', 'p-024', 'p-039', 'p-040'],
    department: ['Yazılım', 'Test'],
    activeTaskCount: 8, completedTaskCount: 14, totalTaskCount: 22,
    startDate: '01.11.2025', endDate: '28.02.2026', status: 'Tamamlandı', completionPercent: 100,
    description: 'Yıl sonu güvenlik sertifikasyon süreci. Yazılım ve Test ekipleri birlikte tamamladı.',
  },
  {
    id: 'prj-012',
    name: 'Yıllık Altyapı Yenileme',
    leadId: 'p-001',
    collaboratorIds: ['p-059', 'p-017', 'p-092', 'p-093', 'p-099'],
    department: ['Donanım', 'Yazılım', 'Destek'],
    activeTaskCount: 5, completedTaskCount: 18, totalTaskCount: 23,
    startDate: '15.11.2025', endDate: '15.03.2026', status: 'Tamamlandı', completionPercent: 100,
    description: 'Yıllık sunucu ve ağ altyapısı yenileme projesi. Donanım, Yazılım ve Destek ekipleri ortak çalıştı.',
  },
];

// ─── TASKS — rich collaborative data, multiple people per project ─────────────
export const TASKS: Task[] = [
  // ── prj-001: T9 PLC Ana Kart ─────────────────────────────────────────────
  { id: 'tsk-001', name: 'PCB Rev4 Layout', projectId: 'prj-001', assigneeId: 'p-002', collaboratorIds: ['p-003', 'p-008'], status: 'Yapılıyor', startDate: '04.03.2026', endDate: '30.05.2026', remainingDays: 25, subTaskCount: 2, fileCount: 4, messageCount: 7, riskCount: 1, priority: 'Kritik', department: 'Elektronik', description: 'T9 PLC ana kart PCB düzeni revize edilmesi, kat sayısı 6\'dan 8\'e çıkarılıyor.', progressPercent: 55 },
  { id: 'tsk-006', name: 'Firmware Güncelleme v2.4', projectId: 'prj-001', assigneeId: 'p-020', collaboratorIds: ['p-002', 'p-005'], status: 'Test', startDate: '15.04.2026', endDate: '20.05.2026', remainingDays: 15, subTaskCount: 2, fileCount: 3, messageCount: 4, riskCount: 1, priority: 'Yüksek', department: 'Yazılım', description: 'T9 PLC firmware 2.4 sürümü geliştirme ve entegrasyon testleri.', progressPercent: 72 },
  { id: 'tsk-012', name: 'PCB Stok Yönetimi', projectId: 'prj-001', assigneeId: 'p-003', collaboratorIds: ['p-002'], status: 'Riskli', startDate: '20.04.2026', endDate: '30.04.2026', remainingDays: -5, subTaskCount: 0, fileCount: 1, messageCount: 4, riskCount: 2, priority: 'Kritik', department: 'Elektronik', description: 'T9 PLC için kritik bileşen stok durumu ve tedarik planlaması.', progressPercent: 30 },
  { id: 'tsk-030', name: 'Güç Dağıtım Devresi', projectId: 'prj-001', assigneeId: 'p-008', collaboratorIds: ['p-005', 'p-059'], status: 'Yapılıyor', startDate: '10.03.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 3, fileCount: 2, messageCount: 5, riskCount: 0, priority: 'Yüksek', department: 'Elektronik', description: 'Ana kart güç dağıtım devresi tasarımı ve simülasyonu.', progressPercent: 45 },
  { id: 'tsk-031', name: 'Donanım Entegrasyon Testi (PLC)', projectId: 'prj-001', assigneeId: 'p-040', collaboratorIds: ['p-059', 'p-004'], status: 'Plan', startDate: '01.06.2026', endDate: '30.07.2026', remainingDays: 56, subTaskCount: 2, fileCount: 0, messageCount: 2, riskCount: 0, priority: 'Orta', department: 'Test', description: 'T9 PLC ana kart donanım entegrasyon test planı ve uygulaması.', progressPercent: 0 },

  // ── prj-002: Enerji İzleme Sistemi ──────────────────────────────────────
  { id: 'tsk-002', name: 'Termal Simülasyon', projectId: 'prj-002', assigneeId: 'p-039', collaboratorIds: ['p-005', 'p-040'], status: 'Plan', startDate: '20.04.2026', endDate: '15.05.2026', remainingDays: 10, subTaskCount: 1, fileCount: 1, messageCount: 3, riskCount: 1, priority: 'Yüksek', department: 'Test', description: 'Enerji izleme sistemi için ısıl analiz simülasyonları.', progressPercent: 10 },
  { id: 'tsk-010', name: 'Enerji Sapma Analizi', projectId: 'prj-002', assigneeId: 'p-005', collaboratorIds: ['p-011', 'p-049'], status: 'Riskli', startDate: '01.04.2026', endDate: '01.05.2026', remainingDays: -4, subTaskCount: 1, fileCount: 2, messageCount: 9, riskCount: 3, priority: 'Kritik', department: 'Elektronik', description: 'Enerji izleme sisteminde ölçüm sapma kök neden analizi.', progressPercent: 60 },
  { id: 'tsk-019', name: 'Batarya Yönetim Sistemi', projectId: 'prj-002', assigneeId: 'p-011', collaboratorIds: ['p-005', 'p-017'], status: 'Plan', startDate: '01.06.2026', endDate: '31.07.2026', remainingDays: 87, subTaskCount: 2, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Yüksek', department: 'Elektronik', description: 'Enerji izleme için batarya yönetim algoritmaları.', progressPercent: 0 },
  { id: 'tsk-032', name: 'Modbus RTU Katmanı', projectId: 'prj-002', assigneeId: 'p-018', collaboratorIds: ['p-055', 'p-049'], status: 'Yapılıyor', startDate: '23.03.2026', endDate: '10.05.2026', remainingDays: 5, subTaskCount: 2, fileCount: 3, messageCount: 6, riskCount: 0, priority: 'Yüksek', department: 'Yazılım', description: 'Modbus RTU katmanı yazıldı, CRC doğrulaması eklendi.', progressPercent: 85 },
  { id: 'tsk-033', name: 'Bootloader OTA Desteği', projectId: 'prj-002', assigneeId: 'p-020', collaboratorIds: ['p-018', 'p-055'], status: 'Yapılıyor', startDate: '18.04.2026', endDate: '25.05.2026', remainingDays: 20, subTaskCount: 1, fileCount: 2, messageCount: 4, riskCount: 0, priority: 'Orta', department: 'Yazılım', description: 'Bootloader OTA desteği geldi, uzaktan güncelleme altyapısı kuruldu.', progressPercent: 70 },
  { id: 'tsk-034', name: 'RTOS Task Önceliklendirme', projectId: 'prj-002', assigneeId: 'p-018', collaboratorIds: ['p-020', 'p-049'], status: 'Tamamlandı', startDate: '15.04.2026', endDate: '30.04.2026', remainingDays: 0, subTaskCount: 1, fileCount: 2, messageCount: 5, riskCount: 0, priority: 'Yüksek', department: 'Yazılım', description: 'RTOS task önceliklendirmesi yeniden tasarlandı, gecikme sorunları giderildi.', progressPercent: 100 },
  { id: 'tsk-035', name: 'Enerji Dashboard UI', projectId: 'prj-002', assigneeId: 'p-022', collaboratorIds: ['p-018', 'p-017'], status: 'Yapılıyor', startDate: '01.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 3, fileCount: 1, messageCount: 3, riskCount: 0, priority: 'Orta', department: 'Yazılım', description: 'Enerji izleme dashboard arayüzü tasarımı ve geliştirmesi.', progressPercent: 35 },

  // ── prj-003: SCADA 2026 ──────────────────────────────────────────────────
  { id: 'tsk-003', name: 'Yazılım Refaktörü', projectId: 'prj-003', assigneeId: 'p-017', collaboratorIds: ['p-018', 'p-029'], status: 'Yapılıyor', startDate: '12.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 3, fileCount: 2, messageCount: 5, riskCount: 0, priority: 'Yüksek', department: 'Yazılım', description: 'SCADA 2026 modüllerinin TypeScript\'e migrasyon ve refaktörü.', progressPercent: 40 },
  { id: 'tsk-013', name: 'SCADA Arayüz Tasarımı', projectId: 'prj-003', assigneeId: 'p-018', collaboratorIds: ['p-022', 'p-017'], status: 'Plan Dışı', startDate: '01.05.2026', endDate: '31.05.2026', remainingDays: 26, subTaskCount: 1, fileCount: 2, messageCount: 3, riskCount: 1, priority: 'Yüksek', department: 'Yazılım', description: 'Plan dışı açılan SCADA yeni arayüz tasarım görevi.', progressPercent: 15 },
  { id: 'tsk-018', name: 'Güvenlik Protokolü Güncelleme', projectId: 'prj-003', assigneeId: 'p-029', collaboratorIds: ['p-017', 'p-051'], status: 'Gecikmiş', startDate: '01.04.2026', endDate: '25.04.2026', remainingDays: -10, subTaskCount: 1, fileCount: 2, messageCount: 7, riskCount: 2, priority: 'Kritik', department: 'Yazılım', description: 'SCADA güvenlik protokolü ve erişim yönetimi güncelleme.', progressPercent: 50 },
  { id: 'tsk-036', name: 'PLC Haberleşme Modülü', projectId: 'prj-003', assigneeId: 'p-049', collaboratorIds: ['p-055', 'p-051'], status: 'Yapılıyor', startDate: '15.05.2026', endDate: '15.07.2026', remainingDays: 71, subTaskCount: 2, fileCount: 2, messageCount: 4, riskCount: 0, priority: 'Yüksek', department: 'Otomasyon', description: 'SCADA ile PLC haberleşme modülü entegrasyonu.', progressPercent: 25 },
  { id: 'tsk-037', name: 'Alarm Yönetim Sistemi', projectId: 'prj-003', assigneeId: 'p-022', collaboratorIds: ['p-018', 'p-049'], status: 'Plan', startDate: '01.06.2026', endDate: '31.07.2026', remainingDays: 87, subTaskCount: 2, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Yazılım', description: 'SCADA alarm yönetim sistemi tasarımı ve implementasyonu.', progressPercent: 0 },

  // ── prj-004: Saha Mobile App ─────────────────────────────────────────────
  { id: 'tsk-005', name: 'Mobil App Hata Ayıklama', projectId: 'prj-004', assigneeId: 'p-019', collaboratorIds: ['p-021', 'p-039'], status: 'Gecikmiş', startDate: '28.04.2026', endDate: '10.05.2026', remainingDays: -25, subTaskCount: 1, fileCount: 2, messageCount: 8, riskCount: 2, priority: 'Kritik', department: 'Yazılım', description: 'Saha mobile uygulamasında kritik GPS ve sync hataları giderilmesi.', progressPercent: 35 },
  { id: 'tsk-014', name: 'Saha Test Protokolü', projectId: 'prj-004', assigneeId: 'p-039', collaboratorIds: ['p-067', 'p-068', 'p-040'], status: 'Yapılıyor', startDate: '15.03.2026', endDate: '30.05.2026', remainingDays: 25, subTaskCount: 2, fileCount: 3, messageCount: 5, riskCount: 1, priority: 'Yüksek', department: 'Test', description: 'Saha mobile uygulaması için saha test protokolü hazırlanması.', progressPercent: 60 },
  { id: 'tsk-038', name: 'Offline Senkronizasyon', projectId: 'prj-004', assigneeId: 'p-021', collaboratorIds: ['p-019', 'p-023'], status: 'Yapılıyor', startDate: '01.04.2026', endDate: '31.05.2026', remainingDays: 26, subTaskCount: 2, fileCount: 2, messageCount: 6, riskCount: 1, priority: 'Kritik', department: 'Yazılım', description: 'Çevrimdışı çalışma ve veri senkronizasyon modülü geliştirmesi.', progressPercent: 45 },
  { id: 'tsk-039', name: 'Saha Raporlama Modülü', projectId: 'prj-004', assigneeId: 'p-067', collaboratorIds: ['p-068', 'p-070'], status: 'Plan', startDate: '01.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 1, fileCount: 0, messageCount: 2, riskCount: 0, priority: 'Orta', department: 'Saha', description: 'Saha mühendisleri için mobil raporlama modülü.', progressPercent: 5 },
  { id: 'tsk-040', name: 'Push Bildirim Altyapısı', projectId: 'prj-004', assigneeId: 'p-023', collaboratorIds: ['p-019', 'p-041'], status: 'Plan', startDate: '15.05.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 1, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Yazılım', description: 'Mobil uygulama push bildirim altyapısı kurulumu.', progressPercent: 0 },

  // ── prj-005: Donanım Test Platformu ─────────────────────────────────────
  { id: 'tsk-004', name: 'Test Raporu Donanım', projectId: 'prj-005', assigneeId: 'p-040', collaboratorIds: ['p-059', 'p-061'], status: 'Tamamlandı', startDate: '26.03.2026', endDate: '12.04.2026', remainingDays: 0, subTaskCount: 0, fileCount: 3, messageCount: 2, riskCount: 0, priority: 'Orta', department: 'Test', description: 'Donanım test platformu için kapsamlı test raporu oluşturulması.', progressPercent: 100 },
  { id: 'tsk-015', name: 'Donanım Entegrasyon Testi', projectId: 'prj-005', assigneeId: 'p-059', collaboratorIds: ['p-060', 'p-066', 'p-041'], status: 'Test', startDate: '10.04.2026', endDate: '10.05.2026', remainingDays: 5, subTaskCount: 1, fileCount: 4, messageCount: 6, riskCount: 0, priority: 'Yüksek', department: 'Donanım', description: 'Donanım test platformu entegrasyon testi ve validasyon.', progressPercent: 80 },
  { id: 'tsk-041', name: 'Otomatik Test Senaryoları', projectId: 'prj-005', assigneeId: 'p-041', collaboratorIds: ['p-040', 'p-004'], status: 'Yapılıyor', startDate: '01.04.2026', endDate: '31.05.2026', remainingDays: 26, subTaskCount: 3, fileCount: 2, messageCount: 4, riskCount: 0, priority: 'Yüksek', department: 'Test', description: 'Donanım test platformu için otomatik test senaryoları yazılması.', progressPercent: 55 },
  { id: 'tsk-042', name: 'Test Veri Analiz Aracı', projectId: 'prj-005', assigneeId: 'p-061', collaboratorIds: ['p-059', 'p-040'], status: 'Plan', startDate: '01.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 1, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Donanım', description: 'Test sonuçlarını analiz eden ve raporlayan araç geliştirmesi.', progressPercent: 0 },

  // ── prj-006: Termal Yönetim Modülü ──────────────────────────────────────
  { id: 'tsk-008', name: '3D Mekanik Model Rev2', projectId: 'prj-006', assigneeId: 'p-031', collaboratorIds: ['p-033', 'p-034'], status: 'Yapılıyor', startDate: '01.04.2026', endDate: '31.05.2026', remainingDays: 26, subTaskCount: 2, fileCount: 5, messageCount: 6, riskCount: 0, priority: 'Yüksek', department: 'Mekanik', description: 'Termal yönetim modülü için 3D model revizyonu ve tolerans analizi.', progressPercent: 65 },
  { id: 'tsk-017', name: 'Termal Kaplama Analizi', projectId: 'prj-006', assigneeId: 'p-033', collaboratorIds: ['p-031', 'p-005'], status: 'Plan', startDate: '15.05.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 1, fileCount: 1, messageCount: 2, riskCount: 0, priority: 'Orta', department: 'Mekanik', description: 'Isıl yönetim için yüzey kaplama malzeme analizi.', progressPercent: 0 },
  { id: 'tsk-043', name: 'Soğutma Kanalı Optimizasyonu', projectId: 'prj-006', assigneeId: 'p-034', collaboratorIds: ['p-031', 'p-008'], status: 'Yapılıyor', startDate: '15.04.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 2, fileCount: 3, messageCount: 4, riskCount: 0, priority: 'Yüksek', department: 'Mekanik', description: 'Soğutma kanalı geometrisi CFD simülasyonu ve optimizasyonu.', progressPercent: 40 },
  { id: 'tsk-044', name: 'Termal Sensör Entegrasyonu', projectId: 'prj-006', assigneeId: 'p-005', collaboratorIds: ['p-031', 'p-039'], status: 'Plan', startDate: '01.06.2026', endDate: '31.07.2026', remainingDays: 87, subTaskCount: 1, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Elektronik', description: 'Termal yönetim modülüne sensör entegrasyonu ve kalibrasyon.', progressPercent: 0 },

  // ── prj-007: Endüstriyel IoT Gateway ────────────────────────────────────
  { id: 'tsk-009', name: 'IoT Protokol Entegrasyonu', projectId: 'prj-007', assigneeId: 'p-055', collaboratorIds: ['p-049', 'p-020'], status: 'Plan', startDate: '15.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 3, fileCount: 1, messageCount: 2, riskCount: 0, priority: 'Yüksek', department: 'Otomasyon', description: 'Endüstriyel IoT Gateway için MQTT ve Modbus protokol entegrasyonu.', progressPercent: 10 },
  { id: 'tsk-016', name: 'Otomasyon PLC Konfigürasyonu', projectId: 'prj-007', assigneeId: 'p-049', collaboratorIds: ['p-055', 'p-051'], status: 'Yapılıyor', startDate: '20.04.2026', endDate: '20.06.2026', remainingDays: 46, subTaskCount: 2, fileCount: 2, messageCount: 4, riskCount: 0, priority: 'Orta', department: 'Otomasyon', description: 'IoT Gateway için PLC konfigürasyon ve parametre ayarları.', progressPercent: 50 },
  { id: 'tsk-045', name: 'Gateway Donanım Tasarımı', projectId: 'prj-007', assigneeId: 'p-059', collaboratorIds: ['p-060', 'p-066'], status: 'Yapılıyor', startDate: '15.04.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 2, fileCount: 3, messageCount: 5, riskCount: 0, priority: 'Yüksek', department: 'Donanım', description: 'IoT Gateway donanım kartı tasarımı ve prototip üretimi.', progressPercent: 45 },
  { id: 'tsk-046', name: 'Bulut Bağlantı Modülü', projectId: 'prj-007', assigneeId: 'p-020', collaboratorIds: ['p-022', 'p-055'], status: 'Plan', startDate: '01.06.2026', endDate: '31.08.2026', remainingDays: 117, subTaskCount: 2, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Yüksek', department: 'Yazılım', description: 'IoT Gateway bulut bağlantı ve veri aktarım modülü.', progressPercent: 0 },

  // ── prj-008: PCB Revizyon 4.0 ────────────────────────────────────────────
  { id: 'tsk-047', name: 'Şematik Tasarım Rev4', projectId: 'prj-008', assigneeId: 'p-002', collaboratorIds: ['p-003', 'p-007'], status: 'Tamamlandı', startDate: '04.03.2026', endDate: '31.03.2026', remainingDays: 0, subTaskCount: 2, fileCount: 5, messageCount: 8, riskCount: 0, priority: 'Kritik', department: 'Elektronik', description: 'PCB Rev4 şematik tasarımı tamamlandı ve onaylandı.', progressPercent: 100 },
  { id: 'tsk-048', name: 'Mekanik Kasa Tasarımı', projectId: 'prj-008', assigneeId: 'p-031', collaboratorIds: ['p-032', 'p-002'], status: 'Yapılıyor', startDate: '01.04.2026', endDate: '15.05.2026', remainingDays: 10, subTaskCount: 1, fileCount: 3, messageCount: 4, riskCount: 0, priority: 'Yüksek', department: 'Mekanik', description: 'PCB Rev4 için mekanik kasa ve montaj tasarımı.', progressPercent: 75 },
  { id: 'tsk-049', name: 'DFM Analizi', projectId: 'prj-008', assigneeId: 'p-007', collaboratorIds: ['p-002', 'p-040'], status: 'Test', startDate: '15.04.2026', endDate: '10.05.2026', remainingDays: 5, subTaskCount: 1, fileCount: 2, messageCount: 3, riskCount: 1, priority: 'Yüksek', department: 'Elektronik', description: 'Üretilebilirlik için tasarım (DFM) analizi ve optimizasyonu.', progressPercent: 85 },
  { id: 'tsk-050', name: 'Prototip Üretim Takibi', projectId: 'prj-008', assigneeId: 'p-003', collaboratorIds: ['p-002', 'p-040', 'p-032'], status: 'Yapılıyor', startDate: '20.04.2026', endDate: '30.05.2026', remainingDays: 25, subTaskCount: 2, fileCount: 2, messageCount: 6, riskCount: 1, priority: 'Kritik', department: 'Elektronik', description: 'PCB Rev4 prototip üretim süreci takibi ve kalite kontrolü.', progressPercent: 50 },

  // ── prj-009: Güç Kaynağı Optimizasyonu ──────────────────────────────────
  { id: 'tsk-007', name: 'Güç Analiz Raporu', projectId: 'prj-009', assigneeId: 'p-014', collaboratorIds: ['p-005', 'p-039'], status: 'Yapılıyor', startDate: '01.04.2026', endDate: '15.05.2026', remainingDays: 10, subTaskCount: 1, fileCount: 2, messageCount: 3, riskCount: 0, priority: 'Orta', department: 'Elektronik', description: 'Güç kaynağı optimizasyon projesi analiz raporu.', progressPercent: 70 },
  { id: 'tsk-051', name: 'Verimlilik Testi', projectId: 'prj-009', assigneeId: 'p-039', collaboratorIds: ['p-040', 'p-043', 'p-014'], status: 'Yapılıyor', startDate: '15.04.2026', endDate: '31.05.2026', remainingDays: 26, subTaskCount: 2, fileCount: 3, messageCount: 5, riskCount: 0, priority: 'Yüksek', department: 'Test', description: 'Güç kaynağı verimlilik ölçüm testleri ve karşılaştırmalı analiz.', progressPercent: 55 },
  { id: 'tsk-052', name: 'Termal Yük Testi', projectId: 'prj-009', assigneeId: 'p-006', collaboratorIds: ['p-014', 'p-043'], status: 'Plan', startDate: '01.05.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 1, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Elektronik', description: 'Güç kaynağı termal yük testi ve sıcaklık profili ölçümü.', progressPercent: 0 },

  // ── prj-010: Lojistik Takip Sistemi ─────────────────────────────────────
  { id: 'tsk-011', name: 'Lojistik Modül Tasarımı', projectId: 'prj-010', assigneeId: 'p-084', collaboratorIds: ['p-085', 'p-086'], status: 'Plan', startDate: '01.05.2026', endDate: '15.06.2026', remainingDays: 41, subTaskCount: 2, fileCount: 1, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Lojistik', description: 'Lojistik takip sistemi ana modül tasarım ve prototipleme.', progressPercent: 10 },
  { id: 'tsk-020', name: 'API Entegrasyon Katmanı', projectId: 'prj-010', assigneeId: 'p-020', collaboratorIds: ['p-022', 'p-084'], status: 'Yapılıyor', startDate: '15.05.2026', endDate: '30.06.2026', remainingDays: 56, subTaskCount: 1, fileCount: 2, messageCount: 3, riskCount: 0, priority: 'Orta', department: 'Yazılım', description: 'Lojistik takip sistemi için REST API entegrasyon katmanı.', progressPercent: 30 },
  { id: 'tsk-053', name: 'Barkod Okuma Modülü', projectId: 'prj-010', assigneeId: 'p-086', collaboratorIds: ['p-084', 'p-087'], status: 'Plan', startDate: '01.06.2026', endDate: '31.07.2026', remainingDays: 87, subTaskCount: 1, fileCount: 0, messageCount: 1, riskCount: 0, priority: 'Orta', department: 'Lojistik', description: 'Depo barkod okuma ve stok takip modülü entegrasyonu.', progressPercent: 0 },
  { id: 'tsk-054', name: 'Raporlama Altyapısı', projectId: 'prj-010', assigneeId: 'p-090', collaboratorIds: ['p-084', 'p-020'], status: 'Plan', startDate: '15.06.2026', endDate: '31.08.2026', remainingDays: 117, subTaskCount: 2, fileCount: 0, messageCount: 0, riskCount: 0, priority: 'Düşük', department: 'Lojistik', description: 'Lojistik takip sistemi raporlama ve analitik altyapısı.', progressPercent: 0 },
];

export const RISKS: Risk[] = [
  { id: 'rsk-001', title: 'Enerji Sapma Riski', projectId: 'prj-002', taskId: 'tsk-010', assigneeId: 'p-005', date: '22.05.2026', status: 'Açık', description: 'Enerji izleme sisteminde ölçüm sapması %3.2\'yi aşıyor, kalibrasyon gerekiyor.', fileCount: 2 },
  { id: 'rsk-002', title: 'PCB Stok Sıkıntısı', projectId: 'prj-001', taskId: 'tsk-012', assigneeId: 'p-003', date: '01.05.2026', status: 'Riskli', description: 'T9 PLC için kritik IC bileşeni tedarikçide stok yok, 6 haftalık gecikme riski.', fileCount: 1 },
  { id: 'rsk-003', title: 'Plan Dışı Test Açıklaması', projectId: 'prj-003', taskId: 'tsk-013', assigneeId: 'p-017', date: '30.04.2026', status: 'Çözüm Aranıyor', description: 'SCADA yazılım patch sonrası beklenmedik test senaryoları ortaya çıktı.', fileCount: 0 },
  { id: 'rsk-004', title: 'Firmware Kritik Hata', projectId: 'prj-005', taskId: 'tsk-004', assigneeId: 'p-040', date: '15.04.2026', status: 'Kapatıldı', description: 'Donanım test firmware\'inde bellek sızıntısı tespit edildi ve giderildi.', fileCount: 3 },
  { id: 'rsk-005', title: 'Mobil Uygulama GPS Hatası', projectId: 'prj-004', taskId: 'tsk-005', assigneeId: 'p-019', date: '02.05.2026', status: 'Açık', description: 'Saha mobile GPS koordinat tutarsızlığı, offline modda veri kaybı riski.', fileCount: 2 },
  { id: 'rsk-006', title: 'Termal Yönetim Sapması', projectId: 'prj-006', taskId: 'tsk-008', assigneeId: 'p-031', date: '28.04.2026', status: 'Açık', description: 'Termal simülasyon sonuçları teorik değerden %8 sapıyor, model revizyonu gerekli.', fileCount: 1 },
  { id: 'rsk-007', title: 'SCADA Güvenlik Açığı', projectId: 'prj-003', taskId: 'tsk-018', assigneeId: 'p-029', date: '25.04.2026', status: 'Riskli', description: 'Güvenlik protokolü güncellenmesi gecikince mevcut erişim açıkları devam ediyor.', fileCount: 2 },
  { id: 'rsk-008', title: 'Tedarik Zinciri Gecikmesi', projectId: 'prj-007', taskId: 'tsk-009', assigneeId: 'p-055', date: '10.05.2026', status: 'Açık', description: 'IoT Gateway modülleri için yurt dışı tedarikçi teslimat tarihi belirsiz.', fileCount: 0 },
];

// ─── ACTIVITY LOGS — rich, collaborative, with progressDelta ─────────────────
export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'log-001', date: '20 Nisan 2026', action: 'Görev Güncellendi', userId: 'p-018', projectId: 'prj-002', detail: 'Modbus RTU katmanı yazıldı, CRC doğrulaması eklendi', result: '+15%', progressDelta: '+15%' },
  { id: 'log-002', date: '18 Nisan 2026', action: 'Görev Güncellendi', userId: 'p-020', projectId: 'prj-002', detail: 'Bootloader OTA desteği geldi', result: '+10%', progressDelta: '+10%' },
  { id: 'log-003', date: '15 Nisan 2026', action: 'Görev Güncellendi', userId: 'p-018', projectId: 'prj-002', detail: 'RTOS task önceliklendirmesi yeniden tasarlandı', result: '+8%', progressDelta: '+8%' },
  { id: 'log-004', date: '05.05.2026 14:18', action: 'Görev Güncellendi', userId: 'p-031', projectId: 'prj-008', detail: 'PCB Rev4 Layout — Durum: Plan → Yapılıyor', result: 'Başarılı' },
  { id: 'log-005', date: '05.05.2026 13:45', action: 'Dosya Eklendi', userId: 'p-039', projectId: 'prj-002', detail: 'test_termal_may_v3.pdf yüklendi — Termal Simülasyon görevine', result: 'Başarılı' },
  { id: 'log-006', date: '05.05.2026 12:30', action: 'Risk Açıldı', userId: 'p-017', projectId: 'prj-003', detail: 'Plan Dışı Test Açıklaması riski oluşturuldu', result: 'Açık' },
  { id: 'log-007', date: '05.05.2026 11:15', action: 'Görev Tamamlandı', userId: 'p-040', projectId: 'prj-005', detail: 'Test Raporu Donanım — Tamamlandı olarak işaretlendi', result: 'Tamamlandı' },
  { id: 'log-008', date: '05.05.2026 10:02', action: 'Mesaj Gönderildi', userId: 'p-002', projectId: 'prj-001', detail: 'Ahmet → Burak: "PCB stok durumu kritik, tedarikçi görüşmesi lazım"', result: 'İletildi' },
  { id: 'log-009', date: '04.05.2026 17:30', action: 'Görev Eklendi', userId: 'p-018', projectId: 'prj-003', detail: 'SCADA Arayüz Tasarımı — Plan Dışı görev oluşturuldu', result: 'Plan Dışı' },
  { id: 'log-010', date: '04.05.2026 16:45', action: 'Risk Güncellendi', userId: 'p-005', projectId: 'prj-002', detail: 'Enerji Sapma Riski — Açık durumuna alındı, kalibrasyon ekibi atandı', result: 'Güncellendi' },
  { id: 'log-011', date: '04.05.2026 15:20', action: 'Dosya Eklendi', userId: 'p-019', projectId: 'prj-004', detail: 'hmi_debug_log_v2.zip yüklendi — Mobil App Hata Ayıklama görevine', result: 'Başarılı' },
  { id: 'log-012', date: '04.05.2026 14:00', action: 'Görev Gecikti', userId: 'p-029', projectId: 'prj-003', detail: 'Güvenlik Protokolü Güncelleme — Gecikmiş statüsüne düştü', result: 'Gecikmiş' },
  { id: 'log-013', date: '04.05.2026 11:30', action: 'Görev Güncellendi', userId: 'p-055', projectId: 'prj-007', detail: 'IoT Protokol Entegrasyonu — Öncelik Yüksek\'e çıkarıldı', result: 'Güncellendi' },
  { id: 'log-014', date: '03.05.2026 16:20', action: 'Görev Tamamlandı', userId: 'p-002', projectId: 'prj-008', detail: 'Şematik Tasarım Rev4 — Tamamlandı, onay alındı', result: 'Tamamlandı' },
  { id: 'log-015', date: '03.05.2026 14:10', action: 'Mesaj Gönderildi', userId: 'p-049', projectId: 'prj-007', detail: 'Burak → Uğur: "PLC konfigürasyon parametreleri güncellendi"', result: 'İletildi' },
  { id: 'log-016', date: '03.05.2026 11:00', action: 'Risk Güncellendi', userId: 'p-019', projectId: 'prj-004', detail: 'Mobil Uygulama GPS Hatası — Çözüm Aranıyor → Açık', result: 'Güncellendi' },
  { id: 'log-017', date: '02.05.2026 17:45', action: 'Görev Güncellendi', userId: 'p-021', projectId: 'prj-004', detail: 'Offline Senkronizasyon — %45 ilerleme kaydedildi', result: '+12%', progressDelta: '+12%' },
  { id: 'log-018', date: '02.05.2026 15:30', action: 'Dosya Eklendi', userId: 'p-031', projectId: 'prj-006', detail: 'termal_model_rev2_final.stp yüklendi — 3D Mekanik Model görevine', result: 'Başarılı' },
  { id: 'log-019', date: '02.05.2026 13:15', action: 'Görev Güncellendi', userId: 'p-034', projectId: 'prj-006', detail: 'Soğutma Kanalı Optimizasyonu — CFD simülasyonu tamamlandı', result: '+18%', progressDelta: '+18%' },
  { id: 'log-020', date: '01.05.2026 16:00', action: 'Görev Eklendi', userId: 'p-084', projectId: 'prj-010', detail: 'Barkod Okuma Modülü — Yeni görev oluşturuldu', result: 'Plan' },
];

export const MONTHLY_WORKLOAD = [
  { ay: 'Oca', plan: 68, yapiliyor: 45, tamamlandi: 52, gecikme: 3 },
  { ay: 'Şub', plan: 82, yapiliyor: 61, tamamlandi: 71, gecikme: 5 },
  { ay: 'Mar', plan: 120, yapiliyor: 98, tamamlandi: 88, gecikme: 8 },
  { ay: 'Nis', plan: 145, yapiliyor: 132, tamamlandi: 97, gecikme: 12 },
  { ay: 'May', plan: 138, yapiliyor: 141, tamamlandi: 82, gecikme: 15 },
  { ay: 'Haz', plan: 162, yapiliyor: 158, tamamlandi: 61, gecikme: 18 },
  { ay: 'Tem', plan: 175, yapiliyor: 170, tamamlandi: 44, gecikme: 22 },
  { ay: 'Ağu', plan: 148, yapiliyor: 130, tamamlandi: 38, gecikme: 14 },
  { ay: 'Eyl', plan: 132, yapiliyor: 110, tamamlandi: 30, gecikme: 9 },
  { ay: 'Eki', plan: 115, yapiliyor: 88, tamamlandi: 22, gecikme: 6 },
  { ay: 'Kas', plan: 95, yapiliyor: 60, tamamlandi: 15, gecikme: 4 },
  { ay: 'Ara', plan: 72, yapiliyor: 35, tamamlandi: 8, gecikme: 2 },
];

export const DEPT_TASK_DISTRIBUTION = [
  { name: 'Elektronik', value: 218, color: '#3b7dd8' },
  { name: 'Yazılım', value: 195, color: '#8b5cf6' },
  { name: 'Test', value: 142, color: '#f97316' },
  { name: 'Mekanik', value: 98, color: '#22c55e' },
  { name: 'Otomasyon', value: 112, color: '#06b6d4' },
  { name: 'Donanım', value: 87, color: '#eab308' },
  { name: 'Saha', value: 76, color: '#ec4899' },
  { name: 'Ürün', value: 64, color: '#a78bfa' },
  { name: 'Lojistik', value: 52, color: '#fb923c' },
  { name: 'Destek', value: 38, color: '#94a3b8' },
];