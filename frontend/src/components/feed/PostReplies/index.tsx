import { Button, Divider, Stack, Typography } from '@mui/material';
import { useDialog } from 'react-dialog-async';
import { Link } from 'react-router-dom';

import { Post } from '../../Post';
import { WritePost } from '../WritePost';

import { postsApi } from '../../../api';
import { Post as PostType, PostWithComments } from '../../../api/client';
import { useAuth } from '../../../hooks/useAuth';
import CreatePostDialog from '../../dialog/CreatePostDialog';

/**
 * Interface props containing information of a post comment
 */
export interface PostRepliesProps {
  showCreateButton?: boolean;
  post: PostWithComments;
  refresh: () => void;
}

/**
 * Component containing logic on comments of a specific post.
 */
export const PostReplies = ({ post, showCreateButton = true, refresh }: PostRepliesProps) => {
  const { user } = useAuth();
  const createPostDialog = useDialog(CreatePostDialog);

  // Allows users to like the commented post
  const reactToPost = async (id: number, liked: boolean) => {
    await postsApi.reactToPost(String(id), { liked });
  };

  // Allows users of the commented post to edit
  const editPost = async (postData: PostType) => {
    await createPostDialog.show({
      postId: postData._id,
      parentId: post._id,
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

  // Create a comment on a post
  const handleCreatePost = async () => {
    await createPostDialog.show({
      parentId: post._id,
    });
    refresh();
  };

  return (
    <>
      {showCreateButton && (
        <>
          <WritePost prompt='Write a reply' onCreatePost={handleCreatePost} />
          <Divider />
        </>
      )}

      <Stack>
        {post.comments.map((p, i) => (
          <>
            <Post
              data={p}
              userId={user?.uid}
              key={p._id}
              onToggleLike={(liked) => reactToPost(p._id, liked)}
              onEdit={editPost}
            />
            {p.comments && p.comments.length > 0 && (
              <Stack>
                {p.comments.slice(0, 3).map((p) => (
                  <Stack direction='row' key={p._id}>
                    <Divider orientation='vertical' flexItem sx={{ ml: 2 }} />
                    <Post
                      data={p}
                      userId={user?.uid}
                      onToggleLike={(liked) => reactToPost(p._id, liked)}
                      onEdit={editPost}
                    />
                  </Stack>
                ))}
                <Divider />
                <Button sx={{ borderRadius: 0 }} component={Link} to={`/post/${p._id}`}>
                  <Typography>View all replies</Typography>
                </Button>
              </Stack>
            )}
            <Divider />
          </>
        ))}
      </Stack>
    </>
  );
};
