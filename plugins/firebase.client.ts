import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    projectId: config.public.firebase.projectId,
    appId: config.public.firebase.appId,
    measurementId: config.public.firebase.measurementId,
  };

  const app = initializeApp(firebaseConfig);

  return {
    provide: {
      firebaseApp: app,
    },
  };
});
