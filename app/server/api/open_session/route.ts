import connectDB from "@/app/server/db.connect";

//---------------------------------------------------------

export async function POST() {
  //beacon request
  try {
    await connectDB();
    console.log("Beacon request received");

    return Response.json({
      message: "This message will not be received by the client",
    });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred";
    console.error(message);
    return Response.json({ error: message }, { status: 400 });
  }
}
