import { register } from '../../src/services/login_service'
import { usernameExists, emailExists } from '../../src/services/user_service'

export default async function handler(req, res) {
    const { body } = req
    const { username, password, email } = body

    if (await usernameExists(username)) {
      return res.status(409).json( {error: 'this username already exists: ' + username} )
    };
  
    if (await emailExists(email)) {
      return res.status(409).json({ error: 'this email already exists: ' + email })
    };
  
    const newUser = await register({ username, password, email })
    return res.status(201).json(newUser)
  }
  