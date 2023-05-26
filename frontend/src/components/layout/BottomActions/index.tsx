import { Box, Container, Stack, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

import { PAGE_MARGIN, SIDEBAR_WIDTH } from '../../../utils/constants';

interface BottomActionsProps {}

/**
 * Displays a bottom bar for actions on a page.
 */
export const BottomActions = ({ children }: PropsWithChildren<BottomActionsProps>) => (
  <ActionContainer>
    <Container maxWidth='md' disableGutters sx={{ p: PAGE_MARGIN }}>
      <Stack direction='row' sx={{ ml: `${SIDEBAR_WIDTH}px` }}>
        {children}
      </Stack>
    </Container>
  </ActionContainer>
);

const ActionContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  [theme.breakpoints.down('md')]: {
    bottom: 56,
  },
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
}));
