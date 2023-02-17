import { Hub, Auth, API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { listPosts, listsByDate } from "../../graphql/queries";
import Carousel from "react-bootstrap/Carousel";
import Header from "./Component/header";

const Recipe = () => {
  let [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let [ids, setIds] = useState([]);
  async function authStore() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      console.log(user);
      setUser(user);
    } catch {
      setUser(null);
    }
  }
  async function getPosts() {
    const posts = await API.graphql({
      query: listsByDate,
      variables: { type: "recipe" },
    });
    let x = [];
    for (let i of posts.data.listsByDate.items) {
      x.push({
        id: i.id,
        title: i.title,
        homeImg: i.homeImg !== null ? i.homeImg : "",
      });
    }
    console.log(x);
    setIds(x);
  }
  useEffect(() => {
    let updateUser = authStore;
    Hub.listen("auth", updateUser);
    updateUser();
    getPosts();
    return () => Hub.remove("auth", updateUser);
  }, []);
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8EDE3" }}>
      <Header />

      <h1
        className="title py-4"
        style={{
          textAlign: "center",
          fontFamily: "Playfair Display",
          marginBottom: "0",
        }}
      >
        Chef Martinez
      </h1>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {ids &&
          ids.map((el) => {
            return (
              <Carousel.Item>
                <Link to={"/recipe/" + el.id}>
                  <img
                    className="d-bloc w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                    src={
                      el.homeImg === ""
                        ? "https://wallpapers.com/images/featured/7ws46k7xo1gcptjo.jpg"
                        : "https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/" +
                          el.homeImg
                    }
                    alt={el.title}
                  />
                </Link>
                <Carousel.Caption>
                  {/* <h3 style={{backgroundColor:"rgba(0, 0, 0, 0.267)", borderRadius:"5px", color:'white', display:"inline", padding:"0 8px"}}>{el.title}</h3> */}
                  <h3 style={{ textShadow: "-1px 3px 2px rgba(0,0,0,0.85" }}>
                    {el.title}
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "black" }}>Search</h3>
        <input
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}
        ></input>
        {ids.map((el) => {
          if (el.title.toLowerCase().includes(query.toLowerCase())) {
            return <Link to={"/recipe/"+el.id} ><h1>{el.title}</h1></Link>
          }
        })}
      </div>
    </div>
  );
};

export default Recipe;
