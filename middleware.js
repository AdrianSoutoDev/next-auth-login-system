import { NextResponse } from "next/server"
import { jwtVerify } from 'jose';

const pathsProtectedWithLogin = ['/user']

function redirectLogin(url){
  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export async function middleware(req) {
  //USE EXTRACTOR JWT TOKEN
  if (pathsProtectedWithLogin.some(s => req.nextUrl.pathname.startsWith(s))) {

     var accessToken = req.cookies.get('accessToken')    

    if(!accessToken){
      return redirectLogin(req.nextUrl.clone());
    }

    if (accessToken && accessToken) {
      try {
        await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWTSECRET))
        return NextResponse.next();
      } catch (error) {
        return redirectLogin(req.nextUrl.clone());
      }
      
    } else {
      return redirectLogin(req.nextUrl.clone());
    }
  }
  
  return NextResponse.next()
}

