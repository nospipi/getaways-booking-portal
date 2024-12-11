import SkeletonItem from "./segments/SkeletonItem";

//---------------------------------------------------------

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(37, 49, 63)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "500px",
          padding: "10px",
        }}
      >
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </div>
  );
};

export default Loading;
