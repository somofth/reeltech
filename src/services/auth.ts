import { signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";
import { useAppStore } from "../store/useAppStore";

export const initAuth = () => {
  const { setAuthenticated } = useAppStore.getState();

  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      console.log("User authenticated:", user.uid);
      setAuthenticated(true);
    } else {
      console.log("User not authenticated, signing in anonymously...");
      signInAnonymously(auth).catch((error) => {
         // Suppress the expected "invalid api key" error for dev environment with placeholders
         if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
             console.warn("Firebase: Missing valid API Key (Mock Auth Active)");
         } else {
             console.error("Auth Error:", error);
         }
         
         // Fallback for dev without valid config
         if (import.meta.env.DEV) {
             setAuthenticated(true);
         }
      });
    }
  });
};
