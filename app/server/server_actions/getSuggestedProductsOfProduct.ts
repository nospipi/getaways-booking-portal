"use server";
import { ProductsModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const getSuggestedProductsOfProduct = cache(
  async (product_ids: string[] | undefined): Promise<unknown> => {
    console.log("product_ids", product_ids);
    await connectDB();

    const products = await ProductsModel.find({ _id: { $in: product_ids } });

    if (!products.length) {
      throw new Error("There are no suggested products");
    }

    return products;
  }
);

export default getSuggestedProductsOfProduct;
//------------------------------------------------------------------------------
