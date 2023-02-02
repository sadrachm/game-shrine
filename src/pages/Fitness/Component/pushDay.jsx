import { useState } from "react";
import DayTemplate from "./dayTemplate";
import background from "../../../img/inspire.jpg"

const PushDay = ({ setDay, user }) => {
  const [ex, setEx] = useState([
    "Decline Bench Press",
    "Incline Bench Press",
    "Overhead Shoulder Press",
    "Butterfly Swings",
    "Bench Press",
    "Skull Crushers",
  ]);
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <DayTemplate user={user} setDay={setDay} ex={ex} setEx={setEx} type="push" />
      </div>
    </>
  );
};

export default PushDay;
