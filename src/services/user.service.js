const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { prisma } = require("../db/prisma");

/**
 * Get User by id
 * - Fetch user object from Mongo using the "id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 * @throws {ApiError}
 */
const getUserById = async (id) => {
  try {
    return prisma.user.findUnique({
      where: { id },
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
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 * @throws {ApiError}
 */
const getUserByEmail = async (email) => {
  try {
    return prisma.user.findUnique({
      where: { email },
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
 * Create a user
 *  - check if the user with the email already exists using `user.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "users",
 *  "email": "user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const createUser = async (userBody) => {
  const isEmailTaken = await prisma.user.isEmailTaken(userBody.email);
  if (isEmailTaken) 
    throw new ApiError(httpStatus.OK, "Email already taken");
  const hashedPassword = await bcrypt.hash(userBody.password, 10);
  try {
    const user = await prisma.user.create({
      data: { ...userBody, password: hashedPassword }
    });
    delete user.password;
    return user;
  } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.meta.cause);
  }
};

/**
 * Matches the hash of two passwords
 * @param {string} password 
 * @param {string} passwordToMatch 
 * @returns 
 */
const isPasswordMatch = (password, passwordToMatch) => {
  return bcrypt.compare(password, passwordToMatch);
}


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  isPasswordMatch
};
