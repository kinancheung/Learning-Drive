import { Divider, Stack } from '@mui/material';
import React from 'react';
import { useDialog } from 'react-dialog-async';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Post } from '../../Post';
import { EndOfFeed } from '../EndOfFeed';
import { WritePost } from '../WritePost';

import { postsApi } from '../../../api';
import { Post as PostType } from '../../../api/client';
import { useAuth } from '../../../hooks/useAuth';
import { usePostFeed } from '../../../hooks/usePostFeed';
import { postsSearchFilter } from '../../../utils/schema/searchPostsSchema';
import CreatePostDialog from '../../dialog/CreatePostDialog';
import { PostSkeleton } from '../../Post/PostSkeleton';

/**
 * Skeleton/format in which multiple posts should be displayed on the global and activity page.
 */
const FeedSkeleton = () => (
  <>
    <PostSkeleton />
    <Divider />
    <PostSkeleton />
    <Divider />
    <PostSkeleton />
    <Divider />
  </>
);

/**
 * Interface props containing logic for the posts component
 */
export interface PostFeedProps {
  filter?: postsSearchFilter;
  endMessage?: (hasPosts: boolean) => string | undefined;
  showCreateButton?: boolean;
}

/**
 * Posts component displaying all posts related to the specific global or activity page.
 * Contains components for users to create posts or interact with them.
 */
export const PostFeed = ({
  filter,
  showCreateButton = true,
  endMessage = (hasPosts) => (hasPosts ? undefined : 'It seems like there arent any posts here'),
}: PostFeedProps) => {
  const { posts, loadMore, hasMore, refresh } = usePostFeed({ filter });
  const { user } = useAuth();
  const createPostDialog = useDialog(CreatePostDialog);

  // Allows users to like posts
  const reactToPost = async (id: number, liked: boolean) => {
    await postsApi.reactToPost(String(id), { liked });
  };

  // Allows owners of posts to edit them
  const editPost = async (postData: PostType) => {
    await createPostDialog.show({
      postId: postData._id,
      initialValues: {
        link: postData.resource?.link,
        content: postData.content,
        categories: postData.categories.map((category) => ({
          text: category,
          key: category.toLowerCase(),
        })),
      },
    });
    refresh();
  };

  // Allows users to create posts and shows a dialog containing a form
  const handleCreatePost = async () => {
    await createPostDialog.show({});
    refresh();
  };

  return (
    <>
      {showCreateButton && (
        <>
          <WritePost onCreatePost={handleCreatePost} />
          <Divider />
        </>
      )}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<FeedSkeleton />}
        endMessage={<EndOfFeed message={endMessage(posts.length !== 0)} />}
      >
        <Stack>
          {posts.map((p) => (
            <React.Fragment key={p._id}>
              <Post
                data={p}
                userId={user?.uid}
                onToggleLike={(liked) => reactToPost(p._id, liked)}
                onEdit={editPost}
              />
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </InfiniteScroll>
    </>
  );
};
