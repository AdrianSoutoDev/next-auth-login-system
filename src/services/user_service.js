import { findUserByUsername, findUserByEmail, findUserById as findUserByIdBd } from '../repositories/user_repository'

const usernameExists = async (username) => {
  try {
    return await findUserByUsername(username) != null
  } catch (error) {
    console.log(error)
  }
}

const emailExists = async (email) => {
  try {
    return await findUserByEmail(email) != null
  } catch (error) {
    console.log(error)
  }
}

const findUserById = async (id) => {
  return await findUserByIdBd(id)
}

module.exports = {
  usernameExists,
  emailExists,
  findUserById
}
