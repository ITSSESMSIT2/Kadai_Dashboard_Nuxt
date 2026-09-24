// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 実PJT（tomoLinks_front）準拠。GitHub Pages は静的配信なのでサーバーを持たない
  ssr: false,

  // 匿名の利用状況データを送らない（実PJT準拠）
  telemetry: { enabled: false },

  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/tokens.css'],

  app: {
    // GitHub Pages はサブパス配信。Actions 上では GITHUB_REPOSITORY からリポジトリ名を取るので、
    // リポジトリ名が変わっても書き換え不要。ローカルは '/' のまま
    baseURL: process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
      : '/',
    head: { title: '進捗管理ボード' },
  },
})
