const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - Return the whole user object fetched from SQL

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "id": "6010008e6c3477697e8eaba3",
 *     "name": "users",
 *     "email": "user@gmail.com",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 403 - If request data doesn't match that of authenticated user
 * HTTP 404 - If user entity not found in DB
 * 
 */
const getUser = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const data = await userService.getUserById(userId);
  delete data?.password;

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (data.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }
  res.send(data);
});

module.exports = {
  getUser
};
