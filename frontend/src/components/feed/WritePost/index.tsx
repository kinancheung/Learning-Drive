import { Box, Card, CardActionArea, CardContent, Fab, Stack, Typography } from '@mui/material';

import WriteIcon from '../../../components/icons/WriteIcon';

import PlusIcon from '../../icons/PlusIcon';
import { BottomActions } from '../../layout/BottomActions';

/**
 * Interface prop to pass logic in creating a post
 */
interface WritePostProps {
  onCreatePost: () => void;
  prompt?: string;
}

/**
 * Component to prompt users into creating a post, opening the post dialog.
 */
export const WritePost = ({ onCreatePost, prompt = 'Write a post' }: WritePostProps) => (
  <>
    <Card elevation={0} sx={{ m: 2 }}>
      <CardActionArea onClick={onCreatePost}>
        <CardContent>
          <Stack direction='row' spacing={2}>
            <WriteIcon color='secondary' />
            <Typography color='text.secondary'>{prompt}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    <BottomActions>
      <Box sx={{ flexGrow: 1 }} />
      <Fab onClick={onCreatePost} color='primary'>
        <PlusIcon />
      </Fab>
    </BottomActions>
  </>
);
