import { User } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import getOpenGraph from '../util/get-open-graph'
import Logger from '../util/logger'
import prisma from './db'

/**
 * repository.ts contains all of the prisma queries that is required by the application.
 *
 *  Acts as a centralized location of prisma queries, that can be called by controllers.
 */

const log = Logger.getLogger('repository')

const repository = {
    /**
     * Creates a post in the databse for a user.
     *
     * @param userId - the users Id of the poster.
     * @param post - post information provided by client.
     * @returns the created post.
     */
    async createPost(userId: string, post: Components.Schemas.CreatePost) {
        return await prisma.post.create({
            data: {
                parentId: post.parentId,
                content: post.content,
                categories: post.categories as string[],
                resource: post.resource || null,
                openGraphUrl: post.resource,
                userId
            }
        })
    },

    /**
     * Queries the DB for a user ID by their handle (username).
     *
     * @param handle - the users handle
     * @returns userId
     */
    async getUserIdByHandle(handle: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: {
                handle
            },
            select: {
                id: true
            },
            rejectOnNotFound: false
        })
        if (user) return user.id
        return null
    },

    /**
     * Deletes a post in the DB by its Id.
     *
     * @param postId - the Id of the post
     * @returns status of deletion
     */
    async deletePost(postId: number) {
        return await prisma.post.delete({
            where: {
                id: postId
            }
        })
    },

    /**
     * Gets the opengraph url of a post,
     * adds an open graph url to the DB if not already existing.
     *
     * @param url - the opengraph url
     * @returns - then opengraph data
     */
    async getOrCreateOpenGraph(url: string) {
        let openGraph = await prisma.openGraph.findUnique({
            where: {
                url
            }
        })

        if (openGraph === null) {
            const openGraphData = (await getOpenGraph(url)) || { url }
            openGraph = await prisma.openGraph.create({
                data: openGraphData
            })
        }
        return openGraph
    },

    /**
     * Sets a post as liked by the user in the DB.
     *
     * @param userId - userId of person liking post
     * @param postId - Id of the post
     * @returns status of query
     */
    async likePost(userId: string, postId: number) {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedUsers: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    },

    /**
     * Sets a post as unliked by the user in the DB.
     *
     * @param userId - userId of person liking post
     * @param postId - Id of the post
     * @returns status of query
     */
    async unlikePost(userId: string, postId: number) {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedUsers: {
                    disconnect: {
                        id: userId
                    }
                }
            }
        })
    },

    /**
     * Gets a singular post by its Id.
     *
     * @param id - the id of the post
     * @returns post information
     */
    async getPostById(id: number) {
        return await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                likedUsers: true,
                openGraph: true,
                _count: {
                    select: {
                        children: true
                    }
                }
            }
        })
    },

    /**
     * Gets a singular post by its Id, including its comments.
     *
     * @param id - the id of the post
     * @returns post information with comments
     */
    async getPostByIdWithComments(id: number) {
        const props = {
            user: true,
            likedUsers: true,
            openGraph: true,
            parent: {
                include: {
                    user: true
                }
            }
        }

        return await prisma.post.findUnique({
            where: {
                id
            },

            // include children, grandchildren, and the number of
            // great-grandchildren
            include: {
                ...props,

                _count: {
                    select: {
                        children: true
                    }
                },
                children: {
                    orderBy: {
                        timestampCreated: 'desc'
                    },
                    include: {
                        ...props,
                        _count: {
                            select: {
                                children: true
                            }
                        },
                        children: {
                            orderBy: {
                                timestampCreated: 'desc'
                            },
                            include: {
                                ...props,
                                _count: {
                                    select: {
                                        children: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    },

    /**
     * Updates a post by it's Id, with the new post information.
     *
     * @param postId - the Id of the post to update
     * @param post - the new post information
     * @returns the updated post object
     */
    async updatePost(postId: number, post: Components.Schemas.CreatePost) {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                content: post.content,
                categories: post.categories as string[],
                resource: post.resource || null
            }
        })
    },

    /**
     * Get's a list of posts for the user depending on the wanted source.
     * This could include a global search, or only a search amongst people the user follows.
     *
     * @param query - type: GetPostQuery, the wanted parameters to search for posts with
     * @param userId - the Id of the user making the request
     * @returns a list of posts to display
     */
    async getPosts(query: Components.Schemas.GetPostQuery, userId: string) {
        let userQuery: string | { in: string[] } | undefined = query.userIdQuery
        if (query.followed) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    followed: true
                }
            })
            if (user === null) {
                throw `Registered user with id ${userId} not found in database.`
            }

            const ids = user.followed.map(followedUser => followedUser.id)
            userQuery = {
                in: ids
            }
        }

        return await prisma.post.findMany({
            where: {
                parentId: null,
                userId: userQuery,
                content: {
                    contains: query.searchQuery
                },
                categories: query.searchCategories
                    ? {
                          hasEvery: query.searchCategories
                      }
                    : undefined
            },
            include: {
                user: true,
                likedUsers: true,
                openGraph: true,
                _count: {
                    select: {
                        children: true
                    }
                },
                parent: {
                    include: {
                        user: true
                    }
                }
            },
            take: query.pageSize,
            skip: query.pageSize && query.offset ? query.pageSize * query.offset : undefined,
            orderBy: {
                timestampCreated: 'desc'
            }
        })
    },

    /**
     * Gets all categories available to tag posts with.
     *
     * @returns a list of all categories
     */
    async getCategories() {
        return await prisma.category.findMany()
    },

    /**
     * Creates category entries in the DB.
     *
     * @param categories - a list of categories
     * @returns The created categories
     */
    async ensureCategoriesExist(categories: string[]) {
        const created = await prisma.category.createMany({
            data: categories.map(category => ({ name: category })),
            skipDuplicates: true
        })
        return created
    },

    /**
     * Creates a category.
     *
     * @param name - name of category to create
     * @returns the DB response (created category)
     */
    async createCategory(name: string) {
        return await prisma.category.create({
            data: {
                name
            }
        })
    },

    /**
     * Gets a unique user by their Id.
     *
     * @param userId - the userId to find
     * @returns a user object
     */
    async getUserById(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                followed: true,
                followers: true,
                posts: {
                    orderBy: [
                        {
                            timestampCreated: 'desc'
                        }
                    ]
                }
            }
        })
    },

    /**
     * Allows a user to follow another user by their Id.
     *
     * @param userId - The user requesting
     * @param userToFollowId - the user to follow
     * @returns The success of the DB query.
     */
    async followUserById(userId: string, userToFollowId: string) {
        return await prisma.user.update({
            where: {
                id: userToFollowId
            },
            data: {
                followers: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    },

    /**
     * Allows a user to unfollow another user by their Id.
     *
     * @param userId - the user requesting to unfolllow
     * @param userToUnfollowId - the Id of the user to unfollow
     * @returns Whether the query was successful
     */
    async unfollowUserById(userId: string, userToUnfollowId: string) {
        return await prisma.user.update({
            where: {
                id: userToUnfollowId
            },
            data: {
                followers: {
                    disconnect: {
                        id: userId
                    }
                }
            }
        })
    },

    /**
     * Gets the current user information by their Id.
     *
     * @param userId - the current users Id
     * @returns the current users user object
     */
    async getCurrentUser(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                followed: true,
                followers: true
            },
            rejectOnNotFound: true
        })
    },

    getName(user: UserRecord) {
        if (user.displayName) return user.displayName
        if (user.email) return user.email.slice(0, user.email.indexOf('@'))
        return 'Unnamed'
    },

    /**
     * Creates a unique user with a unique id and user handle.
     * Reattempts to create a unique handle for the user if a clash exists.
     *
     * @param user - the user profile information
     * @returns the newly created user object
     */
    async createUser(user: UserRecord): Promise<User> {
        try {
            const name = this.getName(user)
            const userCount = await prisma.user.count()
            const handle = name + userCount
            log.info(
                `Attempting to generate handle for user with id ${user.uid}. Handle will be ${handle}`
            )

            return await prisma.user.upsert({
                where: {
                    id: user.uid
                },

                update: {
                    name,
                    imageUrl: user.photoURL
                },
                create: {
                    id: user.uid,
                    name,
                    imageUrl: user.photoURL,
                    handle
                }
            })
        } catch (error: any) {
            // if unique constraint on handle violated, we should retry generating a handle
            if (error?.meta?.target?.includes('handle')) {
                log.info(`Retrying handle generation for user with id ${user.uid}`)
                return this.createUser(user)
            }
            throw error
        }
    }
}

export default repository
