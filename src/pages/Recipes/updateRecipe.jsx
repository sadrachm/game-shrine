import { Button, TextField } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deletePost, updatePost } from "../../graphql/mutations";
import { getPost } from "../../graphql/queries";

const recipeTemplate = {
  content: [],
  createdAt: "",
  ingredients: [],
  tags: [],
  title: [],
  type: "recipe",
};
let ogContent = "";
let ogIngredients = "";
let ogTitle = "";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState(recipeTemplate);
  const [deleted, setDeleted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [validID, setValidID] = useState(true);
  const [errorMessage, setError] = useState("");
  async function fetch() {
    let apiData = await API.graphql({
      query: getPost,
      variables: { id },
    })
    let newPost = apiData.data.getPost;
    if (newPost == null) {
      setValidID(false)
      return
    }
    setValidID(true)
    setInputs({
      id: id,
      content: newPost.content,
      createdAt: newPost.createdAt,
      ingredients: newPost.ingredients.replaceAll(",", "\n"),
      tags: newPost.tags,
      title: newPost.title,
      type: newPost.type,
    });
    ogContent = newPost.content;
    ogIngredients = newPost.ingredients.replaceAll(",", "\n");
    ogTitle = newPost.title;
  }

  async function submit() {
    let x = { id: id };
    console.log(ogContent);
    if (ogContent !== inputs.content) x["content"] = inputs.content;
    if (ogIngredients !== inputs.ingredients)
      x["ingredients"] = inputs.ingredients.replaceAll("\n", ",");
    if (ogTitle !== inputs.title) x["title"] = inputs.title;
    console.log(x);

    API.graphql({
      query: updatePost,
      variables: { input: x },
    })
      .then((data) => setSaved(true))
      .catch((err) => {
        console.log("ERR", err);
        setError("Could not Save Recipe");
      });
  }
  useEffect(() => {
    fetch();
  }, []);
  async function deleteRecord() {
    API.graphql({
      query: deletePost,
      variables: { input: { id } },
    })
      .then((data) => setDeleted(true))
      .catch((err) => {
        console.log("ERR", err);
        setError("Could not Delete Recipe");
      });
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8EDE3" }}>
      {validID && (
        <div>
          {!deleted && !saved && (
            <div>
              <TextField
                className="mt-3"
                label="Dish Name"
                value={inputs.title}
                onChange={(ev) =>
                  setInputs({ ...inputs, title: ev.target.value })
                }
              ></TextField>
              <TextField
                className="mt-3"
                style={{ width: "100%", resize: "both" }}
                label="Ingredients"
                multiline={true}
                value={inputs.ingredients}
                onChange={(ev) =>
                  setInputs({ ...inputs, ingredients: ev.target.value })
                }
              ></TextField>
              <TextField
                className="mt-3"
                style={{ width: "100%", resize: "both" }}
                multiline={true}
                label="Steps"
                value={inputs.content}
                onChange={(ev) =>
                  setInputs({ ...inputs, content: ev.target.value })
                }
              ></TextField>
              <button onClick={deleteRecord}>Delete</button>
              <br />
              <br />
              <button onClick={() => submit()}>Save</button>
              <h3 style={{ color: "red" }}>{errorMessage}</h3>
            </div>
          )}
          {deleted && (
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
                <h1 className="pb-3">Successfully Deleted Recipe</h1>
                <Link to={"/recipe"}>
                  <button>Home</button>
                </Link>
              </div>
            </div>
          )}
          {saved && (
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
                <h1 className="pb-3">Successfully Saved Recipe</h1>
                <Link to={"/recipe/" + id}>
                  <button>Go Back</button>
                </Link>
              </div>
            </div>
          )}
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

export default UpdateRecipe;
