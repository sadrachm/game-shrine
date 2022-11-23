import { Box, Button, CssBaseline, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API } from "aws-amplify";
import { createMeasurements } from "../../../graphql/mutations";
import { listFitPeople } from "../../../graphql/queries";

var userId = ""

const Measure = ({ setDay, user }) => {
  const [chest, setChest] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [arm, setArm] = useState("");
  const [waist, setWaist] = useState("");
  const [weight, setWeight] = useState("")

  async function getPeople() {
    var people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
    console.log("user", userId)
  }
  useEffect(() => {
    getPeople()
  }, [])
  
  async function submit() {   
    var x = [chest, hip, thigh, arm, waist, weight]
    var names = ["chest", "hip", "thigh", "arm", "waist", "weight"]
    var values = {fitPersonMeasurementsId:userId}
    x.forEach(function (value, i) {
        if (value !== "") {
            values[names[i]] = value 
        }
    })
    console.log(values)
    console.log(user)
    await API.graphql({
    query: createMeasurements,
    variables: { input: values },
  });
  }

  return (
    <>
      <ArrowBackIcon
        onClick={() => setDay("")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 0, width: "80%", maxWidth: "200px", textAlign: "center" }}
          >
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
            />
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
          </Box>
        </Box>
      </Container>
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
