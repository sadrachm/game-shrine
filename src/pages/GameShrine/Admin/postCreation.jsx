import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../../../graphql/queries";
import { createPost } from "../../../graphql/mutations";

const initialFormState = { title: "", homeDes: "", content: "", published: false, type:"article" };

const PostCreation = ({setView}) => {
  function consol() {
    console.log(formData);
  }
  const [formData, setFormData] = useState(initialFormState);
  async function handleSave() {
    if (!formData.title || !formData.homeDes || !formData.content) return;
    await API.graphql({
      query: createPost,
      variables: { input: formData },
    }).then(()=>{setView(0)});
  }
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
          {/* <Col style={{ marginBottom: "10px" }}>
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
          </Col> */}
        </Row>
      </Container>

      <Form autoComplete="off" style={{ width: "85%", margin: "0px auto" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            style={{ fontSize: "3rem" }}
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            style={{ fontSize: "2.3rem" }}
            as="textarea"
            value={formData.homeDes}
            onChange={(e) =>
              setFormData({ ...formData, homeDes: e.target.value })
            }
            placeholder="Short Description"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Control
            style={{ fontSize: "2rem" }}
            as="textarea"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Content"
            rows={20}
          />
        </Form.Group>
      </Form>
      <Container>
        <Row style={{ width: "85%", margin: "30px auto" }}>
          <Col onClick={handleSave} style={{ textAlign: "center" }}>
            <Button variant="primary">Save</Button>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button onClick={consol} variant="warning">
              Publish
            </Button>
          </Col>
        </Row>
      </Container>
      <div style={{height:"100px"}}></div>
    </div>
  );
};

export default PostCreation;
