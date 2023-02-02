import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API } from "aws-amplify";
import { createMeasurements } from "../../../graphql/mutations";
import {
  listFitPeople,
  measureByDate,
} from "../../../graphql/queries";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

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
  const [test, setTest] = useState(0);

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
    console.log();
    let measurements = await API.graphql({
      query: measureByDate,
      variables: {
        fitPersonMeasurementsId: userId,
        sortDirection: "DESC",
      },
    });
    measurements = measurements.data.measureByDate.items;
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
    // console.log(values);
    // console.log(user);
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
                <th scope="col" style={{ border: "solid 2px" }}>
                  <p className="mb-0" style={{ color: "white" }}>{capitalize(el)}</p>
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

  const controls = useAnimationControls();

  const control = () => {
    if (test == 0) {
      setTest(5);
    } else {
      setTest((test - 1) % 6);
    }
  };
  const container = {
    hidden: {
      x: "40vh",
      transition: {
        duration: 0.5,
      },
      opacity: 0,
    },
    show: {
      x: "0vh",
      opacity: 1,
      transition: {
        duration: .5,
      },
    },
    changing: {
      x: "-40vh",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const dataPresent = () => {
    if (chest && hip && thigh && arm && waist && weight) return true
    return false
  }
  return (
    <div style={{ height: "100vh", maxWidth: "100%", overflowX: "hidden" }}>
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
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <KeyboardArrowLeftRoundedIcon
          className="arrowButton"
            style={{ transform: "scale(1.4)", width:'15%'}} 
            onClick={() => setTest((test + 1) % 6)} 
          />


        <div className="contain" >
          <motion.div
            variants={container}
            initial={{ opacity: 0 }}
            animate={() => {
              if (test % 6 == 0) return "show";
              else if (test % 6 == 1) return "changing";
              else return "hidden";
            }}
            className="inner"
          >
            <div
            >
              <h1 style={{ color: "white", textAlign: "center" }}>Chest</h1>
              <TextField
                className="textField"
                margin="normal"
                name="reps"
                label="Chest"
                variant="filled"
                value={chest}
                onChange={(el) => setChest(el.target.value)}
                type="number"
                fullWidth
              />
            </div>
          </motion.div>
          <motion.div
            variants={container}
            className="inner"
            initial={{ opacity: 0 }}
            animate={() => {
              if (test % 6 == 1) return "show";
              else if (test % 6 == 2) return "changing";
              else return "hidden";
            }}
          >
            <div
            >
              <h1 style={{ color: "white", textAlign: "center" }}>Hips</h1>
              <TextField
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
          </motion.div>
          <motion.div
            variants={container}
            initial={{ opacity: 0 }}
            className="inner"
            animate={() => {
              if (test % 6 == 2) return "show";
              else if (test % 6 == 3) return "changing";
              else return "hidden";
            }}
          >
            <div
            >
              <h1 style={{ color: "white", textAlign: "center" }}>Thighs</h1>
              <TextField
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
          </motion.div>
          <motion.div
            variants={container}
            initial={{ opacity: 0 }}
            className="inner"
            animate={() => {
              if (test % 6 == 3) return "show";
              else if (test % 6 == 4) return "changing";
              else return "hidden";
            }}
          >
            <div
            >
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
          </motion.div>
          <motion.div
            className="inner"
            variants={container}
            initial={{ opacity: 0 }}
            animate={() => {
              if (test % 6 == 4) return "show";
              else if (test % 6 == 5) return "changing";
              else return "hidden";
            }}
          >
            <div
            >
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
          </motion.div>
          <motion.div
            className="inner"
            variants={container}
            initial={{ opacity: 0 }}
            animate={() => {
              if (test % 6 == 5) return "show";
              else if (test % 6 == 0) return "changing";
              else return "hidden";
            }}
          >
            <div
            >
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
          </motion.div>
        </div>
          <KeyboardArrowRightRoundedIcon           
          className="arrowButton"
          style={{ transform: "scale(1.4)", width:'15%' }}  onClick={control} />

      </div>

      <motion.button
        style={{ margin: "auto" }}
        className="button-45 mt-5"
        role="button"
        {...(dataPresent() ? {disabled:false} : {disabled:true})}
        {...(dataPresent() ? {animate:{opacity:1, transition:{duration:1}}} : {animate:{opacity:0}})}
        onClick={submit}
      >
        Send
      </motion.button>
    </div>
  );
};

export default Measure;
