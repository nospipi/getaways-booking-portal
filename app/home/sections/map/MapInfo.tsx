import { Booking } from "../../screens/HomeScreen";
import MapboxMap from "./MapboxMap";
import {
  SectionContainer,
  SectionTitleContainer,
  SectionContentContainer,
  SectionContentItemContainer,
  SectionContentIconContainer,
  SectionContentTextContainer,
} from "../styled";

//---------------------------------------------------------

const MapInfo = ({ booking }: { booking: Booking }) => {
  const hasVehicle = booking?.task?.vehicle?.plate;

  return (
    <>
      <SectionContainer>
        <SectionTitleContainer>Tour bus tracking</SectionTitleContainer>
        <SectionContentContainer>
          <SectionContentItemContainer>
            <SectionContentIconContainer>
              <i className="fa-solid fa-bus"></i>
            </SectionContentIconContainer>
            <SectionContentTextContainer
              style={{
                color: hasVehicle ? "black" : "indianred",
              }}
            >
              {hasVehicle
                ? `${booking.task.vehicle.plate} (${booking.task.vehicle.type} / ${booking.task.vehicle.color})`
                : "NOT AVAILABLE"}
            </SectionContentTextContainer>
          </SectionContentItemContainer>
          <SectionContentItemContainer>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              <MapboxMap booking={booking} />
            </div>
          </SectionContentItemContainer>
        </SectionContentContainer>
      </SectionContainer>
    </>
  );
};

export default MapInfo;
