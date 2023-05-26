import { Container, Divider, Stack } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loading } from '../../components/layout/Loading';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';

import { useIsDesktop } from '../../hooks/useIsDesktop';

/**
 * Component determining layout of the pages depending on whether on mobile or desktop
 */
const Layout = () => {
  const isDesktop = useIsDesktop();
  return (
    <Container disableGutters maxWidth='md'>
      <Stack direction={'row'} sx={{ minHeight: '100vh' }}>
        {isDesktop && <Sidebar />}
        {isDesktop && <Divider orientation='vertical' flexItem />}
        <Stack flexGrow={1}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
          {!isDesktop && <Navbar />}
        </Stack>
        {isDesktop && <Divider orientation='vertical' flexItem />}
      </Stack>
    </Container>
  );
};

export default Layout;
