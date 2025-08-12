import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value || null;
  const { pathname } = req.nextUrl;

  if (pathname === "/notfound") {
    return NextResponse.next();
  }

  const validPaths = [
    "/",
    "/auth",
    "/user",
    "/cart",
    "/checkout",
    "/product",
    "/payment",
    "/post",
    "/contact",
    "/favorite",
  ];

  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !token &&
    (pathname.startsWith("/user") ||
      ["/cart", "/checkout", "/payment", "/favorite"].includes(pathname))
  ) {
    return NextResponse.redirect(new URL("/notfound", req.url));
  }

  if (
    !validPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return NextResponse.redirect(new URL("/notfound", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|notfound).*)"],
};
