const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { movieService } = require("../services");

/**
 * Fetch the movie(s) (for user)
 *
 * Example response:
 * HTTP 200 OK
 *  [
 *      {
 *          "id": "clpvtymfb0003m66phdk5nskt",
 *          "name": "ball",
 *          "rating": 5,
 *          "cast": ["data"],
 *          "genre": "genre",
 *          "releaseDate": "2000-12-11T18:30:00.000Z",
 *          "userId": "clpvn60nt0000j1lzohz6jqx3",
 *          "createdAt": "2023-12-07T23:29:40.103Z",
 *          "updatedAt": "2023-12-07T23:29:40.103Z"
 *        },{},..
 *  ]
 * 
 */
const getMovies = catchAsync(async (req, res) => {
    const { id: userId } = req.user;
    const movies = await movieService.getMovies(userId);
    res.status(httpStatus.OK).send(movies);
});

/**
 * Add a Movie for a user
 * 
 * Example response:
 * HTTP 201 OK
 *  
 *      {
 *          "id": "clpvtymfb0003m66phdk5nskt",
 *          "name": "ball",
 *          "rating": 5,
 *          "cast": ["data"],
 *          "genre": "genre",
 *          "releaseDate": "2000-12-11T18:30:00.000Z",
 *          "userId": "clpvn60nt0000j1lzohz6jqx3",
 *          "createdAt": "2023-12-07T23:29:40.103Z",
 *          "updatedAt": "2023-12-07T23:29:40.103Z"
 *        }
 * 
 * 
 */
const addMovie = catchAsync(async (req, res) => {
  const {  name, rating, cast, genre, releaseDate } = req.body;
  const { id: userId } = req.user;
  const movie = await movieService.addMovie(
    userId,
    { name, rating, cast, genre, releaseDate }
  );

  res.status(httpStatus.CREATED).send(movie);
});

/**
 * Update a Movie 
 * Example response:
 * HTTP 200 OK
 *  
 *      {
 *          "id": "clpvtymfb0003m66phdk5nskt",
 *          "name": "ball",
 *          "rating": 5,
 *          "cast": ["data"],
 *          "genre": "genre",
 *          "releaseDate": "2000-12-11T18:30:00.000Z",
 *          "userId": "clpvn60nt0000j1lzohz6jqx3",
 *          "createdAt": "2023-12-07T23:29:40.103Z",
 *          "updatedAt": "2023-12-07T23:29:40.103Z"
 *        }
 */
const updateMovie = catchAsync(async (req, res) => {
    const {  name, rating, cast, genre, releaseDate } = req.body;
    const { id: userId } = req.user;
    const { movieId } = req.params;
    const movie = await movieService.updateMovie(
      userId, movieId,
      { name, rating, cast, genre, releaseDate }
    );

  return res.status(httpStatus.OK).send(movie);
});

/**
 * Delete Movie
 * Example response:
 * HTTP 204 NO CONTENT
 *  
 */
const deleteMovie = catchAsync(async (req, res) => {
    const { id: userId } = req.user;
    const { movieId } = req.params;
    await movieService.deleteMovie(userId, movieId);
    return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
