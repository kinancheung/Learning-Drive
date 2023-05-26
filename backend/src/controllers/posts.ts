import { OpenGraph, Post } from '@prisma/client'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ParamsDictionary } from 'express-serve-static-core/index'
import { StatusCodes } from 'http-status-codes'
import { dbPostToPostDto } from '../data/post'
import repository from '../data/repository'

/**
 * posts.ts is a controller for post related endpoints.
 *
 *
 * Contains handlers for endpoints:
 *  - get posts (global and only following posts)
 *  - creating a post
 */

type getPosts = (
    req: Request<ParamsDictionary, {}, Paths.GetPosts.RequestBody>,
    res: Response<Paths.GetPosts.Responses.$200 | Paths.GetPosts.Responses.$400>
) => void

type createPosts = (
    req: Request<ParamsDictionary, {}, Paths.CreatePost.RequestBody>,
    res: Response<Paths.CreatePost.Responses.$201 | Paths.CreatePost.Responses.$400>
) => void

/**
 * Handles getPosts endpoint. Gets a post based upon a given client query.
 * Returns a 200 with the posts.
 *
 *
 * @param req - request, with userID in the params, and post request in body.
 * @param res - response callback object.
 * @returns
 */
const getPostsHandler: getPosts = async (req, res) => {
    const posts = await repository.getPosts(req.body, req.userId)

    const user = await repository.getCurrentUser(req.userId)

    return res.status(StatusCodes.OK).json({
        posts: posts.map(post => dbPostToPostDto(post, user))
    })
}

export const getPosts = asyncHandler(getPostsHandler)

/**
 * Handles createPosts endpoint. Create a post based upon the request body.
 * Returns a 201 with the post URI, or a 404.
 *
 * Creates a post in the DB, as well as, the opengraph for said post.
 *
 *
 * @param req - request, with parentId (poster) in the body, and post information in body.
 * @param res - response callback object.
 * @returns
 */
const createPostsHandler: createPosts = async (req, res) => {
    if (req.body.parentId) {
        const post = await repository.getPostById(req.body.parentId)
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Parent post with id ${req.body.parentId} could not be found'
            })
        }
    }

    const promises: [Promise<{ count: number }>, Promise<OpenGraph>?] = [
        repository.ensureCategoriesExist(req.body.categories as string[])
    ]

    if (req.body.resource) {
        promises.push(repository.getOrCreateOpenGraph(req.body.resource))
    }

    await Promise.all(promises)
    const response = await repository.createPost(req.userId, req.body)

    return res.status(StatusCodes.CREATED).location(`/posts/${response.id}`).end()
}

export const createPosts = asyncHandler(createPostsHandler)
