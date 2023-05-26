import { Post, User, OpenGraph } from '@prisma/client'
import { dbUserToUserDto } from './user'

/**
 * post.ts is a utility file for API responses regarding post information,
 *
 *
 * Contains functions for Post and Post with comments DTOs
 */

type dbPost = Post & {
    user: User
    likedUsers: User[]
    openGraph: OpenGraph | null
    _count?: {
        children: number
    } | null
    parent: (Post & { user: User }) | null
}

type dbPostWithComments = Post & {
    children: (Post & {
        children: (Post & {
            user: User
            likedUsers: User[]
            parent: (Post & { user: User }) | null
            openGraph: OpenGraph | null
            _count: {
                children: number
            } | null
        })[]
        user: User
        likedUsers: User[]
        openGraph: OpenGraph | null
        parent: (Post & { user: User }) | null
    })[]
    user: User
    likedUsers: User[]
    openGraph: OpenGraph | null
    parent: (Post & { user: User }) | null
}

/**
 * Converts the DB representation of a post, to the required client representation.
 * The required representation has both the post information, and the posting user info.
 *
 *
 * @param post - the DB post object representation
 * @param user - the user of whome the post belongs to
 * @returns A postDTO,  which includes both post information and the poster users information.
 */
export const dbPostToPostDto = (post: dbPost, user: User): Components.Schemas.Post => {
    return {
        _id: post.id,
        parentId: post.parent?.id || undefined,
        parentHandle: post.parent?.user.handle,
        categories: post.categories as any, // fix length complaint
        content: post.content,
        timestampCreated: post.timestampCreated.getTime(),
        timestampModified: post.timestampModified.getTime(),
        resource: post.resource
            ? {
                link: post.resource,
                openGraph: {
                    description: post.openGraph?.description || undefined,
                    // The automatic validation dosnt seem to like urls that start with "//"
                    imageUrl: post.openGraph?.imageUrl?.replace(/^\/\//, 'https://') || undefined,
                    title: post.openGraph?.title || undefined,
                    url: post.openGraph?.url.replace(/^\/\//, 'https://') || undefined
                }
            }
            : undefined,
        reactions: {
            isPersonallyLiked: post.likedUsers.map(user => user.id).includes(user.id),
            likes: post.likedUsers.reduce((acc, _) => acc + 1, 0),
            commentCount: post._count?.children || 0
        },

        user: dbUserToUserDto(post.user)
    }
}

/**
 * Converts the DB representation of a post with comments, to the required client representation.
 * The required representation has both the post information, and the posting user info, as well as comments.
 *
 *
 * @param post - the DB post object representation with comments
 * @param user - the user of whome the post belongs to
 * @returns A postWithCommentsDTO,  which includes both post information and the poster users information.
 */
export const dbPostToPostWithCommentsDto = (
    post: dbPostWithComments,
    user: User
): Components.Schemas.PostWithComments => {
    const comments = post.children.map(child => ({
        ...dbPostToPostDto(child, user),
        comments: child.children.map(grandchild => dbPostToPostDto(grandchild, user))
    }))

    return { comments, ...dbPostToPostDto(post, user) }
}
