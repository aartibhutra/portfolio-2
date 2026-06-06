import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    (await cookieStore).delete("admin_token");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return new NextResponse("Error during logout", { status: 500 });
  }
}
