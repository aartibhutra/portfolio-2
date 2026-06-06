import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      if (!process.env.NEXTAUTH_SECRET) {
        throw new Error("NEXTAUTH_SECRET is missing");
      }

      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

      const redirectUrl = new URL("/admin/", req.url);
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return new NextResponse("Invalid credentials", { status: 401 });

  } catch (err) {
    console.error("Admin login error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
