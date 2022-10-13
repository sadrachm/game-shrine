import { useEffect, useState } from "react";


const Timer = ({ exercise, reps, setSet, set, setRep }) => {
  const [counter, setCounter] = useState("Start Rest");

  function handleClick() {
    console.log("Start Timer");
    console.log(exercise)
    exercise.rep.push(parseInt(reps));
    setSet(set + 1);
    setRep(0);
    if (counter === "Start Rest") {
      setCounter(30);
    }
  }

  useEffect(() => {
    if (counter !== "Start Rest") {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setCounter("Start Rest")
      }
    }
  }, [counter]);
  return (
    <div
      className="mt-4"
      style={{
        height: "60vh",
        maxHeight: "500px",
        maxWidth: "100%",
        aspectRatio: "1",
        margin: "auto",
        backgroundColor: "blue",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onClick={handleClick}
    >
      {(
        <h1 style={{ textAlign: "center", color: "white" }}>{counter}</h1>
      )}
    </div>
  );
};

export default Timer;
