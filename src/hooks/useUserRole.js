import { useAuth } from '@clerk/clerk-react';

/**
 * Returns the current user's role from Clerk session claims.
 * Possible values: 'admin', 'course_manager', 'analytics_manager', 'student', 'parent'
 * Defaults to 'student' if no role is set.
 */
export function useUserRole() {
  const { sessionClaims } = useAuth();
  const role = sessionClaims?.metadata?.role || 'student';
  return role;
}
