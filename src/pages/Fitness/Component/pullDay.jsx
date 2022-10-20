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
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "53%",
        }}
      >
        <DayTemplate setDay={setDay} ex={ex} setEx={setEx} type="pull" />
        <div style={{height:'100px'}}></div>
      </div>
    </>
  );
};

export default PullDay;
