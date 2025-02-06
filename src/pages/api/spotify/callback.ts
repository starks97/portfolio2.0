import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  console.log(code);

  if (!code) {
    return new Response('No authorization code found', { status: 400 });
  }

  return redirect(`/?code=${code}`);
};
