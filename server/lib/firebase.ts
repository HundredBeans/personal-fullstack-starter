import { initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseInstance: App | null;

const runtimeConfig = useRuntimeConfig();

const initialize = () => {
  if (firebaseInstance) return;
  firebaseInstance = initializeApp({
    credential: cert({
      projectId: runtimeConfig.firebase.projectId,
      clientEmail: runtimeConfig.firebase.clientEmail,
      privateKey: runtimeConfig.firebase.privateKey,
    }),
  });
};

initialize();

export const firestore = getFirestore();
