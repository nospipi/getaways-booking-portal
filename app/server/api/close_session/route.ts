import { NextRequest, NextResponse } from "next/server";
import {
  addUserActionByRef,
  addUserActionByUniqueId,
} from "../../server_actions/addUserAction";
import {
  closeOpenSessionByRef,
  closeOpenSessionByUniqueId,
} from "../../server_actions/closeOpenSession";

//---------------------------------------------------------

//beacon request
export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const ref = data.get("ref");
  const uniqueId = data.get("uniqueId");

  const refString = typeof ref === "string" ? ref : null;
  const uniqueIdString = typeof uniqueId === "string" ? uniqueId : null;

  try {
    if (refString) {
      await addUserActionByRef(refString, "PAGE_LEAVE");
      await closeOpenSessionByRef(refString);
    }

    if (!refString && uniqueIdString) {
      await addUserActionByUniqueId(uniqueIdString, "PAGE_LEAVE");
      await closeOpenSessionByUniqueId(uniqueIdString);
    }

    return NextResponse.json({
      message: "This message will not be received by the client",
    });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
