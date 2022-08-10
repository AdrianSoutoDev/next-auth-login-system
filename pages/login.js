import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { signIn } from 'next-auth/react';

export default function Login() {
  const [callback, setCallback] = useState("/")
  const [error, setError] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const errorCallback = query.get('error')
    const callback = query.get('callbackUrl')

    if(errorCallback){
      if(errorCallback === "CredentialsSignin"){
        setError("Usuario o contraseña incorrectos")
      }
    }

    if (callback) {
      setCallback(callback)
    }
  },[])

  function handleSubmit(e) {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    signIn('credentials', { username, password, callbackUrl: callback })
  }

  return (
    <Layout>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}} >
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input type="username" className="form-control" id="username" name="username" placeholder="Username" onChange={e => setError("")}/>
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating" >
            <input className="form-control" type="password" id="password" name="password" placeholder="Password" onChange={e => setError("")}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
          {
          error && 
          <p style={{color: "red", fontSize: "small"}}>{error}</p>
          }
        </form>
    </Layout>
  )
}
