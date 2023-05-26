import { Stack, Avatar, Typography, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { User } from '../../api/client';

/**
 * Interface prop to pass on information of a user to display
 */
export interface FollowProps {
  user: User;
}

/**
 * Component displaying users following or users followed
 */
export const Follow = ({ user }: FollowProps) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ my: 1, py: 1, px: 1 }}>
      <CardActionArea onClick={() => navigate(`/profile/${user._id}`)}>
        <Stack direction='row' alignItems='center'>
          <Avatar src={user.imageUrl} sx={{ width: 56, height: 56, mr: 1 }} />
          <Stack alignItems='normal'>
            <Typography variant='h6'>{user.name}</Typography>
            <Typography variant='subtitle1'>@{user.handle}</Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
