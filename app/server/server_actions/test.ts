//import axios from "axios";

const test = async (action: string) => {
  console.log(
    "test server action ran from server action with action: ",
    action
  );

  //   await axios
  //     .get("http://localhost:3000/api/modify/service_worker_test")
  //     .then((response) => {
  //       console.log("response from server: ", response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error from server: ", error);
  //     });

  await fetch("http://localhost:3000/api/modify/service_worker_test");

  //return;
};

export default test;
