/**
 * Minimal API client for the Notes app.
 * Assumes backend exposes endpoints:
 *  - POST /auth/login {email, password} -> {token, user:{id,email,name}}
 *  - POST /auth/register {name,email,password} -> {token, user}
 *  - POST /auth/logout -> 204
 *  - GET /notes?query=&category=&tag= -> Note[]
 *  - POST /notes -> Note
 *  - GET /notes/:id -> Note
 *  - PUT /notes/:id -> Note
 *  - DELETE /notes/:id -> 204
 *  - GET /categories -> string[]
 */

import { getApiBase } from '../utils/env';

export type User = { id: string; email: string; name?: string | null };
export type AuthResponse = { token: string; user: User };
export type Note = {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  updatedAt: string;
  createdAt: string;
};

type FetchOpts = {
  method?: string;
  token?: string | null;
  body?: unknown;
};

async function request<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const base = getApiBase();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = opts.token ?? getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${base}${path}`, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (res.status === 204) return undefined as unknown as T;
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

// PUBLIC_INTERFACE
export function saveToken(token: string | null) {
  /** Persist or clear the auth token in localStorage. */
  if (typeof localStorage === 'undefined') return;
  try {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  } catch {
    // Swallow storage exceptions (e.g., privacy mode); proceed without persistence
  }
}

// PUBLIC_INTERFACE
export function getToken(): string | null {
  /** Read the auth token from localStorage. */
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('token');
}

// PUBLIC_INTERFACE
export async function login(email: string, password: string) {
  /** Perform login and persist token. */
  const data = await request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password }, token: null });
  saveToken(data.token);
  return data;
}

// PUBLIC_INTERFACE
export async function register(name: string, email: string, password: string) {
  /** Perform registration and persist token. */
  const data = await request<AuthResponse>('/auth/register', { method: 'POST', body: { name, email, password }, token: null });
  saveToken(data.token);
  return data;
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Logout and clear auth token. */
  try {
    await request<void>('/auth/logout', { method: 'POST' });
  } finally {
    saveToken(null);
  }
}

// PUBLIC_INTERFACE
export async function listNotes(params?: { query?: string; category?: string; tag?: string }) {
  /** Fetch notes, with optional search/filter params. */
  const query = new URLSearchParams();
  if (params?.query) query.set('query', params.query);
  if (params?.category) query.set('category', params.category);
  if (params?.tag) query.set('tag', params.tag);
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request<Note[]>(`/notes${suffix}`);
}

// PUBLIC_INTERFACE
export async function getNote(id: string) {
  /** Fetch a single note by id. */
  return request<Note>(`/notes/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function createNote(input: Partial<Note>) {
  /** Create a new note. */
  return request<Note>('/notes', { method: 'POST', body: input });
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, input: Partial<Note>) {
  /** Update an existing note. */
  return request<Note>(`/notes/${encodeURIComponent(id)}`, { method: 'PUT', body: input });
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string) {
  /** Delete a note by id. */
  return request<void>(`/notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

// PUBLIC_INTERFACE
export async function getCategories() {
  /** Fetch categories list. */
  return request<string[]>('/categories');
}
