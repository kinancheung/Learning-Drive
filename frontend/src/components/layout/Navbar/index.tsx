import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import GlobeIcon from '../../icons/GlobeIcon';
import ListIcon from '../../icons/ListIcon';
import UserIcon from '../../icons/UserIcon';

enum Tab {
  GLOBAL,
  ACITIVITY,
  ACCOUNT,
}

/**
 * Shows tabs for navigation between sections on mobile
 */
export const Navbar = () => {
  const { pathname } = useLocation();

  let page: Tab = Tab.GLOBAL;
  if (pathname.startsWith('/activity')) {
    page = Tab.ACITIVITY;
  } else if (pathname.startsWith('/account')) {
    page = Tab.ACCOUNT;
  }

  return (
    <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={page}>
        <BottomNavigationAction
          component={NavLink}
          value={Tab.GLOBAL}
          label='Global'
          to='/'
          icon={<GlobeIcon sx={{ color: page === Tab.GLOBAL ? 'secondary.main' : undefined }} />}
        />
        <BottomNavigationAction
          component={NavLink}
          value={Tab.ACITIVITY}
          label='Activity'
          to='/activity'
          icon={<ListIcon sx={{ color: page === Tab.ACITIVITY ? 'secondary.main' : undefined }} />}
        />
        <BottomNavigationAction
          component={NavLink}
          value={Tab.ACCOUNT}
          label={'Account'}
          icon={<UserIcon sx={{ color: page === Tab.ACCOUNT ? 'secondary.main' : undefined }} />}
          to='/account'
        />
      </BottomNavigation>
    </Paper>
  );
};
