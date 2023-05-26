import { CardHeader, Skeleton, Stack, Typography } from '@mui/material';

import { PAGE_MARGIN } from '../../../utils/constants';

/**
 * Skeleton/format in which a singular post should be displayed on the global and activity page.
 */
export const PostSkeleton = () => (
  <Stack sx={{ p: PAGE_MARGIN }}>
    <CardHeader
      sx={{ px: 0, pt: 0 }}
      avatar={<Skeleton variant='circular' height={40} width={40} />}
      title={
        <Stack spacing={2} direction='row' alignItems='center'>
          <Typography component='span'>
            <Skeleton width={'20vw'} />
          </Typography>
          <Typography
            component='span'
            color='text.secondary'
            variant='caption'
            sx={{ flexGrow: 2 }}
          >
            <Skeleton width={'50%'} />
          </Typography>
        </Stack>
      }
      subheader={
        <Stack direction='row' spacing={1}>
          <Skeleton variant='rectangular' width={60} height={18} sx={{ borderRadius: 999 }} />
          <Skeleton variant='rectangular' width={80} height={18} sx={{ borderRadius: 999 }} />
        </Stack>
      }
    />
    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
      <Skeleton width={'100%'} />
      <Skeleton width={'90%'} />
      <Skeleton width={'30%'} />
    </Typography>
    {/* {data.resource && (
      <PostLink
      url={data.resource.link}
      imageUrl={data.resource.openGraph?.imageUrl}
      title={data.resource.openGraph?.title}
      />
    )} */}
    <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 2 }}>
      <Skeleton width={20} />
      <Skeleton width={20} />
    </Stack>
  </Stack>
);
