// OAuth helper for Sveltia CMS (github backend), running as a Cloudflare Worker.
// Implements the auth/callback handshake documented by Decap CMS-compatible
// git backends: /auth redirects to GitHub, /callback exchanges the code for a
// token and hands it back to the CMS window via postMessage.

function allowedOrigins(env) {
  return (env.ALLOWED_DOMAINS || '')
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean);
}

function refererIsAllowed(request, env) {
  const domains = allowedOrigins(env);
  if (domains.length === 0) return true;
  const referer = request.headers.get('Referer') || '';
  try {
    const host = new URL(referer).host;
    return domains.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    if (pathname === '/' || pathname === '') {
      return new Response('CenTex Press CMS auth helper.', { status: 200 });
    }

    if (pathname === '/auth') {
      if (!refererIsAllowed(request, env)) {
        return new Response('Forbidden: unrecognized origin.', { status: 403 });
      }

      const state = crypto.randomUUID();
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
      authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set('redirect_uri', redirectUri);
      authorizeUrl.searchParams.set('scope', 'repo,user');
      authorizeUrl.searchParams.set('state', state);

      const headers = new Headers({ Location: authorizeUrl.toString() });
      headers.append(
        'Set-Cookie',
        `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      );
      return new Response(null, { status: 302, headers });
    }

    if (pathname === '/callback') {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const cookie = request.headers.get('Cookie') || '';
      const cookieState = /oauth_state=([^;]+)/.exec(cookie)?.[1];

      if (!code || !state || state !== cookieState) {
        return new Response('Invalid or expired OAuth state. Please try logging in again.', {
          status: 400,
        });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        return new Response(
          `GitHub OAuth error: ${tokenData.error_description || tokenData.error || 'unknown error'}`,
          { status: 400 },
        );
      }

      const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
      const html = `<!doctype html>
<html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:${payload}', e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not found', { status: 404 });
  },
};
