import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../graphql/queries";

const template = {
  content: [],
  createdAt: "",
  ingredients: [],
  tags: [],
  title: [],
  type: "recipe",
};

const SingleRecipe = () => {
  let { id } = useParams();
  const [post, setPost] = useState(template);
  const [validID, setValidID] = useState(true)
  async function getPostHelper() {
    const postResult = await API.graphql({
      query: getPost,
      variables: { id },
    });

    let newPost = postResult.data.getPost;
    if (newPost === null) {
      setValidID(false)
      return
    }
    setPost({
      content: newPost.content.split("\n"),
      createdAt: newPost.createdAt,
      ingredients: newPost.ingredients.split(","),
      tags: newPost.tags,
      title: newPost.title,
      type: newPost.type,
    });
  }
  useEffect(() => {
    getPostHelper();
  }, []);
  return (
    <div style={{ minHeight: "100vh",padding:'20px 0', backgroundColor: "#F8EDE3" }}>
      {validID && 
      <div style={{ width: "80%", margin: "auto" }}>
        <h1><u>{post.title}</u></h1>
        <h1>Ingredients: </h1>
        {post.ingredients.map((el, index) => (
          <h3 style={{ color: "black" }} key={index}>
            {" "}
            {el}
          </h3>
        ))}
        <h1>Steps: </h1>
        {post.content.map((el, index) => (
          <h3 style={{ color: "black" }} key={index}>
            {index + 1} - {el}
          </h3>
        ))}

        <Link to={"/recipe/update/" + id}>
          <button>Update Recipe</button>
        </Link>
      </div>
      }
      {!validID && (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 className="pb-3">Invalid ID</h1>
            <Link to={"/recipe"}>
              <button>Home</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
