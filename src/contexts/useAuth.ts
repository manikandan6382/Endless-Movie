import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile
} from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { auth, googleProvider, githubProvider } from '../config/firebase';
import type { RootState } from '../store/store';
import { setUser } from '../store/authSlice';

export const useAuth = () => {
  const { currentUser, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const signup = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    return result;
  };

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const loginWithGoogle = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? signInWithRedirect(auth, googleProvider) : signInWithPopup(auth, googleProvider);
  };

  const loginWithGithub = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? signInWithRedirect(auth, githubProvider) : signInWithPopup(auth, githubProvider);
  };

  const handleRedirectResult = async () => {
    const result = await getRedirectResult(auth);
    return result;
  };

  const updateUserProfile = async (photoURL: string) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { photoURL });
    dispatch(setUser({
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName,
      photoURL,
      metadata: { creationTime: auth.currentUser.metadata.creationTime },
    }));
  };

  return { currentUser, loading, signup, login, logout, resetPassword, loginWithGoogle, loginWithGithub, handleRedirectResult, updateUserProfile };
};
