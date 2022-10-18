import { CssBaseline, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {  Container } from "react-bootstrap";
import "../fitness.css"

const Inputs = ({ set, exercise, reps, setRep }) => {

  return (
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
          sx={{ mt: 1, width: "80%", maxWidth: "200px", textAlign: "center" }}
        >
          <TextField
            // sx={{ background: "lightgrey" }}
            className="textField disabledText "
            margin="normal"
            disabled
            value={set}
            id="set"
            label="Set"
            name="Set"
            variant="filled"
            type="number"
            placeholder="0"
            fullWidth
           
          />
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
            placeholder={exercise.weight}
            onChange={(el) => (exercise.weight = el.target.value)}
            id="weight"
          />
          <TextField
            // style={{ background: "white" }}
            className="textField"
            margin="normal"
            required
            name="reps"
            label="Reps"
            variant="filled"
            value={reps}
            onChange={(el) => setRep(el.target.value)}
            type="number"
            fullWidth
            id="reps"
            autoComplete="current-password"
          />
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