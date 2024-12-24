import { TiWarning } from "react-icons/ti";

//---------------------------------------------------------

const MapError = ({
  errorText = "An error occurred",
  errorWithoutCountdown,
}: {
  errorText: string | undefined;
  errorWithoutCountdown: boolean;
}) => {
  if (!errorWithoutCountdown) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <TiWarning style={{ fontSize: "30px", color: "white" }} />
      <span
        style={{
          color: "indianred",
          width: "70%",
          textAlign: "center",
        }}
      >
        {errorText}
      </span>
    </div>
  );
};

export default MapError;
