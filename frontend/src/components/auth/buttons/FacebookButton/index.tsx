import { Button } from '@mui/material';

import { useAuth } from '../../../../hooks/useAuth';
import FacebookIcon from '../../../icons/FacebookIcon';

/**
 * Button that opens the Facebook signin popup when clicked
 */
const FacebookButton = () => {
  const appContext = useAuth();
  return (
    <Button
      data-testid='facebook-signin-button'
      variant='contained'
      fullWidth
      onClick={appContext.signInWithFacebook}
      startIcon={<FacebookIcon />}
    >
      Login with Facebook
    </Button>
  );
};
export default FacebookButton;
