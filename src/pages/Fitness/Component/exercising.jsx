import Timer from "./timer";
import Inputs from "./inputs";
import { API } from "aws-amplify";
import { createExercise, createDay } from "../../../graphql/mutations";
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField } from "@mui/material";
import { textAlign } from "@mui/system";

let previousSet = [0, [0]];

const Exercising = ({
  act,
  id,
  allEx,
  setAct,
  dayId,
  setDayId,
  type,
  setEx,
  ex,
  prevEx,
  enableCounter,
}) => {
  let exercise = {
    weight: prevEx[0],
    rep: prevEx[1],
  };
  const [reps, setRep] = useState("");
  const [set, setSet] = useState(0);
  const [weight, setWeight] = useState(exercise.weight);
  const [currentSet, setCurrentSet] = useState([]);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);

  useEffect(() => {
    previousSet = JSON.parse(JSON.stringify(prevEx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (set !== 0) {
      setCurrentSet([...currentSet, exercise.rep[set - 1]]);
      if (set === 1) {
        setFirst(exercise.rep[set - 1]);
      } else if (set === 2) {
        setSecond(exercise.rep[set - 1]);
      } else if (set === 3) {
        setThird(exercise.rep[set - 1]);
      } else {
        console.log("Error in line 53");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  function text(index) {
    console.log("nani");
    let x = first;
    let y = setFirst;
    let title = "First";
    if (index === 1) {
      x = second;
      y = setSecond;
      title = "Second";
    } else if (index === 2) {
      x = third;
      y = setThird;
      title = "Third";
    } else if (index >= 3) {
      return;
    }

    return (
      <TextField
        className="textField"
        margin="normal"
        name="reps"
        label={`${title} Set`}
        variant="filled"
        value={x}
        onChange={(ex) => {
          y(ex.target.value);
        }}
        type="number"
        id="reps"
      />
    );
  }
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

  async function some() {
    await finishedSet();
    setAct("");
  }
  function goBack() {
    setEx([act, ...ex]);
    setAct("");
  }

  return (
    <>
      <ArrowBackIcon
        style={{
          position: "absolute",
          top: "10px",
          left: "2%",
          fontSize: "1.7rem",
        }}
        onClick={goBack}
      />
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
      <h1
        className="pt-4 mb-2"
        style={{
          width: "80%",
          margin: "auto",
          textAlign: "center",
          color: "white",
        }}
      >
        {act}
      </h1>
      <Timer
        exercise={exercise}
        reps={reps}
        setSet={setSet}
        set={set}
        setRep={setRep}
        enableCounter={enableCounter}
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
      <div style={{ textAlign: "center" }}>
        <h1 className="mt-3" style={{ color: "white" }}>
          Current Set
        </h1>
        <div className="" style={{ fontSize: "1.3rem", color: "white" }}>
          <div className="prevSets">Reps: {currentSet.join(", ")}</div>
          {currentSet.map((el, index) => {
            return text(index);
          })}
        </div>
      </div>
      <div className="pb-3" style={{ textAlign: "center" }}>
        <h1 className="mt-3" style={{ color: "white" }}>
          Previous Set
        </h1>
        <div className="" style={{ fontSize: "1.3rem", color: "white" }}>
          <div>Weight: {previousSet[0]}</div>
          <div className="prevSets">Reps: {previousSet[1].join(", ")}</div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}></div>
    </>
  );
};

export default Exercising;
