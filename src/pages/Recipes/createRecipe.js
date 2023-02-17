import { inputBaseClasses } from "@mui/material";
import { API, Auth, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { createPost } from "../../graphql/mutations";
import CheckIcon from '@mui/icons-material/Check';
import Header from "./Component/header";
const template = {
  title: "",
  ingredients: [],
  content: "",
  type: "recipe",
  fitPersonPostsId: "",
  published: true,
};

const CreateRecipe = () => {
  const [inputs, setInputs] = useState(template);
  const [errorMessage, setError] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [img, setImg] = useState("")

  async function authStore() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      setInputs({ ...inputs, fitPersonPostsId: user.attributes.sub });
    } catch {
      setInputs({ ...inputs, fitPersonPostsId: "unavailable" });
      console.log("There was an issue logging In");
    }
  }
  useEffect(() => {
    authStore();
  }, []);
  async function addRecipe() {
    if (
      inputs.title == "" ||
      ingredients == "" ||
      inputs.content == "" ||
      img == ""
    ) {
      setError("All Inputs must have value");
      return;
    }

    const result = await Storage.put("userimages/" +inputs.title, img)
    API.graphql({
      query: createPost,
      variables: {
        input: { ...inputs, ingredients: ingredients.join(","), homeImg: result.key },
      },
    })
      .then((data) => {
        console.log(data);
        setInputs(template);
        document.getElementById("ingredients").innerHTML = "";
      })
      .catch((err) => console.log("ERROR: ", err.errors));
    setError("");

    document.getElementById("ingredients").innerHTML = "";
  }

  useEffect(() => {
    console.log("name: ", inputs.title);
    console.log("ingredients: ", inputs.ingredients);
    console.log("steps: ", inputs.content);
    console.log("id: ", inputs.fitPersonPostsId);
  }, [inputs]);
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "0",
        backgroundColor: "#F8EDE3",
      }}
    >
    <Header />
      <h1>Recipe Creator</h1>
      {inputs.fitPersonPostsId === "unavailable" && (
        <h1 style={{ color: "red" }}>There was an issue logging in</h1>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          value={inputs.title}
          onChange={(ev) => setInputs({ ...inputs, title: ev.target.value })}
          placeholder="Nombre"
        ></input>
        {ingredients.map((el, index) => {
          return <div key={index}>
          <button onClick={() => {
            setIngredients(ingredients.filter((ing) =>{ 
              if (ing !== el ) return ing
          }))
            console.log(ingredients)
          }}>Delete</button>
            <h1>{el}</h1>
          </div>
        })}
        <div id="ingredients"></div>
        <textarea
          value={ingredient}
          rows={1}
          onChange={(ev) => setIngredient(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              let a = ingredients
              a.push(ev.target.value)
              setIngredients(a)
              setIngredient("");
            }
          }}
          placeholder="Ingredientes"
        ></textarea>
        <textarea
          value={inputs.content}
          onChange={(ev) => setInputs({ ...inputs, content: ev.target.value })}
          placeholder="Pasos"
        ></textarea>        <div>
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
      </div>
      <button onClick={addRecipe}>Send TO DB</button>
      <h1 style={{ color: "red" }}>{errorMessage}</h1>
    </div>
  );
};

export default CreateRecipe;
