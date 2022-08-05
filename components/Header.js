import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { useEffect } from 'react'

export default function Header() {

  const { data: session, status } = useSession()

  async function handleSignOut() {
    await signOut({redirect: true, callbackUrl: "/"})
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link href="/"><a className="navbar-brand" >Home</a></Link> 
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                      status !== "loading" &&
                      <>
                        {
                          !session ? 
                            <>
                              <li className="nav-item">
                                <Link href="/login"><a className="nav-link" >Sing In</a></Link>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="#">Register</a>
                              </li>  
                            </>
                          :
                            <>
                              <li className="nav-item">
                              <Link href=""><a className="nav-link" onClick={ handleSignOut } >Logout</a></Link>
                              </li>
                              <li className="nav-item">
                                <Link href="/user"><a className="nav-link">{session.user.username}</a></Link>
                              </li> 
                            </>
                        }
                      </>
                    }
                
                </ul>
              </div>
            </div>
      </nav>
    </header>
  )
}