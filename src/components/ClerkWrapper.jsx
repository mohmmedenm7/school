import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider as RealClerkProvider, SignedIn as RealSignedIn, SignedOut as RealSignedOut, UserButton as RealUserButton, useAuth as useRealAuth, useUser as useRealUser } from '@clerk/clerk-react';

// Check if a valid Clerk Publishable Key is provided in the environment
const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkEnabled = CLERK_PUB_KEY && CLERK_PUB_KEY.startsWith('pk_');

// Mock Auth Context for bypass/simulation mode
const MockAuthContext = createContext(null);

// Role translation to Arabic
export const roleNamesAr = {
  admin: 'مدير عام',
  course_manager: 'مدير الكورسات',
  analytics_manager: 'مدير التحليل',
  student: 'طالب',
  parent: 'ولي أمر'
};

const mockUsers = {
  admin: {
    id: 'usr_admin',
    firstName: 'محمد',
    lastName: 'عثمان',
    fullName: 'محمد عثمان',
    email: 'admin@stemschool.sd',
    role: 'admin'
  },
  course_manager: {
    id: 'usr_course',
    firstName: 'سارة',
    lastName: 'عوض',
    fullName: 'سارة عوض',
    email: 'courses@stemschool.sd',
    role: 'course_manager'
  },
  analytics_manager: {
    id: 'usr_analytics',
    firstName: 'علي',
    lastName: 'الريح',
    fullName: 'علي الريح',
    email: 'analytics@stemschool.sd',
    role: 'analytics_manager'
  },
  student: {
    id: 'usr_student',
    firstName: 'أحمد',
    lastName: 'خالد',
    fullName: 'أحمد خالد',
    email: 'student@stemschool.sd',
    role: 'student'
  },
  parent: {
    id: 'usr_parent',
    firstName: 'الطيب',
    lastName: 'خالد',
    fullName: 'الطيب خالد',
    email: 'parent@stemschool.sd',
    role: 'parent'
  }
};

export function MockAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load simulated session
    const storedUser = localStorage.getItem('stemschool_mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    const selectedUser = mockUsers[role] || mockUsers.student;
    localStorage.setItem('stemschool_mock_user', JSON.stringify(selectedUser));
    setUser(selectedUser);
  };

  const logout = () => {
    localStorage.removeItem('stemschool_mock_user');
    setUser(null);
  };

  return (
    <MockAuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </MockAuthContext.Provider>
  );
}

// Wrapper useAuth
export function useAuth() {
  if (isClerkEnabled) {
    try {
      const realAuth = useRealAuth();
      // Translate roles or map them
      return {
        ...realAuth,
        role: realAuth.sessionClaims?.metadata?.role || 'student'
      };
    } catch (e) {
      console.warn("Clerk hooks failed, fallback to mock auth:", e);
    }
  }

  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within MockAuthProvider');
  }

  return {
    isSignedIn: !!context.user,
    userId: context.user?.id || null,
    role: context.user?.role || 'student',
    signOut: context.logout
  };
}

// Wrapper useUser
export function useUser() {
  if (isClerkEnabled) {
    try {
      const realUser = useRealUser();
      return {
        ...realUser,
        role: realUser.user?.publicMetadata?.role || 'student'
      };
    } catch (e) {
      console.warn("Clerk hooks failed, fallback to mock auth:", e);
    }
  }

  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useUser must be used within MockAuthProvider');
  }

  return {
    isSignedIn: !!context.user,
    user: context.user ? {
      id: context.user.id,
      firstName: context.user.firstName,
      lastName: context.user.lastName,
      fullName: context.user.fullName,
      primaryEmailAddress: { emailAddress: context.user.email },
      publicMetadata: { role: context.user.role }
    } : null
  };
}

// Wrapper ClerkProvider
export function ClerkProvider({ children }) {
  if (isClerkEnabled) {
    return (
      <RealClerkProvider publishableKey={CLERK_PUB_KEY}>
        {children}
      </RealClerkProvider>
    );
  }

  return (
    <MockAuthProvider>
      {children}
    </MockAuthProvider>
  );
}

// Wrapper SignedIn
export function SignedIn({ children }) {
  const { isSignedIn } = useAuth();
  if (isClerkEnabled) {
    return <RealSignedIn>{children}</RealSignedIn>;
  }
  return isSignedIn ? <>{children}</> : null;
}

// Wrapper SignedOut
export function SignedOut({ children }) {
  const { isSignedIn } = useAuth();
  if (isClerkEnabled) {
    return <RealSignedOut>{children}</RealSignedOut>;
  }
  return !isSignedIn ? <>{children}</> : null;
}

