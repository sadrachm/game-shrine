import Imagen from "react-bootstrap/Image";

const Image = (props) => {
  const x =
    "https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/portfolio/" +
    props.name +
    ".jpg";
  return (
    <div className="col ">
    <div style={{display:"inline"}} class="imageHover">
      <Imagen
        class=""
        style={{ maxHeight: "350px", borderRadius: "5%", padding: "0" }}
        fluid
        src={x}
        alt={props.altText}
      /></div>
    </div>
  );
};

export default Image;
