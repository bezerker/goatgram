import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WWW_HOST = "www.goatgram.net";
const APEX_HOST = "goatgram.net";

export function proxy(request: NextRequest) {
  if (request.headers.get("host") === WWW_HOST) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https";
    redirectUrl.host = APEX_HOST;
    redirectUrl.port = "";

    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"],
};
