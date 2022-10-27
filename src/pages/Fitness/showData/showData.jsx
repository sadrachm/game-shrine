import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  exerciseByDate,
  listDays,
  listFitPeople,
  dayByDate,
} from "../../../graphql/queries";
import LineChart from "./Components/lineChart";
import {UserData} from './data.js'

let userId = "";
let days = [];
let filter = { or: [] };

const ShowData = ({ user }) => {
  const [data, setData] = useState({labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [type, setType] = useState("pull");
  const [exercise, setExercise] = useState("Vertical Bench Row");

  async function helper() {
    let people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
    // console.log("user ID", userId);

    days = await API.graphql({
      query: dayByDate,
      variables: {
        filter: { fitPersonDaysId: { eq: userId } },
        type,
        sortDirection: "DESC",
      },
    });
    days = days.data.dayByDate.items;
    console.log(days);
    // TODO: Make more efficient
    filter["or"] = [];
    days.map((el) => {
      filter["or"].push({ dayExercisesId: { eq: el.id } });
    });
    filter["and"] = { act: { eq: exercise } };
    console.log("Filter", filter);
    let x = await API.graphql({
      query: exerciseByDate,
      variables: { filter, type },
    });
    x = x.data.exerciseByDate.items;
    let y = [];
    x.map((el) => {
      let power = el.rep.reduce((acc, re) => acc + re * el.weight);
      console.log(power);
      y.push({ time: el.createdAt, power: power });
    });
    setData({
      labels: y.map((data) => new Date(data.time).getDate()),
      datasets: [
        {
          label: "POWER",
          data: y.map((data)=> data.power),
          backgroundColor: "black",
          borderColor:'black',
        }
      ]
    });
  }

  useEffect(() => {
    helper();
  }, [exercise]);

  async function something(x) {
    let a = await API.graphql({
      query: exerciseByDate,
      variables: { type: x, filter: filter },
    });
    a = a.data.exerciseByDate.items;
    setData(a);
    console.log(a);
    let dic = {};
    a.map((el) => {
      if (dic[el.act]) {
        dic[el.act] = [...dic[el.act], [el.weight, ...el.rep]];
      } else {
        dic[el.act] = [[el.weight, ...el.rep]];
      }
    });
    console.log(dic);
    setData(dic);
    //TODO: Iterate through object to view data on screen
    dic.map((el) => {
      console.log(el);
    });
  }

  return (
    <>
      {/* <h1 style={{ color: "black" }}>Nani</h1> */}
      <button onClick={() => something("pull")}>Pull</button>
      <button onClick={() => something("push")}>Push</button>
      <div className="mt-3" style={{ width: "80%", margin: "auto" }}>
        <FormControl style={{}} fullWidth>
          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={exercise}
            label="Exercise"
            onChange={(ev) => setExercise(ev.target.value)}
          >
            <MenuItem value={"Assisted Pull Up 1"}>Assisted Pull Up 1</MenuItem>
            <MenuItem value={"Vertical Bench Row"}>Vertical Bench Row</MenuItem>
            <MenuItem value={"Assisted Pull Up 2"}>Assisted Pull Up 2</MenuItem>
            <MenuItem value={"Bicep Curls"}>Bicep Curls</MenuItem>
            <MenuItem value={"Squats"}>Squats</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data !== [] && (
        <div className="mt-3" style={{ width: "80%", backgroundColor:'#ffffff73', margin:'auto' }}>
          <LineChart chartData={data} />
        </div>
      )}

      {/* {data !== [] && data.map((el) => {
        return <>
          <h1>{el}</h1>
          <h1>{data[el][0]}</h1>
          <h1>{data[el].substring(1).join(', ')}</h1>
        </>;
      })} */}

      {/* {data === "pull" && (<>
        <h1>Pull</h1>
      </>)}
      {data === "push" && (<>
        <h1>Push</h1>
      </>)} */}
    </>
  );
};

export default ShowData;

// .then((data) => {
//   let x = data.data.listFitPeople.items;
//   userId = x[0].id;
// })
// .then(() => {
//   API.graphql({
//     query: listDays,
//     variables: { filter: { fitPersonDaysId: { eq: userId } } },
//   }).then((q) => {
//     let x = q.data.listDays.items;
//     x.map((el) => {
//       days.push(el.id);
//       filter["or"].push({ dayExercisesId: { eq: el.id } });
//     });
//   });
// });
