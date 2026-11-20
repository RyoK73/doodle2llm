import { NextRequest } from "next/server";
import { updateSession } from "@/supabase/auth/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher:
    "/((?!monitoring|robots.txt|sitemap.xml|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