// Interactive Mock User Menu / User Button
export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, signOut, role } = useAuth();
  const { user } = useUser();
  const context = useContext(MockAuthContext);

  if (isClerkEnabled) {
    return <RealUserButton afterSignOutUrl="/" />;
  }

  if (!isSignedIn || !user) return null;

  const handleRoleChange = (newRole) => {
    context.login(newRole);
    setIsOpen(false);
    // Refresh page to trigger dashboard redirect
    window.location.href = '/dashboard';
  };

  return (
    <div className="user-profile-menu" style={{ position: 'relative', zIndex: 1000 }} dir="rtl">
      <button 
        className="profile-btn glass-panel" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.8rem',
          borderRadius: '50px',
          border: '1px solid var(--glass-border)',
          background: 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          color: 'var(--text-main)'
        }}
      >
        <div 
          className="avatar"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          {user.firstName[0]}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.fullName}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)' }}>{roleNamesAr[role]}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="dropdown-menu glass-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            marginTop: '0.5rem',
            width: '240px',
            borderRadius: '12px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div style={{ padding: '0.25rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>حساب الموظف/الطالب</span>
            <div style={{ fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{user.primaryEmailAddress.emailAddress}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0.25rem 0.5rem' }}>تبديل الدور للتجربة:</span>
            {Object.keys(mockUsers).map((uRole) => (
              <button
                key={uRole}
                onClick={() => handleRoleChange(uRole)}
                style={{
                  background: role === uRole ? 'rgba(255, 71, 87, 0.15)' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: role === uRole ? 'var(--color-primary)' : 'var(--text-main)',
                  padding: '0.4rem 0.6rem',
                  textAlign: 'right',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{roleNamesAr[uRole]}</span>
                {role === uRole && <span style={{ fontSize: '0.75rem' }}>●</span>}
              </button>
            ))}
          </div>

          <button 
            onClick={signOut}
            style={{
              marginTop: '0.5rem',
              background: 'rgba(255, 71, 87, 0.1)',
              border: 'none',
              borderRadius: '6px',
              color: 'var(--color-primary)',
              padding: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.8rem'
            }}
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}

// Custom styled Sign In Screen
export function SignIn() {
  const navigate = useNavigate();
  const context = useContext(MockAuthContext);

  if (isClerkEnabled) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <RealUserButton />
      </div>
    );
  }

  const handleQuickLogin = (role) => {
    context.login(role);
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="signin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="signin-card glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
        <div className="logo-area" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '48px', height: '48px' }}>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="3" ry="3" />
          </svg>
          <h1 style={{ fontSize: '2rem' }}>stemschool <span>البوابة</span></h1>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>تسجيل الدخول للمنصة</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>مرحباً بك في منصة stemschool للتعليم المدرسي السوداني</p>
        </div>

        <div className="quick-login-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', textAlign: 'right', marginBottom: '0.25rem' }}>تسجيل دخول سريع للتجربة (اختر دورك):</span>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button className="btn-role-login" onClick={() => handleQuickLogin('student')} style={{ background: 'rgba(30, 144, 255, 0.08)', border: '1px solid rgba(30, 144, 255, 0.2)', color: 'var(--info)', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', transition: 'var(--transition-smooth)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>حساب طالب</span>
            </button>
            
            <button className="btn-role-login" onClick={() => handleQuickLogin('parent')} style={{ background: 'rgba(46, 213, 115, 0.08)', border: '1px solid rgba(46, 213, 115, 0.2)', color: 'var(--success)', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', transition: 'var(--transition-smooth)' }}>
              <span style={{ fontSize: '1.5rem' }}>👨‍👩‍👦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>ولي أمر الطالب</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
            <button className="btn-role-login" onClick={() => handleQuickLogin('admin')} style={{ background: 'rgba(255, 71, 87, 0.08)', border: '1px solid rgba(255, 71, 87, 0.2)', color: 'var(--color-primary)', padding: '0.6rem 0.25rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', transition: 'var(--transition-smooth)', fontSize: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>👔</span>
              <span style={{ fontWeight: '600' }}>مدير عام</span>
            </button>

            <button className="btn-role-login" onClick={() => handleQuickLogin('course_manager')} style={{ background: 'rgba(255, 165, 2, 0.08)', border: '1px solid rgba(255, 165, 2, 0.2)', color: 'var(--warning)', padding: '0.6rem 0.25rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', transition: 'var(--transition-smooth)', fontSize: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📚</span>
              <span style={{ fontWeight: '600' }}>مدير الكورسات</span>
            </button>

            <button className="btn-role-login" onClick={() => handleQuickLogin('analytics_manager')} style={{ background: 'rgba(0, 210, 211, 0.08)', border: '1px solid rgba(0, 210, 211, 0.2)', color: 'var(--color-secondary)', padding: '0.6rem 0.25rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', transition: 'var(--transition-smooth)', fontSize: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📊</span>
              <span style={{ fontWeight: '600' }}>مدير التحليل</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
          <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>أو تسجيل دخول يدوي</span>
          <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleQuickLogin('student'); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'right' }}>
          <div className="control-group">
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>البريد الإلكتروني:</label>
            <input type="email" placeholder="student@stemschool.sd" defaultValue="student@stemschool.sd" style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', fontSize: '0.85rem' }} required />
          </div>
          <div className="control-group">
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>كلمة المرور:</label>
            <input type="password" placeholder="••••••••" defaultValue="password123" style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', fontSize: '0.85rem' }} required />
          </div>
          <button type="submit" className="btn-action" style={{ width: '100%', padding: '0.6rem', marginTop: '0.5rem' }}>دخول كطالب</button>
        </form>
      </div>
    </div>
  );
}

// Custom styled Sign Up Screen
export function SignUp() {
  return <SignIn />; // Simplicity
}
