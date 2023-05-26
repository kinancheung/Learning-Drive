import { IconButton } from '@mui/material';

import { PostFeed } from '../../components/feed/PostFeed';
import SearchIcon from '../../components/icons/SearchIcon';
import { Page } from '../../components/layout/Page';
import { SearchFilterDisplay } from '../../components/SearchFilterDisplay';

import { useSearch } from '../../hooks/useSearch';

/**
 * Activity page holding search components and postfeed components to show posts by users
 * that the authenticated user is following
 */
const ActivityPage = () => {
  const { search, clearSearch, refineSearch } = useSearch();

  search.followed = true;

  return (
    <Page
      title='Activity Feed'
      action={
        <IconButton color='secondary' onClick={refineSearch}>
          <SearchIcon />
        </IconButton>
      }
    >
      <SearchFilterDisplay clearSearch={clearSearch} search={search} />
      <PostFeed filter={search} />
    </Page>
  );
};

export default ActivityPage;
