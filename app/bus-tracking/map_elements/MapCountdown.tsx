import Countdown, { CountdownRenderProps } from "react-countdown";

//---------------------------------------------------------

const countdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          color: "white",
        }}
      >
        Bus tracking will open in
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          color: "indianred",
        }}
      >
        {days > 0 && <span>{days} days</span>}
        {hours > 0 && <span>{hours} hours</span>}
        {minutes > 0 && <span>{minutes} minutes</span>}
        {seconds > 0 && days === 0 && <span>{seconds} seconds</span>}
      </div>
    </div>
  );
};

const MapCountdown = ({
  shouldCountdown,
  setMapIsLoading,
  refetch,
  targetDate,
}: {
  shouldCountdown: boolean;
  setMapIsLoading: (value: boolean) => void;
  refetch: () => void;
  targetDate: string | undefined;
}) => {
  if (!shouldCountdown) {
    return null;
  }
  return (
    <Countdown
      date={targetDate}
      renderer={countdownRenderer}
      onComplete={() => {
        //when countdown is completed, refetch the tracking data to return success status and render the map
        setMapIsLoading(true);
        refetch();
      }}
    />
  );
};

export default MapCountdown;
