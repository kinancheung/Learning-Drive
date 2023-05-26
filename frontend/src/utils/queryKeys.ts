import { postsSearchFilter } from './schema/searchPostsSchema';

export const queryKey = {
  CATEGORIES: 'categories',
  POSTS: (page: number, filter: postsSearchFilter): [string, number, postsSearchFilter] => [
    'posts',
    page,
    filter,
  ],
  PROFILE: (userId?: string): [string, string] => {
    if (!userId) throw new Error();
    return ['profile', userId];
  },
  POST: (postId: string): [string, string] => ['post', postId],
};
