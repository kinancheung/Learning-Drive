import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

/**
 * useContext Wrapper for the AuthContext
 */
export const useAuth = () => useContext(AuthContext);
