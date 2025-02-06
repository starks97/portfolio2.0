import { defineMiddleware } from 'astro:middleware';
import { getActionContext, actions } from 'astro:actions';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const spotifyToken = context.cookies.get('spotify_access_token');

  if (!spotifyToken) {
    console.log('No Spotify token found. Fetching a new one...');

    const { data, error } = await context.callAction(
      actions.spotify.getAcces,
      {}
    );

    if (error) {
      console.error('Failed to fetch Spotify token:', error);
      return new Response('Failed to get access token', { status: 500 });
    }

    console.log('Spotify token fetched successfully.');
  }

  return next();
});
