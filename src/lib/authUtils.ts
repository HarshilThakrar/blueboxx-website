import { UserRole } from "../context/AuthContext";

export const getActiveRoleFromUrl = (path: string): UserRole | 'public' => {
  if (path.startsWith('/admin') || path.startsWith('/super_admin')) return 'admin';
  if (path.startsWith('/student')) return 'student';
  if (path.startsWith('/expert')) return 'expert';
  if (path.startsWith('/company')) return 'company';
  if (path.startsWith('/college')) return 'college';
  if (path.startsWith('/intern') && !path.startsWith('/internships')) return 'intern';
  if (path.startsWith('/jobseeker')) return 'job-seeker';
  
  if (path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/signup')) return 'auth';
  
  return 'public';
};

export const getSessions = () => {
  if (typeof window === 'undefined') return {};
  const sessionsRaw = localStorage.getItem('blueboxx_sessions');
  if (sessionsRaw) {
    try {
      return JSON.parse(sessionsRaw);
    } catch (e) {
      return {};
    }
  }
  return {};
};

export const saveSession = (role: string, token: string, user: any) => {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions[role] = { token, user };
  localStorage.setItem('blueboxx_sessions', JSON.stringify(sessions));
};

export const clearSession = (role: string) => {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  if (sessions[role]) {
    delete sessions[role];
    localStorage.setItem('blueboxx_sessions', JSON.stringify(sessions));
  }
};

export const getActiveToken = (path?: string) => {
  if (typeof window === 'undefined') return null;
  const currentPath = path || window.location.pathname;
  const activeRole = getActiveRoleFromUrl(currentPath);
  const sessions = getSessions();

  if (activeRole !== 'public' && sessions[activeRole]) {
    return sessions[activeRole].token;
  }
  
  if (activeRole === 'auth') {
    return null; // Force auth pages to remain logged out so users can add/switch accounts
  }

  // For public routes, only pick consumer tokens. Do not auto-login admins on the public homepage.
  if (activeRole === 'public') {
    if (sessions['student']) return sessions['student'].token;
    if (sessions['job-seeker']) return sessions['job-seeker'].token;
    if (sessions['jobseeker']) return sessions['jobseeker'].token;
    return null;
  }

  return null;
};

export const migrateLegacyToken = () => {
  if (typeof window === 'undefined') return;
  const oldToken = localStorage.getItem('auth_token');
  const oldUserRaw = localStorage.getItem('blueboxx_user');
  
  if (oldToken && oldUserRaw) {
    try {
      const oldUser = JSON.parse(oldUserRaw);
      if (oldUser && oldUser.role) {
        saveSession(oldUser.role, oldToken, oldUser);
      }
    } catch (e) {}
  }
  
  // Always wipe legacy tokens to prevent global fallback poisoning
  localStorage.removeItem('auth_token');
  localStorage.removeItem('blueboxx_user');
};
