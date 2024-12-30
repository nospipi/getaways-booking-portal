import { NextRequest, NextResponse } from "next/server";
import openSession from "../utils/openSession";

//---------------------------------------------------------

//beacon request
export const POST = async (req: NextRequest) => {
  const body = await req.formData();
  const ref = body.get("ref");
  const uniqueId = body.get("uniqueId");

  const refString = typeof ref === "string" ? ref : null;
  const uniqueIdString = typeof uniqueId === "string" ? uniqueId : null;

  try {
    await openSession(refString, uniqueIdString);

    return NextResponse.json({
      message: "This message will not be received by the client",
    });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
