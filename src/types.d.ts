export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type SpotifyCurrentlyPlayingResponse = {
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: {
      album_type: string;
      artists: any[];
      available_markets: any[];
      external_urls: any;
      href: string;
      id: string;
      images: any[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: any[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
};

export type MySpotifyPlayLists = {
  href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20';
  limit: 20;
  next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
  offset: 0;
  previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
  total: 4;
  items: Array<{
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    name: string;
    owner: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      href: string;
      id: string;
      type: 'user';
      uri: string;
      display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }>;
};

export type SpotifyPlayListItems = {
  href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20';
  limit: 20;
  next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
  offset: 0;
  previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
  total: 4;
  items: Array<{
    added_at: string;
    added_by: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      href: string;
      id: string;
      type: 'user';
      uri: string;
    };
    is_local: boolean;
    track: {
      album: {
        album_type: 'compilation';
        total_tracks: number;
        available_markets: string[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
          url: string;
          height: number;
          width: number;
        }>;
        name: string;
        release_date: string;
        release_date_precision: 'year';
        restrictions: {
          reason: 'market';
        };
        type: 'album';
        uri: string;
        artists: Array<{
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: 'artist';
          uri: string;
        }>;
      };
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: 'artist';
        uri: string;
      }>;
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc: string;
        ean: string;
        upc: string;
      };
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from: {};
      restrictions: {
        reason: string;
      };
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      type: 'track';
      uri: string;
      is_local: boolean;
    };
  }>;
};

export type SpotifyAlbums = {
  album_type: 'compilation' | string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | string;
  restrictions: {
    reason: 'market' | string;
  };
  type: 'album';
  uri: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
  }[];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: 'artist';
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      restrictions: {
        reason: string;
      };
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
    }[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
};

export type SpotifyTracks = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: {
    added_at: string;
    track: {
      album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions: {
          reason: string;
        };
        type: string;
        uri: string;
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
      };
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc: string;
        ean: string;
        upc: string;
      };
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from: object; // You can refine this if needed
      restrictions: {
        reason: string;
      };
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
    };
  }[];
};
