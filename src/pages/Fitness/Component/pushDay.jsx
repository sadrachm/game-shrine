import { useState } from "react";
import DayTemplate from "./dayTemplate";



const PushDay = ({setDay}) => {
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

     <DayTemplate setDay={setDay} ex={ex} setEx={setEx} type="push"/>
    </>
  );
};

export default PushDay;

