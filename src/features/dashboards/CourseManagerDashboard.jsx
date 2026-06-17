import React, { useState } from 'react';
import { curriculum } from '../../data/curriculum';

export default function CourseManagerDashboard() {
  const [activeTab, setActiveTab] = useState('secondary');
  const [coursesList, setCoursesList] = useState(() => {
    // Collect all courses from data
    const list = [];
    Object.values(curriculum).forEach(level => {
      level.subjects.forEach(subject => {
        subject.courses.forEach(course => {
          list.push({
            ...course,
            level: level.id,
            levelName: level.name,
            subjectName: subject.name
          });
        });
      });
    });
    return list;
  });

  // Upload simulation state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedAsset, setUploadedAsset] = useState(null);

  // Add Lesson Form State
  const [selectedCourseId, setSelectedCourseId] = useState('secondary-math-3');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonPlaybackId, setLessonPlaybackId] = useState('');
  const [lessonDuration, setLessonDuration] = useState('15:00');
  const [lessonDesc, setLessonDesc] = useState('');

  const simulateUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('جاري الاتصال بـ Mux Direct Upload API...');
    setUploadedAsset(null);

    // Simulate direct upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress === 40) {
        setUploadStatus('جاري رفع الفيديو إلى خوادم Mux CDN...');
      } else if (progress === 80) {
        setUploadStatus('جاري معالجة الفيديو وترميزه لبث HLS...');
      } else if (progress === 100) {
        clearInterval(interval);
        setUploadStatus('جاهز! تم إنشاء معرف البث بنجاح.');
        setUploading(false);
        const mockPlaybackId = `mockMuxAsset_${Math.random().toString(36).substring(2, 12)}`;
        setUploadedAsset({
          filename: file.name,
          playbackId: mockPlaybackId,
          duration: '12:45'
        });
        // Auto fill form
        setLessonTitle(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
        setLessonPlaybackId(mockPlaybackId);
      }
    }, 400);
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!lessonTitle) return;

    // Add lesson to course locally
    const updated = coursesList.map(course => {
      if (course.id === selectedCourseId) {
        const nextOrder = course.lessons.length + 1;
        const newLesson = {
          id: `${course.id}-l${Date.now()}`,
          title: lessonTitle,
          playbackId: lessonPlaybackId,
          videoUrl: lessonPlaybackId ? `https://stream.mux.com/${lessonPlaybackId}.m3u8` : '',
          isHLS: true,
          duration: lessonDuration,
          description: lessonDesc || 'درس مضاف حديثاً بواسطة مدير الكورسات.',
          order: nextOrder
        };

        // Also update curriculum data in memory so other page routes see it
        course.lessons.push(newLesson);

        return {
          ...course,
          lessons: [...course.lessons, newLesson]
        };
      }
      return course;
    });

    setCoursesList(updated);
    
    // Reset form
    setLessonTitle('');
    setLessonPlaybackId('');
    setLessonDesc('');
    setUploadedAsset(null);
    alert('تمت إضافة الدرس بنجاح إلى المنهج!');
  };

  return (
    <div className="dashboard-content" dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(255, 165, 2, 0.1) 0%, rgba(20, 24, 33, 0.8) 100%)', border: '1px solid rgba(255, 165, 2, 0.2)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>لوحة تحكم مدير الكورسات</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>مرحباً بك أستاذة سارة. يمكنك رفع الفيديوهات التعليمية من خلال Mux، وربطها بالدروس، وإدارة المناهج للمراحل الثلاثة.</p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
        
        {/* Left Column: Curriculum and Courses Lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Courses List Tab View */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>مراجعة وإدارة الكورسات المدرسية</h3>
              
              {/* Stage selectors */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['primary', 'middle', 'secondary'].map(stage => (
                  <button
                    key={stage}
                    onClick={() => setActiveTab(stage)}
                    style={{
                      background: activeTab === stage ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: 'none',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: activeTab === stage ? 'bold' : 'normal'
                    }}
                  >
                    {stage === 'primary' ? 'الابتدائي' : stage === 'middle' ? 'المتوسط' : 'الثانوي'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {coursesList.filter(c => c.level === activeTab).map(course => (
                <div key={course.id} className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{course.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.subjectName} • {course.grade}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{course.description}</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', background: 'rgba(0,210,211,0.08)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '600' }}>
                      {course.lessons.length} درس
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        document.getElementById('add-lesson-form').scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      إضافة درس لهذا الكورس
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mux Video Asset Direct Uploader (Simulator) */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>رافعة الفيديو الذكية لـ Mux Video</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>قم برفع ملف الفيديو التعليمي هنا. ستقوم المنصة تلقائياً برفعه إلى Mux، وتهيئته لبث HLS عالي الجودة وتوليد معرف تشغيل فريد (Playback ID).</p>
            
            <div style={{
              border: '2px dashed var(--glass-border)',
              borderRadius: '8px',
              padding: '2rem 1rem',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {!uploading && !uploadedAsset ? (
                <>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div>
                    <label htmlFor="file-uploader" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                      اختر ملف الفيديو
                    </label>
                    <input id="file-uploader" type="file" accept="video/*" onChange={simulateUpload} style={{ display: 'none' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>صيغ الدعم: MP4, MOV, WebM (بحد أقصى 500 ميجا)</span>
                </>
              ) : uploading ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="spinner" style={{ width: '30px', height: '30px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{uploadProgress}% مكتمل</span>
                  <div style={{ width: '80%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 0.2s' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{uploadStatus}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--success)' }}>اكتمل الرفع بنجاح!</span>
                  <div style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '4px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '0.5rem 0' }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>اسم الملف:</span> {uploadedAsset.filename}</div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Mux Playback ID:</span> <code style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>{uploadedAsset.playbackId}</code></div>
                  </div>
                  <button 
                    onClick={() => setUploadedAsset(null)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    رفع ملف آخر
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Add Lesson Form */}
        <div id="add-lesson-form" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>إضافة درس جديد للمنهج</h3>
          
          <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}>
            <div className="control-group">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>اختر الكورس المستهدف:</label>
              <select 
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
              >
                {coursesList.map(c => (
                  <option key={c.id} value={c.id}>{c.title} ({c.levelName})</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>عنوان الدرس:</label>
              <input 
                type="text" 
                placeholder="مثال: الدرس السابع: الأعداد المركبة" 
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div className="control-group">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>معرف بث الفيديو (Mux Playback ID):</label>
              <input 
                type="text" 
                placeholder="معرّف Mux المكون من أحرف وأرقام" 
                value={lessonPlaybackId}
                onChange={(e) => setLessonPlaybackId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
            </div>

            <div className="control-group">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>مدة الفيديو:</label>
              <input 
                type="text" 
                placeholder="مثال: 15:40" 
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div className="control-group">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>وصف الدرس ومحاوره:</label>
              <textarea 
                rows="3"
                placeholder="اكتب خلاصة لما يحتويه درس الرياضيات أو العلوم هذا..." 
                value={lessonDesc}
                onChange={(e) => setLessonDesc(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" className="btn-action" style={{ width: '100%', padding: '0.6rem', marginTop: '0.5rem' }}>إدراج الدرس في المنهج</button>
          </form>
        </div>

      </div>

    </div>
  );
}
