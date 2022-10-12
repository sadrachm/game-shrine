import { useState } from "react";
import { Button } from "react-bootstrap";
import SelectDay from "./Component/selectDay";
import PullDay from "./Component/pullDay";
import PushDay from "./Component/pushDay";

//TODO: Make a simpler way to order exercises to cut time during exercise


const Fitness = () => {
  const [day, setDay] = useState("");

  return (
    <>
      {day === "" && <SelectDay setDay={setDay} />}
      {day === "pull" && (
        <>
          <PullDay />
        </>
      )}

      {day === "push" && (
        <>
          <PushDay/>
        </>
      )}

      <Button onClick={() => setDay("")}>Go Back</Button>
    </>
  );
};

export default Fitness;
