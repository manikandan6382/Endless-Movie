import { useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleProvider, githubProvider } from '../config/firebase';
import { setUser } from '../store/authSlice';
import type { RootState } from '../store/store';

export const useAuth = () => {
  const { currentUser, loading } = useSelector((state: RootState) => state.auth);

  const signup = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    return result;
  };

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const loginWithGithub = () => signInWithPopup(auth, githubProvider);

  return { currentUser, loading, signup, login, logout, resetPassword, loginWithGoogle, loginWithGithub };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        metadata: { creationTime: user.metadata.creationTime },
      } : null));
    });
    return unsubscribe;
  }, [dispatch]);

  return <>{!loading && children}</>;
};
