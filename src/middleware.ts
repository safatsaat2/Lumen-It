import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

function getLocaleFromPath(pathname: string) {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

/** Send apex mihitech.org to www — one canonical host for Google. */
function apexToWwwRedirect(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === "localhost" || host.endsWith(".vercel.app")) {
    return null;
  }
  if (host !== "mihitech.org") return null;

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = "www.mihitech.org";
  return NextResponse.redirect(url, 308);
}

export async function middleware(request: NextRequest) {
  const apexRedirect = apexToWwwRedirect(request);
  if (apexRedirect) return apexRedirect;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session.valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/log-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === "/log-in") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (session.valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPath(pathname);

  if (pathnameLocale) {
    const response = NextResponse.next();
    response.headers.set("x-locale", pathnameLocale);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url, 308);
  response.headers.set("x-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|favicon-48.png|favicon-192.png|favicon-512.png|apple-touch-icon.png|fav.jpeg|manifest.webmanifest|logo.svg|logo-dark.png|logo-white.png|colorfull-logo.png|miHi-BLACK-logo.png|og.png|robots.txt|sitemap.xml).*)",
  ],
};

void locales;
