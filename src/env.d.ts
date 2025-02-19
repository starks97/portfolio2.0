interface ImportMetaEnv {
  readonly spotifyClientId: string;
  readonly spotifyClientSecret: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface window {
  Alpine: import('alpinejs').Alpine;
}
