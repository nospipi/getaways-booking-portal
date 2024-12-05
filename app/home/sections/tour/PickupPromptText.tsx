const PickupPromptText = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "10px 10px 11px 10px",
        backgroundColor: "whitesmoke",
        borderRadius: "5px",
      }}
    >
      <div className="section-content-item-container">
        <div
          className="section-content-text-container"
          style={{
            color: "indianred",
            //fontWeight: "bold",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          <span>
            It seems that you have not added your location details yet. Please
            use the form below to add your{" "}
            <span style={{ fontWeight: "bold" }}>
              hotel name or apartment/AirBNB full address
            </span>{" "}
            and press submit.
            <br /> Please be aware that if your accommodation is situated in a
            pedestrian-only or narrow area not accessible by our tour vehicles,
            or if it is outside the designated pickup zone, we will assign the
            closest possible central meeting point for your pickup.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PickupPromptText;
