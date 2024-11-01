declare module 'bun' {
  interface Env {
    DB_HOST: string
    DB_DATABASE: string
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_PORT: string
    DB_SCHEMA: 'public' | 'dev'
  }
}
