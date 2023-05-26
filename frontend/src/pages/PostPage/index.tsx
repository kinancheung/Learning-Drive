import { Alert, Divider, Stack } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { PostReplies } from '../../components/feed/PostReplies';
import { Loading } from '../../components/layout/Loading';
import { Page } from '../../components/layout/Page';
import { Post } from '../../components/Post';

import { postsApi } from '../../api';
import { PAGE_MARGIN } from '../../utils/constants';
import { queryKey } from '../../utils/queryKeys';

/**
 * Single post specific page, displaying the parent post and any other comments or subposts under
 * the specific thread.
 */
const PostPage = () => {
  const id = useParams().id as string;

  const {
    data: post,
    error,
    mutate,
  } = useSWR(queryKey.POST(id), async () => (await postsApi.getPostById(id)).data);

  if (!id) {
    return <Navigate to='/' />;
  }

  return (
    <Page title='Post' backButton>
      {error ? (
        error.response.status === 404 ? (
          <Navigate to='/' />
        ) : (
          <Alert severity='error' sx={{ m: PAGE_MARGIN }}>
            {JSON.stringify(error)}
          </Alert>
        )
      ) : !post ? (
        <Loading />
      ) : (
        <Stack>
          <Post data={post} />
          <Divider />
          <PostReplies refresh={mutate} post={post} />
        </Stack>
      )}
    </Page>
  );
};

export default PostPage;
