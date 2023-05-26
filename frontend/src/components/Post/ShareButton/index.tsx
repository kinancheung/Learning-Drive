import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import Tooltip from '../../Tooltip';

import CopyClipboardIcon from '../../icons/CopyClipboardIcon';
import ShareIcon from '../../icons/ShareIcon';

/**
 * Interface prop to correlate post to share button
 */
export interface ShareButtonProps {
  postId: number;
}

/**
 * Share button on posts to copy links to specific posts and send them.
 */
export const ShareButton = ({ postId }: ShareButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const snackbar = useSnackbar();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonId = `share-button-${postId}`;
  const menuId = `share-menu-${postId}`;
  const open = Boolean(anchorEl);

  // Copy link of post to clipboard
  const handleCopyLink = () => {
    const success = copy(`${window.location.origin}/post/${postId}`);
    if (success) {
      snackbar.enqueueSnackbar('Link copied to clipboard', { variant: 'success' });
    } else {
      snackbar.enqueueSnackbar('Failed to copy link to clipboard', { variant: 'error' });
    }
    handleClose();
  };

  // Close the menu when the user scrolls the page
  useEffect(() => {
    const handlePageScroll = () => {
      handleClose();
    };
    window.addEventListener('scroll', handlePageScroll);
    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  return (
    <div>
      <Tooltip title='Share post'>
        <IconButton
          id={buttonId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        disablePortal
        disableScrollLock
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': buttonId,
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon color='text.primary'>
            <CopyClipboardIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Copy link to post</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
