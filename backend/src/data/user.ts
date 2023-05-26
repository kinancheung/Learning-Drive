import { Post, User } from '@prisma/client'
import { uniq } from 'lodash'

/**
 * user.ts is a utility file for API responses regarding user information,
 *
 *
 * Contains functions for calculating streaks, post maps, and DTOs.
 */

type dbUser = User & {
    followed: User[]
    followers: User[]
    posts: Post[]
}

/**
 * A DTO for converting a database user to a API user.
 *
 * @param user - database user object
 * @returns - user object for API.
 */
export const dbUserToUserDto = (user: User): Components.Schemas.User => {
    return {
        _id: user.id,
        handle: user.handle,
        imageUrl: user.imageUrl || undefined,
        name: user.name
    }
}

const getDay = (date: Date) => Math.floor(date.getTime() / 1000 / 60 / 60 / 24)

/**
 * Calculates the number of days in a row the user has posted.
 *
 * @param posts - A list of the users posts
 * @returns streak - a number representing the number of days in a row the user has posted
 */
const getPostStreak = (posts: Post[]) => {
    let streak = 0
    const dates = [getDay(new Date()), ...uniq(posts.map(post => getDay(post.timestampCreated)))]

    for (let i = 1; i < dates.length; i++) {
        if (dates[i] == dates[i - 1] - 1 || dates[i] == dates[0]) {
            streak++
        } else {
            break
        }
    }
    return streak
}

const HEATMAP_SIZE = 91

/**
 * Creates an array of numbers, representing number of posts.
 *
 * @param posts - A list of the users posts
 * @returns heatmap - an array of numbers, representing the users streak
 */
const getPostHeatmap = (posts: Post[]): number[] => {
    const heatmap = Array(HEATMAP_SIZE).fill(0)

    const today = getDay(new Date())
    for (const post of posts) {
        const date = getDay(post.timestampCreated)
        const d = today - date

        if (d >= HEATMAP_SIZE) {
            break // posts are ordered so all following posts will also be old
        }
        heatmap[d]++
    }
    heatmap.reverse()
    return heatmap
}

/**
 * A DTO for converting a database user to the API spec of a full user profile.
 *
 * @param user - database user information
 * @returns FullProfileDto - formatted user info, including followers, following, and streak information.
 */
export const dbUserToUserFullProfileDto = (user: dbUser): Components.Schemas.UserFullProfile => {
    return {
        user: dbUserToUserDto(user),
        followed: user.followed.map(dbUserToUserDto),
        followers: user.followers.map(dbUserToUserDto),
        followedCount: user.followed.length,
        followerCount: user.followers.length,
        streak: getPostStreak(user.posts),
        heatmap: getPostHeatmap(user.posts)
    }
}
