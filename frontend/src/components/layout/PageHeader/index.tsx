import { Box, Divider, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { StreakIndicator } from '../../StreakIndicator';
import Tooltip from '../../Tooltip';

import { usersApi } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { queryKey } from '../../../utils/queryKeys';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';

export interface PageHeaderProps {
  title: string;
  action?: ReactNode;
  backButton?: boolean;
}

/**
 * Displays a header at the top of the page. This header will be sticky even as the user scrolls.
 * It also can optionally be passed an action which will be displayed on the right side, as well
 * as a back button.
 */
const PageHeader = ({ title, action, backButton = false }: PageHeaderProps) => {
  const navigate = useNavigate();

  const auth = useAuth();
  const userId = auth.user ? auth.user.uid : 'undefined';

  const { data: user } = useSWR(
    queryKey.PROFILE(userId),
    async () => (await usersApi.getUserById(userId)).data
  );

  return (
    <AppBar>
      <Stack component={Toolbar} direction='row' spacing={1}>
        {backButton && (
          <Tooltip title='Go Back'>
            <IconButton
              sx={{ color: 'white', mx: -1 }}
              onClick={() => navigate(-1)}
              data-testid='back-button'
            >
              <ArrowLeftIcon fontSize='inherit' />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant='h5' component='h1'>
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        {user && <StreakIndicator streak={user.streak} />}
        {action}
      </Stack>
      <Divider />
    </AppBar>
  );
};

const AppBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  background: theme.palette.background.default,
  zIndex: theme.zIndex.appBar,
}));

export default PageHeader;
