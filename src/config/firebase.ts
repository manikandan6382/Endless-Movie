import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "frontend-netfilx.firebaseapp.com",
  projectId: "frontend-netfilx",
  storageBucket: "frontend-netfilx.firebasestorage.app",
  messagingSenderId: "785748299359",
  appId: "1:785748299359:web:47bba0bcfecd02805b55ea",
  measurementId: "G-TFHJ6RPRPJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;