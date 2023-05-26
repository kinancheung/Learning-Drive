import { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextState {
  /**
   * The current user object. If user is undefined then the user is unauthenticated
   */
  user?: User;
  /**
   * Triggers a popup prompting the user to sign In With Github
   */
  signInWithGithub: () => void;
  /**
   * Triggers a popup prompting the user to sign In With Google
   */
  signInWithGoogle: () => void;
  /**
   * Triggers a popup prompting the user to sign In With Facebook
   */
  signInWithFacebook: () => void;
  /**
   * Triggers a sign out
   */
  signOut: () => void;
}

const defaultState: AuthContextState = {
  signInWithGithub: () => {},
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextState>(defaultState);
