import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ParamsDictionary } from 'express-serve-static-core/index'
import { StatusCodes } from 'http-status-codes'
import { dbPostToPostDto, dbPostToPostWithCommentsDto } from '../data/post'
import repository from '../data/repository'
import Logger from '../util/logger'

/**
 * posts-id.ts is a controller for post related endpoints, requiring ids.
 *
 *
 * Contains handlers for endpoints:
 *  - get post by id
 *  - deleting a post by id
 *  - reacting/unreacting to a post
 *  - update a post by id
 */

const log = Logger.getLogger('posts-id')

type getPostById = (
    req: Request,
    res: Response<Paths.GetPostById.Responses.$200 | Paths.GetPostById.Responses.$404>
) => void

type deletePostById = (
    req: Request,
    res: Response<
        | Paths.DeletePostById.Responses.$204
        | Paths.DeletePostById.Responses.$400
        | Paths.DeletePostById.Responses.$404
    >
) => void

type updatePost = (
    req: Request<ParamsDictionary, {}, Paths.UpdatePost.RequestBody>,
    res: Response<
        | Paths.UpdatePost.Responses.$204
        | Paths.UpdatePost.Responses.$400
        | Paths.UpdatePost.Responses.$404
    >
) => void

type reactToPost = (
    req: Request<ParamsDictionary, {}, Paths.ReactToPost.RequestBody>,
    res: Response<
        | Paths.ReactToPost.Responses.$204
        | Paths.ReactToPost.Responses.$400
        | Paths.ReactToPost.Responses.$404
    >
) => void

/**
 * Handles getPostById endpoint. Gets a post by its Id.
 * Returns a 404 if not found, else a 200 with the post with comments.
 *
 *
 * @param req - request, with postId in the params.
 * @param res - response callback object.
 * @returns
 */
const getPostByIdHandler: getPostById = async (req, res) => {
    const id = Number(req.params.id)

    const post = await repository.getPostByIdWithComments(id)
    if (post === null) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    const user = await repository.getCurrentUser(req.userId)

    return res.status(StatusCodes.OK).json(dbPostToPostWithCommentsDto(post, user))
}

export const getPostById = asyncHandler(getPostByIdHandler)

/**
 * Handles updatePost endpoint. Gets a post by its Id and updates it.
 * Returns a 404 if not found, else a 204.
 *
 *
 * @param req - request, with postId in the params and the post information in the body
 * @param res - response callback object.
 * @returns
 */
const updatePostHandler: updatePost = async (req, res) => {
    const postId = Number(req.params.id)

    const response = await repository.updatePost(postId, req.body)

    if (response === null) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    return res.status(StatusCodes.NO_CONTENT).end()
}

export const updatePost = asyncHandler(updatePostHandler)

/**
 * Handles deletePostById endpoint. Deletes a post by  its Id.
 * Returns a 404 if not found, else a 204.
 *
 *
 * @param req - request, with postId in the params.
 * @param res - response callback object.
 * @returns
 */
const deletePostByIdHandler: deletePostById = async (req, res) => {
    const postId = Number(req.params.id)

    const post = await repository.getPostById(postId)
    if (post === null || post.userId !== req.userId) {
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    await repository.deletePost(postId)

    return res.status(StatusCodes.NO_CONTENT).end()
}

export const deletePostById = asyncHandler(deletePostByIdHandler)

/**
 * Handles reactToPost endpoint. Allows a user to react or unreact to a post by its Id.
 * Returns a 404 if not found, else a 204.
 *
 *
 * @param req - request, with postId in the params, and the userId.
 * @param res - response callback object.
 * @returns
 */
const reactToPostHandler: reactToPost = async (req, res) => {
    const postId = Number(req.params.id)

    try {
        if (req.body.liked) {
            await repository.likePost(req.userId, postId)
        } else {
            await repository.unlikePost(req.userId, postId)
        }
    } catch (error) {
        log.error(error)
        return res.status(StatusCodes.NOT_FOUND).end()
    }

    return res.status(StatusCodes.NO_CONTENT).end()
}

export const reactToPost = asyncHandler(reactToPostHandler)
