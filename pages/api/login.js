import { login } from '../../src/services/login_service'

export default async function handler(request, response) {

    if (request.method === 'POST') {

        const { body } = request
        const { username, password} = body

        const user = await login(username, password)

        if (user != null) {
            return response.status(200).json({
                user: user
            })
        }

        return response.status(401).json({ error: 'Invalid user or password' })
    }else{
        return response.status(404).json({ error: 'Not here' })
    }
}