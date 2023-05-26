import { styled, Tooltip as MuiToolTip, tooltipClasses, TooltipProps } from '@mui/material';

/**
 * Tooltip component on specific actions
 */
const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiToolTip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default Tooltip;
