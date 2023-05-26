import { Chip, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import Flame from '../icons/Flame';
import FlameOutIcon from '../icons/FlameOut';

/**
 * Interface prop for number of days in a row a user has been active
 */
export interface StreakIndicatorProps {
  streak: number;
}

/**
 * Streak component to show how many days in a row a user has been active
 */
export const StreakIndicator = ({ streak }: StreakIndicatorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Chip
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        icon={streak ? <Flame /> : <FlameOutIcon />}
        label={streak}
      />

      <Popover
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        sx={{
          pointerEvents: 'none',
        }}
        disableScrollLock
        disableRestoreFocus
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Stack sx={{ p: 1, width: 300 }} direction='row' alignItems='center' spacing={1}>
          {streak ? <Flame sx={{ fontSize: 40 }} /> : <FlameOutIcon sx={{ fontSize: 40 }} />}
          {streak ? (
            <Stack>
              <Typography variant='body2'>
                {"You're on a "}
                <b>{streak}</b>
                {' day streak!'}
              </Typography>
              <Typography variant='caption' color='text.secondary' sx={{ lineHeight: 1.1 }}>
                Make sure to post at least once a day to maintain your streak.
              </Typography>
            </Stack>
          ) : (
            <Stack>
              <Typography variant='body2'>You dont currently have a streak</Typography>
              <Typography variant='caption' color='text.secondary' sx={{ lineHeight: 1.1 }}>
                Create a post to start your streak.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Popover>
    </div>
  );
};
