import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import { postsApi } from '../api';
import { Post } from '../api/client';
import { queryKey } from '../utils/queryKeys';
import { postsSearchFilter } from '../utils/schema/searchPostsSchema';

interface usePostFeedOpts {
  /**
   * The number of results to fetch per page
   */
  pageSize?: number;
  /**
   * The filter to apply when fetching posts
   */
  filter?: postsSearchFilter;
}

interface postFeedData {
  /**
   * The posts to display
   */
  posts: Post[];
  /**
   * Callback to fetch the next page of posts
   */
  loadMore: () => {};
  /**
   * Indicates if there are more posts to fetch. If false, there are no more posts to fetch
   */
  hasMore: boolean;
  /**
   * Refreshes to load new or updated posts
   */
  refresh: () => {};
}

/**
 * Hook that abstracts logic for fetching posts to display in an infinite scroll feed
 */
export const usePostFeed = ({ pageSize = 10, filter = {} }: usePostFeedOpts = {}): postFeedData => {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(true);
  }, [filter]);

  const { data, size, setSize, mutate } = useSWRInfinite(
    (pageIndex, prevPageData) => {
      if (pageIndex && prevPageData.length < pageSize) {
        return null;
      }
      return queryKey.POSTS(pageIndex, filter);
    },
    async (_, page) => {
      const posts = (
        await postsApi.getPosts({
          pageSize,
          offset: page,
          ...filter,
        })
      ).data.posts;

      if (posts.length < 10) {
        setHasMore(false);
      }

      return posts;
    }
  );

  // Turn array of pages of posts into just an array of posts
  const posts = data?.reduce((acc, curr) => [...acc, ...curr], []) || [];

  return {
    posts,
    loadMore: () => setSize(size + 1),
    hasMore,
    refresh: mutate,
  };
};
