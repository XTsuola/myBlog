/// <reference types="vite/client" />

import 'vue-router'

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
}

declare global {
  interface Window {
    BMap: any
    BMapGL: any
  }
}