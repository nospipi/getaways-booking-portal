import { RotatingLines } from "react-loader-spinner";

//---------------------------------------------------------

const MapLoadingIndicator = ({ mapIsLoading }: { mapIsLoading: boolean }) => {
  if (!mapIsLoading) {
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
      <RotatingLines width="30" strokeColor="white" />
      <span
        style={{
          color: "white",
        }}
      >
        Loading map
      </span>
    </div>
  );
};

export default MapLoadingIndicator;
