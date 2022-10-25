import { useState } from "react";
import DayTemplate from "./dayTemplate";
import background from "../../../img/inspire.jpg"

const PushDay = ({ setDay, user }) => {
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
          minHeight: "100vh",
          // backgroundImage: `url(${background})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // backgroundPosition: "53%",
        }}
      >
        <DayTemplate user={user} setDay={setDay} ex={ex} setEx={setEx} type="push" />
      </div>
    </>
  );
};

export default PushDay;
