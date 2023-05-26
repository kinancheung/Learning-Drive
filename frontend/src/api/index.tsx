import { CategoriesApi, PostsApi, UsersApi } from './client';

// Instances of API classes
export const postsApi = new PostsApi(undefined, process.env.REACT_APP_API_URL);
export const categoriesApi = new CategoriesApi(undefined, process.env.REACT_APP_API_URL);
export const usersApi = new UsersApi(undefined, process.env.REACT_APP_API_URL);
