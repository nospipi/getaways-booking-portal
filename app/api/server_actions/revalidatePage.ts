"use server";

import { revalidatePath } from "next/cache";

const revalidatePage = async (path: string) => {
  revalidatePath(path);
  //revalidateTag just invalidates the cached data, so the next will have fresh data instead of the cached one
  //it does not rehydrate the ui like revalidatePath
};

export default revalidatePage;
