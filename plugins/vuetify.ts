import "vuetify/styles";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  ssr: true,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#E60012",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: "primary",
      flat: true,
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify);
});
