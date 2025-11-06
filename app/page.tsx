import BookingSearchForm from "./BookingSearchForm";
import Image from "next/image";
import logo from "@/public/gg_logo.png";
import { FaExclamationCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

//---------------------------------------------------------

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { error } = await searchParams;

  return (
    <main className="home-page-container">
      <div className="home-page-content">
        {/* Logo Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Image
              src={logo}
              width={220}
              height={60}
              alt="Getaways Logo"
              quality={100}
              priority
              style={{
                width: "clamp(180px, 50vw, 220px)",
                height: "auto",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textAlign: "center",
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
              Find Your Booking
            </h1>
            <p
              style={{
                fontSize: "clamp(13px, 3.5vw, 15px)",
                color: "#666666",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Enter your booking number to view your tour details
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div
          className="modern-card home-page-card"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {error && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 16px)",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                backgroundColor: "#fff5f5",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <FaExclamationCircle 
                size={18} 
                style={{ 
                  color: "#dc2626", 
                  flexShrink: 0,
                  minWidth: "18px",
                }} 
              />
              <span
                style={{
                  color: "#dc2626",
                  fontSize: "clamp(13px, 3.5vw, 14px)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                }}
              >
                {error}
              </span>
            </div>
          )}
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "clamp(44px, 10vw, 48px)",
                  height: "clamp(44px, 10vw, 48px)",
                  background: "linear-gradient(135deg, #1E90FF 0%, #0066CC 100%)",
                  borderRadius: "12px",
                  flexShrink: 0,
                }}
              >
                <FaSearch size={20} style={{ color: "#ffffff" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(11px, 2.5vw, 13px)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#1E90FF",
                    margin: 0,
                    marginBottom: "4px",
                  }}
                >
                  Booking Search
                </h2>
                <p
                  style={{
                    fontSize: "clamp(12px, 3vw, 13px)",
                    color: "#666666",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Enter your booking reference number
                </p>
              </div>
            </div>
            <BookingSearchForm />
          </div>
        </div>

        {/* Help Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <p
            style={{
              fontSize: "clamp(12px, 3vw, 13px)",
              color: "#888888",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Can't find your booking number? Check your confirmation email
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------

//https://stackoverflow.com/questions/76305664/next-js-error-in-production-mode-digest-1782794309
