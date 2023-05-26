import { alpha, Box, styled, Tooltip } from '@mui/material';
import { add, format } from 'date-fns';

/**
 * Interface props containing values on how active a user is
 */
export interface HeatmapProps {
  data: number[];
}

/**
 * Heatmap component on accounts showing post creation activity
 */
export const Heatmap = ({ data }: HeatmapProps) => {
  const max = Math.max(...data);

  return (
    <Box>
      <HeatmapGrid>
        {data.map((v, i) => (
          <Tooltip
            key={i}
            title={`${format(add(new Date(), { days: -i }), 'dd MMM yyyy')}: ${v} posts`}
          >
            <HeatmapCell weight={max ? v / max : 0} />
          </Tooltip>
        ))}
      </HeatmapGrid>
    </Box>
  );
};

const HeatmapGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridAutoColumns: '1fr',
  gridTemplateRows: 'repeat(7, 1fr)',
  gridAutoFlow: 'column',
  marginX: 'auto',
  gap: theme.spacing(1),
}));

const HeatmapCell = styled('div', { shouldForwardProp: (p) => p !== 'weight' })<{ weight: number }>(
  ({ theme, weight }) => ({
    height: 16,
    width: 16,
    borderRadius: theme.shape.borderRadius,
    background:
      weight === 0
        ? theme.palette.background.paper
        : alpha(theme.palette.primary.light, weight * 0.5 + 0.5),
  })
);
