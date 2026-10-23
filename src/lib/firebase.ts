import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

// Nova Firebase konfiguracija za Bommier Wear
const firebaseConfig = {
  apiKey: "AIzaSyAIHCppg0uQLWKIlCgn5HWp2zL8CNWQuhM",
  authDomain: "bommier-8b255.firebaseapp.com",
  projectId: "bommier-8b255",
  storageBucket: "bommier-8b255.firebasestorage.app",
  messagingSenderId: "877795998542",
  appId: "1:877795998542:web:87dedcf8e55eb31b82bc1f",
  measurementId: "G-43T1GFH6RP"
};

// Inicijalizacija aplikacije (sprječava višestruko instanciranje u Next.js-u)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicijalizujemo Firestore sa optimizovanim keširanjem za preglednike
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);

export default app;