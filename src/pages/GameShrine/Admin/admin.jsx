import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PostCreation from "./postCreation";
import PostViewer from "./postViewer";
import Games from "./games";
const Admin = () => {
  const [view, setView] = useState(0)
  function change(num) {
    setView(num)
  }
  
  return (
    <div style={{color:"black"}}>
    <Row className={"mx-auto mt-3"} style={{width:"90%", textAlign:"center"}}>
      <Col>
        <Button variant="dark" onClick={()=>{change(0)}}>Viewer</Button>
      </Col>
      <Col>
        <Button variant="dark" onClick={()=>{change(1)}}>Creator</Button>
      </Col>
      <Col>
        <Button variant="dark" onClick={()=>{change(2)}}>Upcoming</Button>
      </Col>
    </Row>
      {view==1 && <PostCreation setView={change}></PostCreation>}
      {view==0 && <PostViewer></PostViewer>}
      {view==2 && <Games></Games>}
      {/*TODO: To select Featured Article */}
      {/* To select Upcoming Games */}
    </div>
  );
};

export default Admin;
