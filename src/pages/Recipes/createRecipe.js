import { inputBaseClasses } from "@mui/material";
import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { createPost } from "../../graphql/mutations";
const template = {
  title: "",
  ingredients: [],
  content: "",
  type: "recipe",
  fitPersonPostsId: "",
  published:true

}

const CreateRecipe = () => {
  const [inputs, setInputs] = useState(template);
  const [errorMessage, setError] = useState("")
  const [ingredient, setIngredient] = useState("")
  async function authStore() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      setInputs({...inputs, fitPersonPostsId:user.attributes.sub});
    } catch {
      setInputs({...inputs, fitPersonPostsId:"unavailable"});
      console.log("There was an issue logging In")
    }
  }
  useEffect(() => {
    authStore();
  }, []);
  async function addRecipe() {
    if (inputs.title == "" || inputs.ingredients == "" || inputs.content =="") {
      setError("All Inputs must have value")
      return
    }
    API.graphql({
      query: createPost,
      variables: { input: {...inputs, ingredients:inputs.ingredients.join(",")} },
    })
    .then((data) => {
      console.log(data)
      setInputs(template)
      document.getElementById("ingredients").innerHTML = "";
    } )
    .catch((err) => console.log("ERROR: ", err.errors));
    setError("")
    
    document.getElementById("ingredients").innerHTML = "";
  }
  

  useEffect(()=> {
    console.log("name: ", inputs.title)
    console.log("ingredients: ", inputs.ingredients)
    console.log("steps: ", inputs.content)
    console.log("id: ", inputs.fitPersonPostsId)
  }, [inputs])
  return (
    <div  style={{ minHeight: "100vh",padding:'20px 0', backgroundColor: "#F8EDE3" }}>
      <h1>Recipe Creator</h1>
      {inputs.fitPersonPostsId ==="unavailable" && <h1 style={{color:'red'}}>There was an issue logging in</h1>}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          value={inputs.title}
          onChange={(ev) => setInputs({ ...inputs, title: ev.target.value })}
          placeholder="Nombre"
        ></input>
        <div id="ingredients"></div>
        <input
          value={ingredient}
          onChange={(ev) =>
            setIngredient(ev.target.value)          
          }
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              document.getElementById("ingredients").innerHTML += "<h1>" + ev.target.value +"</h1>"
              let x = inputs.ingredients;
              x.push(ev.target.value)
              setInputs({...inputs, ingredients:x})
              setIngredient("")
            }
          }}
          placeholder="Ingredientes"
        ></input>
        <textarea
          value={inputs.content}
          onChange={(ev) => setInputs({ ...inputs, content: ev.target.value })}
          placeholder="Pasos"
        ></textarea>
      </div>
      <button onClick={addRecipe}>Send TO DB</button>
      <h1 style={{color:'red'}}>{errorMessage}</h1>
    </div>
  );
};

export default CreateRecipe;


