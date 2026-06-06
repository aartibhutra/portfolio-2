import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(`[Middleware] Path: ${path}`);

  // Public API routes and pages (not protected)
  const publicRoutes = [
    "/api/contact",   // POST contact form
    "/api/skills",    // GET skills is public
    "/api/projects",  // GET projects is public
    "/api/blogs",
    "/api/about",
    "/api/hero",
    "/api/admin-login",
    "/admin/login",
    "/api/auth",
  ];

  // Allow requests for public endpoints
  const isPublic = publicRoutes.some((route) => path.startsWith(route));
  console.log(`[Middleware] isPublic: ${isPublic}`);
  if (isPublic) {
    return NextResponse.next();
  }

  // Now verify admin authentication for all protected routes
  // We rely exclusively on the JWT token stored in the "admin_token" cookie

  const jwtToken = req.cookies.get("admin_token")?.value;
  console.log(`[Middleware] jwtToken present: ${!!jwtToken}`);

  let isEnvAdmin = false;
  if (jwtToken) {
    try {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
      await jwtVerify(jwtToken, secret);
      isEnvAdmin = true;
    } catch (e) {
      console.log(`[Middleware] JWT Verify failed: ${e}`);
    }
  }
  console.log(`[Middleware] isEnvAdmin: ${isEnvAdmin}`);

  // If the admin is not authenticated via JWT
  if (!isEnvAdmin) {
    console.log(`[Middleware] Access Denied. Redirecting...`);
    // If it's an API request, return 401 JSON
    if (path.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    // If it's a page request, redirect to login page
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  console.log(`[Middleware] Access Granted.`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",       // protect all API routes
    "/admin",            // protect the admin root
    "/admin/:path*",     // protect all admin sub-routes
  ],
};
