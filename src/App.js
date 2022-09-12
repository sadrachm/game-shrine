import React from "react";
import "./App.css";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Test from "./pages/test";

function App({ signOut, user }) {
  return (
    <>
      {/* <Test></Test> */}
      <Button name="asd">asd</Button>
      <Container>
        <Row>
          <Col>1 of 1</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </>
  );
}

export default withAuthenticator(
  App
  //   {
  //   socialProviders:['google', 'apple', 'facebook']
  // }
);
