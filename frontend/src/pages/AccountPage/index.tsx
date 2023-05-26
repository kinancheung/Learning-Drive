import { Avatar, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { PostFeed } from '../../components/feed/PostFeed';
import { Heatmap } from '../../components/Heatmap';
import SearchIcon from '../../components/icons/SearchIcon';
import SignOutIcon from '../../components/icons/SignOutIcon';
import { Loading } from '../../components/layout/Loading';
import { Page } from '../../components/layout/Page';
import { SearchFilterDisplay } from '../../components/SearchFilterDisplay';
import { StreakIndicator } from '../../components/StreakIndicator';

import { usersApi } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import { queryKey } from '../../utils/queryKeys';

/**
 * Account page containing information and actions for the authenticated user
 * Contains uniquely their following, followers, heat map, posts and signout functionality
 */
const AccountPage = () => {
  const auth = useAuth();
  const userId = auth.user ? auth.user.uid : 'undefined';
  const { data: user } = useSWR(
    queryKey.PROFILE(userId),
    async () => (await usersApi.getUserById(userId)).data
  );

  const navigate = useNavigate();
  const { search, refineSearch, clearSearch } = useSearch();

  const { signOut } = useAuth();
  return (
    <Page
      title='Account'
      action={
        <Button onClick={() => signOut()} color='secondary' endIcon={<SignOutIcon />}>
          Sign Out
        </Button>
      }
    >
      {!user ? (
        <Loading />
      ) : (
        <>
          <Stack spacing={2} alignItems='center' sx={{ py: 3 }}>
            <Avatar src={user.user.imageUrl} sx={{ width: 100, height: 100 }} />
            <StreakIndicator streak={user.streak} />
            <Stack alignItems='center'>
              <Typography variant='h4' component='h1'>
                {user.user.name}
              </Typography>
              <Typography color='text.disabled'>@{user.user.handle}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction='row' sx={{ py: 1, px: 2 }} justifyContent='space-between'>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => navigate(`/account/followers`)}
            >
              {user.followerCount} Followers
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => navigate(`/account/following`)}
            >
              {user.followedCount} Following
            </Button>
          </Stack>
          <Divider />
          <Stack sx={{ p: 2 }}>
            <Typography>Activity</Typography>
            <Stack spacing={1} alignItems='center' sx={{ py: 2 }}>
              <Typography>
                {user.heatmap.reduce((p, c) => p + c, 0)} posts in the past 3 months
              </Typography>
              <Heatmap data={user.heatmap.reverse()} />
            </Stack>
          </Stack>
          <Divider />
          <Stack
            spacing={2}
            direction='row'
            alignItems='center'
            sx={{ py: 1, px: 2 }}
            justifyContent='space-between'
          >
            <Typography>Your Posts</Typography>
            <IconButton color='secondary' onClick={refineSearch}>
              <SearchIcon />
            </IconButton>
          </Stack>
          <Divider />
          <SearchFilterDisplay clearSearch={clearSearch} search={search} />
          <PostFeed filter={{ ...search, userIdQuery: userId }} />
        </>
      )}
    </Page>
  );
};

export default AccountPage;
