"use server";
import {
  BookingModel,
  NotificationModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";
import { addUserActionByRef } from "./addUserAction";
import moment from "moment";
import { cache } from "react";
import { redirect } from "next/navigation";
import countries from "../../traveler-details-form/countries.json";

const submitTravelerDetails = async (formData: FormData): Promise<void> => {
  const uniqueId = formData.get("uniqueId") as string;
  try {
    await connectDB();

    // Create a flat array to store all travelers
    const travelers: Array<{
      ticket_type: string;
      age: number;
      nationality: string;
      iso: string;
      numeric: number;
      continent: string;
      free_entrance: boolean;
    }> = [];

    // Get all form entries and organize them
    const formEntries: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      // Skip confirmation checkbox
      if (key === "termsConfirmation") continue;
      formEntries[key] = value.toString();
    }

    // Extract unique traveler identifiers (ticketType-index)
    const travelerKeys = new Set<string>();
    for (const key of Object.keys(formEntries)) {
      const [ticketType, indexStr, _] = key.split("-");
      travelerKeys.add(`${ticketType}-${indexStr}`);
    }

    // Process each traveler's data
    for (const travelerKey of travelerKeys) {
      const [type, _] = travelerKey.split("-");

      // Get the age and nationality values
      const ageValue = formEntries[`${travelerKey}-age`];
      const nationalityValue = formEntries[`${travelerKey}-nationality`];

      if (ageValue && nationalityValue) {
        // Find the country in our countries array by its ISO code or name
        const countryData = countries.find(
          (country) =>
            country.iso === nationalityValue ||
            country.name === nationalityValue
        );

        if (countryData) {
          let freeEntrance = false;

          if (Number(ageValue) < 18) {
            freeEntrance = true;
          }

          if (
            Number(ageValue) < 25 &&
            countryData.continent === "Europe" &&
            countryData.iso !== "GB"
          ) {
            freeEntrance = true;
          }

          travelers.push({
            ticket_type: type,
            age: Number(ageValue),
            nationality: countryData.name,
            iso: countryData.iso,
            numeric: Number(countryData.numeric),
            continent: countryData.continent,
            free_entrance: freeEntrance,
          });
        } else {
          console.warn(`Country data not found for value: ${nationalityValue}`);
        }
      }
    }

    await BookingModel.findOneAndUpdate(
      { unique_booking_id: uniqueId },
      {
        $set: {
          traveller_details_form: travelers,
        },
      }
    );
  } catch (e: unknown) {
    console.log(e);
    if (typeof e === "object" && e !== null && "message" in e) {
      const error = e as { message: string };
      redirect(`/?error=${error}`);
    } else {
      redirect(`/?error=An error occurred`);
    }
  }

  redirect(`/activity?uniqueId=${uniqueId}`);
};

export default submitTravelerDetails;
