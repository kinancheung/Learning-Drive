import { Alert, Avatar, Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { PostFeed } from '../../components/feed/PostFeed';
import { Heatmap } from '../../components/Heatmap';
import SearchIcon from '../../components/icons/SearchIcon';
import { Loading } from '../../components/layout/Loading';
import { Page } from '../../components/layout/Page';
import { SearchFilterDisplay } from '../../components/SearchFilterDisplay';

import { usersApi } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import { PAGE_MARGIN } from '../../utils/constants';
import { queryKey } from '../../utils/queryKeys';

/**
 * Profile page of other users (not the authenticated user), to view their information e.g.
 * their posts and follow functionality
 */
const ProfilePage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const {
    data: user,
    error,
    mutate,
  } = useSWR(queryKey.PROFILE(id), async () => (await usersApi.getUserById(id as string)).data);
  const { search, refineSearch, clearSearch } = useSearch();
  const { enqueueSnackbar } = useSnackbar();

  const combinedSearch = useMemo(
    () => ({
      ...search,
      userIdQuery: id,
    }),
    [search, id]
  );

  if (!id) {
    return <Navigate to='/' />;
  }

  const isOwnProfile = auth.user?.uid === id;

  const toggleFollowed = async () => {
    if (user) {
      await usersApi.followUser(id, {
        following: user.followers.some((u) => u._id === auth.user?.uid),
      });
      enqueueSnackbar('Success', { variant: 'success' });
      mutate();
    }
  };

  return (
    <Page title='Profile' backButton>
      {error ? (
        error.response.status === 404 ? (
          <Navigate to='/' />
        ) : (
          <Alert severity='error' sx={{ m: PAGE_MARGIN }}>
            {JSON.stringify(error)}
          </Alert>
        )
      ) : !user ? (
        <Loading />
      ) : (
        <>
          <Stack spacing={2} alignItems='center' sx={{ py: 3 }}>
            <Avatar src={user.user.imageUrl || undefined} sx={{ width: 100, height: 100 }} />
            <Stack alignItems='center'>
              <Typography variant='h4' component='h1'>
                {user.user.name}
              </Typography>
              <Typography color='text.disabled'>@{user.user.handle}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction='row' sx={{ py: 1, px: 2 }} alignItems='center'>
            <Typography sx={{ mr: '1vh' }}>{user.followerCount} Followers</Typography>
            <Typography>{user.followedCount} Following</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant='outlined'
              color='secondary'
              onClick={toggleFollowed}
              disabled={isOwnProfile}
            >
              {user.followers.some((u) => u._id === auth.user?.uid) ? 'Following' : 'Follow'}
            </Button>
          </Stack>
          <Divider />
          <Stack sx={{ p: 2 }}>
            <Typography>Activity</Typography>
            <Stack spacing={1} alignItems='center' sx={{ py: 2 }}>
              <Typography>
                {user.heatmap.reduce((p, c) => p + c, 0)} Posts in the past 3 months
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
            <Typography>Posts</Typography>
            <IconButton color='secondary' onClick={refineSearch}>
              <SearchIcon />
            </IconButton>
          </Stack>
          <Divider />
          <SearchFilterDisplay clearSearch={clearSearch} search={search} />
          <PostFeed showCreateButton={isOwnProfile} filter={combinedSearch} />
        </>
      )}
    </Page>
  );
};

export default ProfilePage;
