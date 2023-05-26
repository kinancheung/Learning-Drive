import { IconButton, IconButtonProps } from '@mui/material';
import { useEffect, useState } from 'react';
import UseAnimation from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';

import Tooltip from '../../Tooltip';

export interface HeartButtonProps extends IconButtonProps {
  filled?: boolean;
}

/**
 * Animated heart button displayed on posts which allows users to like or unlike posts
 */
export const HeartButton = ({ onClick, size, filled, ...rest }: HeartButtonProps) => {
  const [showFilled, setShowFilled] = useState(false);

  useEffect(() => {
    setShowFilled(filled || false);
  }, [filled]);

  return (
    <UseAnimation
      animation={heart}
      fillColor='currentColor'
      size={size === 'large' ? 32 : 28}
      strokeColor='currentColor'
      reverse={showFilled}
      onClick={(e) => onClick && onClick(e as any)}
      render={(eventProps, animationProps) => (
        <Tooltip title={showFilled ? 'Unlike Post' : 'Like Post'}>
          <IconButton size={size} {...rest} {...eventProps}>
            <div {...animationProps} />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};