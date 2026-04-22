// ============================================================
// authService — thin wrapper around supabase.auth.* with profile
// joining. Roles live in the profiles table, NEVER come from the
// login form (don't trust client-provided role).
// ============================================================
import { supabase } from '../config.js';

export async function signUp({ email, password, fullName, role }) {
  // 1. Create the auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;

  // 2. Create the profile row. RLS requires id = auth.uid(), which
  //    is satisfied because the session is established after signUp.
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id, full_name: fullName, role });
    if (profileError) throw profileError;
  }
  return data.user;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Returns the current user's profile row, or null if not logged in. */
export async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (error) return null;
  return data;
}

/**
 * Gate a page: if not logged in, redirect. Returns the profile on success.
 * Optionally require a specific role.
 */
export async function requireAuth({ role = null, loginUrl = '/auth/login.html' } = {}) {
  const profile = await getProfile();
  if (!profile) {
    window.location.href = loginUrl;
    throw new Error('not_authenticated');
  }
  if (role && profile.role !== role) {
    alert(`This page is only for ${role}s.`);
    window.location.href = '/';
    throw new Error('wrong_role');
  }
  return profile;
}