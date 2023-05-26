import { useRoutes } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import { buildRoutes } from './routes';

/**
 * Container of application
 */
const App = () => {
  const { user } = useAuth();

  const route = useRoutes(buildRoutes(Boolean(user)));

  return route;
};

export default App;
