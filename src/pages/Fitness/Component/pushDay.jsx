import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import { Form } from "react-bootstrap";
const exercise = {
    sets:0,
    weight:35,
    reps:[]
}

const PushDay = () => {
  const matches = useMediaQuery("(min-width:680px)");
  function consol() {
    console.log(exercise)
  };
  const [act, setAct] = useState("");
  const [set, setSet] = useState(0);
  const [reps, setRep] = useState(0);
  const [ex, setEx] = useState([
    "Decline Bench Press",
    "Incline Bench Press",
    "Overhead Shoulder Press",
    "Bench Press",
    "Butterfly Swings",
    "Skull Crushers",
  ]);
  return (
    <>
      {act === "" &&
        ex.map((el) => {
          return (
            <h1 style={{ textAlign: "center" }}>
              {matches && (
                <Button
                  style={{ width: "40%", fontSize: "1.4rem" }}
                  onClick={() => {
                    setAct(ex);
                  }}
                >
                  {el}
                </Button>
              )}
              {!matches && (
                <Button style={{ width: "80%", fontSize: "1.2rem" }}>
                  {el}
                </Button>
              )}
            </h1>
          );
        })}
      {act !== "" && (
        <>
          <div
            className="mt-4"
            style={{
              height: "60vh",
              maxHeight: "500px",
              maxWidth: "100%",
              aspectRatio: "1",
              margin: "auto",
              backgroundColor: "blue",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            onClick={() => {
              console.log("Start Timer");
              exercise.reps.push(reps)
              setSet(set+1)
            }}
          >
            <h1 style={{ textAlign: "center", color: "white" }}>Start Rest</h1>
          </div>
          <Container>
            <Row>
              <Col>
                <Form.Group
                  style={{ width: "300px", margin: "auto" }}
                  className="mb-5 mt-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "black" }}>Sets</Form.Label>
                  <Form.Control
                    style={{ textAlign: "center" }}
                    value={set}                    
                    disabled
                    type="number"
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  style={{ width: "300px", margin: "auto" }}
                  className="mb-5 mt-5"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label style={{ color: "black" }}>Weight</Form.Label>
                  <Form.Control
                    style={{ textAlign: "center" }}
                    // value={exercise.weight}
                    onChange={(el)=> exercise.weight = el.target.value}
                    type="number"
                    autoComplete="False"
                    placeholder={exercise.weight}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  style={{ width: "300px", margin: "auto" }}
                  className="mb-5 mt-5"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label style={{ color: "black" }}>Reps</Form.Label>
                  <Form.Control
                    style={{ textAlign: "center" }}
                    type="number"
                    value={reps}
                    onChange={(el)=> setRep(el.target.value)}
                    autoComplete="False"
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button onClick={() => setAct("")}>Quit Exercise</Button>
          <Button onClick={() => consol()}>Console</Button>
        </>
      )}
    </>
  );
};

export default PushDay;
