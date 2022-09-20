import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { updatePost } from "../../../graphql/mutations";
import { API } from "aws-amplify";

const PostEditor = ({setEdit, setFormData, formData, fetchNotes}) =>{
  function consol() {
    console.log(formData);
  }
  async function handleSave() {
    if (!formData.title || !formData.homeDes || !formData.content) return;

    const x = await API.graphql({
      query: updatePost,
      variables: { input: formData },
    }).then((data)=> setEdit(false));
    fetchNotes()
  }
    return<>
        <h1 class="display-1" style={{textAlign:"center"}}>Post Editor</h1>
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
    </>
}

export default PostEditor;