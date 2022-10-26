import Timer from "./timer";
import Inputs from "./inputs";
import { Button } from "react-bootstrap";
import { API } from "aws-amplify";
import { createExercise, createDay } from "../../../graphql/mutations";
import { getDay, listDays } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Exercising = ({
  act,
  id,
  allEx,
  setAct,
  dayId,
  setDayId,
  type,
  prevEx,
}) => {
  let exercise = {
    weight: prevEx[0],
    rep: prevEx[1],
  };

  const [reps, setRep] = useState("");
  const [set, setSet] = useState(0);
  const [weight, setWeight] = useState(exercise.weight);
  const [showPrev, setShowPrev] = useState("");

  async function fetchDayId() {
    if (dayId === "" && id !== "") {
      let data = await API.graphql({
        query: createDay,
        variables: { input: { fitPersonDaysId: id, type: type } },
      }).then((data) => {
        setDayId(data.data.createDay.id);
        return data;
      });

      return data.data.createDay.id;
    }
  }

  async function finishedSet() {
    let day = "";
    if (dayId === "") {
      day = await fetchDayId();
    } else {
      day = dayId;
    }
    exercise["act"] = act;
    exercise["type"] = type;
    exercise["dayExercisesId"] = day;
    exercise.weight = weight;
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
      dayExercisesId: day,
    };
  }
  let x = {
    fontSize: "1.2rem",
    background: showPrev,
  };
  async function some() {
    await finishedSet();
    setAct("");
  }

  return (
    <>
      <CheckCircleOutlineIcon
        className="back mt-3 "
        style={{
          color: "lightgreen",
          position: "absolute",
          right: "3%",
          fontSize: "2.4rem",
        }}
        onClick={some}
      />
      <h1 className="pt-4 mb-2" style={{ textAlign: "center", color: "white" }}>
        {act}
      </h1>
      <Timer
        exercise={exercise}
        reps={reps}
        setSet={setSet}
        set={set}
        setRep={setRep}
      ></Timer>
      <Inputs
        set={set}
        prevEx={prevEx}
        exercise={exercise}
        reps={reps}
        setRep={setRep}
        weight={weight}
        setWeight={setWeight}
      />
      <div style={{ textAlign: "center", height: "100px" }}>
        <button
          style={x}
          className="px-1 mx-auto mt-3 button-45"
          onClick={() => {
            if (showPrev) {
              setShowPrev("");
            } else {
              setShowPrev("red");
            }
          }}
        >
          <ArrowDropDownIcon /> Previous Sets
        </button>
        {showPrev && (
          <div className="mt-3" style={{ fontSize: "1.3rem", color: "white" }}>
            <div>Weight: {prevEx[0]}</div>
            <div className="prevSets">Reps: {prevEx[1].join(", ")}</div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        {/* <Button
          className="mt-5 mx-auto button-33"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            finishedSet();
          }}
        >
          Done
        </Button> */}
      </div>
    </>
  );
};

export default Exercising;
