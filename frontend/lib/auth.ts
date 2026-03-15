import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
}

export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUserFromToken(): { id: string; email: string; role: string; firstName: string; lastName: string } | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      id: decoded.sub ?? decoded.id ?? '',
      email: decoded.email ?? '',
      role: decoded.role ?? 'student',
      firstName: decoded.firstName ?? '',
      lastName: decoded.lastName ?? '',
    };
  } catch {
    return null;
  }
}

export function getUserRole(): string | null {
  const user = getUserFromToken();
  return user?.role ?? null;
}
