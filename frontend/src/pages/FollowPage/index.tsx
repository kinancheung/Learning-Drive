import { Box, Fab, Stack } from '@mui/material';
import { useDialog } from 'react-dialog-async';
import useSWR from 'swr';

import FollowDialog from '../../components/dialog/FollowDialog';
import { Follow } from '../../components/Follow';
import PlusIcon from '../../components/icons/PlusIcon';
import { BottomActions } from '../../components/layout/BottomActions';
import { Page } from '../../components/layout/Page';

import { usersApi } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { queryKey } from '../../utils/queryKeys';

/**
 * Interface prop determining whether to show following or followed page
 */
export interface FollowPageProps {
  follower: boolean;
}

/**
 * Follow page that shows either all users following the authenticated user, or users the
 * authenticated user is following.
 * Contains functionality to open a dialog to find a user based on their tag.
 */
const FollowPage = ({ follower }: FollowPageProps) => {
  const auth = useAuth();
  const userId = auth.user ? auth.user.uid : 'undefined';
  const { data } = useSWR(
    queryKey.PROFILE(userId),
    async () => (await usersApi.getUserById(userId)).data
  );
  const users = !data ? undefined : follower ? data.followers : data.followed;

  const followDialog = useDialog(FollowDialog);
  return (
    <Page backButton title={follower ? 'Followers' : 'Following'}>
      <BottomActions>
        <Box sx={{ flexGrow: 1 }} />
        <Fab
          variant='extended'
          size='large'
          color='primary'
          sx={{ minWidth: 160 }}
          onClick={() => followDialog.show()}
        >
          <PlusIcon sx={{ mr: 1 }} />
          <span>Find Someone</span>
        </Fab>
      </BottomActions>
      {data && users && (
        <Stack sx={{ my: 2, mx: 2 }}>
          {users.map((user) => (
            <Follow user={user} key={user._id} />
          ))}
        </Stack>
      )}
    </Page>
  );
};

export default FollowPage;
