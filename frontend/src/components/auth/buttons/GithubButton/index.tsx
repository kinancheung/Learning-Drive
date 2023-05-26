import { Button } from '@mui/material';

import { useAuth } from '../../../../hooks/useAuth';
import GithubIcon from '../../../icons/GithubIcon';

/**
 * Button that opens the Github signin popup when clicked
 */
const GithubButton = () => {
  const appContext = useAuth();
  return (
    <Button
      data-testid='github-signin-button'
      variant='contained'
      fullWidth
      size='large'
      onClick={appContext.signInWithGithub}
      startIcon={<GithubIcon />}
    >
      Login with Github
    </Button>
  );
};

export default GithubButton;
