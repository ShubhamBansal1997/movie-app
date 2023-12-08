const Joi = require("joi");


/**
 * Check request *body* for fields (all are *required*)
 * - "name" : string
 * - "rating": number >=0 and <= 5
 * - "cast": array of string
 * - "genre": string
 * - "releaseDate": "date"
 */
const addMovie = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        rating: Joi.number().min(0).max(5).required(),
        cast: Joi.array().items(Joi.string()).required(),
        genre: Joi.string().required(),
        releaseDate: Joi.date().required(),
    })
}

/**
 * Check request *body* for fields
 * - "name" : string
 * - "rating": number >=0 and <= 5
 * - "cast": array of string
 * - "genre": string
 * - "releaseDate": "date"
 */
const updateMovie = {
    body: Joi.object().keys({
        name: Joi.string(),
        rating: Joi.number().min(0).max(5),
        cast: Joi.array().items(Joi.string()),
        genre: Joi.string(),
        releaseDate: Joi.date()
    }),
    params: Joi.object().keys({
        movieId: Joi.string().required(),
    })
}

/**
 * Check request *body* for fields (all are *required*)
 * - "movieId": string
 */
const deleteMovie = {
    params: Joi.object().keys({
        movieId: Joi.string().required(),
    })
}

module.exports = {
    addMovie,
    updateMovie,
    deleteMovie
}