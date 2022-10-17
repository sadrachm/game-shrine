import { useState } from "react";
import DayTemplate from "./dayTemplate";

const PullDay = ({setDay}) => {
    const [ex, setEx] = useState([
        "Assisted Pull Up 1",
        "Vertical Bench Row",
        "Assisted Pull Up 2",
        "Bicep Curls",
        "Squats",
      ]);
      return (
        <>
         <DayTemplate setDay={setDay} ex={ex} setEx={setEx} type="pull" />
        </>
      );
}

export default PullDay