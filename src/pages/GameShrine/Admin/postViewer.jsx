import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { listPosts, listsByDate  } from "../../../graphql/queries";
import { API } from "aws-amplify";
import ArticleSample from "../Components/articleSample";
import SettingsIcon from "@mui/icons-material/Settings";
import PostEditor from "./postEditor";
import { ChangeCircle, Update } from "@mui/icons-material";

const initialFormState = {
  title: "",
  homeDes: "",
  content: "",
  published: false,
};

const PostViewer = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  function consol() {
    console.log(posts);
  }

  function change(event,id,  title, desc, content) {
    console.log(id)
    console.log(desc)
    setFormData({id:id, homeDes:desc, content:content, title: title });
    setEdit(true);
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listsByDate ,
      variables: {type:"article", sortDirection:"DESC"}});
    const notesFromAPI = apiData.data.listsByDate.items;
    setPosts(notesFromAPI);
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      {/* <Button onClick={consol}>Consol</Button> */}
      {!edit && (
        <>
          <h1 class="display-1" style={{ textAlign: "center" }}>
            Post Viewer
          </h1>
          <div style={{ width: "80%", margin: "0 auto" }}>
            <Container style={{ marginTop: "20px" }}>
              {posts.map((el) => {
                return (
                  <Row className="mb-4">
                    <Col xs={9}>
                      <ArticleSample
                        content={el.homeDes}
                        title={el.title}
                      ></ArticleSample>
                    </Col>
                    <Col style={{ padding: "55px 0", textAlign: "end" }}>
                      <Button
                        onClick={(event) =>
                          change(event,el.id, el.title, el.homeDes, el.content)
                        }
                      >
                        <SettingsIcon></SettingsIcon>
                      </Button>
                    </Col>
                    {/* </div> */}
                  </Row>
                );
              })}
            </Container>
          </div>
        </>
      )}
      {edit && (
        <>
          <Button onClick={()=> {setEdit(false)}}>Back</Button>
          <PostEditor fetchNotes={fetchNotes} setEdit={setEdit} formData={formData} setFormData={setFormData}></PostEditor>
        </>
      )}
    </>
  );
};

export default PostViewer;
