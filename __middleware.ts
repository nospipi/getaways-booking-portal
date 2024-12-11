import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

//--------------------------------------------------------------------------

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "30s"), // allows 5 requests per 30 seconds from the same IP
});

//--------------------------------------------------------------------------

// export const config = {
//   matcher: [
//     // match all routes except static files and APIs
//     //"/((?!api|_next/static|_next/image|favicon.ico).*)",
//     "/((?!api|_next/static|_next/image|.*\\.png|manifest.webmanifest|favicon.ico|.*\\.server\\.tsx$).*)",
//   ],
// };

export const config = {
  matcher: ["/:slug"], //matches only the root route, not deeper routes
};

//https://github.com/vercel/next.js/issues/50659
//https://nextjs.org/docs/messages/nested-middleware <-- for multiple middlewares

export default async (
  req: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> => {
  //const requestHeaders = new Headers(req.headers);

  const ip = req?.ip ?? "127.0.0.1";
  console.log("IP FROM MIDDLEWARE", ip);
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );

  // Add new request headers
  // requestHeaders.set("request-ip", req.ip);
  // requestHeaders.set("request-url", req.url);
  // requestHeaders.set("request-geo", JSON.stringify(req.geo));

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/?error=Too many requests", req.url));
};
