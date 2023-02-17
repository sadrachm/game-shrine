import { Button, TextField } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deletePost, updatePost } from "../../graphql/mutations";
import { getPost } from "../../graphql/queries";
import { Storage } from "aws-amplify";
import { Image } from "@aws-amplify/ui-react";
import CheckIcon from '@mui/icons-material/Check';
import "./recipe.css";
import Header from "./Component/header";

const recipeTemplate = {
  content: [],
  createdAt: "",
  ingredients: [],
  tags: [],
  title: [],
  type: "recipe",
  homeImg:"",
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
  const [img, setImg] = useState("");
  const [errorMessage, setError] = useState("");
  const [imgURL, setURL] = useState("");
  async function fetch() {
    let apiData = await API.graphql({
      query: getPost,
      variables: { id },
    });
    let newPost = apiData.data.getPost;
    if (newPost == null) {
      setValidID(false);
      return;
    }
    setValidID(true);
    setInputs({
      id: id,
      content: newPost.content,
      createdAt: newPost.createdAt,
      ingredients: newPost.ingredients.replaceAll(",", "\n"),
      tags: newPost.tags,
      title: newPost.title,
      type: newPost.type,
      homeImg: newPost.homeImg!==null ? newPost.homeImg : "",
    })
    console.log(newPost.homeImg)
    ogContent = newPost.content;
    ogIngredients = newPost.ingredients.replaceAll(",", "\n");
    ogTitle = newPost.title;
  }
  async function uploadImage() {    
    let dat = new Date()
    if (inputs.homeImg !== null) await Storage.remove(inputs.homeImg);
    let tempDate = dat.getFullYear() + "." + dat.getMonth() + "." + dat.getDate() + "." + dat.getMinutes()+"." + dat.getSeconds()
    let x = "userimages/"+inputs.title + tempDate;
    console.log(img);
    let a = await Storage.put(x, img, {
      level: "public",
    })
    return a
  }

  async function submit() {
    let x = { id: id };
    console.log(ogContent);
    if (ogContent !== inputs.content) x["content"] = inputs.content;
    if (ogIngredients !== inputs.ingredients)
      x["ingredients"] = inputs.ingredients.replaceAll("\n", ",");
    if (ogTitle !== inputs.title) x["title"] = inputs.title;
    let a = ""
    if (img !== "") {
      a = await uploadImage()
      console.log(a)
      x["homeImg"] = a.key
    }


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
    let dat = new Date()
    console.log(dat.getFullYear() + "." + dat.getMonth() + "." + dat.getDate() + "." + dat.getMinutes()+"." + dat.getSeconds())
    fetch();
  }, []);
  async function deleteRecord() {    
    if (inputs.homeImg !== null) await Storage.remove(inputs.homeImg);
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
    <Header/>
      <div style={{marginTop:"20px"}}>
        {/* <Image src={"https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/userimages/qwe2"} /> */}
        {inputs.homeImg!=="" && <img
          src={"https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/"+inputs.homeImg}
          style={{ width: "300px", margin:'auto' }}
        ></img>}
      </div>
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
                style={{ width: "80%", resize: "both" }}
                label="Ingredients"
                multiline={true}
                value={inputs.ingredients}
                onChange={(ev) =>
                  setInputs({ ...inputs, ingredients: ev.target.value })
                }
              ></TextField>
              <TextField
                className="mt-3"
                style={{ width: "90%", resize: "both" }}
                multiline={true}
                label="Steps"
                value={inputs.content}
                onChange={(ev) =>
                  setInputs({ ...inputs, content: ev.target.value })
                }
              ></TextField>
              {/* <input
                type="file"
                id="fileInput"
                name="imageUpload"
                style={{
                  color: "black",
                  marginTop: "20px",
                  backgroundColor: "blue",
                }}
                onChange={(ev) => {
                  setImg(ev.target.files[0]);
                  console.log(ev);
                }}
              /> */}
              <div>
              <label for="file-upload" class="custom-file-upload">
                Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(ev) => {
                  setImg(ev.target.files[0]);
                  console.log(ev);
                }}
              />
              {img!=="" && <CheckIcon style={{color:'green'}} /> }
              </div>
              <button onClick={uploadImage}>TEst</button>
              <button onClick={deleteRecord}>Delete</button>
              <button onClick={() => submit()}>Save</button>
              
      <Link to={"/recipe/" + id}>
        <button>Go Back</button>
      </Link>
              <h1 style={{ paddingBottom: "20px", margin: "0", color: "red" }}>
                {errorMessage}
              </h1>
              <button onClick={() => {console.log(inputs)}}>click me</button>
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
