import React, { useEffect, useState } from "react";
import SignOut from "./Components/signOut";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import { Auth } from "aws-amplify";
import ArticleSample from "./Components/articleSample";
import { Button, Col, Container, Row } from "react-bootstrap";
import { listPosts } from "../../graphql/queries";
import { API } from "aws-amplify";

const placeholder =
  "Shognjgfmnhgfdmghjm ghjm ghjmgj mjm gjm gjfmt descriptasfdsgfsdg sdfg dfg dfgh ion about something that is very importnat";
const titlePlaceholder = "";

const GameShrine = () => {
  const [posts, setPosts] = useState([])
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listPosts });
    const notesFromAPI = apiData.data.listPosts.items;
    setPosts(notesFromAPI);
  }
  function consol() {
    console.log(posts)
  }
  const [user, setuser] = useState(null);
  useEffect(() => {
    
    fetchNotes();
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setuser(user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div class="shrineHome">
    
    <Button onClick={consol} style={{color:"black"}}>button</Button>
      <Navbar setuser={setuser} user={user}></Navbar>
      <div class="headDiv"></div>
     
      <div style={{ height: "50px" }}></div>
      <Container
        style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
      >
      <Row style={{ backgroundColor: "black"}}>
        <Col>
      <h1 className="display-1 " style={{ backgroundColor: "black", padding: "70px 0", color:'white', textAlign:'center' }}>
        God of War Ragnarok 
      </h1>
        </Col>
      <Col>
      <img style={{maxWidth:"100%", maxHeight:'400px', padding:"50px 0"}} src="https://www.nme.com/wp-content/uploads/2022/07/God-Of-War-Ragnarok-preorders-2000x1270-1.jpg"></img>
        <div class="gameStartingImg"></div>

      </Col>
      </Row>
      <Row>
        <h2 className="display-2 mt-3 mb-5" style={{textAlign:"center"}}>Featured Articles</h2>
      </Row>
      <div style={{width:'75%', margin:"0 auto"}}>
      {posts.map((elem)=> {
        return <ArticleSample title={elem.title} content ={elem.homeDes}></ArticleSample>
      })}
        </div>
        {/* <Row style={{marginBottom:"20px"}}>
          <Col>
            <h1>The Left side</h1>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
          <Col>
            <h1>The Right side</h1>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
        </Row> */}
        {/* <Row>
          <Col>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
          <Col>
            <ArticleSample title={titlePlaceholder} content={placeholder}></ArticleSample>
          </Col>
        </Row> */}
        <Row className="mt-5">
          <Col>
            <h1>Video of the Week</h1>
            <div style={{ textAlign: "center" }}>
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
