// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    firebase: {
      projectId: "",
      clientEmail: "",
      privateKey: "",
    },
    public: {
      firebase: {
        projectId: "",
        appId: "",
        apiKey: "",
        measurementId: "",
      },
    },
  },
});
