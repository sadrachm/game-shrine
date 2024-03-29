import React, { useEffect, useState } from "react";
import SignOut from "./Components/signOut";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import { Auth } from "aws-amplify";
import ArticleSample from "./Components/articleSample";
import { Button, Col, Container, Row } from "react-bootstrap";
import { listPosts, listGames, listsByDate } from "../../graphql/queries";
import { API } from "aws-amplify";
import Upcoming from "./Components/upcoming";

const GameShrine = () => {
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  async function fetchPosts() {
    const apiData = await API.graphql({
      query: listsByDate,
      variables: { type: "article", sortDirection: "DESC" },
    });
    const notesFromAPI = apiData.data.listsByDate.items;
    setPosts(notesFromAPI);
  }
  async function fetchGames() {
    await API.graphql({
      query: listGames,
    }).then((data) => setGames(data.data.listGames.items));
  }
  function consol() {
    console.log(posts);
  }
  const [user, setuser] = useState(null);
  useEffect(() => {
    fetchPosts();
    fetchGames();
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

      <Container
        style={{ width: "100%", marginLeft: "auto", marginRight: "auto", display:'flex', flexDirection:"column" }}
      >
        <Row  className="shrineStart">
          <Col>
            <h1
              className="display-1 "
              style={{
                padding: "70px 0",
                color: "white",
                textAlign: "center",
              }}
            >
              God of War Ragnarok
            </h1>
          </Col>
          <Col>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                padding: "50px 0",
              }}
              src="https://www.nme.com/wp-content/uploads/2022/07/God-Of-War-Ragnarok-preorders-2000x1270-1.jpg"
            ></img>
            <div class="gameStartingImg"></div>
          </Col>
        </Row>
        <Row>
          <h2 className="display-2 mt-3 mb-5" style={{ textAlign: "center" }}>
            Featured Articles
          </h2>
        </Row>
        <div style={{ width: "75%", margin: "0 auto" }}>
          {posts.map((elem) => {
            return (
              <ArticleSample
                title={elem.title}
                desc={elem.homeDes}
                content = {elem.content}
              ></ArticleSample>
            );
          })}
        </div>
        <Row id="Upcoming" className="upcoming">
          <h2 className="display-2 mt-3 mb-5" style={{ textAlign: "center" }}>
            Upcoming Games
          </h2>
        </Row>
        <div className="upcoming pb-5 mb-3">
          <Row style={{ width: "90%", margin: "0 auto" }}>
            {games.map((el) => {
              return <Upcoming title={el.title} src={el.src} date={el.date} />;
            })}
          </Row>
          {/* <div style={{height:"100px"}}></div> */}
        </div>

        <Row id="Recent">
          <h2 className="display-2 mt-3 mb-5" style={{ textAlign: "center" }}>
            Recent Articles
          </h2>
        </Row>
        <div style={{ width: "75%", margin: "0 auto" }}>
          {posts.map((elem) => {
            return (
              <ArticleSample
                title={elem.title}
                content={elem.homeDes}
              ></ArticleSample>
            );
          })}
        </div>
        <Row className="mt-5">
          <Col></Col>
        </Row>
      </Container>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default GameShrine;
