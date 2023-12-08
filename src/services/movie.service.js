const httpStatus = require("http-status");
const {prisma} = require("../db/prisma");
const ApiError = require("../utils/ApiError");


/**
 * Fetches movies for a user
 *
 * @param {string} userId
 * @returns {Promise<Movies>}
 */
const getMovies = async (userId) => {
    try {
        return prisma.movie.findMany({
            where: { userId }
        });
    } catch (e) {
        if (e.code === 'P2025') {
            throw new ApiError(httpStatus.NOT_FOUND, e.meta.cause);
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.meta.cause);
        }
    }
};

/**
 * Adds a new movie
 *
 * @param {string} userId
 * @param {object} movieData
 * @returns {Promise<Movie>}
 */
const addMovie = async (userId, movieData) => {
    try {
        return prisma.movie.create({
            data: {...movieData, userId}
        })
    } catch (e) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.meta.cause);
    }
};

/**
 * Updates the movie
 *
 *
 * @param {string} userId
 * @param {string} movieId
 * @returns {Promise<movieData>}
 */
const updateMovie = async (userId, movieId, movieData) => {
    try {
        const dataToUpdate = Object.fromEntries(Object.entries(movieData).filter(([key, value]) => value !== null && value !== undefined));
        const movie = await prisma.movie.update({
            where: { userId, id: movieId},
            data: { ...dataToUpdate }
        });
        return movie;
    }  catch (e) {
        if (e.code === 'P2025') {
            throw new ApiError(httpStatus.NOT_FOUND, e.meta.cause);
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.meta.cause);
        }
    }
};

/**
 * Deletes an already existing movie
 *
 *
 * @param {string} userId
 * @param {string} movieId
 */
const deleteMovie = async (userId, movieId) => {
    try {
        const deletedMovie = await prisma.movie.delete({
            where: {userId, id: movieId}
        })
    } catch (e) {
        if (e.code === 'P2025') {
            throw new ApiError(httpStatus.NOT_FOUND, e.meta.cause);
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.meta.cause);
        }
    }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  updateMovie,
};
