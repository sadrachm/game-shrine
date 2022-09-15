import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PostCreation from "./postCreation";
import PostViewer from "./postViewer";
const Admin = () => {
  const [view, setView] = useState(false)
  return (
    <div style={{color:"black"}}>
      <Button onClick={()=>{setView(!view)}}>Switch</Button>
      {view && <PostCreation></PostCreation>}
      {!view && <PostViewer></PostViewer>}
    </div>
  );
};

export default Admin;
