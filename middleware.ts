import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  await jwtVerify(token, secret);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname === "/admin/login") {
    if (token) {
      try {
        await verifyToken(token);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};