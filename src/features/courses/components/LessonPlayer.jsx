import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import Hls from 'hls.js';
import mux from 'mux-embed';
import { getLessonById, getCourseById } from '../../../data/curriculum';

export default function LessonPlayer() {
  const params = useParams();
  const courseId = params.courseId || 'secondary-math-3';
  const lessonId = params.lessonId || 'sm3-l1';
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isMuxMonitored, setIsMuxMonitored] = useState(false);
  const [userId, setUserId] = useState(() => localStorage.getItem('stemschool_mock_user') ? JSON.parse(localStorage.getItem('stemschool_mock_user')).email : 'student-default');
  const [completedLessons, setCompletedLessons] = useState(() => {
    const stored = localStorage.getItem('stemschool_completed_lessons');
    return stored ? JSON.parse(stored) : [];
  });

  // Load course and lesson
  useEffect(() => {
    const courseData = getCourseById(courseId);
    if (courseData) {
      setCourse(courseData);
      const lessonData = courseData.lessons.find(l => l.id === lessonId);
      if (lessonData) {
        setLesson(lessonData);
      } else if (courseData.lessons.length > 0) {
        // Fallback to first lesson
        setLesson(courseData.lessons[0]);
      }
    }
  }, [courseId, lessonId]);

  // Append logs
  const addLog = (tag, type, message) => {
    const timestamp = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      { timestamp, tag, type, message },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };

  // Video source loading & Mux initialization
  useEffect(() => {
    if (!videoRef.current || !lesson) return;
    
    const videoElement = videoRef.current;
    
    // 1. Setup Video Source
    if (lesson.isHLS) {
      addLog('PLAYER', 'info', `تحميل بث HLS من Mux: ${lesson.videoUrl || `https://stream.mux.com/${lesson.playbackId}.m3u8`}`);
      
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hlsInstance = new Hls();
        hlsRef.current = hlsInstance;
        hlsInstance.attachMedia(videoElement);
        hlsInstance.loadSource(lesson.videoUrl || `https://stream.mux.com/${lesson.playbackId}.m3u8`);
        addLog('HLS.JS', 'success', 'تم إنشاء وضبط محرك HLS.js بنجاح');
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari
        videoElement.src = lesson.videoUrl || `https://stream.mux.com/${lesson.playbackId}.m3u8`;
        addLog('PLAYER', 'info', 'استخدام مشغل Safari Native HLS المدمج');
      } else {
        addLog('PLAYER', 'error', 'المتصفح لا يدعم تشغيل بث HLS!');
      }
    } else {
      addLog('PLAYER', 'info', `تحميل فيديو MP4 مباشر: ${lesson.videoUrl}`);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
        addLog('HLS.JS', 'info', 'تم تحرير محرك HLS.js لتشغيل MP4');
      }
      videoElement.src = lesson.videoUrl;
    }

    // 2. Setup Mux Monitoring
    const MUX_ENV_KEY = import.meta.env.VITE_MUX_ENV_KEY || 'your_mux_env_key_here';
    const isPlaceholderKey = !import.meta.env.VITE_MUX_ENV_KEY || import.meta.env.VITE_MUX_ENV_KEY === 'your_mux_env_key_here';
    
    const playerInitTime = mux.utils.now();
    addLog('MONITOR', 'init', "تهيئة مراقبة Mux Data لمشغل الدروس...");

    const initialMetadata = {
      env_key: isPlaceholderKey ? 'ENV_KEY_NOT_SET' : MUX_ENV_KEY,
      viewer_user_id: userId,
      experiment_name: 'stemschool_player_v1',
      player_name: 'stemschool Course Player',
      player_version: '1.0.0',
      player_init_time: playerInitTime,
      video_id: lesson.id,
      video_title: lesson.title,
      video_series: course?.title || 'Sudanese Secondary Math',
      video_duration: lesson.durationMs || 60000,
      video_stream_type: lesson.durationMs ? 'on-demand' : 'live',
      video_cdn: 'Mux Video CDN'
    };

    const monitorOptions = {
      debug: true,
      data: initialMetadata
    };

    if (lesson.isHLS && hlsRef.current) {
      monitorOptions.hlsjs = hlsRef.current;
      monitorOptions.Hls = Hls;
    }

    if (!isMuxMonitored) {
      mux.monitor(videoElement, monitorOptions);
      setIsMuxMonitored(true);
      addLog('MONITOR', 'success', `مراقبة Mux المباشرة نشطة. معرف البيئة: ${initialMetadata.env_key}`);
    } else {
      // Emit videochange for subsequent source changes
      addLog('MUX EVENT', 'success', `إرسال حدث 'videochange' لمعرف الفيديو الجديد: ${lesson.id}`);
      mux.emit(videoElement, 'videochange', {
        video_id: lesson.id,
        video_title: lesson.title,
        video_series: course?.title,
        video_duration: lesson.durationMs || 60000,
        video_stream_type: 'on-demand',
        video_cdn: 'Mux Video CDN'
      });
    }

    // 3. Setup standard video event listeners to print to console
    const monitoredEvents = [
      { name: 'play', level: 'info', msg: 'بدء نية تشغيل الفيديو' },
      { name: 'playing', level: 'success', msg: 'الفيديو يبث الآن بسلاسة' },
      { name: 'pause', level: 'info', msg: 'إيقاف مؤقت' },
      { name: 'seeking', level: 'info', msg: 'جاري التقديم/التأخير في الشريط...' },
      { name: 'seeked', level: 'success', msg: 'اكتمال الانتقال للوقت الجديد' },
      { name: 'waiting', level: 'warning', msg: 'تخزين مؤقت (Buffering)...' },
      { name: 'error', level: 'error', msg: 'خطأ في تحميل مصدر الفيديو' }
    ];

    const handlers = monitoredEvents.map(evt => {
      const handler = () => {
        addLog('HTML5 EVENT', evt.level, `${evt.name.toUpperCase()}: ${evt.msg}`);
      };
      videoElement.addEventListener(evt.name, handler);
      return { name: evt.name, handler };
    });

    // Handle completed progress when video ends
    const handleEnded = () => {
      addLog('HTML5 EVENT', 'success', 'ENDED: اكتمل حضور الدرس بالكامل');
      if (!completedLessons.includes(lesson.id)) {
        const updated = [...completedLessons, lesson.id];
        setCompletedLessons(updated);
        localStorage.setItem('stemschool_completed_lessons', JSON.stringify(updated));
      }
    };
    videoElement.addEventListener('ended', handleEnded);

    // Clean up
    return () => {
      handlers.forEach(h => {
        videoElement.removeEventListener(h.name, h.handler);
      });
      videoElement.removeEventListener('ended', handleEnded);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [lesson, course]);

  if (!course || !lesson) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', dir: 'rtl' }}>
        <p>جاري تحميل مشغل الدروس...</p>
      </div>
    );
  }

  const handleLessonSwitch = (nextLessonId) => {
    navigate(`/course/${courseId}/lesson/${nextLessonId}`);
  };

  return (
    <div className="workspace" dir="rtl" style={{ margin: '1.5rem 0' }}>
      
      {/* Left Column: Player & Console */}
      <section className="left-column">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>الرئيسية</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-secondary)' }}>{course.title}</span>
        </div>

        {/* Video Player Box */}
        <div className="player-wrapper glass-panel">
          <div className="video-container">
            <video 
              ref={videoRef}
              controls 
              preload="metadata"
              crossorigin="anonymous"
              style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'block' }}
            >
              متصفحك لا يدعم مشغل الفيديو.
            </video>
          </div>
          
          <div className="video-details" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="details-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{lesson.title}</h2>
              <span className="category-tag" style={{ background: 'rgba(255, 71, 87, 0.12)', color: 'var(--color-primary)', border: '1px solid rgba(255, 71, 87, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '600' }}>
                {course.subject} • {course.grade}
              </span>
            </div>
            <p className="video-description" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              {lesson.description || 'لا يوجد وصف متاح لهذا الدرس حالياً.'}
            </p>
          </div>
        </div>

        {/* Live Mux Telemetry Console */}
        <div className="console-wrapper glass-panel">
          <div className="console-header" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--glass-border)', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="console-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg className="terminal-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-main)' }}>مشغل بث Mux Data: لوحة القياس الفورية</h3>
            </div>
            <button 
              onClick={() => setLogs([])}
              className="icon-btn" 
              title="Clear Logs"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
            >
              مسح السجلات
            </button>
          </div>
          <div className="console-body" style={{ height: '160px', overflowY: 'auto', padding: '1rem', background: '#07090d', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column' }}>
            {logs.map((log, index) => (
              <div key={index} className="log-entry" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', alignItems: 'flex-start', wordBreak: 'break-all' }}>
                <span className="log-time" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>[{log.timestamp}]</span>
                <span className={`log-tag ${log.type}`} style={{
                  padding: '0.05rem 0.3rem',
                  borderRadius: '3px',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                  background: log.type === 'success' || log.type === 'init' ? 'rgba(46, 213, 115, 0.15)' : 
                              log.type === 'warning' ? 'rgba(255, 165, 2, 0.15)' : 
                              log.type === 'error' ? 'rgba(255, 71, 87, 0.15)' : 'rgba(30, 144, 255, 0.15)',
                  color: log.type === 'success' || log.type === 'init' ? 'var(--success)' : 
                         log.type === 'warning' ? 'var(--warning)' : 
                         log.type === 'error' ? 'var(--color-primary)' : 'var(--info)'
                }}>
                  {log.tag}
                </span>
                <span className="log-message" style={{ color: '#dcdde1' }}>{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                في انتظار بدء التشغيل لتسجيل تقارير Mux telemetry...
              </span>
            )}
          </div>
        </div>

      </section>

      {/* Right Column: Lessons List */}
      <section className="right-column">
        <div className="playlist-wrapper glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header" style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700' }}>دروس المقرر الحالي</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.lessons.length} شروحات</span>
          </div>

          <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto' }}>
            {course.lessons.map((l) => {
              const isActive = l.id === lesson.id;
              const isCompleted = completedLessons.includes(l.id);

              return (
                <div
                  key={l.id}
                  onClick={() => handleLessonSwitch(l.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(255, 71, 87, 0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 71, 87, 0.25)' : '1px solid transparent',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {/* Thumbnail / Completion Badge */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: isCompleted ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isCompleted ? (
                      <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>✓</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{l.order}</span>
                    )}
                  </div>

                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h4 style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: isActive ? '700' : '500', 
                      color: isActive ? 'var(--color-primary)' : 'var(--text-main)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {l.title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{l.duration}</span>
                  </div>

                  {isActive && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
