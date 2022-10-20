import { useEffect, useState } from "react";
import "../fitness.css";

const Timer = ({ exercise, reps, setSet, set, setRep }) => {
  const [counter, setCounter] = useState("Start Rest");

  function handleClick() {
    // console.log("Start Timer");
    // console.log(exercise);
    if (set < exercise.rep.length - 1) {
      exercise.rep[set] = parseInt(reps);
      setRep(exercise.rep[set + 1]);
    } else {
      if (set === exercise.rep.length - 1) {
        exercise.rep[set] = parseInt(reps);
      } else {
        exercise.rep.push(parseInt(reps));
      }
      setRep(0);
    }
    setSet(set + 1);
    if (counter === "Start Rest") {
      setCounter(90);
    }
  }

  useEffect(() => {
    if (counter !== "Start Rest") {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setCounter("Start Rest");
      }
    }
  }, [counter]);
  return (
    <>
      <div className="mt-3 mb-3 timer" onClick={handleClick}>
        {
          <h1
            style={{ fontSize: "1.5rem", textAlign: "center", color: "white" }}
          >
            {counter}
          </h1>
        }
      </div>
    </>
  );
};

export default Timer;
