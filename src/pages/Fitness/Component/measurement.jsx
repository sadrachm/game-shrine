import { Box, Button, CssBaseline, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API } from "aws-amplify";
import { createMeasurements } from "../../../graphql/mutations";
import { listFitPeople, listMeasurements } from "../../../graphql/queries";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

var userId = "";
let allMeasurements = {
  arm: [],
  chest: [],
  hip: [],
  thigh: [],
  waist: [],
  weight: [],
};
let bodyPart = ["date", "arm", "chest", "hip", "thigh", "waist", "weight"];

const Measure = ({ setDay, user }) => {
  const [chest, setChest] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [arm, setArm] = useState("");
  const [waist, setWaist] = useState("");
  const [weight, setWeight] = useState("");
  const [currInput, setCurrInput] = useState(1);

  const [body, setBody] = useState({
    date: [],
    arm: [],
    chest: [],
    hip: [],
    thigh: [],
    waist: [],
    weight: [],
  });
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async function getPeople() {
    var people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
    console.log("user", userId);
  }

  async function getMeasurements() {
    let measurements = await API.graphql({
      query: listMeasurements,
      variables: { filter: { fitPersonMeasurementsId: { eq: userId } } },
    });
    measurements = measurements.data.listMeasurements.items;
    allMeasurements = body;
    measurements.map((el) => {
      console.log(el);
      let dat = new Date(el.createdAt);
      let date =
        dat.getMonth() +
        1 +
        "/" +
        dat.getDate() +
        "/" +
        (dat.getFullYear() - 2000);
      console.log(date);

      allMeasurements.date.push(date);
      allMeasurements.arm.push(el.arm ? el.arm : "");
      allMeasurements.chest.push(el.chest ? el.chest : "");
      allMeasurements.hip.push(el.hip ? el.hip : "");
      allMeasurements.thigh.push(el.thigh ? el.thigh : "");
      allMeasurements.waist.push(el.waist ? el.waist : "");
      allMeasurements.weight.push(el.weight ? el.weight : "");
    });
    setBody((body) => ({ ...allMeasurements }));
  }

  async function helper() {
    await getPeople();
    getMeasurements();
  }
  useEffect(() => {
    console.log("nani");
  }, [body]);

  useEffect(() => {
    helper();
  }, []);

  async function submit() {
    var x = [chest, hip, thigh, arm, waist, weight];
    var names = ["chest", "hip", "thigh", "arm", "waist", "weight"];
    var values = { fitPersonMeasurementsId: userId };
    x.forEach(function (value, i) {
      if (value !== "") {
        values[names[i]] = value;
      }
    });
    console.log(values);
    console.log(user);
    await API.graphql({
      query: createMeasurements,
      variables: { input: values },
    });
  }

  function renderMeasurements() {
    return (
      <div style={{ overflowX: "auto" }}>
        <table className="table" style={{ border: "solid 2px" }}>
          {bodyPart.map((el) => {
            return (
              <tr style={{ border: "solid 2px" }}>
                <th
                  scope="col"
                  style={{ border: "solid 2px", position: "sticky" }}
                >
                  <p style={{ color: "white" }}>{capitalize(el)}</p>
                </th>
                {body[el].map((entry) => {
                  return (
                    <td scope="row" style={{ border: "solid 2px" }}>
                      <p
                        style={{
                          color: "white",
                          margin: "0",
                          textAlign: "center",
                        }}
                      >
                        {entry}
                      </p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
  function goLeft(ev) {
    ev.preventDefault();
    if (currInput == 1) {
      document.getElementById(bodyPart[currInput]).setAttribute("hidden", "");
      document.getElementById(bodyPart[6]).removeAttribute("hidden");
      setCurrInput(6);
    } else {
      document.getElementById(bodyPart[currInput]).setAttribute("hidden", "");
      document
        .getElementById(bodyPart[currInput - 1])
        .removeAttribute("hidden");
      setCurrInput(currInput - 1);
    }
  }
  function goRight(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (currInput == 6) {
      document.getElementById(bodyPart[currInput]).setAttribute("hidden", "");
      document.getElementById(bodyPart[1]).removeAttribute("hidden");
      setCurrInput(1);
    } else {
      document.getElementById(bodyPart[currInput]).setAttribute("hidden", "");
      document
        .getElementById(bodyPart[currInput + 1])
        .removeAttribute("hidden");
      setCurrInput(currInput + 1);
    }
  }
  return (
    <>
      <ArrowBackIcon
        onClick={() => setDay("")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      />
      <h1 className="pt-3" style={{ color: "white", textAlign: "center" }}>
        Measurements
      </h1>

      <div
        className="pt-3"
        style={{
          margin: "auto",
          maxWidth: "90%",
        }}
      >
        {renderMeasurements()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width:'90%',
          margin:'auto',
        }}
      >
        <WestIcon style={{transform:"scale(1.4)"}} onClick={(ev) => goRight(ev)} />
        <div id="chest" hidden style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Chest</h1>
          <TextField
            // style={{ background: "white" }}

            className="textField"
            margin="normal"
            name="reps"
            label="Chest"
            variant="filled"
            value={chest}
            onChange={(el) => setChest(el.target.value)}
            type="number"
            fullWidth
            //   id="reps"
          />{" "}
        </div>

        <div id="hip" hidden style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Hips</h1>
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="reps"
            label="Hips"
            variant="filled"
            value={hip}
            onChange={(el) => setHip(el.target.value)}
            type="number"
            fullWidth
            id="reps"
          />
        </div>

        <div id="thigh" hidden style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Thighs</h1>
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="reps"
            label="Thighs"
            variant="filled"
            value={thigh}
            onChange={(el) => setThigh(el.target.value)}
            type="number"
            fullWidth
            id="reps"
          />
        </div>

        <div id="waist" hidden style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Waist</h1>
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="reps"
            label="Waist"
            variant="filled"
            value={waist}
            onChange={(el) => setWaist(el.target.value)}
            type="number"
            fullWidth
            id="reps"
          />
        </div>

        <div id="arm" style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Arms</h1>
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="reps"
            label="Arms"
            variant="filled"
            value={arm}
            onChange={(el) => setArm(el.target.value)}
            type="number"
            fullWidth
            id="reps"
          />
        </div>

        <div id="weight" hidden style={{ width: "70%", margin: "auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}>Weight</h1>
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="reps"
            label="Weight lbs"
            variant="filled"
            value={weight}
            onChange={(el) => setWeight(el.target.value)}
            type="number"
            fullWidth
            id="reps"
          />
        </div>
        <EastIcon style={{transform:"scale(1.4)"}} onClick={(ev) => goLeft(ev)} />
      </div>
      <button
        style={{ margin: "auto" }}
        className="button-45 mt-5"
        role="button"
        onClick={submit}
      >
        Send
      </button>
    </>
  );
};

export default Measure;
