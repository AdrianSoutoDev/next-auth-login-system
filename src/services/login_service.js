import connectMongo  from '../../mongodb'
import User from '../models/user'
import bcrypt from 'bcrypt'
import * as  loginRepository from '../repositories/login_repository'

const saltRounds = 10

const register = async (user) => {
  const { username, password, email } = user

  try {
    await connectMongo()
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({ username, password: passwordHash, email })
    return loginRepository.register(newUser)
  } catch (error) {
    console.log(error)
  }
}

const login = async (username, password) => {
  try {
    await connectMongo()
    const user = await loginRepository.login(username, password)
    return (user != null && await bcrypt.compare(password, user.password)) ? user.toJSON() : null
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  register,
  login
}
