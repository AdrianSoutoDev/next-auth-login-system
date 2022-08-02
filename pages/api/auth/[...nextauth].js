import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from '../../../src/services/login_service'

const options = {
    //Configure JWT
    session: {
      strategy: "jwt"
    },
    callbackUrl: 'http://localhost:3000/',
    //Specify Provider
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          async authorize({username, password}, req, res) {
            const user = await login(username, password)
            if(user) return user
            else return null
          }
        })
      ],
      callbacks: {
        session: async ({ session, token }) => {
                    session.user = token.user
                    return Promise.resolve(session);
                  },
                  async jwt({ token, user }){
                    if (user) token.user = user
                    return Promise.resolve(token);
                  },
    },
  }  

const nextAuthConfig = (req, res) => NextAuth(req, res, options)

export default nextAuthConfig