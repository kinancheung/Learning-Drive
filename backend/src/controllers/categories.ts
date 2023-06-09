import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ParamsDictionary } from 'express-serve-static-core/index'
import { StatusCodes } from 'http-status-codes'
import repository from '../data/repository'

/**
 * categories.ts is a controller for category related endpoints.
 *
 *
 * Contains handlers for endpoints:
 *  - getting categories
 *  - creating a category
 */

type getCategories = (req: Request, res: Response<Paths.GetCategories.Responses.$200>) => void

type createCategory = (
    req: Request<ParamsDictionary, {}, Paths.CreateCategory.RequestBody>,
    res: Response<Paths.CreateCategory.Responses.$201 | Paths.CreateCategory.Responses.$400>
) => void

/**
 * Handles getCategories. Returns a list of all categories from the DB.
 * Returns a 200 with categories in a list.
 *
 *
 * @param req - empty request
 * @param res - response callback object.
 * @returns
 */
const getCategoriesHandler: getCategories = async (req, res) => {
    const categories = await repository.getCategories()

    return res.status(StatusCodes.OK).json({
        categories: categories.map(category => category.name)
    })
}

export const getCategories = asyncHandler(getCategoriesHandler)

/**
 * Handles createCategory. Creates a category in the DB.
 * Returns a 201, with the category name attatched.
 *
 * @param req - body, with category
 * @param res response callback object, with category in body.
 * @returns
 */
const createCategoryHandler: createCategory = async (req, res) => {
    const category = req.body.category
    const response = await repository.createCategory(category)

    return res.location(`/categories/${response.name}`).status(StatusCodes.CREATED).json({
        category: response.name
    })
}

export const createCategory = asyncHandler(createCategoryHandler)
