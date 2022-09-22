import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Article = (props) => {
  const location = useLocation();
  const [cont, setCont] = useState([]);
  useEffect(() => {
    const words = location.state.content.split("\n");
    setCont(words);
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto", color: "black" }}>
      <h1 className="display-1 mt-3" style={{ textAlign: "center",fontSize: "3rem" }}>
        {location.state.title}
      </h1>
      <h2 className="display-2 mt-3" style={{ textAlign: "center",fontSize: "2rem" }}>
        {location.state.desc}
      </h2>
      {cont.map((el) => {
        return (
          <h3 className="display-3 mt-2" style={{ fontSize: "1.5rem" }}>
            {el}
          </h3>
        );
      })}
    </div>
  );
};

export default Article;
