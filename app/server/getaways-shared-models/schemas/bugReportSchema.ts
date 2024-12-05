import { Schema, Document } from "mongoose";

//----------------------------------------------------------------------------------

export interface IBugReport extends Document {
  body: string;
  user?: string;
  date: Date;
}

//------------------------------------------------------------------------------

const bugReportSchema = new Schema<IBugReport>({
  body: {
    type: String,
    required: [true, "You cannot publish an empty bug report"],
  },
  user: { type: String },
  date: { type: Date, default: Date.now },
});

export default bugReportSchema;
