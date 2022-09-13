import Imagen from "react-bootstrap/Image";

const Image = (props) => {
  const x = "https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/portfolio/" +
  props.name +
  ".jpg"
  return (
    <div className="col">
      <Imagen style={{ maxHeight: "350px", borderRadius: "5%", padding:"0" }} fluid 
      src={x}/>
      {/* <img
        className="img-fluid"
        style={{ maxHeight: "350px", borderRadius: "5%" }}
        src={
          "https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/portfolio/" +
          props.name +
          ".jpg"
        }
      /> */}
    </div>
  );
};

export default Image;
