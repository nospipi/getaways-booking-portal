import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";

//---------------------------------------------------------

const MapControlSwitches = ({
  shouldRender,
  shouldWatchDevicePosition,
  setShouldWatchDevicePosition,
  setShouldFollowClient,
  setShouldFollowVehicle,
  shouldShowDistances,
  setShouldShowDistances,
  setDevicePosition,
  setWatchId,
  watchId,
  shouldFollowClient,
  shouldFollowVehicle,
}: {
  shouldRender: boolean;
  shouldWatchDevicePosition: boolean;
  setShouldWatchDevicePosition: (value: boolean) => void;
  setShouldFollowClient: (value: boolean) => void;
  setShouldFollowVehicle: (value: boolean) => void;
  shouldShowDistances: boolean;
  setShouldShowDistances: (value: boolean) => void;
  setDevicePosition: (value: [number, number]) => void;
  setWatchId: (value: number | null) => void;
  watchId: number | null;
  shouldFollowClient: boolean;
  shouldFollowVehicle: boolean;
}) => {
  if (!shouldRender) {
    return null;
  }
  return (
    <div
      style={{
        zIndex: 35,
        position: "absolute",
        top: 0,
        right: 0,
        padding: "7px 12px 0 0",
        color: "whitesmoke",
        //background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <FormGroup
        sx={{
          gap: "5px",
        }}
      >
        <FormControlLabel
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "11px" } }}
          control={
            <Switch
              size="small"
              checked={shouldWatchDevicePosition}
              onChange={(value) => {
                if (value.target.checked) {
                  setShouldWatchDevicePosition(true);
                  setShouldFollowClient(true);
                  const id = navigator.geolocation.watchPosition(
                    (position) => {
                      setDevicePosition([
                        position.coords.longitude,
                        position.coords.latitude,
                      ]);
                    },
                    (err) => {
                      toast.error(`${err.message}`);
                      setWatchId(null);
                      setShouldWatchDevicePosition(false);
                    },
                    {
                      enableHighAccuracy: true,
                      timeout: 10000,
                      maximumAge: 0,
                    }
                  );

                  setWatchId(id);
                } else {
                  setShouldWatchDevicePosition(false);
                  setShouldFollowClient(false);
                  if (watchId) {
                    navigator.geolocation.clearWatch(watchId);
                    setWatchId(null);
                  }
                }
              }}
            />
          }
          label="Show your position"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "11px" } }}
          control={
            <Switch
              size="small"
              checked={shouldFollowClient}
              //disabled={!shouldWatchDevicePosition}
              onChange={(value) => {
                setShouldFollowClient(value.target.checked);
                if (value.target.checked) {
                  setShouldWatchDevicePosition(true);
                  setShouldFollowVehicle(false);
                }
              }}
            />
          }
          label="Follow your position"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "11px" } }}
          control={
            <Switch
              size="small"
              checked={shouldFollowVehicle}
              onChange={(value) => {
                setShouldFollowVehicle(value.target.checked);
                if (value.target.checked) {
                  setShouldFollowClient(false);
                }
              }}
            />
          }
          label="Follow vehicle"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "11px" } }}
          control={
            <Switch
              size="small"
              checked={shouldShowDistances}
              onChange={(value) => {
                setShouldShowDistances(value.target.checked);
              }}
            />
          }
          label="Show distances"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};

export default MapControlSwitches;
