import { useState } from "react";
import DayTemplate from "./dayTemplate";
import background from "../../../img/inspire.jpg";

const PullDay = ({ setDay }) => {
  const [ex, setEx] = useState([
    "Assisted Pull Up 1",
    "Vertical Bench Row",
    "Assisted Pull Up 2",
    "Bicep Curls",
    "Squats",
  ]);
  return (
    <>
      {" "}
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "85%",
        }}
      >
        <DayTemplate setDay={setDay} ex={ex} setEx={setEx} type="pull" />
      </div>
    </>
  );
};

export default PullDay;
