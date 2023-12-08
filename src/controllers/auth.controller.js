const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const config = require("../config/config");
const { authService, userService, tokenService } = require("../services");

/**
 * Perform the following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "id": "5f71b31888ba6b128ba16205",
 *      "name": "user",
 *      "email": "user@gmail.com",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).cookie('jwt',
    tokens?.access?.token, {
        httpOnly: true,
        secure: config.env === "development" ? false : true //--> SET TO TRUE ON PRODUCTION
    }
  ).send({ user, tokens });
});

/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "id": "5f71b31888ba6b128ba16205",
 *      "name": "user",
 *      "email": "user@gmail.com",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).cookie('jwt',
    tokens?.access?.token, {
        httpOnly: true,
        secure: config.env === "development" ? false : true //--> SET TO TRUE ON PRODUCTION
    }
  ).send({ user, tokens });
});

/**
 * Logout the user by removing the token from the cookie
 * Example response:
 * 200 OK STATUS CODE
 * {
 *    "message": "You have logged out"
 * }
 */
const logOut = catchAsync(async (req, res) => {
  if (req.cookies['jwt']) {
    res
    .clearCookie('jwt').status(httpStatus.OK)
    .json({ message: 'You have logged out'})
} else {
    res.status(httpStatus.UNAUTHORIZED).json({error: 'Invalid jwt'})
}

})

module.exports = {
  register,
  login,
  logOut,
};
