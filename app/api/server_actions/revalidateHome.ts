import { revalidatePath } from "next/cache";

const revalidateHome = async () => {
  revalidatePath("/");
  //revalidateTag just invalidates the cached data, so the next will have fresh data instead of the cached one
  //it does not rehydrate the ui like revalidatePath
};

export default revalidateHome;
