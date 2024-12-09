import Script from "next/script";
const BOKUN_LIST_68121 = process.env.BOKUN_LIST_68121;

//---------------------------------------------------------

const BokunExtHtml = () => {
  return (
    <div
      className="bokunWidget"
      data-src={BOKUN_LIST_68121}
      //strategy="lazyOnload"
      // onLoad={() =>
      //   console.log(
      //     `script loaded correctly, window.FB has been populated`
      //   )
      // }
      style={{
        overflowX: "hidden",
        width: "100%",
        height: "100%"
      }}
    />
  );
};

export default BokunExtHtml;
