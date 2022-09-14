import Image from "./image";

const Project = (props) => {
  return (
    <>
      <div class="col mb-5 ">
        <p className="display-4 ">{props.name}</p>
        <div className=" px-2">
          <a className="removeDec " href={props.url}>
            <Image name={props.imageName} altText={props.altText} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Project;
