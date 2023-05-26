import axios from 'axios';
import { FirebaseApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

import { AuthContext, AuthContextState } from '../../../context/AuthContext';
import { Loading } from '../../layout/Loading';

interface AuthProviderProps {
  /**
   * A FirebaseApp instance
   */
  firebaseApp: FirebaseApp;
}

/**
 * Context provider to provide authentication state to the application.
 * Uses firebase auth
 */
export const AuthProvider = ({ firebaseApp, children }: PropsWithChildren<AuthProviderProps>) => {
  const auth = getAuth(firebaseApp);

  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User>();

  const { enqueueSnackbar } = useSnackbar();

  const interceptorId = useRef<number>();

  useEffect(() => {
    // Use axios interceptor to add the auth token to all requests
    interceptorId.current = axios.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // remove axios interceptor on unmount
    return () => {
      if (interceptorId.current) axios.interceptors.request.eject(interceptorId.current);
    };
  }, []);

  useEffect(() => {
    // Subscribe to changes in auth state
    auth.onAuthStateChanged((user) => {
      setUser(user || undefined);
      setHydrated(true);
    });
  }, [auth]);

  const ctx: AuthContextState = useMemo(() => {
    const providerSignInFactory = (provider: any) => async () => {
      try {
        setHydrated(false);
        await signInWithPopup(auth, provider);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setHydrated(true);
      }
    };

    const signInWithGithub = providerSignInFactory(new GithubAuthProvider());

    const signInWithGoogle = providerSignInFactory(new GoogleAuthProvider());

    const signInWithFacebook = providerSignInFactory(new FacebookAuthProvider());

    const signOut = async () => {
      await auth.signOut();
    };

    return {
      user: user,
      signInWithGithub,
      signInWithGoogle,
      signInWithFacebook,
      signOut,
    };
  }, [auth, enqueueSnackbar, user]);

  // If auth hasnt been hydrated yet, show loading
  if (!hydrated) {
    return <Loading />;
  }
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};
