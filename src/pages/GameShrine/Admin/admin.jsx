import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PostCreation from "./postCreation";
import PostViewer from "./postViewer";
import PostEditor from "./postEditor";
const Admin = () => {
  const [view, setView] = useState(false)
  function handleClick() {
    setView((view+1)%3)
  }
  return (
    <div style={{color:"black"}}>
      <Button onClick={handleClick}>Switch</Button>
      {view==0 && <PostCreation></PostCreation>}
      {view==1 && <PostViewer></PostViewer>}
      {view==2 && <PostEditor></PostEditor>}
    </div>
  );
};

export default Admin;
