import { IconButton } from '@mui/material';

import { PostFeed } from '../../components/feed/PostFeed';
import SearchIcon from '../../components/icons/SearchIcon';
import { Page } from '../../components/layout/Page';
import { SearchFilterDisplay } from '../../components/SearchFilterDisplay';

import { useSearch } from '../../hooks/useSearch';

/**
 * Global page displaying search functionality and all posts made by users in descending order
 */
const GlobalPage = () => {
  const { search, refineSearch, clearSearch } = useSearch();

  return (
    <Page
      title='Global Feed'
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

export default GlobalPage;
