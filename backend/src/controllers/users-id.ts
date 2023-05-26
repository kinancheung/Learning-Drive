import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ParamsDictionary } from 'express-serve-static-core/index'
import { StatusCodes } from 'http-status-codes'
import repository from '../data/repository'
import { dbUserToUserFullProfileDto } from '../data/user'

/**
 * user-id.ts is a controller for user related endpoints.
 *
 *
 * Contains handlers for endpoints:
 *  - following/unfollowing users
 *  - get users by Id
 *  - get userId by their handle
 */

type getUserById = (
    req: Request,
    res: Response<Paths.GetUserById.Responses.$200 | Paths.GetUserById.Responses.$404>
) => void

type followUserById = (
    req: Request<ParamsDictionary, {}, Paths.FollowUser.RequestBody>,
    res: Response<Paths.FollowUser.Responses.$204>
) => void
type getHandleFromUserId = (
    req: Request<ParamsDictionary>,
    res: Response<
        Paths.GetUserIdFromHandle.Responses.$200 | Paths.GetUserIdFromHandle.Responses.$404
    >
) => void

/**
 * Handles getUserById endpoint. Gets the requested users full profile information.
 * Returns a 404, or on success a 200, with the attatched fullUserProfile.
 *
 * @param req - request, with the requested users Id in the params
 * @param res - response callback object, with fullUserProfile in body
 * @returns
 */
const getUserByIdHandler: getUserById = async (req, res) => {
    const user = await repository.getUserById(req.params.id)

    if (user === null) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    return res.status(StatusCodes.OK).json(dbUserToUserFullProfileDto(user))
}

export const getUserById = asyncHandler(getUserByIdHandler)

/**
 * Handles followUserById endpoint. Follows or Unfollows requested user.
 * Returns a 404, or on success a 204.
 *
 * @param req - request, with the requested users Id in the params
 * @param res - response callback object, with no content
 * @returns
 */
const followUserByIdHandler: followUserById = async (req, res) => {
    let following = null

    if (req.body.following) {
        following = await repository.unfollowUserById(req.userId, req.params.id)
    } else {
        following = await repository.followUserById(req.userId, req.params.id)
    }

    if (following === null) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    return res.status(StatusCodes.NO_CONTENT).end()
}

export const followUserById = asyncHandler(followUserByIdHandler)

/**
 * Handles getHandleForUserId endpoint. Gets the requested usersId by their Handle.
 * Returns a 404, or on success a 200, with the attatched userId.
 *
 * @param req - request, with the a user handle in params
 * @param res - response callback object, with corrosponding userId
 * @returns
 */
const getHandleForUserIdHandler: getHandleFromUserId = async (req, res) => {
    const userId = await repository.getUserIdByHandle(req.params.handle)

    if (userId === null) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    res.status(StatusCodes.OK).json(userId)
}

export const getUserIdFromHandle = asyncHandler(getHandleForUserIdHandler)
