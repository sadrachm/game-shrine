import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../fitness.css";

const Inputs = ({ set, exercise, reps, setRep, weight, setWeight }) => {
  useEffect(() => {
    if (set < exercise.rep.length) {
      setRep(exercise.rep[set]);
    } else {
      setRep(0);
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 0, width: "80%", maxWidth: "300px", textAlign: "center" }}
        >
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            name="weight"
            label="Weight"
            variant="filled"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            placeholder={weight}
            onChange={(el) => {
              setWeight(el.target.value);
            }}
            id="weight"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.873)",
              justifyContent:'space-around',
              borderWidth:'1px',
              borderColor:'black',
              borderStyle:'solid',
              textAlign:'center',
              
            }}
          >
            <div className="increments" onClick={()=> setRep(reps-1)}>
              -
            </div>
            <TextField
              className="textField"
              margin="normal"
              required
              name="reps"
              label="Reps"
              variant="filled"
              value={reps}
              onChange={(el) => setRep(el.target.value)}
              InputProps={{disableUnderline:true}}
              type="number"              
              id="reps"
              sx={{ mt:'0',mb:'0', backgroundColor: "transparent", width:'50%', borderRadius:'0%' }}
            />
            <div className="increments" onClick={()=> setRep(reps+1)}>
              +
            </div>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Inputs;

//   return <Container>
//   <Row>
//     <Col>
//       <Form.Group
//         style={{ width: "300px", margin: "auto" }}
//         className=" mt-5"
//         controlId="exampleForm.ControlInput1"
//       >
//         <Form.Label style={{ color: "black" }}>Sets</Form.Label>
//         <Form.Control
//           style={{ textAlign: "center" }}
//           value={set}
//           disabled
//           type="number"
//           placeholder="0"
//         />
//       </Form.Group>
//     </Col>
//     <Col>
//       <Form.Group
//         style={{ width: "300px", margin: "auto" }}
//         className="mt-5"
//         controlId="exampleForm.ControlInput2"
//       >
//         <Form.Label style={{ color: "black" }}>Weight</Form.Label>
//         <Form.Control
//           style={{ textAlign: "center" }}
//           onChange={(el) => (exercise.weight = el.target.value)}
//           type="number"
//           autoComplete="False"
//           placeholder={exercise.weight}
//         />
//       </Form.Group>
//     </Col>
//     <Col>
//       <Form.Group
//         style={{ width: "300px", margin: "auto" }}
//         className=" mt-5"
//         controlId="exampleForm.ControlInput3"
//       >
//         <Form.Label style={{ color: "black" }}>Reps</Form.Label>
//         <Form.Control
//           style={{ textAlign: "center" }}
//           type="number"
// value={reps}
// onChange={(el) => setRep(el.target.value)}
//           autoComplete="False"
//           placeholder="0"
//         />
//       </Form.Group>
//     </Col>
//   </Row>
// </Container>
