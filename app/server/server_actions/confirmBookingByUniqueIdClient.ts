"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const confirmBookingByUniqueIdClient = cache(
  async (id: string): Promise<unknown> => {
    await connectDB();
    //throw new Error("simulate error");
    //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
    await BookingModel.findByIdAndUpdate(id, {
      client_response_status: "CONFIRMED",
    });

    revalidatePath(`/`); // this cannot be run before page is rendered, so it cannot be used at a statically generated page

    return true;
  }
);

export default confirmBookingByUniqueIdClient;
//------------------------------------------------------------------------------
