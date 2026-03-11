// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "frontend-netfilx.firebaseapp.com",
  projectId: "frontend-netfilx",
  storageBucket: "frontend-netfilx.firebasestorage.app",
  messagingSenderId: "785748299359",
  appId: "1:785748299359:web:47bba0bcfecd02805b55ea",
  measurementId: "G-TFHJ6RPRPJ"
};

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error('VITE_FIREBASE_API_KEY is required. Please add it to your .env file.');
}