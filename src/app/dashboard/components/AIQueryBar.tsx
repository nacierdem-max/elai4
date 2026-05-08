'use client';
import React, { useState } from 'react';
import { Zap, Send, X, Loader2 } from 'lucide-react';

const QUICK_QUERIES = [
  'Haziran\'da en çok iş yükü olan ilk 5 kişi?',
  'Enerji İzleme projesinde plan dışı işler?',
  'Hangi departmanda çakışan görev var?',
  'Son 60 günde kaç görev gecikti?',
];

const MOCK_RESPONSES: Record<string, string> = {
  "Haziran'da en çok iş yükü olan ilk 5 kişi?": '🔴 Temmuz kritik! Aytem Çelik (12 görev), Temen Yıldız (9), Ahmet Yılmaz (8), Melih Şahin (8), Elif Kaya (7) — Aytem ve Temen\'de görev çakışması tespit edildi. Bazı işlerin Ağustos\'a kaydırılması önerilir.',
  'Enerji İzleme projesinde plan dışı işler?': '⚠️ Enerji İzleme\'de 3 plan dışı görev: "Enerji Sapma Analizi" (Temen Yıldız, -4 gün gecikme), "Batarya Kalibrasyon" (Nesrin Tetik), "Ölçüm Sapma Testi" (Elif Kaya). Toplam etkilenen: 5 personel, 2 departman.',
  'Hangi departmanda çakışan görev var?': '📊 Elektronik: 4 çakışma (Mart-Mayıs), Yazılım: 6 çakışma (Haziran-Temmuz), Test: 3 çakışma (Nisan). En kritik: Yazılım departmanında Aytem Çelik ve Seda Arman üst üste 3 projede yer alıyor.',
  'Son 60 günde kaç görev gecikti?': '🔴 Son 60 günde 39 görev gecikti. Ortak neden: PCB stok sıkıntısı (12 görev), firmware hataları (8 görev), kaynak yetersizliği (11 görev), dış bağımlılık (8 görev). Önerim: Tedarik süreçlerini 2 hafta öne alın.',
};

export default function AIQueryBar() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (q: string) => {
    setQuery(q);
    setIsLoading(true);
    setResponse('');
    // BACKEND INTEGRATION POINT: POST /api/ai/query with { query, context: 'dashboard' }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResponse(MOCK_RESPONSES[q] || `"${q}" sorgusu için analiz tamamlandı. Detaylı rapor için Analytics sayfasına gidin.`);
    setIsLoading(false);
  };

  return (
    <div className="card-base p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-primary" />
        <span className="text-sm font-semibold text-foreground">AI Asistan</span>
        <span className="text-xs text-muted-foreground ml-1">— Doğal dilde Ar-Ge analizleri</span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Örn: Haziran\'da en çok iş yükü olan 5 kişi kim?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) handleQuery(query); }}
            className="input-base pr-10 text-sm"
          />
          {query && (
            <button onClick={() => { setQuery(''); setResponse(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => query.trim() && handleQuery(query)}
          disabled={isLoading || !query.trim()}
          className="btn-primary flex items-center gap-2 px-4 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {isLoading ? 'Analiz...' : 'Sorgula'}
        </button>
      </div>

      {/* Quick queries */}
      <div className="flex flex-wrap gap-2 mt-3">
        {QUICK_QUERIES.map((q) => (
          <button
            key={`qquery-${q.slice(0, 20)}`}
            onClick={() => handleQuery(q)}
            className="text-xs bg-muted hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 text-muted-foreground px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Response */}
      {(isLoading || response) && (
        <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 animate-fade-in">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin text-primary" />
              Veri analiz ediliyor...
            </div>
          ) : (
            <p className="text-sm text-foreground leading-relaxed">{response}</p>
          )}
        </div>
      )}
    </div>
  );
}