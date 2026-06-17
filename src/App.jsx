import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router';
import { useAuth, UserButton, SignIn, roleNamesAr } from './components/ClerkWrapper';
import LevelSelector from './features/courses/components/LevelSelector';
import SubjectGrid from './features/courses/components/SubjectGrid';
import CourseDetail from './features/courses/components/CourseDetail';
import LessonPlayer from './features/courses/components/LessonPlayer';

// Import Dashboards
import AdminDashboard from './features/dashboards/AdminDashboard';
import CourseManagerDashboard from './features/dashboards/CourseManagerDashboard';
import AnalyticsDashboard from './features/dashboards/AnalyticsDashboard';
import ParentDashboard from './features/dashboards/ParentDashboard';

// Custom Redirector for Dashboard Home
function DashboardRedirector() {
  const { isSignedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login');
      return;
    }

    if (role === 'admin') {
      navigate('/dashboard/admin');
    } else if (role === 'course_manager') {
      navigate('/dashboard/course-manager');
    } else if (role === 'analytics_manager') {
      navigate('/dashboard/analytics');
    } else if (role === 'parent') {
      navigate('/dashboard/parent');
    } else {
      // Student or default role
      navigate('/');
    }
  }, [isSignedIn, role, navigate]);

  return (
    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
      <p>جاري تحويلك للوحة التحكم المناسبة لرتبتك...</p>
    </div>
  );
}

// Student Portal / Home component
function HomePortal() {
  const [selectedLevel, setSelectedLevel] = useState('secondary'); // Math third grade is secondary

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Welcome banner */}
      <div className="glass-panel" style={{ padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.08) 0%, rgba(0, 210, 211, 0.08) 100%)', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>مرحباً بك في منصة stemschool التعليمية</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          البوابة الذكية لطلاب الابتدائي، المتوسط والثانوي في السودان. تمتع ببث شروحات عالي الدقة وتقنيات رصد وتحليل المشاهدة المدعومة بـ Mux Video.
        </p>
      </div>

      {/* Stage Level Selector */}
      <LevelSelector selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />

      {/* Subject Grid for selected stage */}
      <SubjectGrid level={selectedLevel} />
    </div>
  );
}

// Route Guard for specific roles
function RoleGuard({ children, allowedRoles }) {
  const { isSignedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      alert(`عذراً، هذا القسم مخصص لـ (${allowedRoles.map(r => roleNamesAr[r]).join(' / ')}) فقط. تم إرجاعك للصفحة الرئيسية.`);
      navigate('/');
    }
  }, [isSignedIn, role, navigate]);

  if (!isSignedIn || (allowedRoles && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
}

export default function App() {
  const { isSignedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight active path in navbar
  const isPathActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo-area" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="3" ry="3" />
          </svg>
          <h1 style={{ fontSize: '1.4rem' }}>stemschool <span>السودان</span></h1>
        </div>

        {/* Global Nav Links */}
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{
              color: location.pathname === '/' ? 'var(--color-primary)' : 'var(--text-main)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              background: location.pathname === '/' ? 'rgba(255, 71, 87, 0.08)' : 'transparent'
            }}
          >
            المناهج الدراسية
          </Link>

          {isSignedIn && (
            <>
              {/* Conditional Nav links depending on user role */}
              {role === 'admin' && (
                <Link 
                  to="/dashboard/admin" 
                  style={{
                    color: isPathActive('/dashboard/admin') ? 'var(--color-primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    background: isPathActive('/dashboard/admin') ? 'rgba(255, 71, 87, 0.08)' : 'transparent'
                  }}
                >
                  لوحة المدير العام
                </Link>
              )}

              {role === 'course_manager' && (
                <Link 
                  to="/dashboard/course-manager" 
                  style={{
                    color: isPathActive('/dashboard/course-manager') ? 'var(--color-primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    background: isPathActive('/dashboard/course-manager') ? 'rgba(255, 71, 87, 0.08)' : 'transparent'
                  }}
                >
                  لوحة إدارة الكورسات
                </Link>
              )}

              {role === 'analytics_manager' && (
                <Link 
                  to="/dashboard/analytics" 
                  style={{
                    color: isPathActive('/dashboard/analytics') ? 'var(--color-primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    background: isPathActive('/dashboard/analytics') ? 'rgba(255, 71, 87, 0.08)' : 'transparent'
                  }}
                >
                  لوحة التحليلات
                </Link>
              )}

              {role === 'parent' && (
                <Link 
                  to="/dashboard/parent" 
                  style={{
                    color: isPathActive('/dashboard/parent') ? 'var(--color-primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    background: isPathActive('/dashboard/parent') ? 'rgba(255, 71, 87, 0.08)' : 'transparent'
                  }}
                >
                  بوابة ولي الأمر
                </Link>
              )}
            </>
          )}

          {!isSignedIn ? (
            <Link 
              to="/login" 
              className="btn-action"
              style={{
                textDecoration: 'none',
                fontSize: '0.85rem',
                padding: '0.4rem 1rem'
              }}
            >
              تسجيل الدخول
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link 
                to="/dashboard" 
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'underline'
                }}
              >
                لوحة التحكم
              </Link>
              <UserButton />
            </div>
          )}
        </nav>
      </header>

      {/* Main Workspace Router */}
      <main style={{ flexGrow: 1, padding: '1.5rem 0' }}>
        <Routes>
          <Route path="/" element={<LessonPlayer />} />
          <Route path="/login" element={<SignIn />} />
          
          {/* Dashboards Routing */}
          <Route path="/dashboard" element={<DashboardRedirector />} />
          
          <Route 
            path="/dashboard/admin" 
            element={
              <RoleGuard allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleGuard>
            } 
          />
          <Route 
            path="/dashboard/course-manager" 
            element={
              <RoleGuard allowedRoles={['course_manager']}>
                <CourseManagerDashboard />
              </RoleGuard>
            } 
          />
          <Route 
            path="/dashboard/analytics" 
            element={
              <RoleGuard allowedRoles={['analytics_manager']}>
                <AnalyticsDashboard />
              </RoleGuard>
            } 
          />
          <Route 
            path="/dashboard/parent" 
            element={
              <RoleGuard allowedRoles={['parent']}>
                <ParentDashboard />
              </RoleGuard>
            } 
          />

          {/* Courses & Players Routing */}
          <Route path="/courses/:courseId" element={<CourseDetailWrapper />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPlayer />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <p>stemschool السودان &copy; 2026. البث المدعوم بالكامل بتقنيات Mux Video و Mux Data.</p>
      </footer>
    </div>
  );
}

// Wrapper helper to fetch course by ID and render CourseDetail component
function CourseDetailWrapper() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const data = getCourseById(courseId);
    setCourse(data);
  }, [courseId]);

  return <CourseDetail course={course} />;
}
