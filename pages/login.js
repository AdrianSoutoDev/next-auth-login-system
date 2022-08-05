import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { signIn } from 'next-auth/react';

export default function Login() {

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [remember, setRemember] = useState(false)
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

  useEffect(() => {
    const autofilledUSer = document.getElementById('floatingInput').value
    const autofilledPassword = document.getElementById('floatingPassword').value
    if(autofilledUSer) setUserName(autofilledUSer)
    if(autofilledPassword) setPassword(autofilledPassword)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    signIn('credentials', {username, password, remember, callbackUrl: callback })
  }

  function handleChange(e) {
    if(e.target.id === "floatingInput"){
      setUserName(e.target.value)
    }else{
      setPassword(e.target.value)
    }
    setError("")
  }


  return (
    <Layout>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}} >
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input type="username" className="form-control" id="floatingInput" placeholder="Username" onChange={e => handleChange(e)}/>
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating" >
            <input id="floatingPassword" className="form-control" type="password" placeholder="Password" onChange={e => handleChange(e)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
          {
          error && 
          <p style={{color: "red", fontSize: "small"}}>{error}</p>
          }
          <div>
            <input className="mt-3" type="checkbox" id="remember" onChange={e => setRemember(e.target.checked)}/>
            <label htmlFor="remember" style={{paddingLeft: "5px"}}>Remember</label>
          </div>
        </form>
    </Layout>
  )
}
