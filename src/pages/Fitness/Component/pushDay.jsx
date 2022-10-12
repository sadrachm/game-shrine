import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Inputs from "./inputs";
import ChooseExercise from "./chooseExercise";
import Timer from "./timer";
import { API } from "aws-amplify";
import { createExercise, createFitPerson } from "../../../graphql/mutations";
let exercise = {
  sets: 0,
  weight: 35,
  reps: [],
};

const allEx = [];

const PushDay = () => {
  function consol() {
    console.log(ex);
    // allEx.map((el) => {
    //   console.log(el)
    // })
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

  async function submit() {
    // if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createFitPerson,
      variables: {input: {name:"Sadrach"}}
    });
  }
  

  return (
    <>
      {act === "" && (
        <>
          {/* {ex == [] && <Button>All Done</Button>}
          {ex !== [] && ( */}
            <ChooseExercise setEx={setEx} ex={ex} setAct={setAct} />
          {/* )} */}
        </>
      )}
      {act !== "" && (
        <>
          <h1 className="mt-3 mb-3" style={{ textAlign: "center" }}>
            {act}
          </h1>
          <Timer
            exercise={exercise}
            reps={reps}
            setSet={setSet}
            set={set}
            setRep={setRep}
          />
          <Inputs set={set} exercise={exercise} reps={reps} setRep={setRep} />
          <h1>
            <Button
              className="mt-5"
              onClick={() => {
                exercise["name"] = act;
                exercise["sets"] = set;
                allEx.push(exercise);
                setAct("");
                setSet(0);
                exercise = {
                  sets: 0,
                  weight: 35,
                  reps: [],
                };
              }}
            >
              Done
            </Button>
          </h1>
        </>
      )}
      <Button className="mt-5" onClick={() => consol()}>
        Console
      </Button>
      <Button className="mt-5" onClick={() => submit()}>
        Submit
      </Button>
    </>
  );
};

export default PushDay;
