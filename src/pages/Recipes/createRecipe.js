const CreateRecipe = () => {
  return (
    <div>
      <h1>Recipe Creator</h1>
      <div style={{display:'flex', flexDirection:'column'}}>
        <input placeholder="Nombre"></input>
        <input placeholder="Ingredientes"></input>
        <textarea placeholder="Pasos"></textarea>
      </div>
    </div>
  );
};

export default CreateRecipe;
