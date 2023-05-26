import { Stack } from '@mui/material';

import LoadingIcon from '../../icons/LoadingIcon';

/**
 * Displays a loading indicator.
 */
export const Loading = () => (
  <Stack alignItems='center' sx={{ mt: 24 }}>
    <LoadingIcon sx={{ fontSize: '8rem', color: 'text.primary' }} />
  </Stack>
);
