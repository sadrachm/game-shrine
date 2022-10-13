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

const Exercising = ({ act, id, allEx, setAct, dayId }) => {
  const [reps, setRep] = useState(0);
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
        dayId = days[a].id;
      }
    }
    if (dayId === "" && id !== "") {
      API.graphql({
        query: createDay,
        variables: { input: { fitPersonDaysId: id, type: "push" } },
      }).then((data) => {
        dayId = data.data.createDay.id;
        console.log(dayId);
      });
    }
  }
  async function getId() {
    let b = await API.graphql({
        query: listDays,
    })
    console.log(b)
  }

  async function finishedSet() {
    if (dayId === "") {
      fetchDayId();
    }
    exercise["act"] = act;
    exercise["dayExercisesId"] = dayId;
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
    console.log(exercise);
  }

  return (
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
      ></Timer>
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
        <Button
          className="mt-5"
          onClick={() => {
            getId();
          }}
        >
          qwexad
        </Button>
      </h1>
    </>
  );
};

export default Exercising;
