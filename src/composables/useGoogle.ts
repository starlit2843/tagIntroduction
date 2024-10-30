import {
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

export const useGoogleLogin = () => {
  const { $firebaseAuth } = useNuxtApp();
  const provider = new GoogleAuthProvider();

  return signInWithPopup($firebaseAuth, provider);
};

export const useGoogleLoginResult = () => {
  const { $firebaseAuth } = useNuxtApp();

  return getRedirectResult($firebaseAuth);
};

export const useGoogleAuthChange = (func: (user: User | null) => void) => {
  const { $firebaseAuth } = useNuxtApp();

  return onAuthStateChanged($firebaseAuth, func);
};

export const useGoogleLogout = () => {
  const { $firebaseAuth } = useNuxtApp();

  return signOut($firebaseAuth);
};
