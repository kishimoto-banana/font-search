declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT: string
    readonly NEXT_PUBLIC_FONT_SEARCH_API_KEY: string
    readonly NEXT_PUBLIC_VISION_API_ENDPOINT: string
    readonly NEXT_PUBLIC_VISION_API_KEY: string
    readonly NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string
  }
}
