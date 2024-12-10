import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItem = () => {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 5,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        backgroundColor: "rgb(245, 245, 245",
      }}
    >
      <div
        style={{
          flex: 1,
          lineHeight: 1,
        }}
      >
        <Skeleton
          baseColor="rgb(252 252 252)"
          highlightColor="rgb(205 205 205)"
          duration={1}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 7,
          flex: 3,
        }}
      >
        <div
          style={{
            flex: 1,
            lineHeight: 1,
          }}
        >
          <Skeleton
            baseColor="rgb(252 252 252)"
            highlightColor="rgb(205 205 205)"
            duration={1}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <div
            style={{
              flex: 1,
              lineHeight: 1,
            }}
          >
            <Skeleton
              baseColor="rgb(252 252 252)"
              highlightColor="rgb(205 205 205)"
              duration={1}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              flex: 1,
              lineHeight: 1,
            }}
          >
            <Skeleton
              baseColor="rgb(252 252 252)"
              highlightColor="rgb(205 205 205)"
              duration={1}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              flex: 1,
              lineHeight: 1,
            }}
          >
            <Skeleton
              baseColor="rgb(252 252 252)"
              highlightColor="rgb(205 205 205)"
              duration={1}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonItem;
