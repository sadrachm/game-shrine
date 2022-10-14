
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Inputs = ({set, exercise, reps, setRep}) => {
    return <Container>
    <Row>
      <Col>
        <Form.Group
          style={{ width: "300px", margin: "auto" }}
          className=" mt-5"
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
          className="mt-5"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label style={{ color: "black" }}>Weight</Form.Label>
          <Form.Control
            style={{ textAlign: "center" }}
            onChange={(el) => (exercise.weight = el.target.value)}
            type="number"
            autoComplete="False"
            placeholder={exercise.weight}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group
          style={{ width: "300px", margin: "auto" }}
          className=" mt-5"
          controlId="exampleForm.ControlInput3"
        >
          <Form.Label style={{ color: "black" }}>Reps</Form.Label>
          <Form.Control
            style={{ textAlign: "center" }}
            type="number"
            value={reps}
            onChange={(el) => setRep(el.target.value)}
            autoComplete="False"
            placeholder="0"
          />
        </Form.Group>
      </Col>
    </Row>
  </Container>
}

export default Inputs