import Timer from "./timer";
import Inputs from "./inputs";
import { Button } from "react-bootstrap";
import { API } from "aws-amplify";
import { createExercise, createDay } from "../../../graphql/mutations";
import { getDay, listDays } from "../../../graphql/queries";
import { useState } from "react";

let exercise = {
  weight: 35,
  rep: [],
};

const Exercising = ({ act, id, allEx, setAct, dayId, setDayId, type }) => {
  const [reps, setRep] = useState("");
  const [set, setSet] = useState(0);

  async function fetchDayId() {
    let x = await API.graphql({
      query: listDays,
    });
    let days = x.data.listDays.items;
    let today = new Date();
    let maybe;
    console.log(days);
    for (let a in days) {
      maybe = new Date(days[a].createdAt);
      if (maybe.getDate() === today.getDate()) {
        setDayId(days[a].id);
      }
    }
    if (dayId === "" && id !== "") {
      API.graphql({
        query: createDay,
        variables: { input: { fitPersonDaysId: id, type: type } },
      }).then((data) => {
        setDayId(data.data.createDay.id);
        console.log(dayId);
      });
    }
  }

  async function finishedSet() {
    if (dayId === "") {
      fetchDayId();
    }
    exercise["act"] = act;
    exercise["type"] = type;
    exercise["dayExercisesId"] = dayId;
    console.log(exercise);
    console.log("asd");
    await API.graphql({
      query: createExercise,
      variables: { input: exercise },
    });
    allEx.push(exercise);
    setAct("");
    setSet(0);
    exercise = {
      weight: exercise.weight,
      rep: [],
      dayExercisesId: dayId,
    };
    console.log(exercise);
  }

  return (
    <>
      <h1 className="pt-4 mb-4" style={{ textAlign: "center", color: "white" }}>
        {act}
      </h1>
      <Timer
        exercise={exercise}
        reps={reps}
        setSet={setSet}
        set={set}
        setRep={setRep}
      ></Timer>
      <Inputs set={set} exercise={exercise} reps={reps} setRep={setRep} />
      <div style={{textAlign:'center'}}>
        <Button
          className="mt-5 mx-auto button-33"
          style={{fontSize:'1.2rem'}}
          onClick={() => {
            finishedSet();
          }}
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default Exercising;
