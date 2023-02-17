import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../graphql/queries";
import Header from "./Component/header";
import "./recipe.css"

const template = {
  content: [],
  createdAt: "",
  ingredients: [],
  tags: [],
  title: "",
  homeImg:"",
  type: "recipe",
};

const SingleRecipe = () => {
  let { id } = useParams();
  const [post, setPost] = useState(template);
  const [validID, setValidID] = useState(true);
  const [showIngredients, setShowIngredient] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  async function getPostHelper() {
    const postResult = await API.graphql({
      query: getPost,
      variables: { id },
    });

    let newPost = postResult.data.getPost;
    if (newPost === null) {
      setValidID(false);
      return;
    }
    console.log(newPost);
    setPost({
      content: newPost.content.split("\n"),
      createdAt: newPost.createdAt,
      ingredients: newPost.ingredients.split(","),
      tags: newPost.tags,
      title: newPost.title,
      type: newPost.type,
      homeImg: newPost.homeImg !==null ? newPost.homeImg : "",
    });
  }
  useEffect(() => {
    getPostHelper();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "0",
        backgroundColor: "#F8EDE3",
      }}
      className="recipeBody"
    >
    <Header />
      {validID && (
        <div style={{ width: "80%", margin: "auto" }}>
          <h1>
            <u className="title"><em>{post.title}</em></u>
          </h1>
          {post.homeImg!=="" && <img
          src={"https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/" + post.homeImg}
          style={{ width: "300px" }}
        ></img>}
          <div
            style={{ border: "solid 1px black", borderRadius: "8px", margin:'9px 0' }}
            onClick={() => setShowIngredient(!showIngredients)}
          >
            <h1 className="subtitle" style={{textAlign:"center", margin:'5px 0',}}>Ingredients: </h1>
          </div>
          {showIngredients &&
            post.ingredients.map((el, index) => {
              if (el[0] === "_") {
                return <h3 className="mt-3" style={{color: "black" }} key={index}>
                {el.substring(1)}
              </h3>
              }
              return <h3 style={{color: "black" }} key={index}>
                {el}
              </h3>}
            )}
          <div
            className="mt-3"
            style={{ border: "solid 1px black", borderRadius: "8px", margin:"9px 0", }}
            onClick={() => setShowSteps(!showSteps)}
          >
            <h1 className="subtitle" style={{textAlign:'center'}}>Steps: </h1>
          </div>
          {showSteps &&
            post.content.map((el, index) => (
              <h3 style={{ color: "black" }} key={index}>
                {index + 1} - {el}
              </h3>
            ))}

          <Link to={"/recipe/update/" + id}>
            <button>Update Recipe</button>
          </Link>
        </div>
      )}
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
