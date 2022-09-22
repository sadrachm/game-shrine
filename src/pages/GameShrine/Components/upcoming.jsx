import { Col } from "react-bootstrap";

const Upcoming = ({src, title, date}) => {
    const fullSrc = "https://www.youtube.com/embed/" + src
  return (
    <Col style={{ textAlign: "center", padding: "20px 0" }}>
      <iframe
        width="300"
        height="200"
        src={fullSrc}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
      <h3 className="display-3" style={{ fontSize: "2.5rem" }}>
        {title}
      </h3>
      <h4 className="display-4" style={{ fontSize: "2rem" }}>
        {date}
      </h4>
    </Col>
  );
};

export default Upcoming;