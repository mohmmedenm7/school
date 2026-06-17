import React, { useState } from 'react';

const initialChildren = [
  {
    id: 'child_1',
    name: 'أحمد الطيب',
    grade: 'الصف الثالث ثانوي',
    avatar: '👨‍🎓',
    courses: [
      { id: 'secondary-math-3', name: 'رياضيات - الصف الثالث ثانوي', completed: 3, total: 6, lastWatch: 'الدرس الثالث: القيم القصوى ونقاط الانعطاف', lastDate: 'منذ ١٠ دقائق' },
      { id: 'secondary-physics-1', name: 'فيزياء - الصف الأول ثانوي', completed: 3, total: 4, lastWatch: 'قوانين نيوتن للحركة', lastDate: 'أمس' }
    ],
    weeklyStudyHours: [
      { day: 'السبت', minutes: 120 },
      { day: 'الأحد', minutes: 90 },
      { day: 'الإثنين', minutes: 150 },
      { day: 'الثلاثاء', minutes: 180 },
      { day: 'الأربعاء', minutes: 45 }
    ],
    teacherNotes: [
      { teacher: 'أ. أحمد البشير (رياضيات)', note: 'أحمد يبدي فهماً ممتازاً لمفاهيم التفاضل. أرجو منه مراجعة تمارين المصفوفات المتبقية في الباب الأول لتثبيت الفكرة.', date: '2026-06-15' },
      { teacher: 'أ. عاصم مصطفى (فيزياء)', note: 'متميز وملتزم بحضور حصص البث المباشر. استمر في هذا العطاء يا بطل.', date: '2026-06-12' }
    ]
  },
  {
    id: 'child_2',
    name: 'سارة الطيب',
    grade: 'الصف الأول متوسط',
    avatar: '👩‍🎓',
    courses: [
      { id: 'middle-math-1', name: 'رياضيات - الصف الأول متوسط', completed: 1, total: 4, lastWatch: 'المتغيرات والتعابير الجبرية', lastDate: 'منذ يومين' },
      { id: 'middle-science-1', name: 'علوم - الصف الأول متوسط', completed: 3, total: 3, lastWatch: 'القوة والحركة', lastDate: 'الأسبوع الماضي' }
    ],
    weeklyStudyHours: [
      { day: 'السبت', minutes: 60 },
      { day: 'الأحد', minutes: 45 },
      { day: 'الإثنين', minutes: 80 },
      { day: 'الثلاثاء', minutes: 110 },
      { day: 'الأربعاء', minutes: 30 }
    ],
    teacherNotes: [
      { teacher: 'أ. منى الصادق (علوم)', note: 'سارة أكملت جميع دروس وحدة القوة والحركة بنجاح ونالت درجة كاملة في الاختبار القصير.', date: '2026-06-14' }
    ]
  }
];

export default function ParentDashboard() {
  const [children, setChildren] = useState(initialChildren);
  const [selectedChildId, setSelectedChildId] = useState('child_1');

  const selectedChild = children.find(c => c.id === selectedChildId);

  return (
    <div className="dashboard-content" dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, rgba(20, 24, 33, 0.8) 100%)', border: '1px solid rgba(46, 213, 115, 0.2)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>بوابة ولي أمر الطالب</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>مرحباً بك أستاذ الطيب. يمكنك متابعة التحصيل الدراسي لأبنائك، ومراجعة الدروس التي شاهدوها، والاطلاع على ملاحظات معلميهم.</p>
      </div>

      {/* Children Selectors */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {children.map(child => {
          const isActive = child.id === selectedChildId;
          return (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                flexGrow: 1,
                border: isActive ? '1px solid var(--success)' : '1px solid var(--glass-border)',
                background: isActive ? 'rgba(46, 213, 115, 0.08)' : 'var(--glass-bg)',
                transition: 'var(--transition-smooth)',
                color: 'var(--text-main)',
                textAlign: 'right'
              }}
            >
              <span style={{ fontSize: '2rem' }}>{child.avatar}</span>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{child.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{child.grade}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Child Progress */}
      {selectedChild && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
          
          {/* Courses & Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Courses Progress list */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>متابعة المقررات الدراسية ({selectedChild.name})</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {selectedChild.courses.map(course => {
                  const progressPercentage = Math.round((course.completed / course.total) * 100);
                  
                  return (
                    <div key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <h4 style={{ fontWeight: '700', fontSize: '0.95rem' }}>{course.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: '600' }}>{progressPercentage}% مكتمل</span>
                      </div>

                      {/* Progress bar */}
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'var(--success)' }}></div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>منجز: {course.completed} من أصل {course.total} دروس</span>
                        <span>آخر مشاهدة: <strong style={{ color: 'var(--text-main)' }}>{course.lastWatch}</strong> ({course.lastDate})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Teacher Notes list */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>ملاحظات المعلمين وتوجيهاتهم</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedChild.teacherNotes.map((note, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-secondary)' }}>{note.teacher}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{note.date}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#dcdde1', lineHeight: '1.5' }}>"{note.note}"</p>
                  </div>
                ))}
                {selectedChild.teacherNotes.length === 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>لا توجد ملاحظات مسجلة حالياً.</span>
                )}
              </div>
            </div>

          </div>

          {/* Weekly study analytics & logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Weekly study hours chart */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>ساعات الدراسة هذا الأسبوع</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>مجموع الوقت المقضي في مشاهدة الشروحات التعليمية.</span>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', padding: '0.5rem 0', gap: '0.5rem' }}>
                {selectedChild.weeklyStudyHours.map((study, idx) => {
                  const height = Math.round((study.minutes / 200) * 100);
                  const hours = Math.floor(study.minutes / 60);
                  const mins = study.minutes % 60;
                  const timeStr = hours > 0 ? `${hours}س ${mins}د` : `${mins}د`;
                  
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: '500', color: 'var(--success)' }}>{timeStr}</span>
                      <div style={{ 
                        width: '100%', 
                        height: `${height}px`, 
                        background: 'linear-gradient(180deg, var(--success), rgba(46, 213, 115, 0.4))',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.3s'
                      }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{study.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>إجراءات سريعة لولي الأمر</h4>
              
              <button style={{
                background: 'rgba(30, 144, 255, 0.08)',
                border: '1px solid rgba(30, 144, 255, 0.2)',
                color: 'var(--info)',
                padding: '0.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                transition: 'var(--transition-smooth)'
              }}>
                ✉️ تواصل مع معلمي {selectedChild.name}
              </button>

              <button style={{
                background: 'rgba(255, 165, 2, 0.08)',
                border: '1px solid rgba(255, 165, 2, 0.2)',
                color: 'var(--warning)',
                padding: '0.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                transition: 'var(--transition-smooth)'
              }}>
                📄 تحميل الشهادة الشهرية (بي دي إف)
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
