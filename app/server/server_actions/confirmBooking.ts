"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const confirmBooking = cache(async (id: string): Promise<unknown> => {
  await connectDB();
  //throw new Error("simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
  await BookingModel.findByIdAndUpdate(id, {
    client_response_status: "CONFIRMED",
  });

  revalidatePath(`/`);

  return true;
});

export default confirmBooking;
//------------------------------------------------------------------------------
