"use server";
import {
  WalletModel,
  TransactionModel,
  CategoryModel,
  ICategory,
} from "./models";
// import connectDB from "./db.connect";
// import { headers } from "next/headers";
// import { revalidatePath } from "next/cache";
//import { redirect } from "next/navigation"

//------------------------------------------------------------------------------

export interface IActionState {
  success: string | null;
  error: string | null;
}

//-----------------------------------------------------------------------------

// const deleteWallet = async (): Promise<IActionState> => {
//   try {
//     await connectDB();
//     const headerList = headers();
//     const pathname = headerList.get("x-current-path");
//     const segments = pathname?.split("/") || [];
//     const wallet_id = segments[2] || "";
//     //throw new Error("test error"); // Simulate error
//     await TransactionModel.deleteMany({ wallet_id });
//     await WalletModel.findOneAndDelete({ _id: wallet_id });
//     revalidatePath(`/`, "page");
//     return { success: `Wallet deleted successfully`, error: null };
//   } catch (error: any) {
//     //await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate slow network
//     return { success: null, error: error?.message || "An error occurred" };
//   }
// };

// export { deleteWallet };

//------------------------------------------------------------------------------
