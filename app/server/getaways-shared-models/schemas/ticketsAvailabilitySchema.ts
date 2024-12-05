import { Schema, Document } from "mongoose";

//------------------------------------------------------------------------

export interface ITicketSlot {
  zone: string;
  id: string;
  avail: string;
}

export interface ITicketsAvailability extends Document {
  place: string;
  placedate: string;
  id: string;
  slots: ITicketSlot[];
}

//------------------------------------------------------------------------

const ticketsAvailabilitySchema = new Schema<ITicketsAvailability>({
  place: String,
  placedate: String,
  id: String,
  slots: [
    {
      zone: String,
      id: String,
      avail: String,
    },
  ],
});

ticketsAvailabilitySchema.pre("save", function (next) {
  this.id = this.place + this.placedate;
  next();
});

export default ticketsAvailabilitySchema;
