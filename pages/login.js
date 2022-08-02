import React, { useState } from 'react'
import Layout from '../components/Layout'
import { signIn } from 'next-auth/react';


export default function Login() {

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [remember, setRemember] = useState(false)

  function handleSubmit(e) {
      e.preventDefault()
      signIn('credentials', {username, password, remember})
  }

  return (
    <Layout>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}} >
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input type="username" className="form-control" id="floatingInput" placeholder="Username" onLoad={e => setUserName(e.target.value)} onChange={e => setUserName(e.target.value)}/>
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating" >
            <input id="floatingPassword" className="form-control" type="password" placeholder="Password" onLoad={e => setPassword(e.target.value)} onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
          <div>
            <input className="mt-3" type="checkbox" id="remember" onChange={e => setRemember(e.target.checked)}/>
            <label htmlFor="remember" style={{paddingLeft: "5px"}}>Remember</label>
          </div>
        </form>
    </Layout>
  )
}
