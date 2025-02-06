import { ActionError, defineAction } from 'astro:actions';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from 'astro:env/server';
import type {
  LoginResponse,
  MySpotifyPlayLists,
  SpotifyPlayListItems,
} from '../types';

export const server = {
  spotify: {
    login: defineAction({
      accept: 'json',
      handler: async () => {
        const scope = 'user-read-currently-playing user-read-recently-played';
        const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
          {
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: SPOTIFY_REDIRECT_URI,
          }
        ).toString()}`;

        return {
          redirect: authUrl,
        };
      },
    }),
    getAcces: defineAction({
      accept: 'json',
      handler: async (_input, context) => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }).toString(),
        });

        if (!response.ok) {
          console.error('Failed to fetch access token:', response.statusText);
          return { error: 'Failed to fetch access token' };
        }

        const data = (await response.json()) as LoginResponse;

        const { access_token, expires_in } = data;

        context.cookies.set('spotify_access_token', data.access_token, {
          httpOnly: true,
          secure: false,
          maxAge: expires_in,
          path: '/',
        });

        return { access_token: access_token };
      },
    }),
    exchangeToken: defineAction({
      accept: 'json',
      handler: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');

        if (!code) {
          throw new Error('No code found in the callback URL.');
        }

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URI, // ✅ Uses Astro API endpoint
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET,
          }),
        });

        const data = await response.json();

        if (!data.access_token) {
          throw new Error('Failed to obtain access token.');
        }

        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
      },
    }),
    fetchMyPlayLists: defineAction({
      accept: 'json',
      handler: async ({ access_token }: { access_token: string }) => {
        const response = await fetch(
          'https://api.spotify.com/v1/users/25xn3lx8ghfoi9gtycg9nn70t/playlists',
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (response.status === 204) {
          return { myPlayLists: null };
        }

        const myPlayLists = (await response.json()) as MySpotifyPlayLists;
        return { myPlayLists };
      },
    }),

    fetchPlayListItems: defineAction({
      accept: 'json',
      handler: async ({ access_token }: { access_token: string }) => {
        const response = await fetch(
          'https://api.spotify.com/v1/playlists/4rSBRJwwKs98oflpM4flKo/tracks',
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (response.status === 204) {
          return { playListItems: null };
        }

        const playListItems = (await response.json()) as SpotifyPlayListItems;

        return { playListItems };
      },
    }),
  },
};
