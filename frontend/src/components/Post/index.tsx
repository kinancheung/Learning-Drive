import {
  Avatar,
  Box,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import format from 'date-fns/format';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Tooltip from '../Tooltip';
import { HeartButton } from './HeartButton';
import { PostLink } from './PostLink';
import { ShareButton } from './ShareButton';

import { Post as PostData } from '../../api/client';
import { PAGE_MARGIN } from '../../utils/constants';
import { dateFormats } from '../../utils/dateFormats';
import ChatIcon from '../icons/ChatIcon';
import EditIcon from '../icons/EditIcon';

/**
 * Interface props containing information about the post and user
 */
export interface PostProps {
  data: PostData;
  userId?: string;
  onEdit?: (data: PostData) => void;
  onToggleLike?: (like: boolean) => void;
}

/**
 * Component containing layout or post information and components within a post.
 */
export const Post = ({ data, userId, onEdit, onToggleLike }: PostProps) => {
  const [liked, setLiked] = useState(data.reactions.isPersonallyLiked);

  const isOwner = data.user._id === userId;

  const navigate = useNavigate();

  return (
    <Stack component='article' sx={{ px: PAGE_MARGIN, py: 1, flexGrow: 1 }}>
      <CardHeader
        sx={{ px: 0, pt: 0 }}
        avatar={<Avatar src={data.user.imageUrl} />}
        title={
          <div>
            <Typography
              component='span'
              onClickCapture={() => navigate(`/profile/${data.user._id}`)}
              sx={{ cursor: 'pointer' }}
            >
              {data.user.name} •{' '}
            </Typography>
            <Typography component='span' color='text.secondary' variant='caption'>
              {format(new Date(data.timestampCreated), dateFormats.post)}
            </Typography>
          </div>
        }
        subheader={
          data.parentId ? (
            <Typography gutterBottom component='span' color='text.secondary' variant='body2'>
              Replying to{' '}
              <Box
                sx={{ color: 'primary.light', textDecoration: 'none' }}
                component={Link}
                to={`/post/${data.parentId}`}
              >
                @{data.parentHandle}
              </Box>
            </Typography>
          ) : (
            <Stack direction='row' spacing={1}>
              {data.categories.map((category) => (
                <CategoryChip key={category} label={category} size='small' color='primary' />
              ))}
            </Stack>
          )
        }
        action={
          isOwner && (
            <Tooltip title='Edit Post'>
              <IconButton
                sx={{ color: 'white', mt: 1, mr: 1 }}
                size='small'
                onClickCapture={() => onEdit && onEdit(data)}
              >
                <EditIcon fontSize='inherit' />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <Typography sx={{ overflowWrap: 'break-word' }}>{data.content}</Typography>
      {data.resource && (
        <PostLink
          url={data.resource.link}
          imageUrl={data.resource.openGraph?.imageUrl}
          title={data.resource.openGraph?.title}
        />
      )}
      <Stack direction='row' alignItems='center' spacing={2}>
        <Stack direction='row' alignItems='center'>
          <HeartButton
            color={liked ? 'secondary' : undefined}
            filled={liked}
            onClickCapture={() =>
              setLiked((l) => {
                onToggleLike && onToggleLike(!l);
                return !l;
              })
            }
          />
          <Typography
            variant='caption'
            color={liked ? 'secondary' : 'text.secondary'}
            sx={{ mt: 0.25 }}
          >
            {data.reactions.likes - (data.reactions.isPersonallyLiked ? 1 : 0) + (liked ? 1 : 0)}
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <Tooltip title='View Comments'>
            <IconButton component={Link} to={`/post/${data._id}`}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Typography variant='caption' color={'text.secondary'} sx={{ mt: 0.25 }}>
            {data.reactions.commentCount}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <ShareButton postId={data._id} />
      </Stack>
    </Stack>
  );
};

const CategoryChip = styled(Chip)(() => ({
  height: 20,
}));
