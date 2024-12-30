import { NextRequest, NextResponse } from "next/server";
import createOpenSession from "../utils/openSession";

//---------------------------------------------------------

//beacon request
export const POST = async (req: NextRequest) => {
  const body = await req.formData();

  const ref = body.get("ref");
  const uniqueId = body.get("uniqueId");
  const platform = body.get("platform");
  const osName = body.get("osName");
  const osVersion = body.get("osVersion");
  const browserName = body.get("browserName");
  const browserVersion = body.get("browserVersion");
  const mobileVendor = body.get("mobileVendor");
  const mobileModel = body.get("mobileModel");

  const refString = typeof ref === "string" ? ref : null;
  const uniqueIdString = typeof uniqueId === "string" ? uniqueId : null;
  const platformString = typeof platform === "string" ? platform : "";
  const osNameString = typeof osName === "string" ? osName : "";
  const osVersionString = typeof osVersion === "string" ? osVersion : "";
  const browserNameString = typeof browserName === "string" ? browserName : "";
  const browserVersionString =
    typeof browserVersion === "string" ? browserVersion : "";
  const mobileVendorString =
    typeof mobileVendor === "string" ? mobileVendor : "";
  const mobileModelString = typeof mobileModel === "string" ? mobileModel : "";

  //---------------------------------------------------------

  try {
    await createOpenSession(
      refString,
      uniqueIdString,
      platformString,
      osNameString,
      osVersionString,
      browserNameString,
      browserVersionString,
      mobileVendorString,
      mobileModelString
    );

    return NextResponse.json({
      message: "This message will not be received by the client",
    });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
