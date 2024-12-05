import { Schema, Document } from "mongoose";

//--------------------------------------------------------------------

export interface IChannel extends Document {
  title: string;
  commission_rate: number;
}

const channelsSchema = new Schema<IChannel>({
  title: { type: String, required: true },
  commission_rate: { type: Number, required: true, default: 0 },
});

//--------------------------------------------------------------------

export default channelsSchema;
