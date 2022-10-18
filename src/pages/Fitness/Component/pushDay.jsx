import { useState } from "react";
import DayTemplate from "./dayTemplate";
import background from "../../../img/inspire.jpg"

const PushDay = ({ setDay }) => {
  const [ex, setEx] = useState([
    "Decline Bench Press",
    "Incline Bench Press",
    "Overhead Shoulder Press",
    "Bench Press",
    "Butterfly Swings",
    "Skull Crushers",
  ]);
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "85%",
        }}
      >
        <DayTemplate setDay={setDay} ex={ex} setEx={setEx} type="push" />
      </div>
    </>
  );
};

export default PushDay;
