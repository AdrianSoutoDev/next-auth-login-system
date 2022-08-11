import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useLocale } from '../hooks/useLocale';
import { useRouter } from 'next/router';

export default function Header() {

  const router = useRouter();
  const dictionary = useLocale()
  const { data: session, status } = useSession()
  const { locale } = router;

  async function handleSignOut() {
    await signOut({redirect: true, callbackUrl: "/"})
  }

  function handleClick(e){
    const { pathname, query, asPath } = router;
    const newlocale = e.target.value
    document.cookie=`NEXT_LOCALE=${newlocale};SameSite=strict,path=/`
    router.push({pathname, query}, asPath, { locale: newlocale })
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link href="/"><a className="nav-link" >Home</a></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {
                      status !== "loading" &&
                      <>
                        {
                          !session ? 
                            <>   
                                <Link href="/login"><a className="nav-link" >{dictionary.SignIn}</a></Link>
                                <Link href="/register"><a className="nav-link" >{dictionary.SignUp}</a></Link>    
                            </>
                          :
                            <>
                              <Link href=""><a className="nav-link" onClick={ handleSignOut } >{dictionary.Logout}</a></Link>
                              <Link href="/user"><a className="nav-link">{session.user.username}</a></Link>
                            </>
                        }
                      </>
            }
            <button onClick={(e)=> handleClick(e)} value='es-ES'>ES</button>
            <button onClick={(e) => handleClick(e)} value='en-US'>EN</button>
            <p>Current locale: {locale}</p>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}