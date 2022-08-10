import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { Nav, Navbar, Container } from 'react-bootstrap';

export default function Header() {

  const { data: session, status } = useSession()

  async function handleSignOut() {
    await signOut({redirect: true, callbackUrl: "/"})
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {
                      status !== "loading" &&
                      <>
                        {
                          !session ? 
                            <>   
                                <Link href="/login"><a className="nav-link" >Sing In</a></Link>
                                <Link href="/register"><a className="nav-link" >Sing Up</a></Link>    
                            </>
                          :
                            <>
                              <Link href=""><a className="nav-link" onClick={ handleSignOut } >Logout</a></Link>
                              <Link href="/user"><a className="nav-link">{session.user.username}</a></Link>
                            </>
                        }
                      </>
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}