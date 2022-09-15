import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const Admin = () => {
  return (
    <div style={{ color: "black" }}>
      <div style={{ textAlign: "center" }} class="mb-5 display-1">
        Post Creation
      </div>
      <Container>
        <Row
          style={{
            width: "90%",
            margin: "0 auto 30px auto",
            textAlign: "center",
          }}
        >
          <Col style={{ marginBottom: "10px" }}>
            <input
              type="file"
              // onChange={onChange}
            />
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <input
              type="file"
              // onChange={onChange}
            />
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <input
              type="file"
              // onChange={onChange}
            />
          </Col>
        </Row>
      </Container>
      <Form style={{ width: "85%", margin: "0px auto" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            style={{ fontSize: "3rem" }}
            type="text"
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            style={{ fontSize: "2.3rem" }}
            as="textarea"
            placeholder="Short Description"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Control
            style={{ fontSize: "2rem" }}
            as="textarea"
            placeholder="Content"
            rows={20}
          />
        </Form.Group>
      </Form>
      <Container>
        <Row style={{width: "85%", margin: "0px auto" }}>
          <Col style={{textAlign:"center"}}>
            <Button  variant="primary">Save</Button>
          </Col>
          <Col style={{textAlign:"center"}} >
            <Button variant="warning">Publish</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
