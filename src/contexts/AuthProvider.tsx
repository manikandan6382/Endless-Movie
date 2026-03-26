import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../config/firebase';
import { setUser } from '../store/authSlice';
import type { RootState } from '../store/store';

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
