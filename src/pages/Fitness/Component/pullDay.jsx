import { useEffect, useState } from "react";
import DayTemplate from "./dayTemplate";
import background from "../../../img/inspire.jpg";
import { API } from "aws-amplify";
import { createFitPerson } from "../../../graphql/mutations";

const PullDay = ({ setDay, user }) => {
  const [ex, setEx] = useState([
    "Assisted Pull Up 1",
    "Vertical Bench Row",
    "Assisted Pull Up 2",
    "Bicep Curls",
    "Squats",
  ]);
  useEffect(() => {
    if (user === "jesus") {
      setEx([
        "Assisted Pull Up 1",
        "Vertical Bench Row",
        "Assisted Pull Up 2",
        "Bicep Curls",
        "Kettle Bell Swings",
      ]);
    }
  }, []);

  return (
    <>
      {" "}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "53%",
        }}
      >
        <DayTemplate
          user={user}
          setDay={setDay}
          ex={ex}
          setEx={setEx}
          type="pull"
        />
        <div style={{ height: "100px" }}></div>
      </div>
    </>
  );
};

export default PullDay;
