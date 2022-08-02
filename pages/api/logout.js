import { NextResponse, NextRequest} from "next/server"
import { serialize } from "cookie";

export default function handler(request, response) {

    const cookie = serialize("accessToken", "deleted", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        expires: new Date(0)
    });

    response.setHeader("Set-Cookie", cookie);
    response.status(200).end()
  }