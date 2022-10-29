import { FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../fitness.css";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const Timer = ({ exercise, reps, setSet, set, setRep }) => {
  const [counter, setCounter] = useState("Start Rest");
  const [enableCounter, setEnable] = useState(true);

  function handleClick() {
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
      <div
      
      className="clipboardButton"
        style={{
          display: "block",
          position: "absolute",
          bottom: 0,
          left: "50%",
        }}
      >
        <FormControlLabel
          labelPlacement="end"
          label="Timer"
          style={{ color: "white" }}
          control={
            <Switch
              checked={enableCounter}
              onChange={(ev) => setEnable(ev.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </div>
      {!enableCounter && (
        <div className="mt-4 mb-2" style={{ textAlign: "center" }}>
          <Button
            className="clipboardButton"
            style={{
              boxShadow: " 3px 2px 3px 1px #ccc1c1",
              backgroundColor: "#362e2e",
              borderColor: "transparent",
            }}
            onClick={handleClick}
          >
            <NoteAltIcon style={{ color: "white", fontSize: "2rem" }} />
          </Button>
        </div>
      )}
      {enableCounter && (
        <div className="mt-3 mb-3 timer" onClick={handleClick}>
          <h1
            style={{ fontSize: "1.5rem", textAlign: "center", color: "white" }}
          >
            {counter}
          </h1>
        </div>
      )}
    </>
  );
};

export default Timer;
