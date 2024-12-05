import styled from "styled-components";

const Container = styled.div<{
  heading: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #e29171;
  border-radius: 100%;
  padding: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 20px;
  height: 20px;
  i {
    font-size: 21px;
    color: white;
    //transform: rotate(${(props) => props.heading}deg);
  }
`;

//---------------------------------------------------------

export const VehicleMarker = ({ heading }: { heading: number }) => {
  return (
    <Container heading={heading}>
      <i className="fa-solid fa-bus"></i>
      {/* <Text>ITY-2683</Text> */}
    </Container>
  );
};
