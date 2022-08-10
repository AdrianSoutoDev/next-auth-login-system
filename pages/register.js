import React, { useState } from 'react'
import Layout from '../components/Layout'
import { register } from '../services/register_service'
import { useRouter } from 'next/router'

export default function Register() {

    const [error, setError] = useState("")
    const [errorRepeatPassword, setErrorRepeatPassword] = useState("")
    const router = useRouter()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(e.target.password.value !== e.target.password2.value)  {
            setErrorRepeatPassword("Passwords do not match")
        }else{
            const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
            }

            register(data).then(res => {
                res.status === 201 
                ? 
                router.push('/login') 
                : 
                res.json().then(json => setError(json.error))
            })
        }
    }
      
    return (
        <Layout>
            <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
            <h1 className="h3 mb-3 fw-normal">Registrer</h1>

            {
            error && 
            <p style={{color: "red", fontSize: "small"}}>{error}</p>
            }

            <label style={{marginTop: "5px"}} htmlFor="username">Username</label>
            <input className="form-control" type="text" id="username" placeholder="Username" required />
            
            <label style={{marginTop: "5px"}} htmlFor="email">Email</label>
            <input className="form-control" type="text" id="email" placeholder="Email"required />
            
            <label style={{marginTop: "5px"}} htmlFor="password">Password</label>
            <input className="form-control" type="password" placeholder="Password" id="password" onChange={e => setErrorRepeatPassword("")} required />
            <input className="form-control" type="password" placeholder="Repeat password" id="password2" onChange={e => setErrorRepeatPassword("")} required />
            
            {
            errorRepeatPassword && 
            <p style={{color: "red", fontSize: "small"}}>{errorRepeatPassword}</p>
            }

            <button style={{marginTop: "5px"}} className="w-100 btn btn-lg btn-primary mt-3" type="submit">Register</button>
            </form>
        </Layout>
    )

}
