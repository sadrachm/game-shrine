import Image from "./image";

const Project = (props) => {
  return (
    <>
      <div class="col mb-5">
        <a className="removeDec" href={props.url}>
          <p className="display-4 ">{props.name}</p>
          <div className="imageHover">
            <Image name={props.imageName} />
          </div>
        </a>
      </div>
    </>
  );
};

export default Project;