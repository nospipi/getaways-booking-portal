import { RotatingLines } from "react-loader-spinner";

//---------------------------------------------------------

const MapRefetchingIndicator = ({
  shouldRender,
  isRefetching,
}: {
  shouldRender: boolean;
  isRefetching: boolean;
}) => {
  if (!isRefetching || !shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <RotatingLines width="15" strokeColor="white" />
      <span
        style={{
          fontSize: "10px",
          color: "grey",
        }}
      >
        Getting updated vehicle position
      </span>
    </div>
  );
};

export default MapRefetchingIndicator;
