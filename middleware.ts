import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";
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
  limiter: Ratelimit.fixedWindow(15, "30s"), // allows 5 requests per 30 seconds from the same IP
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
  matcher: ["/:slug"], 
};

// export const config = {
//   matcher: "/**", // This will apply the middleware to all routes
// };


interface CustomRequest extends NextRequest {
  ip: string; //this comes from vercel
}

const middleware = async (
  req: CustomRequest
  //event: NextFetchEvent,
): Promise<Response | undefined> => {
  //------------ DEFINE RATE LIMITING -----------------------

  const ip = ipAddress(req) || "127.0.0.1";

  const {
    success,
    //pending,
    // limit,
    //reset,
    remaining,
  } = await ratelimit.limit(ip);
  console.log("IP FROM MIDDLEWARE :", ip, "REMAINING HITS :", remaining);

  //----------------- PASS PARAMS IN HEADERS ----------------

  const {
    search,
    //pathname,
    //searchParams
  } = req.nextUrl;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  //encode params to base64 to avoid non-ascii characters in headers - returns error
  const encodedParams = Buffer.from(JSON.stringify(params)).toString("base64");
  console.log("PARAMS FROM MIDDLEWARE :", JSON.stringify(params));
  const headers = new Headers(req.headers);
  headers.set("params_from_middleware", encodedParams);

  //----------------------------------------------------------

  if (success) {
    return NextResponse.next({
      request: {
        headers: headers, //https://github.com/vercel/next.js/issues/50659#issuecomment-2211256368
      },
    });
  } else {
    const redirectUrl = new URL(
      "/?error=Too many requests",
      req.nextUrl.origin
    );
    return NextResponse.redirect(redirectUrl);
  }
};

export default middleware;
