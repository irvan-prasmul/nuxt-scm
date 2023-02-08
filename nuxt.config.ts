export default defineNuxtConfig({
  // ssr: false,
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: { transpile: ["vuetify"] },
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.API_URL + "api/",
    },
  },
});
