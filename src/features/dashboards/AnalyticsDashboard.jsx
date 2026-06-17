import React from 'react';

const stateViewers = [
  { state: 'ولاية الخرطوم (بما فيها أم درمان وبحري)', count: 9630, percentage: 48 },
  { state: 'ولاية الجزيرة (ود مدني)', count: 4210, percentage: 21 },
  { state: 'ولاية البحر الأحمر (بورتسودان)', count: 2890, percentage: 14 },
  { state: 'ولاية كسلا', count: 1840, percentage: 9 },
  { state: 'ولاية القضارف', count: 1630, percentage: 8 }
];

export default function AnalyticsDashboard() {
  return (
    <div className="dashboard-content" dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(0, 210, 211, 0.1) 0%, rgba(20, 24, 33, 0.8) 100%)', border: '1px solid rgba(0, 210, 211, 0.2)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>لوحة تحليلات البث والأداء المباشر</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>مرحباً بك أستاذ علي. يتم تجميع هذه البيانات مباشرة من Mux Data لتتبع جودة المشاهدة واستقرار البث للطلاب في جميع أنحاء السودان.</p>
      </div>

      {/* Mux Health Cards */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>مؤشرات جودة البث (Mux QoE Metrics)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>نسبة التخزين المؤقت (Rebuffer Rate)</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.25rem 0', color: 'var(--success)' }}>0.38%</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>ممتاز (أقل من الحد الأقصى 0.5%)</span>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
              <div style={{ width: '38%', height: '100%', background: 'var(--success)' }}></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>زمن بدء التشغيل (Startup Time)</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.25rem 0', color: 'var(--success)' }}>1.14 ثانية</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>تحميل فوري عبر مشغلات HLS</span>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
              <div style={{ width: '42%', height: '100%', background: 'var(--success)' }}></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>فشل تشغيل الفيديوهات</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.25rem 0', color: 'var(--success)' }}>0.02%</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>معدل خطأ شبه منعدم</span>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
              <div style={{ width: '2%', height: '100%', background: 'var(--success)' }}></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>درجة جودة الفيديو (Video Quality Score)</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.25rem 0', color: 'var(--color-secondary)' }}>98.4 / 100</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>بدقة عالية التكيف (Adaptive ABR)</span>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
              <div style={{ width: '98%', height: '100%', background: 'var(--color-secondary)' }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Sudan Map Analytics and Hourly Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* Sudan State Viewers */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>المشاهدات النشطة حسب الولايات السودانية</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {stateViewers.map((state, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: '600' }}>{state.state}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{state.count} طالب نشط ({state.percentage}%)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${state.percentage}%`, 
                    height: '100%', 
                    background: idx === 0 ? 'linear-gradient(90deg, var(--color-primary), #ff6b81)' : 
                                idx === 1 ? 'linear-gradient(90deg, var(--color-secondary), #54e4e5)' :
                                'linear-gradient(90deg, var(--warning), #ffbe76)'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CDN load and Engagement Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* CDN Performance */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>توزيع حمل شبكات تسليم المحتوى (CDN Load)</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>شبكة Fastly (الرئيسية لـ Mux):</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>68%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>شبكة Cloudflare:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-secondary)' }}>22%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>شبكة Akamai:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--warning)' }}>10%</span>
                </div>
              </div>

              {/* Pie/Donut Chart Simulation CSS */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'conic-gradient(var(--color-primary) 0% 68%, var(--color-secondary) 68% 90%, var(--warning) 90% 100%)',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                flexShrink: 0
              }}></div>
            </div>
          </div>

          {/* Engagement chart */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>ساعات مشاهدة الطلاب خلال اليوم (الذروة)</h4>
            
            {/* Visual CSS Chart Bar graph */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px', padding: '0.5rem 0', gap: '0.5rem' }}>
              {[15, 30, 45, 85, 95, 75, 40, 20].map((h, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, gap: '0.25rem' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${h}px`, 
                    background: 'var(--color-secondary)',
                    borderRadius: '3px 3px 0 0',
                    opacity: 0.7 + (h/200),
                    transition: 'height 0.3s'
                  }}></div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{i*3}:00</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
