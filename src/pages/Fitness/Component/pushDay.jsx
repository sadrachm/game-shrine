import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Inputs from "./inputs";
import ChooseExercise from "./chooseExercise";
import Timer from "./timer";
const exercise = {
  sets: 0,
  weight: 35,
  reps: [],
};

const allEx = {};

const PushDay = () => {
  function consol() {
    console.log(exercise);
  }
  const [act, setAct] = useState("");
  const [set, setSet] = useState(0);
  const [reps, setRep] = useState(0);
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
      {act === "" && <ChooseExercise ex={ex} setAct={setAct} />}
      {act !== "" && (
        <>
          <h1 className="mt-3 mb-3" style={{ textAlign: "center" }}>
            {act}
          </h1>
          <Timer exercise={exercise} reps={reps} setSet={setSet} set={set} setRep={setRep}/>
          <Inputs set={set} exercise={exercise} reps={reps} setRep={setRep} />
          <h1>
            <Button className="mt-5" onClick={() => setAct("")}>
              Done
            </Button>
          </h1>
        </>
      )}
      <Button className="mt-5" onClick={() => consol()}>
        Console
      </Button>
    </>
  );
};

export default PushDay;
