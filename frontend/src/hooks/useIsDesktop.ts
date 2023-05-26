import { useMediaQuery, Theme } from '@mui/material';

/**
 * Returns true if the app is displayed on a screen width above the "md" breakpoint.
 * The "md" breakpoint is defined by the theme, see
 * https://mui.com/material-ui/customization/default-theme/ for the default values
 */
export const useIsDesktop = () => useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
