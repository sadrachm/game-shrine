import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Inputs from "./inputs";
import ChooseExercise from "./chooseExercise";
import Timer from "./timer";
import { API } from "aws-amplify";
import {
  createDay,
  createExercise,
  createFitPerson,
} from "../../../graphql/mutations";
import { listDays, listFitPeople } from "../../../graphql/queries";
let exercise = {
  weight: 35,
  rep: [],
  dayExercisesId: "c0bfe6d4-c104-46c2-8d2a-4299c70319fb",
};
let dayId = ""
let people = [];
const allEx = [];
let id = "";

const PushDay = () => {
  function consol() {
    console.log(allEx);
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

  async function something() {
    let x = await API.graphql({
      query: listFitPeople,
    });
    people = x.data.listFitPeople.items;
    x = await API.graphql({
      query: listDays
    });
    let days = x.data.listDays.items
    let today = new Date()
    let maybe
    console.log(days)
    for (let a in days) {
      maybe = new Date(days[a].createdAt)
      if (maybe.getDate() === today.getDate()) {
        dayId = days[a].id
      }      
    }
    if (dayId === "" && people !== []) {
      API.graphql({
        query:createDay,
        variables: {input: {fitPersonDaysId: people[0].id}}
      })
    }
  }
  useEffect(() => {
    something();
  }, []);

  async function finishedSet() {
    exercise["act"] = act;
    console.log(exercise);
    await API.graphql({
      query: createExercise,
      variables: { input: exercise },
    });
    allEx.push(exercise);
    setAct("");
    setSet(0);
    exercise = {
      weight: 35,
      rep: [],
      dayExercisesId: dayId,
    };
  }

  return (
    <>
      {act === "" && (
        <>
          <ChooseExercise setEx={setEx} ex={ex} setAct={setAct} />
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
                finishedSet();
              }}
            >
              Done
            </Button>
          </h1>
        </>
      )}
      {allEx.map((el)=> {
        return <div className="mb-3" style={{color:"black"}}>
          <h1>{el.act}</h1>
          <h2>Weight: {el.weight}</h2>
          <h2>Reps: {el.rep.join(', ')}</h2>
        </div>
      })}
      <Button className="mt-5" onClick={() => consol()}>
        Console
      </Button>
    </>
  );
};

export default PushDay;



  // async function submit() {
  //   // if (!formData.name || !formData.description) return;
  //   await API.graphql({
  //     query: createDay,
  //     variables: {input: {fitPersonDaysId:id}}
  //   });
  // }