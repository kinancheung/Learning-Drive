import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Location } from 'react-router-dom';

import { AuthContext, AuthContextState } from '../context/AuthContext';

interface composeTestingWrapperOpts {
  initialEntries?: (string | Partial<Location>)[];
  initialIndex?: number;
  authState?: Partial<AuthContextState>;
}

export const composeTestingWrapper = ({
  initialEntries,
  initialIndex,
  authState,
}: composeTestingWrapperOpts = {}) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    const defaultState: AuthContextState = {
      signInWithGithub: jest.fn(),
      signInWithGoogle: jest.fn(),
      signInWithFacebook: jest.fn(),
      signOut: jest.fn(),
      ...authState,
    };

    return (
      <HelmetProvider>
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
          <AuthContext.Provider value={defaultState}>
            <SnackbarProvider>{children}</SnackbarProvider>
          </AuthContext.Provider>
        </MemoryRouter>
      </HelmetProvider>
    );
  };
  return Wrapper;
};
