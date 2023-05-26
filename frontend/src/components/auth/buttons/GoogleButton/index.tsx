import { Button } from '@mui/material';

import { useAuth } from '../../../../hooks/useAuth';
import GoogleIcon from '../../../icons/GoogleIcon';

/**
 * Button that opens the Google signin popup when clicked
 */
const GoogleButton = () => {
  const appContext = useAuth();
  return (
    <Button
      data-testid='google-signin-button'
      variant='contained'
      size='large'
      fullWidth
      onClick={appContext.signInWithGoogle}
      startIcon={<GoogleIcon />}
    >
      Login with Google
    </Button>
  );
};

export default GoogleButton;
