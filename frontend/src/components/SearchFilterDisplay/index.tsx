import { Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { postsSearchFilter } from '../../utils/schema/searchPostsSchema';
import FilterIcon from '../icons/FilterIcon';

/**
 * Interface prop with clear search function and search criteria
 */
export interface SearchFilterDisplayProps {
  search: postsSearchFilter;
  clearSearch: () => void;
}

/**
 * Component displaying search criteria and toggle of search
 */
export const SearchFilterDisplay = ({ search, clearSearch }: SearchFilterDisplayProps) =>
  search.searchCategories || search.searchQuery ? (
    <>
      <Stack direction='row' sx={{ px: 2 }} spacing={2} alignItems='center'>
        <FilterIcon />
        <Stack direction='row' flexWrap='wrap'>
          <Typography sx={{ wordBreak: 'break-all' }} component='div'>
            {search.searchCategories?.map((c) => (
              <Chip
                color='primary'
                size='small'
                sx={{ mr: 2, display: 'inline' }}
                label={c}
                key={c}
              />
            ))}
            {search.searchQuery && `Posts containing "${search.searchQuery}"`}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Button data-testid='clear-button' onClick={clearSearch} sx={{ flexShrink: 0 }}>
          Clear Search
        </Button>
      </Stack>
      <Divider />
    </>
  ) : null;
