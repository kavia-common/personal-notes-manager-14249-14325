/**
 * Utility to resolve API base URL from environment or default.
 * Uses browser location as fallback for same-origin API proxying.
 */
// PUBLIC_INTERFACE
export function getApiBase(): string {
  /** Returns the REST API base URL. */
  const envUrl = import.meta.env.PUBLIC_API_BASE as string | undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) return envUrl.replace(/\/+$/, '');
  // fallback to same origin /api
  if (typeof window !== 'undefined') {
    const { origin } = window.location;
    return `${origin}/api`;
  }
  // default for SSR context
  return 'http://localhost:8787/api';
}
