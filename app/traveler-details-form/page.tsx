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
    <main className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            <div className="segment-container">
              <BackButton uniqueId={uniqueId} />
              
              {/* Header Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(20px, 5vw, 24px)",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Traveller Details Form
                </h1>
                <p
                  style={{
                    fontSize: "clamp(13px, 3.5vw, 15px)",
                    color: "#666666",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Please provide the required information for each traveller
                </p>
              </div>

              <form
                action={submitTravelerDetails}
                className="traveler-details-form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  width: "100%",
                }}
              >
                <input type="hidden" name="uniqueId" value={uniqueId} />
                {Object.entries(booking.tickets).map(([ticketType, count]) => {
                  if (Number(count) <= 0) return null;

                  return (
                    <div
                      key={ticketType}
                      className="modern-card"
                      style={{
                        width: "100%",
                        marginBottom: "8px",
                      }}
                    >
                      <div className="modern-card-header">
                        <h2 className="modern-card-title">
                          {ticketType} - {count}{" "}
                          {Number(count) === 1 ? "ticket" : "tickets"}
                        </h2>
                      </div>

                      <div className="modern-card-content">
                        {Array.from({ length: Number(count) }).map(
                          (_, index) => (
                            <div
                              key={`${ticketType}-${index}`}
                              className="traveler-item"
                            >
                              <div
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: "#1E90FF",
                                  marginBottom: "4px",
                                }}
                              >
                                {ticketType} #{index + 1}
                              </div>

                              <div className="traveler-inputs">
                                <TextField
                                  name={`${ticketType}-${index}-age`}
                                  label="Age"
                                  type="number"
                                  variant="outlined"
                                  fullWidth
                                  required
                                  slotProps={{
                                    htmlInput: {
                                      min: 0,
                                      max: 120,
                                    },
                                  }}
                                  sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                      backgroundColor: "#ffffff",
                                      fontSize: "clamp(14px, 3.5vw, 15px)",
                                      "& fieldset": {
                                        borderColor: "#e0e0e0",
                                        borderWidth: "1.5px",
                                      },
                                      "&:hover fieldset": {
                                        borderColor: "#1E90FF",
                                      },
                                      "&.Mui-focused fieldset": {
                                        borderColor: "#1E90FF",
                                        borderWidth: "2px",
                                      },
                                    },
                                    "& .MuiInputLabel-root": {
                                      fontSize: "clamp(13px, 3.5vw, 14px)",
                                      color: "#666666",
                                      "&.Mui-focused": {
                                        color: "#1E90FF",
                                      },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      padding: "clamp(14px, 4vw, 16px) clamp(12px, 3.5vw, 14px)",
                                      color: "#1a1a1a",
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

                {/* Confirmation Section */}
                <div
                  className="modern-card"
                  style={{
                    width: "100%",
                    marginTop: "24px",
                    marginBottom: "8px",
                  }}
                >
                  <div className="modern-card-content">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#1E90FF",
                          marginBottom: "4px",
                        }}
                      >
                        Confirmation
                      </div>
                      
                      <div
                        style={{
                          padding: "16px",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="termsConfirmation"
                              required
                              sx={{
                                color: "#1E90FF",
                                "&.Mui-checked": {
                                  color: "#1E90FF",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: "20px",
                                },
                              }}
                            />
                          }
                          label="I confirm all of the above details and ensure that each participant will possess the necessary documents for age and nationality verification, such as a passport, ID card, birth certificate, or equivalent, and will present it upon request at the entrance of the archaeological site"
                          sx={{
                            alignItems: "flex-start",
                            margin: 0,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "clamp(13px, 3.5vw, 14px)",
                              lineHeight: "1.6",
                              color: "#1a1a1a",
                              marginLeft: "8px",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Protection Disclaimer */}
                <details
                  className="modern-card"
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#1E90FF",
                      cursor: "pointer",
                      padding: "16px",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      userSelect: "none",
                    }}
                  >
                    <span>Data Protection Disclaimer</span>
                    <span 
                      style={{ 
                        fontSize: "12px", 
                        marginLeft: "auto",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▼
                    </span>
                  </summary>
                  <div
                    className="modern-card-content"
                    style={{
                      padding: "20px",
                      paddingTop: "24px",
                      borderTop: "1px solid #e0e0e0",
                      marginTop: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(13px, 3.5vw, 14px)",
                        color: "#1a1a1a",
                        lineHeight: "1.7",
                        marginBottom: "16px",
                      }}
                    >
                      We value your privacy and are committed to protecting your
                      personal information. By submitting this form, you
                      acknowledge and agree to the following:
                    </p>
                    <ul
                      style={{
                        fontSize: "clamp(13px, 3.5vw, 14px)",
                        color: "#1a1a1a",
                        lineHeight: "1.8",
                        paddingLeft: "20px",
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <li>
                        <strong>Purpose of Data Collection:</strong> The information you
                        provide will be used solely for the purpose of issuing the
                        correct archaeological site tickets and related services.
                      </li>
                      <li>
                        <strong>Confidentiality:</strong> Your personal data will not be
                        shared, sold, or disclosed to any third party, except
                        where required by law or with your explicit consent.
                      </li>
                      <li>
                        <strong>Data Storage:</strong> Your data will be stored securely and
                        only for as long as necessary to fulfill the purpose
                        stated above, in compliance with applicable data
                        protection regulations.
                      </li>
                      <li>
                        <strong>Security Measures:</strong> We have implemented appropriate
                        technical and organizational measures to protect your data
                        against unauthorized access, alteration, disclosure, or
                        destruction.
                      </li>
                      <li>
                        <strong>Your Rights:</strong> In accordance with the General Data
                        Protection Regulation (GDPR), you have the right to:
                        <ul
                          style={{
                            paddingLeft: "20px",
                            marginTop: "8px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <li>Access your personal data</li>
                          <li>Rectify any inaccuracies</li>
                          <li>Request deletion of your data</li>
                          <li>Withdraw consent at any time</li>
                        </ul>
                      </li>
                    </ul>
                    <p
                      style={{
                        fontSize: "clamp(13px, 3.5vw, 14px)",
                        color: "#1a1a1a",
                        lineHeight: "1.7",
                        marginTop: "16px",
                        fontWeight: 600,
                      }}
                    >
                      By proceeding, you confirm that you have read and
                      understood this disclaimer.
                    </p>
                  </div>
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
