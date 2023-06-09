declare namespace Components {
    namespace Parameters {
        /**
         * example:
         * fsdkjfsdlkj343kl24j3
         */
        export type FirebaseIDParam = string;
        /**
         * example:
         * Peter1
         */
        export type HandleParam = string;
        /**
         * example:
         * 3
         */
        export type IDParam = string; // ^[\d]*$
    }
    export interface PathParameters {
        FirebaseIDParam?: /**
         * example:
         * fsdkjfsdlkj343kl24j3
         */
        Parameters.FirebaseIDParam;
        IDParam?: /**
         * example:
         * 3
         */
        Parameters.IDParam /* ^[\d]*$ */;
        HandleParam?: /**
         * example:
         * Peter1
         */
        Parameters.HandleParam;
    }
    namespace Responses {
        export type NotFoundError = /* Schema which represents the JSON returned for errors and other conditions which expect status updates. */ Schemas.Error;
        export type ParseError = /* Schema which represents the JSON returned for errors and other conditions which expect status updates. */ Schemas.Error;
        export type UnauthorizedError = /* Schema which represents the JSON returned for errors and other conditions which expect status updates. */ Schemas.Error;
    }
    namespace Schemas {
        export interface AllCategories {
            /**
             * example:
             * [
             *   "C++",
             *   "React",
             *   "Redux",
             *   "JavaScript",
             *   "TypeScript"
             * ]
             */
            categories: /**
             * A category under which a post can be categorized
             * example:
             * C++
             */
            Category[];
        }
        /**
         * The list of categories to which the post belongs
         */
        export type Categories = [
            /**
             * A category under which a post can be categorized
             * example:
             * C++
             */
            Category?,
            /**
             * A category under which a post can be categorized
             * example:
             * C++
             */
            Category?,
            /**
             * A category under which a post can be categorized
             * example:
             * C++
             */
            Category?
        ];
        /**
         * A category under which a post can be categorized
         * example:
         * C++
         */
        export type Category = string;
        export interface ChildComments {
            comments: {
                /**
                 * The unique identifier of the post
                 * example:
                 * 5
                 */
                _id: number;
                /**
                 * The id of the parent post, if it exists
                 * example:
                 * 5
                 */
                parentId?: number;
                /**
                 * The user handle of the parent post, if one exists
                 */
                parentHandle?: string;
                user: User;
                /**
                 * The time at which the post was made, as milliseconds past the unix epoch
                 * example:
                 * 1646339331193
                 */
                timestampCreated: number;
                /**
                 * The time at which the post was most recently edited, as milliseconds past the unix epoch
                 * example:
                 * 1646339331193
                 */
                timestampModified: number;
                categories: /* The list of categories to which the post belongs */ Categories;
                content: /**
                 * The string body of the post, as written by the user
                 * example:
                 * Today I learnt about the introduction of xvalues to value categories in C++
                 */
                Content;
                resource?: {
                    link: /**
                     * The resource attached to the post by the user. This is an optional field
                     * example:
                     * https://en.cppreference.com/w/cpp/language/value_category
                     */
                    Resource /* url */;
                    openGraph?: {
                        /**
                         * The name of the website
                         * example:
                         * GitHub - PeterGoedeke/blocked: https://blockedgame.live
                         */
                        title?: string;
                        /**
                         * The url which the request was sent to
                         * example:
                         * https://github.com/PeterGoedeke/blocked
                         */
                        url?: string; // url
                        /**
                         * The description of the website
                         * example:
                         * https://blockedgame.live. Contribute to PeterGoedeke/blocked development by creating an account on GitHub.
                         */
                        description?: string;
                        /**
                         * The URL of the open graph image
                         * example:
                         * https://repository-images.githubusercontent.com/422754120/03c53f9e-6306-4eb8-a2f4-6886041be39e
                         */
                        imageUrl?: string; // url
                    };
                };
                /**
                 * The various types of reactions which have been made to this post. Currently, only likes are supported
                 */
                reactions: {
                    /**
                     * The number of times which people have liked a post
                     * example:
                     * 52
                     */
                    likes: number;
                    /**
                     * Whether the current user has liked the post or not
                     * example:
                     * false
                     */
                    isPersonallyLiked: boolean;
                    /**
                     * The number of comments on this post
                     * example:
                     * 2
                     */
                    commentCount: number;
                };
                comments: Post[];
            }[];
        }
        export interface CommentCount {
            /**
             * The number of comments on this post
             * example:
             * 2
             */
            commentCount: number;
        }
        /**
         * The string body of the post, as written by the user
         * example:
         * Today I learnt about the introduction of xvalues to value categories in C++
         */
        export type Content = string;
        export interface CreateCategory {
            /**
             * A category under which a post can be categorized
             * example:
             * C++
             */
            category: string;
        }
        export interface CreatePost {
            categories: /* The list of categories to which the post belongs */ Categories;
            content: /**
             * The string body of the post, as written by the user
             * example:
             * Today I learnt about the introduction of xvalues to value categories in C++
             */
            Content;
            resource?: /**
             * The resource attached to the post by the user. This is an optional field
             * example:
             * https://en.cppreference.com/w/cpp/language/value_category
             */
            Resource /* url */;
            /**
             * The id of the parent post (i.e. the post which this post is a comment of). Exclude this field if this post is a top-level post
             * example:
             * 5
             */
            parentId?: number;
        }
        /**
         * Schema which represents the JSON returned for errors and other conditions which expect status updates.
         */
        export interface Error {
            /**
             * The status message.
             * example:
             * Invalid request.
             */
            message: string;
        }
        export interface FollowUser {
            /**
             * Whether the user does or does not follow a different user
             * example:
             * true
             */
            following: boolean;
        }
        export interface GetPostQuery {
            /**
             * Return only posts containing this substring in their content
             * example:
             * today I learned
             */
            searchQuery?: string;
            /**
             * Return only posts which belong to all categories specified
             * example:
             * [
             *   "React",
             *   "Redux"
             * ]
             */
            searchCategories?: string[];
            /**
             * Return only posts which were posted by this user
             * example:
             * 7234a92f-185a-4e86-8276-54e3fa7b67c6
             */
            userIdQuery?: string;
            /**
             * When true, return only posts which were posted by users which the current user follows. Overrides the `userIdQuery` field
             * example:
             * true
             */
            followed?: boolean;
            /**
             * Used for pagination; must be used in conjunction with the `pageSize` field. Represents the page number the request is for, given the page size specified by the `pageSize` field. 0 indexed
             * example:
             * 2
             */
            offset?: number;
            /**
             * Used for pagination; must be used in conjunction with the `offset` field. Represents the number of items which should be included per page. Multiple categories should be separated by commas.
             * example:
             * 10
             */
            pageSize?: number;
        }
        export interface GrandchildComments {
            comments: Post[];
        }
        export interface Post {
            /**
             * The unique identifier of the post
             * example:
             * 5
             */
            _id: number;
            /**
             * The id of the parent post, if it exists
             * example:
             * 5
             */
            parentId?: number;
            /**
             * The user handle of the parent post, if one exists
             */
            parentHandle?: string;
            user: User;
            /**
             * The time at which the post was made, as milliseconds past the unix epoch
             * example:
             * 1646339331193
             */
            timestampCreated: number;
            /**
             * The time at which the post was most recently edited, as milliseconds past the unix epoch
             * example:
             * 1646339331193
             */
            timestampModified: number;
            categories: /* The list of categories to which the post belongs */ Categories;
            content: /**
             * The string body of the post, as written by the user
             * example:
             * Today I learnt about the introduction of xvalues to value categories in C++
             */
            Content;
            resource?: {
                link: /**
                 * The resource attached to the post by the user. This is an optional field
                 * example:
                 * https://en.cppreference.com/w/cpp/language/value_category
                 */
                Resource /* url */;
                openGraph?: {
                    /**
                     * The name of the website
                     * example:
                     * GitHub - PeterGoedeke/blocked: https://blockedgame.live
                     */
                    title?: string;
                    /**
                     * The url which the request was sent to
                     * example:
                     * https://github.com/PeterGoedeke/blocked
                     */
                    url?: string; // url
                    /**
                     * The description of the website
                     * example:
                     * https://blockedgame.live. Contribute to PeterGoedeke/blocked development by creating an account on GitHub.
                     */
                    description?: string;
                    /**
                     * The URL of the open graph image
                     * example:
                     * https://repository-images.githubusercontent.com/422754120/03c53f9e-6306-4eb8-a2f4-6886041be39e
                     */
                    imageUrl?: string; // url
                };
            };
            /**
             * The various types of reactions which have been made to this post. Currently, only likes are supported
             */
            reactions: {
                /**
                 * The number of times which people have liked a post
                 * example:
                 * 52
                 */
                likes: number;
                /**
                 * Whether the current user has liked the post or not
                 * example:
                 * false
                 */
                isPersonallyLiked: boolean;
                /**
                 * The number of comments on this post
                 * example:
                 * 2
                 */
                commentCount: number;
            };
        }
        export interface PostWithComments {
            /**
             * The unique identifier of the post
             * example:
             * 5
             */
            _id: number;
            /**
             * The id of the parent post, if it exists
             * example:
             * 5
             */
            parentId?: number;
            /**
             * The user handle of the parent post, if one exists
             */
            parentHandle?: string;
            user: User;
            /**
             * The time at which the post was made, as milliseconds past the unix epoch
             * example:
             * 1646339331193
             */
            timestampCreated: number;
            /**
             * The time at which the post was most recently edited, as milliseconds past the unix epoch
             * example:
             * 1646339331193
             */
            timestampModified: number;
            categories: /* The list of categories to which the post belongs */ Categories;
            content: /**
             * The string body of the post, as written by the user
             * example:
             * Today I learnt about the introduction of xvalues to value categories in C++
             */
            Content;
            resource?: {
                link: /**
                 * The resource attached to the post by the user. This is an optional field
                 * example:
                 * https://en.cppreference.com/w/cpp/language/value_category
                 */
                Resource /* url */;
                openGraph?: {
                    /**
                     * The name of the website
                     * example:
                     * GitHub - PeterGoedeke/blocked: https://blockedgame.live
                     */
                    title?: string;
                    /**
                     * The url which the request was sent to
                     * example:
                     * https://github.com/PeterGoedeke/blocked
                     */
                    url?: string; // url
                    /**
                     * The description of the website
                     * example:
                     * https://blockedgame.live. Contribute to PeterGoedeke/blocked development by creating an account on GitHub.
                     */
                    description?: string;
                    /**
                     * The URL of the open graph image
                     * example:
                     * https://repository-images.githubusercontent.com/422754120/03c53f9e-6306-4eb8-a2f4-6886041be39e
                     */
                    imageUrl?: string; // url
                };
            };
            /**
             * The various types of reactions which have been made to this post. Currently, only likes are supported
             */
            reactions: {
                /**
                 * The number of times which people have liked a post
                 * example:
                 * 52
                 */
                likes: number;
                /**
                 * Whether the current user has liked the post or not
                 * example:
                 * false
                 */
                isPersonallyLiked: boolean;
                /**
                 * The number of comments on this post
                 * example:
                 * 2
                 */
                commentCount: number;
            };
            comments: {
                /**
                 * The unique identifier of the post
                 * example:
                 * 5
                 */
                _id: number;
                /**
                 * The id of the parent post, if it exists
                 * example:
                 * 5
                 */
                parentId?: number;
                /**
                 * The user handle of the parent post, if one exists
                 */
                parentHandle?: string;
                user: User;
                /**
                 * The time at which the post was made, as milliseconds past the unix epoch
                 * example:
                 * 1646339331193
                 */
                timestampCreated: number;
                /**
                 * The time at which the post was most recently edited, as milliseconds past the unix epoch
                 * example:
                 * 1646339331193
                 */
                timestampModified: number;
                categories: /* The list of categories to which the post belongs */ Categories;
                content: /**
                 * The string body of the post, as written by the user
                 * example:
                 * Today I learnt about the introduction of xvalues to value categories in C++
                 */
                Content;
                resource?: {
                    link: /**
                     * The resource attached to the post by the user. This is an optional field
                     * example:
                     * https://en.cppreference.com/w/cpp/language/value_category
                     */
                    Resource /* url */;
                    openGraph?: {
                        /**
                         * The name of the website
                         * example:
                         * GitHub - PeterGoedeke/blocked: https://blockedgame.live
                         */
                        title?: string;
                        /**
                         * The url which the request was sent to
                         * example:
                         * https://github.com/PeterGoedeke/blocked
                         */
                        url?: string; // url
                        /**
                         * The description of the website
                         * example:
                         * https://blockedgame.live. Contribute to PeterGoedeke/blocked development by creating an account on GitHub.
                         */
                        description?: string;
                        /**
                         * The URL of the open graph image
                         * example:
                         * https://repository-images.githubusercontent.com/422754120/03c53f9e-6306-4eb8-a2f4-6886041be39e
                         */
                        imageUrl?: string; // url
                    };
                };
                /**
                 * The various types of reactions which have been made to this post. Currently, only likes are supported
                 */
                reactions: {
                    /**
                     * The number of times which people have liked a post
                     * example:
                     * 52
                     */
                    likes: number;
                    /**
                     * Whether the current user has liked the post or not
                     * example:
                     * false
                     */
                    isPersonallyLiked: boolean;
                    /**
                     * The number of comments on this post
                     * example:
                     * 2
                     */
                    commentCount: number;
                };
                comments: Post[];
            }[];
        }
        export interface Posts {
            posts: Post[];
        }
        export interface ReactToPost {
            /**
             * Whether the user does or does not like the post
             * example:
             * true
             */
            liked: boolean;
        }
        /**
         * The resource attached to the post by the user. This is an optional field
         * example:
         * https://en.cppreference.com/w/cpp/language/value_category
         */
        export type Resource = string; // url
        export interface User {
            /**
             * The unique identifier of the user
             * example:
             * 6SZoYTBzY6ewF5Rkko7hi1QMF8C3
             */
            _id: string;
            /**
             * The url of the profile picture of the user
             * example:
             * https://firebase/learning-drive/cool-image.png
             */
            imageUrl?: string; // url
            /**
             * The real-life name of the user
             * example:
             * Peter Goedeke
             */
            name: string;
            /**
             * The unique handle of the user used to directly add other users, generated by the backend
             * example:
             * Peter#5678
             */
            handle: string;
        }
        export interface UserFullProfile {
            user: User;
            /**
             * The list of all the users who follow the user in question
             */
            followers: User[];
            /**
             * The number of users who follow the user in question
             * example:
             * 2
             */
            followerCount: number;
            /**
             * The list of all the users followed by the user in question
             */
            followed: User[];
            /**
             * The number of users followed by the user in question
             * example:
             * 2
             */
            followedCount: number;
            /**
             * The number of days in a row which the user has posted something
             * example:
             * 5
             */
            streak: number;
            /**
             * A heatmap showing the daily posts of the user for the past month. Array is always of length 30
             * example:
             * [
             *   1,
             *   2,
             *   0,
             *   0,
             *   3,
             *   0,
             *   3,
             *   0,
             *   0,
             *   0,
             *   0,
             *   1,
             *   1,
             *   1,
             *   1,
             *   2,
             *   1,
             *   1,
             *   0,
             *   1,
             *   1
             * ]
             */
            heatmap: number[];
        }
        /**
         * The Id of a user
         * example:
         * adniaw-dnakd-aiwbd-1312i3a
         */
        export type UserId = string;
    }
}
declare namespace Paths {
    namespace CreateCategory {
        export type RequestBody = Components.Schemas.CreateCategory;
        namespace Responses {
            export interface $201 {
                /**
                 * The new category after formatting by the backend (e.g. ensuring reasonable usage of whitespace)
                 * example:
                 * TypeScript
                 */
                category: string;
            }
            export type $400 = Components.Responses.ParseError;
        }
    }
    namespace CreatePost {
        export type RequestBody = Components.Schemas.CreatePost;
        namespace Responses {
            export interface $201 {
            }
            export type $400 = Components.Responses.ParseError;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace DeletePostById {
        namespace Parameters {
            export type $0 = /**
             * example:
             * 3
             */
            Components.Parameters.IDParam /* ^[\d]*$ */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.ParseError;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace FollowUser {
        namespace Parameters {
            export type $0 = /**
             * example:
             * fsdkjfsdlkj343kl24j3
             */
            Components.Parameters.FirebaseIDParam;
        }
        export type RequestBody = Components.Schemas.FollowUser;
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace GetCategories {
        namespace Responses {
            export type $200 = Components.Schemas.AllCategories;
        }
    }
    namespace GetPostById {
        namespace Parameters {
            export type $0 = /**
             * example:
             * 3
             */
            Components.Parameters.IDParam /* ^[\d]*$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PostWithComments;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace GetPosts {
        export type RequestBody = Components.Schemas.GetPostQuery;
        namespace Responses {
            export type $200 = Components.Schemas.Posts;
            export type $400 = Components.Responses.ParseError;
        }
    }
    namespace GetUserById {
        namespace Parameters {
            export type $0 = /**
             * example:
             * fsdkjfsdlkj343kl24j3
             */
            Components.Parameters.FirebaseIDParam;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserFullProfile;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace GetUserIdFromHandle {
        namespace Parameters {
            export type $0 = /**
             * example:
             * Peter1
             */
            Components.Parameters.HandleParam;
        }
        namespace Responses {
            export type $200 = /**
             * The Id of a user
             * example:
             * adniaw-dnakd-aiwbd-1312i3a
             */
            Components.Schemas.UserId;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace ReactToPost {
        namespace Parameters {
            export type $0 = /**
             * example:
             * 3
             */
            Components.Parameters.IDParam /* ^[\d]*$ */;
        }
        export type RequestBody = Components.Schemas.ReactToPost;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.ParseError;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
    namespace UpdatePost {
        namespace Parameters {
            export type $0 = /**
             * example:
             * 3
             */
            Components.Parameters.IDParam /* ^[\d]*$ */;
        }
        export type RequestBody = Components.Schemas.CreatePost;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.ParseError;
            export type $404 = Components.Responses.NotFoundError;
        }
    }
}
