import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Public API routes (not protected)
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

  // Allow GET requests for public endpoints
  if (req.method === "GET") {
    return NextResponse.next();
  }

  // If modifying routes → must be admin
  const isPublic = publicRoutes.some((route) => path.startsWith(route));
  if (!isPublic) {
    // Now verify admin authentication

    // Check Google NextAuth session
    let session = null;
    try {
      if (process.env.NEXTAUTH_SECRET) {
        session = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });
      }
    } catch (error) {
      console.error("Middleware Auth Error:", error);
      // Fallback to null session
    }

    const isGoogleAdmin =
      session?.email === process.env.ALLOWED_GOOGLE_ADMIN;

    // Check ENV email/password admin via JWT cookie
    const jwtToken = req.cookies.get("admin_token")?.value;

    let isEnvAdmin = false;
    if (jwtToken) {
      try {
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
        await jwtVerify(jwtToken, secret);
        isEnvAdmin = true;
      } catch {}
    }

    // If neither type of admin is authenticated
    if (!isGoogleAdmin && !isEnvAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",       // protect all API routes
    "/admin/:path*",     // protect admin dashboard routes
  ],
};
