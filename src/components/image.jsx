const Image = (props) => {
    return (
    <div className="col">
      <img
        className="img-fluid"
        style={{maxHeight:"350px", borderRadius:'5%'}}
        src={process.env.PUBLIC_URL + "/img/"+ props.name + ".jpg"}
      />
    </div>
    )
}

export default Image
