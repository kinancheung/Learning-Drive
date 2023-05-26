import { useDialog } from 'react-dialog-async';

import SearchPostsDialog from '../components/dialog/SearchPostsDialog';

import { postsSearchFilter } from '../utils/schema/searchPostsSchema';
import { useQueryState } from './useQueryState';

interface useSearchReturnType {
  /**
   * The current search parameters that are applied
   */
  search: postsSearchFilter;
  /**
   * Opens the search popup allowing the user to refine their search criteria
   */
  refineSearch: () => Promise<void>;
  /**
   * Clears any current search criteria
   */
  clearSearch: () => void;
}

/**
 * Hook that abstracts logic for searching posts.
 */
export const useSearch = (): useSearchReturnType => {
  const [search, setSearch] = useQueryState<postsSearchFilter>('search', {});
  const searchPostsDialog = useDialog(SearchPostsDialog);

  const handleSearch = async () => {
    const searchQuery = await searchPostsDialog.show({
      initialValues: {
        content: search.searchQuery,
        categories: search.searchCategories?.map((c) => ({ text: c, key: c.toLowerCase() })),
      },
    });

    if (searchQuery) setSearch(searchQuery);
  };

  return {
    search,
    refineSearch: handleSearch,
    clearSearch: () =>
      setSearch((s) => ({ ...s, searchQuery: undefined, searchCategories: undefined })),
  };
};
