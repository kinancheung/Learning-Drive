import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

import fallback from '../../../assets/image/fallback.jpg';

/**
 * Interface props containing details of the link on a post
 */
export interface PostLinkProps {
  url: string;
  imageUrl?: string;
  title?: string;
}

const siteNameRegex = /^(https?:\/\/[^/]*)/i;

/**
 * Component holding links that can be input or attached to posts.
 */
export const PostLink = ({ url, title, imageUrl }: PostLinkProps) => {
  const [, sitename] = siteNameRegex.exec(url) || [];

  return (
    <Card sx={{ mt: 2, overflow: 'hidden' }} elevation={0}>
      <CardActionArea
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Box
          sx={{
            width: 120,
            borderRadius: 1,
            backgroundImage: `url(${imageUrl}), url(${fallback})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <CardContent sx={{ pt: 1 }}>
          <Typography variant='caption' color='text.secondary'>
            {sitename}
          </Typography>
          <Typography variant='body2' sx={{ textOverflow: 'ellipsis' }}>
            {title || url}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
