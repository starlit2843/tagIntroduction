import { defineNuxtPlugin } from "#app";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Functions, getFunctions } from "firebase/functions";

declare module "#app" {
  interface NuxtApp {
    $firebaseApp: FirebaseApp;
    $firebaseAuth: Auth;
    $firebaseFunctions: Functions;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: "opennccu-tw.appspot.com",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  nuxtApp.provide("firebaseApp", firebaseApp);
  nuxtApp.provide("firebaseAuth", getAuth(firebaseApp));
  nuxtApp.provide("firebaseFunctions", getFunctions(firebaseApp));
});
