import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";
import countries from "./countries.json";
import CustomMaterialAutocompleteSelect from "./CustomMaterialAutocompleteSelect";
import submitTravelerDetails from "../server/server_actions/submitTravelerDetails";

//---------------------------------------------------------

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const fallbackId = nanoid();
  const { uniqueId } = await searchParams;
  const booking = await getBookingByUniqueId(uniqueId ?? fallbackId);

  // If no booking or tickets, show a message
  if (!booking || !booking.tickets) {
    return (
      <main className="page-container">
        <BackButton uniqueId={uniqueId} />
        <div className="content-wrapper">
          <div className="content-container">
            <div className="content-container-wrapper">
              <div className="segment-container">
                <div className="section-content-container">
                  No booking information available
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="page-container"
      style={{
        background: "white",
      }}
    >
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            <div
              className="segment-container"
              style={{ padding: "15px", gap: "15px", boxShadow: "none" }}
            >
              <BackButton uniqueId={uniqueId} />
              <h3>Traveller details form</h3>
              <form
                action={submitTravelerDetails}
                className="traveler-details-form"
              >
                <input type="hidden" name="uniqueId" value={uniqueId} />
                {Object.entries(booking.tickets).map(([ticketType, count]) => {
                  if (Number(count) <= 0) return null;

                  return (
                    <div
                      key={ticketType}
                      className="section-container traveler-type-container"
                      style={{
                        padding: "15px",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="section-title-container">
                        {ticketType} - {count}{" "}
                        {Number(count) === 1 ? "ticket" : "tickets"}
                      </div>

                      <div
                        className="section-content-container"
                        style={{
                          padding: "15px",
                        }}
                      >
                        {Array.from({ length: Number(count) }).map(
                          (_, index) => (
                            <div
                              key={`${ticketType}-${index}`}
                              className="traveler-item"
                            >
                              <div className="traveler-header">
                                {ticketType} #{index + 1}
                              </div>

                              <div className="traveler-inputs">
                                <TextField
                                  name={`${ticketType}-${index}-age`}
                                  label="Age"
                                  type="number"
                                  variant="filled"
                                  fullWidth
                                  required
                                  slotProps={{
                                    htmlInput: {
                                      min: 0,
                                      max: 120,
                                    },
                                    inputLabel: {
                                      //shrink: true,
                                    },
                                  }}
                                  sx={{
                                    flex: 1,
                                    "& .MuiFilledInput-root": {
                                      // Target the FilledInput root
                                      backgroundColor: "white",
                                      "&:hover": {
                                        backgroundColor: "white", // Ensure white on hover
                                      },
                                      "&.Mui-focused": {
                                        // Style when focused (optional)
                                        backgroundColor: "white",
                                      },
                                    },
                                  }}
                                  className="traveler-input"
                                />
                                <CustomMaterialAutocompleteSelect
                                  values={countries.map((country) => ({
                                    label: country.name,
                                    value: country,
                                  }))}
                                  label="Nationality"
                                  name={`${ticketType}-${index}-nationality`}
                                  required
                                  error={false}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}

                <div
                  className="confirmation-checkbox-container"
                  style={{ marginTop: "20px", marginBottom: "15px" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsConfirmation"
                        required
                        color="primary"
                      />
                    }
                    label="I confirm all of the above details and ensure that each participant will possess the necessary documents for age and nationality verification, such as a passport, ID card, birth certificate, or equivalent, and will present it upon request at the entrance of the archaeological site"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.8rem",
                        lineHeight: "1",
                      },
                    }}
                  />
                </div>

                <details className="disclaimer-container">
                  <summary
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Data Protection Disclaimer
                  </summary>
                  <br />
                  <p>
                    We value your privacy and are committed to protecting your
                    personal information. By submitting this form, you
                    acknowledge and agree to the following:
                  </p>
                  <br />
                  <ul>
                    <li>
                      <u>Purpose of Data Collection:</u> The information you
                      provide will be used solely for the purpose of issuing the
                      correct archaeological site tickets and related services.
                    </li>
                    <br />
                    <li>
                      <u>Confidentiality:</u> Your personal data will not be
                      shared, sold, or disclosed to any third party, except
                      where required by law or with your explicit consent.
                    </li>
                    <br />
                    <li>
                      <u>Data Storage:</u> Your data will be stored securely and
                      only for as long as necessary to fulfill the purpose
                      stated above, in compliance with applicable data
                      protection regulations.
                    </li>
                    <br />
                    <li>
                      <u>Security Measures:</u> We have implemented appropriate
                      technical and organizational measures to protect your data
                      against unauthorized access, alteration, disclosure, or
                      destruction.
                    </li>
                    <br />
                    <li>
                      <u>Your Rights:</u> In accordance with the General Data
                      Protection Regulation (GDPR), you have the right to:
                      <ul
                        style={{
                          paddingLeft: "15px",
                        }}
                      >
                        <br />
                        <li>Access your personal data</li>
                        <li>Rectify any inaccuracies</li>
                        <li>Request deletion of your data</li>
                        <li>Withdraw consent at any time</li>
                      </ul>
                    </li>
                  </ul>
                  <br />
                  <p>
                    <strong>
                      By proceeding, you confirm that you have read and
                      understood this disclaimer
                    </strong>
                  </p>
                </details>
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
