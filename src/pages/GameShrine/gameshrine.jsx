import React, { useEffect, useState } from "react";
import SignOut from "./Components/signOut";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import { Auth } from "aws-amplify";
import ArticleSample from "./Components/articleSample";
import { Col, Container, Row } from "react-bootstrap";

const placeholder = "Shognjgfmnhgfdmghjm ghjm ghjmgj mjm gjm gjfmt descriptasfdsgfsdg sdfg dfg dfgh ion about something that is very importnat"
const titlePlaceholder = ""

const GameShrine = () => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setuser(user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div class="shrineHome">
      <Navbar setuser={setuser} user={user}></Navbar>
      <div class="headDiv"></div>
      <div class="gameStartingImg"></div>
      <div style={{ height: "50px" }}></div>
      <Container
        style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Row style={{marginBottom:"20px"}}>
          <Col>
            <h1>The Left side</h1>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
          <Col>
            <h1>The Right side</h1>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
        </Row>
        <Row>
          <Col>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
          <Col>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h1>Video of the Week</h1>
            <div style={{ textAlign: "center",}}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iHfJRON3b-w"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default GameShrine;
