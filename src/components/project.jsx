import Image from "./image";

const Project = (props) => {
  return (
    <>
      <div className="col-md mb-5">
        <a className="removeDec" href={props.url}>
          <h1 className="display-4 ">{props.name}</h1>
          <div className="imageHover">
            <Image name={props.imageName} />
          </div>
        </a>
      </div>
    </>
  );
};

export default Project;