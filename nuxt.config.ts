import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      title: "Personal Starter Nuxt3 + Firebase with Vuetify",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content: "Personal Starter Nuxt3 + Firebase with Vuetify",
        },
      ],
      link: [
        // Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap",
        },
      ],
    },
  },
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
  // Vite plugin vuetify
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins?.push(
          vuetify({
            styles: {
              configFile: "assets/variables.scss",
            },
          })
        )
      );
    },
  ],
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/main.scss" as *;',
        },
      },
    },
  },
});
