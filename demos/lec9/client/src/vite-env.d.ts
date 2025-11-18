/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPER_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
