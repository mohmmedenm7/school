import React, { useState } from 'react';
import { roleNamesAr } from '../../components/ClerkWrapper';

const initialUsers = [
  { id: '1', name: 'أحمد خالد', email: 'student@stemschool.sd', role: 'student', regDate: '2026-06-10' },
  { id: '2', name: 'الطيب خالد', email: 'parent@stemschool.sd', role: 'parent', regDate: '2026-06-11' },
  { id: '3', name: 'سارة عوض', email: 'courses@stemschool.sd', role: 'course_manager', regDate: '2026-05-15' },
  { id: '4', name: 'علي الريح', email: 'analytics@stemschool.sd', role: 'analytics_manager', regDate: '2026-05-20' },
  { id: '5', name: 'منى الصادق', email: 'teacher1@stemschool.sd', role: 'student', regDate: '2026-06-14' },
  { id: '6', name: 'خالد عبد الرحمن', email: 'parent2@stemschool.sd', role: 'parent', regDate: '2026-06-12' }
];

const initialLogs = [
  { time: '15:20', type: 'system', msg: 'بدء تشغيل مشغل Mux بنجاح وتحميل مفاتيح الاتصال.' },
  { time: '14:50', type: 'user', msg: 'قام مدير التحليل (علي الريح) بتصدير تقرير نسبة التخزين المؤقت.' },
  { time: '14:32', type: 'course', msg: 'أضاف مدير الكورسات (سارة عوض) درساً جديداً إلى رياضيات ثالث ثانوي.' },
  { time: '13:10', type: 'auth', msg: 'سجل المستخدم الطيب خالد الدخول من مدينة أم درمان.' },
  { time: '12:05', type: 'system', msg: 'اكتمال فحص أداء الخادم (معدل الاستجابة 85ms).' }
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setEditingUserId(null);
    
    // Add log entry
    const changedUser = users.find(u => u.id === userId);
    const newLog = {
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      type: 'auth',
      msg: `تم تغيير دور المستخدم (${changedUser.name}) إلى [${roleNamesAr[newRole]}].`
    };
    setLogs([newLog, ...logs]);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-content" dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(20, 24, 33, 0.8) 100%)', border: '1px solid rgba(255, 71, 87, 0.2)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>لوحة تحكم المدير العام</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>مرحباً بك أستاذ محمد. لديك الصلاحيات الكاملة لإدارة المستخدمين، ومراقبة الكورسات، ومتابعة الأداء العام لمنصة stemschool.</p>
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel stat-card" style={{ padding: '1.25rem', position: 'relative' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>إجمالي الطلاب المسجلين</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.5rem 0', color: 'var(--info)' }}>14,230</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>▲ +12% هذا الشهر</span>
        </div>
        
        <div className="glass-panel stat-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>إجمالي أولياء الأمور</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.5rem 0', color: 'var(--success)' }}>11,890</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>معدل تفاعل 84% اليوم</span>
        </div>

        <div className="glass-panel stat-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>إجمالي الكورسات المتاحة</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.5rem 0', color: 'var(--warning)' }}>28 كورس</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>موزعة على 3 مراحل</span>
        </div>

        <div className="glass-panel stat-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>معدل المشاهدة الكلي</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', margin: '0.5rem 0', color: 'var(--color-primary)' }}>342.8K س</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>▲ استهلاك خادم مستقر</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        
        {/* User Management */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>إدارة مستخدمي النظام</h3>
            <input 
              type="text" 
              placeholder="بحث بالاسم أو البريد..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '0.4rem 0.8rem',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none',
                width: '200px'
              }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>الاسم</th>
                  <th style={{ padding: '0.75rem' }}>البريد الإلكتروني</th>
                  <th style={{ padding: '0.75rem' }}>الدور الحالي</th>
                  <th style={{ padding: '0.75rem' }}>تاريخ التسجيل</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>العمليات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', verticalAlign: 'middle' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>{user.name}</td>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>{user.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingUserId === user.id ? (
                        <select 
                          defaultValue={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-main)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '4px',
                            padding: '0.2rem 0.4rem',
                            outline: 'none'
                          }}
                        >
                          {Object.keys(roleNamesAr).map(r => (
                            <option key={r} value={r}>{roleNamesAr[r]}</option>
                          ))}
                        </select>
                      ) : (
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: user.role === 'admin' ? 'rgba(255, 71, 87, 0.15)' : 
                                      user.role === 'course_manager' ? 'rgba(255, 165, 2, 0.15)' :
                                      user.role === 'analytics_manager' ? 'rgba(0, 210, 211, 0.15)' :
                                      user.role === 'parent' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(30, 144, 255, 0.15)',
                          color: user.role === 'admin' ? 'var(--color-primary)' : 
                                 user.role === 'course_manager' ? 'var(--warning)' :
                                 user.role === 'analytics_manager' ? 'var(--color-secondary)' :
                                 user.role === 'parent' ? 'var(--success)' : 'var(--info)'
                        }}>
                          {roleNamesAr[user.role]}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{user.regDate}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      {editingUserId === user.id ? (
                        <button 
                          onClick={() => setEditingUserId(null)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          إلغاء
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditingUserId(user.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--color-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          تعديل الصلاحية
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar logs & status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Server System Status */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>حالة النظام والخادم</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span>استهلاك المعالج (CPU):</span>
                  <span style={{ color: 'var(--success)' }}>24%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', background: 'var(--success)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span>استهلاك الذاكرة (RAM):</span>
                  <span style={{ color: 'var(--warning)' }}>58%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '58%', height: '100%', background: 'var(--warning)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span>استقرار الاتصال بـ Mux:</span>
                  <span style={{ color: 'var(--success)' }}>99.98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent System Activity Logs */}
          <div className="glass-panel" style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>سجل الأحداث المباشر</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto', fontSize: '0.75rem' }}>
              {logs.map((log, index) => (
                <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.15rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>[{log.time}]</span>
                    <span style={{ 
                      fontWeight: '700',
                      color: log.type === 'system' ? 'var(--info)' : 
                             log.type === 'auth' ? 'var(--color-primary)' : 
                             log.type === 'course' ? 'var(--warning)' : 'var(--color-secondary)'
                    }}>
                      {log.type.toUpperCase()}:
                    </span>
                  </div>
                  <p style={{ color: '#dcdde1', lineHeight: '1.4' }}>{log.msg}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
