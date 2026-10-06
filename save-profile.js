/* OurSocial — save-profile.js
 *
 * Addition for the index.html the user provided.
 * Expects supabase-config.js to run first and create
 * window.ourSocialSupabase.
 */

window.saveOurSocialProfile = async function saveOurSocialProfile(email, cookieName) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanCookie = String(cookieName || '').trim();

  if (!window.ourSocialSupabase) {
    console.warn('OurSocial database is not configured yet. Running in demo mode.');
    return { ok: true, demo: true };
  }

  const { error } = await window.ourSocialSupabase
    .from('oursocial_accounts')
    .insert({
      email: cleanEmail,
      cookie_name: cleanCookie
    });

  if (error) {
    console.error('OurSocial save failed:', error);
    return {
      ok: false,
      error: error.message || 'Database save failed.'
    };
  }

  return { ok: true, demo: false };
};
