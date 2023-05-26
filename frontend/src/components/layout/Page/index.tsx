import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import PageHeader, { PageHeaderProps } from '../PageHeader';

export interface PageProps extends PageHeaderProps, PropsWithChildren<{}> {}

/**
 * Wrapper component for pages that display a header and also sets head tags
 */
export const Page = ({ children, title, ...other }: PageProps) => (
  <Stack sx={{ flexGrow: 1, position: 'relative' }}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <PageHeader title={title} {...other} />
    {children}
  </Stack>
);
