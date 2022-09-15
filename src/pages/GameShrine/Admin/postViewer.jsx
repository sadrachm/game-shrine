import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { listPosts } from "../../../graphql/queries";
import { API } from "aws-amplify";
import ArticleSample from "../Components/articleSample";

const PostViewer = () => {
  const [posts, setPosts] = useState([]);
  function consol() {
    console.log(posts);
  }
  function something() {
    posts.map((el) => {
      return <h1>{el.content}</h1>;
    });
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listPosts });
    const notesFromAPI = apiData.data.listPosts.items;
    //     await Promise.all(
    //       notesFromAPI.map(async (note) => {
    //         // if (note.image) {
    //         //   const image = await Storage.get(note.image);
    //         //   note.image = image;
    //         // }
    //         return note;
    //       })
    //     );
    setPosts(notesFromAPI);
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <Button onClick={consol}>Consol</Button>
      <h1 class="display-1" style={{textAlign:"center"}}>Post Viewer</h1>
      <div style={{ width: "80%", margin:"0 auto" }}>
        {posts.map((el) => {
          return (
            <div class="mt-5">
              <ArticleSample
                content={el.homeDes}
                title={el.title}
              ></ArticleSample>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostViewer;
