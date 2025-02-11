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
  SpotifyTracks,
} from '../types';

import {
  TOKEN,
  SPOTIFY_AUTH_URL,
  SPOTIFY_REQUEST_NEW_TOKEN_URL,
  SPOTIFY_REQUEST_PLAYLIST_URL,
  SCOPE,
  SPOTIFY_REQUEST_PLAYLIST_ITEMS_URL,
  SPOTIFY_REQUEST_ALBUMS_URL,
  SPOTIFY_REQUEST_SAVED_TRACKS_URL,
} from '@consts';

export const server = {
  spotify: {
    login: defineAction({
      accept: 'json',
      handler: async () => {
        const authUrl = `${SPOTIFY_AUTH_URL}${new URLSearchParams({
          response_type: 'code',
          client_id: SPOTIFY_CLIENT_ID,
          scope: SCOPE,
          redirect_uri: SPOTIFY_REDIRECT_URI,
        }).toString()}`;

        return {
          redirect: authUrl,
        };
      },
    }),
    getAcces: defineAction({
      accept: 'json',
      handler: async (_input, context) => {
        const response = await fetch(`${SPOTIFY_REQUEST_NEW_TOKEN_URL}`, {
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

        context.cookies.set(`${TOKEN}`, data.access_token, {
          httpOnly: true,
          secure: false,
          maxAge: expires_in,
          path: '/',
        });

        return { access_token };
      },
    }),
    fetchMyPlayLists: defineAction({
      accept: 'json',
      handler: async ({ access_token }: { access_token: string }) => {
        const response = await fetch(`${SPOTIFY_REQUEST_PLAYLIST_URL}`, {
          headers: { Authorization: `Bearer ${access_token}` },
          cache: 'default',
        });

        if (response.status === 204) {
          return { myPlayLists: null };
        }

        const myPlayLists = (await response.json()) as MySpotifyPlayLists;
        return { myPlayLists };
      },
    }),

    fetchPlayListItems: defineAction({
      accept: 'json',
      handler: async ({
        access_token,
        playListId,
      }: {
        access_token: string;
        playListId: string;
      }) => {
        const response = await fetch(
          `${SPOTIFY_REQUEST_PLAYLIST_ITEMS_URL}${playListId}/tracks`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
            cache: 'default',
          }
        );

        if (response.status === 204) {
          return { playListItems: null };
        }

        const playListItems = (await response.json()) as SpotifyPlayListItems;

        return { playListItems };
      },
    }),
    fetchTracks: defineAction({
      accept: 'json',
      handler: async ({ access_token }: { access_token: string }) => {
        const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const tracks = await response.json();
        console.log(tracks);

        return { tracks };
      },
    }),
  },
};
