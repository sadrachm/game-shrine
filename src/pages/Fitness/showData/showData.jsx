import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  exerciseByDate,
  listFitPeople,
  dayByDate,
} from "../../../graphql/queries";
import LineChart from "./Components/lineChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

let userId = "";
let days = [];
let pushDays = [];
let filter = { or: [] };
let pushFilter = { or: [] };
let people = "";

const ShowData = ({ user, setDay }) => {
  const [data, setData] = useState({
    labels: "",
    datasets: [],
  });
  const [pushData, setPushData] = useState({
    labels: "",
    datasets: [],
  });
  const [exercise, setExercise] = useState("Assisted Pull Up 1");
  const [pushExercise, setPushExercise] = useState("Bench Press");

  async function getPeople() {
    people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
  }
  async function getDays(type) {
    if (type === "pull") {
      days = await API.graphql({
        query: dayByDate,
        variables: {
          filter: { fitPersonDaysId: { eq: userId } },
          type,
          sortDirection: "DESC",
        },
      });
      days = days.data.dayByDate.items;
      // console.log("pullDays", days);
    } else {
      pushDays = await API.graphql({
        query: dayByDate,
        variables: {
          filter: { fitPersonDaysId: { eq: userId } },
          type,
          sortDirection: "DESC",
        },
      });
      pushDays = pushDays.data.dayByDate.items;
      // console.log("pushDays", pushDays);
    }
  }

  async function updateChart(type) {
    let x
    if (type === "pull") {
      console.log(filter)
      x = await API.graphql({
        query: exerciseByDate,
        variables: { filter, type, sortDirection:"DESC" },
        limit: 400
      });
    } else {
      console.log(pushFilter)
      x = await API.graphql({
        query: exerciseByDate,
        variables: { filter: pushFilter, type, sortDirection: "DESC", },
        limit:400
      });
    }
    x = x.data.exerciseByDate.items;
    let y = [];
    x.map((el) => {
      let power = el.rep.reduce((acc, re) => acc + re * el.weight);
      y.push({ time: el.createdAt, power: power });
    });
    let labels = y.map((data) => {
      let a = new Date(data.time);
      return a.getMonth() + 1 + "/" + a.getDate();
    })
    // console.log(type, labels)
    if (type === "pull") {
      setData({
        labels,
        datasets: [
          {
            label: "",
            data: y.map((data) => data.power),
            backgroundColor: "black",
            borderColor: "black",
          },
        ],
      });
    } else {
      setPushData({
        labels,
        datasets: [
          {
            label: "",
            data: y.map((data) => data.power),
            backgroundColor: "black",
            borderColor: "black",
          },
        ],
      });
    }
  }

  function updateFilter(type) {
    if (type === "pull") {
      filter["or"] = [];
      days.map((el) => {
        filter["or"].push({ dayExercisesId: { eq: el.id } });
      });
      filter["and"] = { act: { eq: exercise } };
    } else if (type === "push") {
      pushFilter["or"] = [];
      pushDays.map((el) => {
        pushFilter["or"].push({ dayExercisesId: { eq: el.id } });
      });
      pushFilter["and"] = { act: { eq: pushExercise } };
    } else {
      console.log("Invalid type of Exercise");
    }
  }
  useEffect(() => {
    filter["and"] = { act: { eq: exercise } };
    updateChart("pull");
  }, [exercise]);

  useEffect(() => {
    pushFilter["and"] = { act: { eq: pushExercise } };
    updateChart("push");
  }, [pushExercise]);

  async function helper(type) {
    if (userId === "") {
      await getPeople();
    }
    await getDays(type);
    await updateFilter(type);
    updateChart(type);
  }

  useEffect(() => {
    helper("pull");
    helper("push");
  }, []);

  return (
    <>
      <ArrowBackIcon
        onClick={() => setDay("")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      />
      <h1 className="pt-3 pb-3" style={{ textAlign: "center" }}>
        Pull Exercises
      </h1>
      <div className="mt-3" style={dropdown}>
        <FormControl style={{}} fullWidth>
          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={exercise}
            label="Pull Exercise"
            onChange={(ev) => setExercise(ev.target.value)}
          >
            <MenuItem value={"Assisted Pull Up 1"}>Assisted Pull Up 1</MenuItem>
            <MenuItem value={"Vertical Bench Row"}>Vertical Bench Row</MenuItem>
            <MenuItem value={"Assisted Pull Up 2"}>Assisted Pull Up 2</MenuItem>
            <MenuItem value={"Bicep Curls"}>Bicep Curls</MenuItem>
            {user !== "jesus" && <MenuItem value={"Squats"}>Squats</MenuItem>}
            {user === "jesus" && (
              <MenuItem value={"Kettle Bell Swings"}>
                Kettle Bell Swings
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      {data !== [] && (
        <div
          className="mt-3"
          style={{
            width: "80%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            margin: "auto",
          }}
        >
          <LineChart chartData={data} exercise={exercise}/>
        </div>
      )}

      <h1 className="pt-3 pb-3" style={{ textAlign: "center" }}>
        Push Exercises
      </h1>

      <div className="mt-3" style={dropdown}>
        <FormControl style={{}} fullWidth>
          <InputLabel id="x">Exercise</InputLabel>
          <Select
            labelId="x"
            id="x"
            value={pushExercise}
            label="Push Exercise"
            onChange={(ev) => setPushExercise(ev.target.value)}
          >
            <MenuItem value={"Decline Bench Press"}>
              Decline Bench Press
            </MenuItem>
            <MenuItem value={"Incline Bench Press"}>
              Incline Bench Press
            </MenuItem>
            <MenuItem value={"Overhead Shoulder Press"}>
              Overhead Shoulder Press
            </MenuItem>
            <MenuItem value={"Bench Press"}>Bench Press</MenuItem>
            <MenuItem value={"Butterfly Swings"}>Butterfly Swings</MenuItem>
            <MenuItem value={"Skull Crushers"}>Skull Crushers</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data !== [] && (
        <div
          className="mt-3"
          style={{
            width: "80%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            margin: "auto",
          }}
        >
          <LineChart chartData={pushData} exercise={pushExercise} />
        </div>
      )}
      <div style={{height:"50px"}}></div>


    </>
  );
};

const dropdown = {
  width: "80%",
  maxWidth: "500px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  margin: "auto",
};

export default ShowData;


